from fastapi import APIRouter

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("")
def get_notifications():
    return {
        "success": True,
        "data": {
            "unread_count": 0,
            "notifications": []
        }
    }
