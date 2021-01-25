#!/usr/bin/env sh
set -eu

envsubst '${BACKEND_CLUSTER_IP_SERVICE} ${BACKEND_CLUSTER_IP_SERVICE_PORT} ${FOLDER_SERVICE_BACKEND_CLUSTER_IP_SERVICE} ${FOLDER_SERVICE_BACKEND_CLUSTER_IP_SERVICE_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
