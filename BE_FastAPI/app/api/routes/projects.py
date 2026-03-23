from typing import List
from app.core.database import get_db
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services.project_service import ProjectService

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("", response_model=dict)
def get_all_projects(db: Session = Depends(get_db)):
    project_service = ProjectService(db)
    projects = project_service.get_all_projects()
    return {"success": True, "projects": projects}


@router.get("/{project_id}", response_model=dict)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project_service = ProjectService(db)
    project = project_service.get_project(project_id)
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    return {"success": True, "project": project}


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
def create_project(project_data: ProjectCreate, db: Session = Depends(get_db)):
    project_service = ProjectService(db)
    project = project_service.create_project(project_data)
    return {
        "success": True,
        "message": "Project created successfully",
        "project": project
    }


@router.put("/{project_id}", response_model=dict)
def update_project(project_id: int, project_data: ProjectUpdate, db: Session = Depends(get_db)):
    project_service = ProjectService(db)
    project = project_service.update_project(project_id, project_data)
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    return {
        "success": True,
        "message": "Project updated successfully",
        "project": project
    }


@router.delete("/{project_id}", response_model=dict)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project_service = ProjectService(db)
    deleted = project_service.delete_project(project_id)
    
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    return {
        "success": True,
        "message": "Project deleted successfully"
    }
