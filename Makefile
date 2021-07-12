build:
	JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 mvn package

dev:
	nodemon -e java -w src -x 'JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 mvn package && java -jar ./target/recobook-0.0.1-SNAPSHOT.jar'

start:
	java -jar ./target/recobook-0.0.1-SNAPSHOT.jar

docker-build:
	docker build -t core:latest .
	docker tag core:latest recobook/core:latest
docker-publish:
	docker image push recobook/core:latest
