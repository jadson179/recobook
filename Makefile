dev:
	SERVICE_AUTH_KEY=teste deno run --allow-all --watch src/main.ts
teste:
	SERVICE_AUTH_KEY=teste deno test --allow-all --quiet ./test