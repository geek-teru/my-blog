.PHONY: init

init: setup-env install

setup-env:
	@if [ ! -f .env.development ]; then \
		echo "Creating .env.development from .env.development.example"; \
		cp .env.development.example .env.development; \
	else \
		echo ".env.development already exists. Skipping."; \
	fi

install:
	npm install

.PHONY: run

run:
	gatsby develop
