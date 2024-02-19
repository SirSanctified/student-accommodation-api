FROM python:3.11.0-bullseye

ENV PYTHONUNBUFFERED 1

ENV HOME /home/docker

RUN useradd -ms /bin/sh -u 1001 app

USER app

WORKDIR /app

COPY --chown=app:app requirements.txt requirements.txt

COPY --chown=app:app entrypoint.sh $HOME/entrypoint.sh

RUN pip install -r requirements.txt

COPY --chown=app:app . .

RUN chmod +x ./entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/bin/bash", "/home/docker/entrypoint.sh"]