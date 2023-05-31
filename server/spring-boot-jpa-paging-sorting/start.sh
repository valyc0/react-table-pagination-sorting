docker run -d --net host --name my-maven-project -v "$(pwd)":/usr/src/mymaven -v "$(pwd)"/.m2:/root/.m2 -w /usr/src/mymaven  maven:3.8.7-amazoncorretto-17 mvn spring-boot:run
