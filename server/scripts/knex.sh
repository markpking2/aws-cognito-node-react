#!/bin/bash

export $(grep -v '^#' ../../../../opt/elasticbeanstalk/deployment/env | xargs)
sudo RDS_DB_NAME=${RDS_DB_NAME} \
RDS_HOSTNAME=${RDS_HOSTNAME} \
RDS_USERNAME=${RDS_USERNAME} \
RDS_PASSWORD=${RDS_PASSWORD} \
npx knex $1 --env production