# Todo API Server

Express and MongoDB backend for the Todo application.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- MongoDB running locally or a MongoDB Atlas connection string

## Environment

Rename `.env.example` to `.env` file in the `server` directory

```dotenv
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todo_app
CLIENT_ORIGIN=http://localhost:5173
```

Set `MONGO_URI` to your MongoDB connection string. For MongoDB Atlas, use the URI provided by Atlas and keep credentials private. `CLIENT_ORIGIN` must exactly match the frontend's origin; update it if the frontend runs on a different host or port.

## Install

Go inside to `server`
From the `server` directory, install dependencies:

```sh
npm install
```

## Run

Make sure MongoDB is running, then start the API from the `server` directory:

```sh
npm run dev
```

For a regular start without automatic restarts, use `npm start`. The API listens on `http://localhost:5000` by default. Confirm it is responding at `http://localhost:5000/api/health`.

Start the frontend separately from the `client` directory. Configure its `VITE_API_URL` as `http://localhost:5000` so it can reach this API.
