from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.core.database import init_db, get_db
from app.api import api_router
from app.repositories.user_repository import UserRepository


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Initializing database...")
    init_db()
    
    # Create default admin user
    db = next(get_db())
    user_repo = UserRepository(db)
    user_repo.create_default_admin()
    db.close()
    
    print(f"✓ Database initialized")
    print(f"✓ Default admin user created (username: admin, password: Admin123)")
    
    yield
    
    # Shutdown
    print("Shutting down...")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
def health_check():
    return {"status": "ok"}

# Include API routes
app.include_router(api_router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
