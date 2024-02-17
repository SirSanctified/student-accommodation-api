FROM python:3.11.0-bullseye

ENV PYTHONUNBUFFERED 1

ENV HOME /home/docker

ENV SECRET_KEY=secret

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

RUN chmod +x ./entrypoint.sh

EXPOSE 8000

COPY entrypoint.sh $HOME/entrypoint.sh

ENTRYPOINT ["/bin/bash", "/home/docker/entrypoint.sh"]