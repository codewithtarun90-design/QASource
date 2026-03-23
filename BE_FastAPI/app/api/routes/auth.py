from app.core.database import get_db
from app.schemas.user import UserLogin, UserCreate
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login")
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    result = auth_service.login(credentials)
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    return result


@router.post("/register")
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    result = auth_service.register(user_data)
    
    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("error")
        )
    
    return result
