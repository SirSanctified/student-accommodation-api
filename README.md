# Student Accommadation System

A simple student accommadation system that allows students to book rooms and pay for them. The system also allows landlords to add rooms and view the rooms that have been booked. The system is built using the Django framework for the backend and the frontend is built using Next.js, Typescript and TailwindCSS.

## Getting Started

To get started with the project, you will need to have the following installed on your machine:

- Python 3.9+
- Node.js 18.0+
- Docker 25.0+
- Docker Desktop (Optional)

### Backend

Make sure you have the environment variables set in a `.env` file in the `backend` directory. You can use the `.env.example` file as a template.

### Frontend

Make sure you have the environment variables set in a `.env.local` file in the `frontend` directory. You can use the `.env.local.example` file as a template.

### Running the project

To run the project, you will need to run the following commands:

```bash
docker-compose up -d
```

If you encounter permission issues with the above command in your `server` container, you can run the following command:

```bash
sudo chmod -R 777  ../backend/db/
```

This will give the `server` container the necessary permissions to access the database.

After running the above command, you can run the following command to set the django superuser:

```bash
docker exec -it server python manage.py createsuperuser
```

You can then access the backend at `http://localhost:8000` and the frontend at `http://localhost:3000`.

To view your database using pgAdmin, you can access it at `http://localhost:5050`. The default email and password are the ones set in your backend `.env` file as `PGADMIN_DEFAULT_EMAIL` and `PGADMIN_DEFAULT_PASSWORD` respectively.
