from datetime import datetime; from pydantic import BaseModel
class CampaignCreate(BaseModel):
    name: str; template: str; subject: str; sender_name: str; sender_email: str; landing_page: str | None = None
class CampaignResponse(BaseModel):
    id: str; name: str; status: str; sent_count: int; click_count: int; phish_count: int
    subject: str; sender_name: str; sender_email: str; created_at: datetime; launched_at: datetime | None = None
    model_config = {"from_attributes": True}
class TargetResponse(BaseModel):
    id: str; email: str; name: str | None; department: str | None; status: str; clicked: bool; phished: bool; opened_at: datetime | None = None; clicked_at: datetime | None = None
    model_config = {"from_attributes": True}
