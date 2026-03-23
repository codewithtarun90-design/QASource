from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "pending"
    priority: str = "medium"
    project_id: Optional[int] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    title: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None


class TaskResponse(TaskBase):
    id: int
    project_name: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)
