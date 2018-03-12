# README

API doc can be generated from project root folder:
node_modules/apidoc/bin/apidoc -i ./app/ -o apidoc/

Database migration can be executed from project root folder:
node_modules/db-migrate/bin/db-migrate up --config app/conf/database.json

Application assumes that the database already exists:
PGUSER=postgres
PGPASSWORD=admin
PGHOST=localhost
PGDATABASE=api
PGPORT=5432