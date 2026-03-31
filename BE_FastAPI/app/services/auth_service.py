from typing import Optional
from sqlalchemy.orm import Session
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserLogin, Token
from app.core.security import verify_password, create_access_token


class AuthService:
    def __init__(self, db: Session):
        self.user_repo = UserRepository(db)
    
    def login(self, credentials: UserLogin) -> Optional[dict]:
        user = self.user_repo.get_by_username(credentials.username)
        
        if not user or not verify_password(credentials.password, user.hashed_password):
            return None
        
        access_token = create_access_token(data={"sub": user.username})
        
        return {
            "success": True,
            "token": access_token,
            "user": {
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }
    
    def register(self, user_data: UserCreate) -> dict:
        # Check if user exists
        existing_user = self.user_repo.get_by_username(user_data.username)
        if existing_user:
            return {"success": False, "error": "Username already exists"}
        
        existing_email = self.user_repo.get_by_email(user_data.email)
        if existing_email:
            return {"success": False, "error": "Email already exists"}
        
        # Create user
        user = self.user_repo.create(user_data)
        access_token = create_access_token(data={"sub": user.username})
        
        return {
            "success": True,
            "message": "User registered successfully",
            "token": access_token,
            "user": {
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }
