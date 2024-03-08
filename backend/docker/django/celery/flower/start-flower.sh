#!/usr/bin/env bash

set -o errexit

set -o nounset

worker_ready() {
    celery -A student_accommodation inspect ping
}

until worker_ready; do
  >&2 echo 'Celery workers not available'
  sleep 1
done
>&2 echo 'Celery workers are available'

python -m flower \
    --app=student_accommodation \
    --broker="${CELERY_BROKER_URL}"\
    flower