import os
import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from typing import List, Dict

# Resolve embeddings directory relative to this file to avoid cwd issues
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EMBED_DIR = os.path.join(BASE_DIR, "embeddings")
INDEX_PATH = os.path.join(EMBED_DIR, "faiss.index")
META_PATH = os.path.join(EMBED_DIR, "chunk_metadata.pkl")

_embed_model = None
_index = None
_metadata: List[Dict] | None = None
_gemini = None


def _lazy_init_models() -> None:
    global _embed_model, _index, _metadata, _gemini
    if _embed_model is None:
        _embed_model = SentenceTransformer("all-MiniLM-L6-v2")
    if _index is None:
        if not os.path.exists(INDEX_PATH):
            raise FileNotFoundError(f"FAISS index not found at {INDEX_PATH}")
        _index = faiss.read_index(INDEX_PATH)
    if _metadata is None:
        if not os.path.exists(META_PATH):
            raise FileNotFoundError(f"Chunk metadata not found at {META_PATH}")
        with open(META_PATH, "rb") as f:
            _metadata = pickle.load(f)
    if _gemini is None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY environment variable is not set")
        genai.configure(api_key=api_key)
        _gemini = genai.GenerativeModel("gemini-2.5-flash")


def retrieve_chunks(query: str, top_k: int = 5) -> List[Dict]:
    _lazy_init_models()
    query_vec = _embed_model.encode([query]).astype("float32")
    D, I = _index.search(query_vec, top_k)
    return [_metadata[i] for i in I[0]]


def answer_with_rag(query: str) -> str:
    _lazy_init_models()
    top_chunks = retrieve_chunks(query)
    context = "\n\n".join([
        f"{c['chunk_type'].capitalize()} from {c['act_title']}:\n{c['content']}" for c in top_chunks
    ])

    prompt = f"""
You are a legal assistant. Use the following legal texts to answer the user's question.

{context}

Question: {query}
Answer:"""

    response = _gemini.generate_content(prompt)
    return response.text
