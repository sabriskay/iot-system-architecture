#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 -U postgres --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE guide_wheel;
EOSQL