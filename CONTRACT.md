# ProjectResonance — API Contract

This document defines exactly what goes in and what comes 
out of each endpoint. Emmanuel deploys. David builds the UI.
Nobody deviates without telling Goodness first.

---

## WHAT WAS ALREADY BUILT (Goodness)
- FastAPI backend with two working endpoints
- Task A agent (user modeling)
- Task B agent (recommendation)
- Groq API integration (llama-3.3-70b-versatile)
- Both prompts written and tested locally

---

## TASK A — User Modeling Agent

Endpoint: POST /task-a

What it does:
Takes a user persona and a product description.
Simulates exactly how that specific user would rate 
and review that product.

INPUT:
- persona: string (who the user is, their taste, rating style)
- product: string (what they are reviewing)

EXAMPLE INPUT:
  persona = "Nigerian backend developer, 25 years old, based 
  in Lagos. Works with fintech startups. Cares deeply about 
  clean documentation and reliable code. Rates harshly. 
  Writes short technical reviews. Hates vague error messages."
  
  product = "PayStack-Easy — a Python library that simplifies 
  Paystack payment integration. Handles webhooks, retries, 
  and error logging. README is detailed but examples are 
  only in Python 3.10+"

EXAMPLE OUTPUT:
  predicted_rating: 4
  simulated_review: "PayStack-Easy saves time, but docs no 
  follow Python version I use. Still, e dey work well"
  confidence: 0.92
  reasoning: "Library solves a real pain but version 
  limitation would frustrate this user"

---

## TASK B — Recommendation Agent

Endpoint: POST /task-b

What it does:
Takes a user persona.
Returns 5 ranked recommendations across different domains
that this specific user would genuinely love.
Handles cold start if persona is empty.

INPUT:
- persona: string (who the user is)

EXAMPLE INPUT:
  persona = "Nigerian backend developer, 25 years old, 
  based in Lagos. Works with fintech startups. Rates 
  harshly. Hates wasted time and poor documentation."

NORMAL OUTPUT (when persona is provided):
  Returns a list of 5 items, each with:
  - rank: number (1 to 5)
  - domain: movie / book / restaurant / tool / wildcard
  - item: name of the recommended thing
  - score: 0.0 to 1.0
  - reason: why this specific persona would love it

EXAMPLE OUTPUT:
  rank 1 | domain: movie | item: King of Boys | 
  score: 0.95 | reason: Sharp Nollywood thriller, 
  matches your no-nonsense taste

  rank 2 | domain: book | item: The Lean Startup | 
  score: 0.88 | reason: Practical and direct, 
  perfect for a fintech dev who hates fluff

  rank 3 | domain: restaurant | item: Yellow Chilli Lagos | 
  score: 0.82 | reason: Fast service, quality food, 
  matches your no-nonsense personality

  rank 4 | domain: tool | item: Postman | 
  score: 0.76 | reason: Every backend dev needs it, 
  saves hours debugging API calls

  rank 5 | domain: wildcard | item: Lagos Tech Meetup | 
  score: 0.71 | reason: Network with Nigerian fintech 
  devs who share your exact problems

COLD START OUTPUT (when persona is empty or vague):
  cold_start: true
  questions:
  - "What is the last thing you genuinely enjoyed?"
  - "What is your biggest frustration with most products?"
  - "Where in Nigeria are you based and what is your budget?"

---

## ERROR RESPONSE (both endpoints)

  error: true
  message: "Something went wrong. Please try again."

---

## EMMANUEL — YOUR JOB

Backend code is already written and tested.
Your only jobs are deployment and README.

STEP 1: Clone the repo
  git clone https://github.com/YOUR_USERNAME/ProjectResonance
  cd ProjectResonance/backend
  python -m venv venv
  venv\Scripts\activate
  pip install -r requirements.txt
  uvicorn main:app --reload

STEP 2: Deploy to Render
  - Go to render.com, create free account
  - New Web Service, connect GitHub repo
  - Root directory: backend
  - Build command: pip install -r requirements.txt
  - Start command: uvicorn main:app --host 0.0.0.0 --port 8000
  - Add environment variables on Render:
      GROQ_API_KEY = your actual key
      GROQ_MODEL = llama-3.3-70b-versatile
  - Deploy and share live URL with David and Oki

STEP 3: Test live endpoints
  - Test /task-a and /task-b on live Render URL
  - Confirm both return correct JSON
  - Share confirmed working URL with David

STEP 4: Write README.md
  - How to clone and run locally
  - How to get Groq API key
  - Folder structure explanation
  - How to run with uvicorn

---

## DAVID — YOUR JOB

Build React frontend on Vercel. Two pages.

PAGE 1 — Task A:
  - Persona text area input
  - Product text area input
  - Submit button
  - Display results:
      predicted_rating
      simulated_review
      confidence
      reasoning

PAGE 2 — Task B:
  - Persona text area input
  - Submit button
  - If cold_start is true: show the 3 questions to user
  - If normal: show ranked list of 5 recommendations
    each card shows: rank, domain, item, score, reason

API BASE URL:
  Local testing: http://127.0.0.1:8000
  Live: wait for Emmanuel's Render URL

---

## OKI — YOUR JOB

  - Design system (colors, typography, spacing)
  - Make both pages look professional and clean
  - Mobile responsive design
  - Output cards for recommendations
  - Star rating display for Task A
  - Loading states (while API is thinking)
  - Error states (when something goes wrong)

---

## GOODNESS — REMAINING JOBS

  - Refine prompts based on team testing feedback
  - Write the solution paper (4-8 pages)
  - Final end to end testing before submission
  - Make sure repo is clean before May 24