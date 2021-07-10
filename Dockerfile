FROM openjdk:8-jdk-alpine

EXPOSE 8080

WORKDIR /app

COPY target/recobook-0.0.1-SNAPSHOT.jar /app/core.jar

ENTRYPOINT [ "java", "-jar", "core.jar" ]

