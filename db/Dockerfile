FROM postgres:alpine
COPY ./01_setup.sql /docker-entrypoint-initdb.d/01_setup.sql
COPY ./02_schema.sql /docker-entrypoint-initdb.d/02_schema.sql
COPY ./03_data.sql /docker-entrypoint-initdb.d/03_data.sql
