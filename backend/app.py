from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_utils import answer_with_rag
import uvicorn

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    query: str

@app.post("/ask")
async def ask_legal_question(payload: Question):
    answer = answer_with_rag(payload.query)
    return {"answer": answer}

@app.get("/")
async def root():
    return {"message": "VerdictAI Legal Assistant API"}

# To run: uvicorn app:app --reload
