# Hiring Fullstack Todo

A Todo application with a React/Vite frontend, Express API, and MongoDB database.

## Run with Docker Compose

### Requirements

- Docker Desktop with Docker Compose, or Docker Engine with the Compose plugin

### Configure environment

Rename `.env.example` to `.env` in directory `server` with the following values:

```dotenv
PORT=5000
MONGO_URI=mongodb://mongo:27017/my-todo-app
CLIENT_ORIGIN=http://localhost
```

The `mongo` hostname is the MongoDB service name inside the Compose network. The client is published on port `80`, so its browser origin is `http://localhost`.

The frontend API URL is set at image build time.
Rename `.env.example` to `.env` in directory `client` with the following values:

```dotenv
VITE_API_URL=http://localhost:5000
```

This URL is used by the browser and must point to the host-published API port, not the internal Compose service hostname.

### Start the application

Run these commands from the repository root:

```sh
docker compose up --build
```

Open the frontend at [http://localhost](http://localhost). The API health endpoint is [http://localhost:5000/api/health](http://localhost:5000/api/health). Compose starts MongoDB and the API alongside the frontend. MongoDB data persists in the `mongo-data` named volume when containers are stopped or recreated.

To run the containers in the background:

```sh
docker compose up --build -d
```

View service logs with:

```sh
docker compose logs -f
```

Stop the services while preserving database data:

```sh
docker compose down
```

To also delete the persisted MongoDB data, run `docker compose down --volumes`. This permanently removes the database volume.

## Assumptions and limitations

- Ports `80` and `5000` must be available on the host. If either is occupied, change the host-side port in `compose.yaml` and update the corresponding frontend URL or browser address.
- `depends_on` starts MongoDB before the API container, but does not wait for MongoDB to become ready. The API currently has no health check or database retry policy, so it may need to be restarted if MongoDB takes longer to initialize.
- `VITE_API_URL` is included in the static frontend bundle at image build time. After changing it, rebuild the client image with `docker compose up --build`.
- This Compose setup is intended for local development and evaluation. It does not configure HTTPS, application authentication, or production secret management. Do not expose it publicly without adding those protections.
- MongoDB uses a persistent local Docker volume and has no authentication configured by this Compose file. Use a secured database configuration for shared or production environments.

## Run without Docker

See [client/README.md](client/README.md) for frontend setup and [server/README.md](server/README.md) for API and MongoDB setup.
