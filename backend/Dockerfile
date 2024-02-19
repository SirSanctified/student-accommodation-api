FROM python:3.11.0-bullseye

ENV PYTHONUNBUFFERED 1

ENV HOME /home/docker

USER root

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

RUN chmod +x ./entrypoint.sh

EXPOSE 8000

COPY entrypoint.sh $HOME/entrypoint.sh

ENTRYPOINT ["/bin/bash", "/home/docker/entrypoint.sh"]