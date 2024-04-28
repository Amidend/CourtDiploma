# backend/routers/judges.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.models.database import get_db
from backend.schemas.judges import JudgeCreate, JudgeUpdate, Judge
from backend.models.models import Judge as JudgeModel

router = APIRouter(prefix="/admin/judges")

# Get all judges
@router.get("/", response_model=List[Judge])
async def get_judges(db: Session = Depends(get_db)):
    judges = db.query(JudgeModel).all()
    return judges

# Create a new judge
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=Judge)
async def create_judge(judge: JudgeCreate, db: Session = Depends(get_db)):
    db_judge = JudgeModel(**judge.dict())
    db.add(db_judge)
    db.commit()
    db.refresh(db_judge)
    return db_judge

# Get a specific judge
@router.get("/{judge_id}", response_model=Judge)
async def get_judge(judge_id: int, db: Session = Depends(get_db)):
    judge = db.query(JudgeModel).get(judge_id)
    if not judge:
        raise HTTPException(status_code=404, detail="Judge not found")
    return judge

# Update a judge
@router.put("/{judge_id}", response_model=Judge)
async def update_judge(judge_id: int, updated_judge: JudgeUpdate, db: Session = Depends(get_db)):
    judge = db.query(JudgeModel).get(judge_id)
    if not judge:
        raise HTTPException(status_code=404, detail="Judge not found")
    judge_data = updated_judge.dict(exclude_unset=True)
    for key, value in judge_data.items():
        setattr(judge, key, value)
    db.commit()
    db.refresh(judge)
    return judge

# Delete a judge
@router.delete("/{judge_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_judge(judge_id: int, db: Session = Depends(get_db)):
    judge = db.query(JudgeModel).get(judge_id)
    if not judge:
        raise HTTPException(status_code=404, detail="Judge not found")
    db.delete(judge)
    db.commit()
    return  # No content returned for DELETE