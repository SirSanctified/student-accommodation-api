#!/usr/bin/env bash

set -o errexit

set -o nounset

worker_ready() {
    python -m celery -A roomio inspect ping
}

until worker_ready; do
  >&2 echo 'Celery workers not available'
  sleep 1
done
>&2 echo 'Celery workers are available'

python -m flower \
    --app=roomio \
    --broker="${CELERY_BROKER_URL}"