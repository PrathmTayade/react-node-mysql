Note:
using docker for mysql db
!!! avoided use of envs harcoded values, prefer envs in prod code

for frontend implemeted optimistic updates
not included notification or messages for each action

futher impovents are achievable based on scope and requirement

Steps:

```
Backend:

cd backend

docker compose up -d //for mysql db

pnpm install

pnpm dev

access backend at: http://localhost:3000

Frontend:

cd frontend

pnpm install

pnpm dev

access frontend at: http://localhost:5173/



```
