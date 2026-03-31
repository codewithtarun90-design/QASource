from fastapi import APIRouter
from app.api.routes import auth, projects, tasks, dashboard, teams, notifications

api_router = APIRouter(prefix="/api")

api_router.include_router(auth.router)
api_router.include_router(projects.router)
api_router.include_router(tasks.router)
api_router.include_router(dashboard.router)
api_router.include_router(teams.router)
api_router.include_router(notifications.router)
