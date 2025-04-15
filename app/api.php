<?php
/*
 * Coloque este arquivo no 
 * diretório do servidor web!!!
 */

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-API-KEY");

header("Content-Type: application/json");

define("API_KEY", "fljhkgsdg434hhfiu434wgfhbfdif");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { // Verifica se a requisição é do tipo OPTIONS (usado para CORS pré-vôo)
    http_response_code(200); // Retorna código de sucesso 200
    exit; // Finaliza a execução, pois não há mais nada a fazer
}

$headers = getallheaders(); // Obtém todos os cabeçalhos da requisição

$receivedKey = $headers['X-API-KEY'] ?? ''; // Obtém a chave da API do cabeçalho X-API-KEY, se existir

if ($receivedKey !== API_KEY) { // Verifica se a chave recebida é diferente da chave definida
    http_response_code(403); // Retorna código de erro 403 (Proibido) se a chave for inválida
    echo json_encode(["status" => "error", "message" => "Forbidden: Invalid API Key"]); // Retorna mensagem de erro em JSON
    exit; // Finaliza a execução da API
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica se a requisição é do tipo GET
    $resposta = [
        "mensagem" => "Recebi o GET",
        "status" => "sucesso",
        "dados" => [
            "nome" => "Uga",
            "email" => "uga@caverna.pedra"
        ]
    ];

    echo json_encode($resposta);
    exit;
}

http_response_code(405); // Retorna código de erro 405 (Método Não Permitido) caso o método não seja GET nem POST
echo json_encode(["status" => "error", "message" => "Method Not Allowed"]); // Retorna uma mensagem de erro indicando que o método não é permitido