build:
	JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 mvn package

dev:
	nodemon -e java -w src -x 'JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 mvn package && SERVICE_AUTH_KEY=teste java -jar ./target/recobook-0.0.1-SNAPSHOT.jar'

start:
	SERVICE_AUTH_KEY=teste java -jar ./target/recobook-0.0.1-SNAPSHOT.jar

clean:
	rm -rf *.log 
	rm -rf target
docker-build:
	docker build -t core:latest .
	docker tag core:latest recobook/core:latest
docker-publish:
	docker image push recobook/core:latest
