from fastapi import APIRouter, UploadFile;

router = APIRouter();

@router.post("/upload_resume")
async def upload_resume (file: UploadFile):
    return {"fileName": file.filename}
