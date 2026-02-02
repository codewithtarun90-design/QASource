<?php
// index.php

require_once 'Todo.php';
require_once 'Utils/Logger.php';

use App\Todo\Todo;
use App\Utils\Logger;

/**
 * Main application logic.
 */
class Application {
    
    private $logger;

    public function __construct() {
        // Dependency 1: Use a utility class (Logger)
        $this->logger = new Logger();
    }

    public function run() {
        $this->logger->log('Application started.');

        // Dependency 2: Use the core business class (Todo)
        $task1 = new Todo('Clean the kitchen');
        $task2 = new Todo('Review PHP code');

        $this->logger->logTaskStatus($task1); // Uses the method that relies on Todo
        
        $task1->markCompleted();
        
        $this->logger->logTaskStatus($task1);
        $this->logger->logTaskStatus($task2);

        $this->logger->log('Application finished.');
    }
}

// Instantiate and run the application
$app = new Application();
$app->run();

?>