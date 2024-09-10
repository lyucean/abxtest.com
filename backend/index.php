    <?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;
    use Slim\Exception\HttpNotFoundException;
    use Slim\Middleware\ErrorMiddleware;

    require __DIR__ . '/vendor/autoload.php';

    $app = AppFactory::create();

    // Группа маршрутов с префиксом /api
    $app->group('/api', function ($group) {
        $group->get('/test', function (Request $request, Response $response, $args) {
            $response->getBody()->write("Hello test!");
            return $response;
        });

        $group->get('/', function (Request $request, Response $response, $args) {
            $response->getBody()->write("Hello!");
            return $response;
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