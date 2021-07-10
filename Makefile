build:
	JAVA_HOME=/home/jadson/Downloads/jdk-11.0.8+10 mvn package
	docker build -t core:latest .
	docker tag core:latest recobook/core:latest

publish:
	docker image push recobook/core:latest
