<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Check request method
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Handle GET request (example: fetch user details)'
    $response = [
        "message" => "GET request received!",
        "status" => "success",
        "data" => [
            "name" => "John Doe",
            "email" => "johndoe@example.com",
            "age" => 30
        ]
    ];
    echo json_encode($response);
    exit;
} 

elseif ($method === 'POST') {
    // Handle POST request (example: save user data)
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
        exit;
    }

    $name = $input["name"] ?? "Anonymous";
    $email = $input["email"] ?? "No Email";

    $response = [
        "message" => "POST request received!",
        "status" => "success",
        "data" => [
            "name" => $name,
            "email" => $email
        ]
    ];
    echo json_encode($response);
    exit;
}

// If not GET or POST, return an error
http_response_code(405);
echo json_encode(["status" => "error", "message" => "Method Not Allowed"]);
exit;

?>
