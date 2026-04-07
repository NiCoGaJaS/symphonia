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
