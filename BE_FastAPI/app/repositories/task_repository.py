from typing import List, Optional
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


class TaskRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all(self) -> List[Task]:
        return self.db.query(Task).order_by(Task.id.desc()).all()
    
    def get_by_id(self, task_id: int) -> Optional[Task]:
        return self.db.query(Task).filter(Task.id == task_id).first()
    
    def create(self, task_data: TaskCreate) -> Task:
        task = Task(**task_data.model_dump())
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task
    
    def update(self, task_id: int, task_data: TaskUpdate) -> Optional[Task]:
        task = self.get_by_id(task_id)
        if not task:
            return None
        
        update_data = task_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(task, field, value)
        
        self.db.commit()
        self.db.refresh(task)
        return task
    
    def delete(self, task_id: int) -> bool:
        task = self.get_by_id(task_id)
        if not task:
            return False
        
        self.db.delete(task)
        self.db.commit()
        return True
    
    def get_statistics(self) -> dict:
        total = self.db.query(Task).count()
        pending = self.db.query(Task).filter(Task.status == "pending").count()
        in_progress = self.db.query(Task).filter(Task.status == "in_progress").count()
        completed = self.db.query(Task).filter(Task.status == "completed").count()
        
        return {
            "total_tasks": total,
            "pending": pending,
            "in_progress": in_progress,
            "completed": completed
        }
    
    def get_recent(self, limit: int = 5) -> List[Task]:
        return self.db.query(Task).order_by(Task.id.desc()).limit(limit).all()
