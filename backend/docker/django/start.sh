#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset


python manage.py collectstatic --noinput
chown -R app:app /app/staticfiles && chmod -R 755 /app/staticfiles
chown -R app:app /app/mediafiles && chmod -R 755 /app/mediafiles


python manage.py makemigrations accounts core --noinput
python manage.py migrate  --noinput
python manage.py runserver 0.0.0.0:8000
