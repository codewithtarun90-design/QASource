<?php
// Todo.php

namespace App\Todo;

/**
 * Represents a single To-Do item.
 */
class Todo {
    
    private $task;
    private $completed = false;

    public function __construct(string $task) {
        $this->task = $task;
    }

    public function getTask(): string {
        return $this->task;
    }

    public function markCompleted(): void {
        $this->completed = true;
    }

    public function isCompleted(): bool {
        return $this->completed;
    }
}

?>