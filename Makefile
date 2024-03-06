ifneq (, $(wildcard .env))
	include .env
	export ENV_FILE_PARAM = --env-file .env
endif

build:
	docker compose up --build -d --remove-orphans

build-server:
	docker compose up --build -d server

down:
	docker compose down

up:
	docker compose up

show-logs:
	docker compose logs

migrate:
	docker compose exec server python3 manage.py migrate

makemigrations:
	docker compose exec server python3 manage.py makemigrations

superuser:
	docker compose exec server python3 manage.py createsuperuser

collectstatic:
	docker compose exec server python3 manage.py collectstatic --no-input --clear

down-v:
	docker compose down -v

roomio-db:
	docker compose exec db psql --username=postgres --dbname=postgres

shell:
	docker compose exec server python3 manage.py shell

test:
	docker compose exec server pytest -p no:warnings --cov=.

test-html:
	docker compose exec server pytest -p no:warnings --cov=. --cov-report=html

stop:
	docker compose stop

watch:
	docker compose watch