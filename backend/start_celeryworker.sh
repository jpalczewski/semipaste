#!/bin/bash

set -o errexit
set -o nounset


watchfiles celery.__main__.main --args "-A backend.celery worker -l INFO"
