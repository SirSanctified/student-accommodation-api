
# Student Accommadation System

[![Code Style Check](https://github.com/SirSanctified/student-accommodation-api/actions/workflows/check-formating.yaml/badge.svg)](https://github.com/SirSanctified/student-accommodation-api/actions/workflows/check-formating.yaml)
[![CodeQL](https://github.com/SirSanctified/student-accommodation-api/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/SirSanctified/student-accommodation-api/actions/workflows/github-code-scanning/codeql)

A simple student accommadation system that allows students to book rooms and pay for them. The system also allows landlords to add rooms and view the rooms that have been booked. The system is built using the Django framework for the backend and the frontend is built using Next.js, Typescript and TailwindCSS.

## Getting Started

To get started with the project, you will need to have the following installed on your machine:

- Docker 25.0+
- Docker Desktop (Optional)
- Makefile VSCode extension (Optional, enhances Makefile command integration in VSCode)
- Make

**Note**: *Make must be installed on your system to use these commands. Linux and macOS users typically have Make pre-installed. Windows users may need to install it separately*.  

### Backend

Make sure you have the environment variables set in a `.env` file in the `backend` directory. You can use the `.env.example` file as a template.

### Frontend

Make sure you have the environment variables set in a `.env.local` file in the `frontend` directory. You can use the `.env.local.example` file as a template.

### Running the project

To run the project for the first time, you will need to run the following commands:

```bash
make build
```

After running the above command, you can run the following command to set the django superuser:

```bash
make superuser
```

If you want to watch for changes while you make modifications to the code, you can run the following command in a separate terminal window:

```bash
make watch
```

If you want to only run the backend, you can run the following command:

```bash
make build-server
```

To run the containers without rebuilding them, you can run the following command:

```bash
make up
```

To stop the containers, you can run the following command:

```bash
make stop
```

To bring down the containers, you can run the following command:

```bash
make down
```

To bring the containers together with their volumes, you can run the following command:

```bash
make down-v
```

For more information on running the project, you can refer to the [Makefile](https://github.com/SirSanctified/student-accommodation-api/blob/main/Makefile)

### Accessing the project

You can then access the backend at `http://localhost:8000` and the frontend at `http://localhost:3000`.

![Screenshot from 2024-02-27 17-10-22](https://github.com/SirSanctified/student-accommodation-api/assets/63302923/b5700327-e76f-4c67-8b16-c25ae20dfd89)
![Screenshot from 2024-02-27 17-09-42](https://github.com/SirSanctified/student-accommodation-api/assets/63302923/cd33b92f-48f5-4bbf-8da8-704c3408699e)
