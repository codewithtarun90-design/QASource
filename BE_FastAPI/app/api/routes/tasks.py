from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.services.task_service import TaskService

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("", response_model=dict)
def get_all_tasks(db: Session = Depends(get_db)):
    task_service = TaskService(db)
    tasks = task_service.get_all_tasks()
    return {"success": True, "tasks": tasks}


@router.get("/{task_id}", response_model=dict)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task_service = TaskService(db)
    task = task_service.get_task(task_id)
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return {"success": True, "task": task}


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
    task_service = TaskService(db)
    task = task_service.create_task(task_data)
    return {
        "success": True,
        "message": "Task created successfully",
        "task": task
    }


@router.put("/{task_id}", response_model=dict)
def update_task(task_id: int, task_data: TaskUpdate, db: Session = Depends(get_db)):
    task_service = TaskService(db)
    task = task_service.update_task(task_id, task_data)
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return {
        "success": True,
        "message": "Task updated successfully",
        "task": task
    }


@router.delete("/{task_id}", response_model=dict)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task_service = TaskService(db)
    deleted = task_service.delete_task(task_id)
    
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return {
        "success": True,
        "message": "Task deleted successfully"
    }
