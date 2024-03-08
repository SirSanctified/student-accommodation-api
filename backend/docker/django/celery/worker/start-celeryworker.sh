#!/usr/bin/env bash

set -o errexit

set -o nounset

watchmedo auto-restart -d student_accommodation/ -p '*.py' -- celery worker -A roomio --loglevel=info