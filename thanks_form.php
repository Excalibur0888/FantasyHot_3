<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"])); 
    $tel = htmlspecialchars(trim($_POST["tel"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Validate required fields
    if (empty($name) || empty($email)) {
        die("Please fill in all required fields");
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email address");
    }

    // Prepare email message
    $to = "support@" . $_SERVER['HTTP_HOST'];
    $subject = "New Contact Form Submission";
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    if (!empty($tel)) {
        $body .= "Phone: $tel\n";
    }
    if (!empty($message)) {
        $body .= "Message:\n$message\n";
    }

    // Email headers
    $headers = "From: $to\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        header("Location: thanks.html");
        exit();
    } else {
        die("Error sending message");
    }
}
?>
