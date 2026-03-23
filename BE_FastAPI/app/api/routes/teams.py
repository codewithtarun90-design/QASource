from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.task_service import TaskService
from app.services.project_service import ProjectService

router = APIRouter(prefix="/teams", tags=["Teams"])


@router.get("")
def get_teams(db: Session = Depends(get_db)):
    task_service = TaskService(db)
    project_service = ProjectService(db)
    
    total_tasks = task_service.get_statistics()["total_tasks"]
    total_projects = project_service.get_project_count()
    
    team_members = [
        {
            "id": 1,
            "name": "Admin User",
            "role": "Administrator",
            "avatar": "A",
            "tasks": total_tasks,
            "projects": total_projects,
            "status": "active"
        }
    ]
    
    return {
        "success": True,
        "data": {
            "members": team_members,
            "total_members": len(team_members),
            "total_tasks": total_tasks,
            "total_projects": total_projects
        }
    }
