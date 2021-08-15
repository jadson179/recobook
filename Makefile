dev:
	SERVICE_AUTH_KEY=teste SENDGRID_TOKEN="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" SENDGRID_EMAIL="jadson44.santos@gmail.com" deno run --allow-all --watch src/main.ts
teste:
	SERVICE_AUTH_KEY=teste SENDGRID_TOKEN="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" SENDGRID_EMAIL="jadson44.santos@gmail.com" deno test --allow-all --quiet test/users.test.ts test/elos.test.ts test/image.test.ts test/video.test.ts test/likes.test.ts test/comments.test.ts
	
build:
	docker build -t core:latest .
	docker tag core:latest recobook/core:latest
publish:
	docker image push recobook/core:latest
