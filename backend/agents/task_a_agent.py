import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
MODEL = os.getenv("GROQ_MODEL")

def load_prompt():
    prompt_path = os.path.join(os.path.dirname(__file__), "../prompts/task_a_prompt.txt")
    with open(prompt_path, "r") as f:
        return f.read()

def run_task_a(persona: str, product: str):
    # Load prompt and fill in the variables
    prompt = load_prompt()
    prompt = prompt.replace("{persona}", persona)
    prompt = prompt.replace("{product}", product)

    # Call Groq
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant. You always respond with valid JSON only. No markdown. No explanation. No code blocks. Just raw JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7,
    )

    # Extract the text response
    raw = response.choices[0].message.content.strip()

    # Clean up in case model wraps in markdown
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()

    # Parse JSON
    result = json.loads(raw)
    return result