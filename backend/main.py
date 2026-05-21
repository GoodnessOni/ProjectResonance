from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agents.task_a_agent import run_task_a
from agents.task_b_agent import run_task_b

app = FastAPI(title="ProjectResonance API")

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- TASK A INPUT ---
class TaskAInput(BaseModel):
    persona: str
    product: str

# --- TASK B INPUT ---
class TaskBInput(BaseModel):
    persona: str

# --- TASK A ENDPOINT ---
@app.post("/task-a")
async def task_a(input: TaskAInput):
    try:
        result = run_task_a(input.persona, input.product)
        return result
    except Exception as e:
        return {"error": True, "message": str(e)}

# --- TASK B ENDPOINT ---
@app.post("/task-b")
async def task_b(input: TaskBInput):
    try:
        result = run_task_b(input.persona)
        return result
    except Exception as e:
        return {"error": True, "message": str(e)}

# --- HEALTH CHECK ---
@app.get("/")
def root():
    return {"status": "ProjectResonance API is running"}