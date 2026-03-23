from app.core.database import get_db
from app.services.task_service import TaskService
from app.services.project_service import ProjectService

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("")
def get_dashboard(db: Session = Depends(get_db)):
    task_service = TaskService(db)
    project_service = ProjectService(db)
    
    stats = task_service.get_statistics()
    stats["total_projects"] = project_service.get_project_count()
    
    recent_tasks = task_service.get_recent_tasks(5)
    
    return {
        "success": True,
        "data": {
            "stats": stats,
            "recent_tasks": recent_tasks,
            "activities": []
        }
    }
