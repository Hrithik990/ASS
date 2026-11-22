# Recipe Sharing Platform

A beginner-friendly full-stack app: React + Vite (frontend), Express + Mongoose (backend), MongoDB (database). Users can create, view, edit and delete recipes.

See `study-notes.txt` for a full explanation of the code.

## Requirements
- Node.js 18 or newer
- MongoDB (local install or a free MongoDB Atlas cluster)

## 1. Set up MongoDB
- Local: make sure MongoDB is running. The default string is `mongodb://127.0.0.1:27017/recipe-sharing`.
- Atlas: create a cluster, a database user, allow your IP, and copy the connection string.

## 2. Configure the backend
```
cd backend
copy .env.example .env
```
(On Mac/Linux use `cp .env.example .env`.) Open `.env` and set `MONGO_URI` to your local or Atlas connection string. Keep credentials in `.env`; never commit or share the file.

## 3. Start the backend
```
cd backend
npm install
npm start
```
Expected output: `Server is running on port 5000` and `MongoDB connected`.

## 4. Start the frontend (second terminal)
```
cd frontend
npm install
npm run dev
```
Open the link Vite prints (usually http://localhost:5173).

## API endpoints
| Method | URL | Purpose |
| --- | --- | --- |
| GET | /api/recipes | Get all recipes |
| GET | /api/recipes/:id | Get one recipe |
| POST | /api/recipes | Create a recipe |
| PUT | /api/recipes/:id | Update a recipe |
| DELETE | /api/recipes/:id | Delete a recipe |

## Security note
Never upload your real `.env` file. It is listed in `.gitignore`.
