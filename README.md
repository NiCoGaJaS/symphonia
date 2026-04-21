# Symphonia

## Backend
- Java 25
- Maven
- Spring Boot 4
- Spring Web MVC
- Spring Security
- Spring Data JDBC
- PostgreSQL
- Flyway
- Spring Boot Actuator

## Frontend
- Angular
- TypeScript

## Running the Application with Docker

This project provides two main Docker setups:
- **Production:** full build of backend and frontend, served as in real deployment
- **Development:** optimized for local development, hot reloading for frontend and remote debugging on port 7070 for the backend

1. Install [Docker](https://www.docker.com/) and start the Docker Engine
2. Create a `.env` file in the project's root directory and define the required settings for the PostgreSQL database
   and optional Spring configuration:
   ```dotenv
   POSTGRES_DB=...
   POSTGRES_USER=...
   POSTGRES_PASSWORD=...
   
   # Optionally:
   LOGGING_LEVEL_ROOT=...
   SPRING_PROFILES_ACTIVE=...
   ```
3. Start the application
   1. Production Environment
      ```shell
      docker compose up --build
      ```
   2. Development Environment
      ```shell
      docker compose -f docker-compose.develop.yaml up --build
      ```

## Code Formatter/Linting

### Backend
The backend uses Maven with the [diffplug/spotless](https://github.com/diffplug/spotless/tree/main/plugin-maven)
plugin to ensure consistent code formatting. All commands must be executed within the `backend` subfolder.

Run this to verify that the backend source code follows the defined formatting rules:
```shell
./mvnw spotless:check
```
If any files are not properly formatted, the command will fail and list the issues.


Run this command to automatically apply the required formatting to the backend source code:
```shell
./mvnw spotless:apply
```

### Frontend 

The frontend uses Prettier to ensure consistent code formatting.
To format the codebase, run `npm run format` inside the `frontend` subfolder.

The frontend uses ESLint to enforce coding standards and best practices.
Inside the `frontend` subfolder, run `npm run lint` to fix issues.

To format the codebase and run the linter in one step, use the following command:
```bash
  npm run fix
```
