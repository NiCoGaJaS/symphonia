# Projekt: App-Entwicklung

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
1. Install [Docker](https://www.docker.com/) and start the Docker Engine
2. Create a `.env` file in the root directory and add configuration settings:
   ```dotenv
   POSTGRES_DB=...
   POSTGRES_USER=...
   POSTGRES_PASSWORD=...
   ```
3. Start the application:
   ```shell
   docker compose up --build
   ```