#!/bin/bash

# Check if container names are provided as arguments
if [ "$#" -eq 0 ]; then
  echo "Usage: $0 container_name1 container_name2 ..."
  exit 1
fi

# Iterate through the provided container names
for container_name in "$@"; do
  # Get the container ID for each name
  container_id=$(docker ps -q -f "name=$container_name")

  # Check if the container exists
  if [ -z "$container_id" ]; then
    echo "Container '$container_name' not found."
  else
    echo "Container ID for '$container_name': $container_id"
  fi
done
