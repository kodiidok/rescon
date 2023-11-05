#!/bin/bash

# Get the IP address of the rescon-server container
RESCON_SERVER_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rescon-server)

# Get the IP address of the rescon-ui container
RESCON_UI_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rescon-ui)

# Get the IP address of the rescon-ui container
RESCON_DB_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rescon-postgres)

# Print the IP address
echo "IP address of rescon-server: ${RESCON_SERVER_IP}"
echo "IP address of rescon-ui: ${RESCON_UI_IP}"
echo "IP address of rescon-postgres: ${RESCON_DB_IP}"

