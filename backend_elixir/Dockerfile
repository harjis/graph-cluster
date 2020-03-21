FROM elixir:latest

ARG project_id=graph-elixir

RUN apt-get update && \
  apt-get install -y postgresql-client

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN mix local.rebar --force
RUN mix local.hex --force

RUN mix deps.get

RUN mix do compile

RUN apk update \
    && apk --no-cache --update add bash ca-certificates openssl-dev \
    && mkdir -p /usr/local/bin \
    && wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 \
        -O /usr/local/bin/cloud_sql_proxy \
    && chmod +x /usr/local/bin/cloud_sql_proxy \
    && mkdir -p /tmp/cloudsql

CMD (/usr/local/bin/cloud_sql_proxy \
      -projects=${project_id} -dir=/tmp/cloudsql &); \
    exec mix phx.server
