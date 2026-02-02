<?php
// Utils/Logger.php

namespace App\Utils;

use App\Todo\Todo; // <--- **EXPLICIT CROSS-FILE DEPENDENCY**

/**
 * Simple logging utility.
 */
class Logger {
    
    public function log(string $message): void {
        echo "[" . date('Y-m-d H:i:s') . "] INFO: " . $message . "\n";
    }

    /**
     * This method creates a dependency on the Todo class.
     */
    public function logTaskStatus(Todo $task): void {
        $status = $task->isCompleted() ? 'Completed' : 'Pending';
        $this->log("Task '{$task->getTask()}' status: {$status}");
    }
}

?>