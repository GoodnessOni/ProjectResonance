# Resonance
A rating & review infrastructure for Nigerian developers built in participation for the DSN * BCT LLM Agent Challenge.  
**Live Demo**: https://project-resonance.vercel.app

## The Problem
Every developer builds in isolation. They ship code without knowing if anyone will care. They post projects on GitHub, hoping for stars. They launch SaaS products and wait weeks to learn if the market wants them. For introverts (which  describes most developers) reaching out for feedback feels like asking strangers to validate their work. The result: talented builders abandon ideas not because they're bad, but because they don't know who they're for.

## The Solution
The problem above gave rise to 'Resonance'. Resonance helps answer one major question with other questions tied to it and that is "**Given who you are building for, will they actually care?**"  
Resonance runs two AI agents . One transforms users' descriptions and uses it to predict how they would rate a work (as developers that they are). The agent rates and reviews in the tone of the user. The other analyzes who a developers' target audience (for their products/works/oftware) might be based on patterns it has learnt. A developer does not have to wait the usual long days and months to get assurance of how good/bad their work is or how useful it will be to their target audience (that is even if it gets to them). Resonance is particular to Nigerian developers and so its reponses and results are Nigerian-like.

## How It Works  
Since Resonance runs two AI agents, how it works can be categorized into two.  
1. **The User Modelling Agent**  
*User Description*: A user describes themselves like their background, what they value, how they rate things.  
*Agent's operation*: This Resonance's agent reads the person's description as well as that of the product to be reviewed, then simulates how that specific person would rate and review the product.  
Input: persona + product. Output: predicted rating (1-5), simulated review in their voice, confidence score, and reasoning.

2. **Audience Matching Agent**
*Product Description*: A creator thoroughly describes their project.
*Agent's Operation*: This Resonance's agent goes through the product description and identifies which Nigerian audience segments would genuinely care. Input: project description. Output: ranked list of 5 audience segments with match scores, sizes, and reasons.

## Tech Stack  
### Frontend Stack  
Framework: React 19.2.6  
Build Tool: Vite 8.0.12  
Routing: React Router DOM 7.15.1  
Styling: Tailwind CSS 4.3.0  
UI Icons: Lucide React 1.16.0  
Linting: ESLint 10.3.0

### Backend Stack 
Framework: FastAPI  
Server: Uvicorn  
Validation: Pydantic  
AI Integration: Groq API  
Environment Management: python-dotenv  
Language: Python

## Environmental Variables
#### Frontend  
VITE_API_URL="https://projectresonace.onrender.com"

#### Backend  
GROK_API_KEY
GROK_MODEL

## Demo  
Visit https://project-resonance.vercel.app  
Click 'signup' if new or 'login' if returning  
Choose either of the two operations you want to perform at the moment: 'Predict Rating' or 'Find Audience'  
If 'Predict Rating' is picked, input user persona and product description and click 'Get Prediction'.
