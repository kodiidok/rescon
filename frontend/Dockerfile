# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package*.json ./

# Install dependencies using pnpm
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the build command
RUN npm run build

# Expose the port on which the application will run
EXPOSE 3000

# Define environment variable
# ARG API_URL
# ENV API=$API_URL

ENV API=http://139.59.24.47:3333

# Command to run the application
CMD ["npm", "run", "start"]