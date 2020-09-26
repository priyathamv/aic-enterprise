FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/aic-enterprise.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Djava.security.edg=file:/dev/./urandom", "-Djasypt.encryptor.password=supersecretkey", "-Dspring.data.mongodb.uri=mongodb+srv://aic_admin:D%40mnpassword1%21@aic-cluster.ihdn0.gcp.mongodb.net/aic-group?retryWrites=true&w=majority", "-jar", "/app.jar"]