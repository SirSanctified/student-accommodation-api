FROM node

RUN useradd -ms /bin/sh -u 1001 app

USER app

WORKDIR /app

COPY --chown=app:app package.*json .

RUN npm install

COPY --chown=app:app . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]