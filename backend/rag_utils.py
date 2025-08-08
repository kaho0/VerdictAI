import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer
import google.generativeai as genai

# Load models and index
embed_model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("embeddings/faiss.index")

with open("embeddings/chunk_metadata.pkl", "rb") as f:
    metadata = pickle.load(f)

# Gemini setup
genai.configure(api_key="AIzaSyC_6z96oR53D0HbhGJT5NOwy8PsSC1Zf6w")
gemini = genai.GenerativeModel("gemini-2.5-flash")

def retrieve_chunks(query, top_k=5):
    query_vec = embed_model.encode([query]).astype("float32")
    D, I = index.search(query_vec, top_k)
    return [metadata[i] for i in I[0]]

def answer_with_rag(query):
    top_chunks = retrieve_chunks(query)
    context = "\n\n".join([
        f"{c['chunk_type'].capitalize()} from {c['act_title']}:\n{c['content']}"
        for c in top_chunks
    ])

    prompt = f"""
You are a legal assistant. Use the following legal texts to answer the user's question.

{context}

Question: {query}
Answer:"""

    response = gemini.generate_content(prompt)
    return response.text
