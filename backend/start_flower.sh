#!/bin/bash

set -o errexit
set -o nounset


celery \
    -A backend.celery \
    -b "${CELERY_BROKER_URL}" \
    flower
