    <?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;
    use Slim\Exception\HttpNotFoundException;
    use Slim\Middleware\ErrorMiddleware;
    use Slim\Psr7\Stream;

    require __DIR__ . '/vendor/autoload.php';

    $app = AppFactory::create();

    // Группа маршрутов с префиксом /api
    $app->group('/api', function ($group) {
        $group->get('/test', function (Request $request, Response $response, $args) {
            $response->getBody()->write("Hello api!");
            return $response;
        });

        $group->get('/tracks', function (Request $request, Response $response, $args) {
            $tracks = [
                ["id" => "DaftPunk_OneMoreTime", "name" => "Daft Punk - One More Time"],
                ["id" => "Eminem_loseyourself", "name" => "Eminem - Lose Yourself"],
                // Добавьте другие треки по необходимости
            ];

            $response->getBody()->write(json_encode($tracks));
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