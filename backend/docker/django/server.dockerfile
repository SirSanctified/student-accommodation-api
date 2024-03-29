FROM python:3.11.0-bullseye

ENV PYTHONUNBUFFERED 1

ENV PYTHONDONTWRITEBYTECODE 1

USER root

RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

RUN useradd -ms /bin/sh -u 1001 app

WORKDIR /app

COPY ./backend/requirements.txt requirements.txt

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN chown -R app:app /app

USER app

COPY --chown=app:app ./backend/docker/django/entrypoint.sh ./entrypoint.sh

RUN sed -i 's/\r$//g' ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

COPY --chown=app:app ./backend/docker/django/start.sh ./start.sh

RUN sed -i 's/\r$//g' ./start.sh

RUN chmod +x ./start.sh

COPY --chown=app:app ./backend .

RUN mkdir -p /app/staticfiles && chown -R app:app /app/staticfiles && chmod -R 755 /app/staticfiles

RUN mkdir -p /app/mediafiles && chown -R app:app /app/mediafiles && chmod -R 755 /app/mediafiles

EXPOSE 8000

COPY ./backend/docker/django/celery/worker/start-celeryworker.sh ./start-celeryworker.sh

RUN sed -i 's/\r$//g' ./start-celeryworker.sh

RUN chmod +x ./start-celeryworker.sh

COPY ./backend/docker/django/celery/flower/start-flower.sh ./start-flower.sh

RUN sed -i 's/\r$//g' ./start-flower.sh

RUN chmod +x ./start-flower.sh

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]