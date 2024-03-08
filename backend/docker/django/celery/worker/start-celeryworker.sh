#!/usr/bin/env bash

set -o errexit

set -o nounset

watchmedo auto-restart -d student_accommodation/ -p '*.py' -- celery -A student_accommodation worker --loglevel=INFO