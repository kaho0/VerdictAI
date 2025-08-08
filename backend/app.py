from fastapi import FastAPI, Request
from pydantic import BaseModel
from rag_utils import answer_with_rag
import uvicorn

app = FastAPI()

class Question(BaseModel):
    query: str

@app.post("/ask")
async def ask_legal_question(payload: Question):
    answer = answer_with_rag(payload.query)
    return {"answer": answer}

# To run: uvicorn app:app --reload
