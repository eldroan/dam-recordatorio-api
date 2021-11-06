#!/bin/bash

# Assign the filename
compose="docker-compose.yml"
config="config/config.json"

read -p "Enter the DB_NAME: " db_name
read -p "Enter the DB_USER: " db_user
read -p "Enter the DB_PASS: " db_pass

if [[ $db_name != "" && $db_user != "" && $db_pass != "" ]]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/DEFAULT_DB_NAME/$db_name/" $compose
        sed -i '' "s/DEFAULT_DB_USER/$db_user/" $compose
        sed -i '' "s/DEFAULT_DB_PASS/$db_pass/" $compose
        sed -i '' "s/DEFAULT_DB_NAME/$db_name/" $config
        sed -i '' "s/DEFAULT_DB_USER/$db_user/" $config
        sed -i '' "s/DEFAULT_DB_PASS/$db_pass/" $config
    else
        sed -i "s/DEFAULT_DB_NAME/$db_name/" $compose
        sed -i "s/DEFAULT_DB_USER/$db_user/" $compose
        sed -i "s/DEFAULT_DB_PASS/$db_pass/" $compose
        sed -i "s/DEFAULT_DB_NAME/$db_name/" $config
        sed -i "s/DEFAULT_DB_USER/$db_user/" $config
        sed -i "s/DEFAULT_DB_PASS/$db_pass/" $config
    fi
fi