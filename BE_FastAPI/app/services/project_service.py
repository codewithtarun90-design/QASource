from typing import List
from sqlalchemy.orm import Session
from app.repositories.project_repository import ProjectRepository
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse


class ProjectService:
    def __init__(self, db: Session):
        self.project_repo = ProjectRepository(db)
    
    def get_all_projects(self) -> List[ProjectResponse]:
        projects = self.project_repo.get_all()
        return [ProjectResponse.model_validate(p) for p in projects]
    
    def get_project(self, project_id: int) -> ProjectResponse:
        project = self.project_repo.get_by_id(project_id)
        if not project:
            return None
        return ProjectResponse.model_validate(project)
    
    def create_project(self, project_data: ProjectCreate) -> ProjectResponse:
        project = self.project_repo.create(project_data)
        return ProjectResponse.model_validate(project)
    
    def update_project(self, project_id: int, project_data: ProjectUpdate) -> ProjectResponse:
        project = self.project_repo.update(project_id, project_data)
        if not project:
            return None
        return ProjectResponse.model_validate(project)
    
    def delete_project(self, project_id: int) -> bool:
        return self.project_repo.delete(project_id)
    
    def get_project_count(self) -> int:
        return self.project_repo.count()
