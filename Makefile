build:
	JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 mvn package
	docker build -t core:latest .
	docker tag core:latest recobook/core:latest

publish:
	docker image push recobook/core:latest
