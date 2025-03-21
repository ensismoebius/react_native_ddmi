<?php
// Permitir requisições de origem cruzada
header("Access-Control-Allow-Origin: *"); // Permite que a API seja acessada de qualquer domínio
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Permite os métodos HTTP GET, POST e OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-API-KEY"); // Permite os cabeçalhos mencionados nas requisições
header("Content-Type: application/json"); // Define o tipo de conteúdo da resposta como JSON

// Define uma chave secreta para a API
define("API_KEY", "re98wr6ew8r6rew76r89e6rwer6w98r6ywe9r6r6w87e9wr6ew06r7"); // A chave de API que será usada para validar as requisições

// Manipular requisição OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { // Verifica se a requisição é do tipo OPTIONS (usado para CORS pré-vôo)
    http_response_code(200); // Retorna código de sucesso 200
    exit; // Finaliza a execução, pois não há mais nada a fazer
}

// Validar a chave da API
$headers = getallheaders(); // Obtém todos os cabeçalhos da requisição
$receivedKey = $headers['X-API-KEY'] ?? ''; // Obtém a chave da API do cabeçalho X-API-KEY, se existir

if ($receivedKey !== API_KEY) { // Verifica se a chave recebida é diferente da chave definida
    http_response_code(403); // Retorna código de erro 403 (Proibido) se a chave for inválida
    echo json_encode(["status" => "error", "message" => "Forbidden: Invalid API Key"]); // Retorna mensagem de erro em JSON
    exit; // Finaliza a execução da API
}

// Manipular requisição GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica se a requisição é do tipo GET
    $response = [ // Cria a resposta com os dados fictícios
        "message" => "GET request received!", // Mensagem de sucesso
        "status" => "success", // Status da resposta
        "data" => [ // Dados retornados pela requisição GET
            "name" => "John Doe", // Nome fictício
            "email" => "johndoe@example.com", // Email fictício
            "age" => 30 // Idade fictícia
        ]
    ];
    echo json_encode($response); // Codifica a resposta em JSON e envia para o cliente
    exit; // Finaliza a execução
}

// Manipular requisição POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Verifica se a requisição é do tipo POST
    // Ler entrada JSON
    $input = json_decode(file_get_contents("php://input"), true); // Lê o conteúdo JSON da requisição e converte para um array associativo

    if (!$input) { // Se o JSON não for válido
        echo json_encode(["status" => "error", "message" => "Invalid JSON data"]); // Retorna um erro informando que o JSON é inválido
        exit; // Finaliza a execução
    }

    // Extrair valores da entrada JSON
    $name = $input["name"] ?? "Anonymous"; // Se não houver o campo "name" no JSON, usa "Anonymous" como valor padrão
    $email = $input["email"] ?? "No Email"; // Se não houver o campo "email" no JSON, usa "No Email" como valor padrão

    // Construir resposta
    $response = [ // Cria a resposta com os dados do POST
        "message" => "POST request received!", // Mensagem de sucesso
        "status" => "success", // Status da resposta
        "data" => [ // Dados retornados pela requisição POST
            "name" => $name, // Nome extraído do JSON ou "Anonymous"
            "email" => $email // Email extraído do JSON ou "No Email"
        ]
    ];
    echo json_encode($response); // Codifica a resposta em JSON e envia para o cliente
    exit; // Finaliza a execução
}

// Se o método da requisição não for permitido, retornar erro
http_response_code(405); // Retorna código de erro 405 (Método Não Permitido) caso o método não seja GET nem POST
echo json_encode(["status" => "error", "message" => "Method Not Allowed"]); // Retorna uma mensagem de erro indicando que o método não é permitido
exit; // Finaliza a execução

