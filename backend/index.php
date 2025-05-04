    <?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;
    use Slim\Exception\HttpNotFoundException;
    use Slim\Middleware\ErrorMiddleware;
    use Slim\Psr7\Stream;
    use Dotenv\Dotenv;

    require __DIR__ . '/vendor/autoload.php';

    // Загрузка переменных окружения
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../'); // Путь к директории с файлом .env
    $dotenv->load();

    $app = AppFactory::create();

    $app->get('/api/test-env', function (Request $request, Response $response) {
        $response->getBody()->write(json_encode([
            'telegram_token_exists' => isset($_ENV['TELEGRAM_TOKEN']),
            'chat_id_exists' => isset($_ENV['TELEGRAM_CHAT_ID'])
        ]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    // Группа маршрутов с префиксом /api
    $app->group('/api', function ($group) {
        $group->get('/tracks', function (Request $request, Response $response, $args) {
            $tracks = [
                ["id" => "DaftPunk_OneMoreTime", "name" => "Daft Punk - One More Time"],
                ["id" => "Eminem_LoseYourself", "name" => "Eminem - Lose Yourself"],
                ["id" => "MarilynManson_SmellsLikeChildren", "name" => "Marilyn Manson - Smells Like Children"],
                ["id" => "LinkinPark_Numb", "name" => "Linkin Park - Numb"],
                ["id" => "LinkinPark_InTheEnd", "name" => "Linkin Park - In the End"],
                ["id" => "Eminem_TheRealSlimShady", "name" => "Eminem - The Real Slim Shady"],
                ["id" => "Queen_BohemianRhapsody", "name" => "Queen - Bohemian Rhapsody"],
                ["id" => "TheEagles_HotelCalifornia", "name" => "The Eagles - Hotel California"],
                ["id" => "DaveBrubeck_TakeFive", "name" => "Dave Brubeck - Take Five"],
                ["id" => "Metallica_EnterSandman", "name" => "Metallica - Enter Sandman"],
                ["id" => "Metallica_SadButTrue", "name" => "Metallica - Sad But True"],
                ["id" => "MichaelJackson_BillieJean", "name" => "Michael Jackson - Billie Jean"],
            ];

            // Перемешиваем треки для удобства на клиенте
            shuffle($tracks);

            $response->getBody()->write(json_encode($tracks));
            return $response->withHeader('Content-Type', 'application/json');
        });

        // Добавляем новый endpoint для отправки результатов в Telegram
        $group->post('/send-results', function (Request $request, Response $response) {
            $data = json_decode($request->getBody(), true);

            // Загружаем переменные окружения
            $telegramToken = $_ENV['TELEGRAM_TOKEN'];
            $chatId = $_ENV['TELEGRAM_CHAT_ID'];

            // Получаем IP адрес
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'Unknown IP';

            // Формируем текст сообщения
            $message = "🎧 *Новый результат ABX теста*\n\n";
            $message .= "📊 *Итог:* " . $data['finalResult'] . "\n";
            $message .= "🎵 *Максимально различимое качество:* " . $data['maxDiscernibleQuality'] . "\n\n";

            // Добавляем детали каждого теста
            $message .= "*Детальные результаты:*\n";
            foreach ($data['testResults'] as $index => $result) {
                $status = $result['isCorrect'] ? "✅" : ($result['choice'] === 'Unknown' ? "❓" : "❌");
                $message .= ($index + 1) . ". " . $status . " " . $result['quality'] . " vs Lossless\n";
                $message .= "   Трек: " . $result['track'] . "\n";
            }

            $message .= "\n\n";
            $message .= "🌐 *IP:* " . $ip . "\n";
            $message .= "💻 *User Agent:* " . $data['userAgent'] . "\n";

            // Отправляем сообщение в Telegram
            $url = "https://api.telegram.org/bot{$telegramToken}/sendMessage";
            $params = [
                'chat_id' => $chatId,
                'text' => $message,
                'parse_mode' => 'Markdown'
            ];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $result = curl_exec($ch);
            curl_close($ch);

            if ($result === false) {
                $response->getBody()->write(json_encode(['success' => false, 'error' => 'Failed to send to Telegram']));
                return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
            }

            $response->getBody()->write(json_encode(['success' => true]));
            return $response->withHeader('Content-Type', 'application/json');
        });
    });
    // Обработчик ошибок
    $errorMiddleware = $app->addErrorMiddleware(true, true, true);

    $errorMiddleware->setErrorHandler(HttpNotFoundException::class, function (
        Request $request,
        HttpNotFoundException $exception,
        bool $displayErrorDetails,
        bool $logErrors,
        bool $logErrorDetails
    ) use ($app) {
        $response = $app->getResponseFactory()->createResponse();
        $response->getBody()->write('404 Not Found');
        return $response->withStatus(404);
    });

    $app->run();