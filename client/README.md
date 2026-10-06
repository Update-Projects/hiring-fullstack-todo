# Todo Client

React and Vite frontend for the Todo application.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- The Todo API server running locally, with MongoDB configured

## Environment

Rename `.env.example` to `.env` file in the `client` directory

```dotenv
VITE_API_URL=http://localhost:5000
```

`VITE_API_URL` is the base URL of the backend server. The frontend adds `/api/todos` to this value. Do not add a trailing slash. Restart the Vite development server after changing the `.env` file.

## Install

Go inside to `client`
directory, install the frontend dependencies:

```sh
npm install
```

## Run

Start the frontend from the `client` directory:

```sh
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. The backend must be running and connected to MongoDB for Todo requests to work.
