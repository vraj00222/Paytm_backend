# Paytm Wallet Clone

## Stack
- Node.js 18+, Express
- MongoDB + Mongoose
- JWT auth + custom middleware
- Zod validation
- React 18 + Vite
- CSS (custom, glassmorphism style)

## Backend
```
cd backend
npm install
npm run start         # or: node index.js
```

Environment:
```
PORT=3000
JWT_SECRET=your-secret
MONGO_URL=mongodb://localhost:27017/paytm
```

API base: `http://localhost:3000/api/v1`

## Frontend
```
cd frontend
npm install
npm run dev
```

Set API base (frontend/.env):
```
VITE_API_URL=http://localhost:3000/api/v1
```

## Features
- Signup/signin with JWT
- Account balance retrieval
- Secure money transfer endpoint
- Frontend auth flow, dashboard & transfer UI
- Responsive, glassmorphism-styled UI