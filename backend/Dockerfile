FROM maven:3-eclipse-temurin-25 AS build
WORKDIR /build

COPY pom.xml .
RUN mvn --batch-mode --quiet dependency:go-offline

COPY src ./src
RUN mvn --batch-mode -DskipTests package


FROM eclipse-temurin:25 AS runtime
WORKDIR /backend
COPY --from=build /build/target/*.jar application.jar

# Install curl for health checks
RUN apt-get update && apt-get install -y --no-install-recommends curl

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "application.jar"]