from typing import List
from sqlalchemy.orm import Session
from app.repositories.task_repository import TaskRepository
from app.repositories.project_repository import ProjectRepository
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse


class TaskService:
    def __init__(self, db: Session):
        self.task_repo = TaskRepository(db)
        self.project_repo = ProjectRepository(db)
    
    def get_all_tasks(self) -> List[TaskResponse]:
        tasks = self.task_repo.get_all()
        result = []
        for task in tasks:
            task_dict = TaskResponse.model_validate(task).model_dump()
            if task.project_id:
                project = self.project_repo.get_by_id(task.project_id)
                task_dict['project_name'] = project.name if project else "No Project"
            else:
                task_dict['project_name'] = "No Project"
            result.append(TaskResponse(**task_dict))
        return result
    
    def get_task(self, task_id: int) -> TaskResponse:
        task = self.task_repo.get_by_id(task_id)
        if not task:
            return None
        
        task_dict = TaskResponse.model_validate(task).model_dump()
        if task.project_id:
            project = self.project_repo.get_by_id(task.project_id)
            task_dict['project_name'] = project.name if project else "No Project"
        else:
            task_dict['project_name'] = "No Project"
        
        return TaskResponse(**task_dict)
    
    def create_task(self, task_data: TaskCreate) -> TaskResponse:
        task = self.task_repo.create(task_data)
        return self.get_task(task.id)
    
    def update_task(self, task_id: int, task_data: TaskUpdate) -> TaskResponse:
        task = self.task_repo.update(task_id, task_data)
        if not task:
            return None
        return self.get_task(task.id)
    
    def delete_task(self, task_id: int) -> bool:
        return self.task_repo.delete(task_id)
    
    def get_statistics(self) -> dict:
        return self.task_repo.get_statistics()
    
    def get_recent_tasks(self, limit: int = 5) -> List[TaskResponse]:
        tasks = self.task_repo.get_recent(limit)
        result = []
        for task in tasks:
            task_dict = TaskResponse.model_validate(task).model_dump()
            if task.project_id:
                project = self.project_repo.get_by_id(task.project_id)
                task_dict['project_name'] = project.name if project else "No Project"
            else:
                task_dict['project_name'] = "No Project"
            result.append(TaskResponse(**task_dict))
        return result
