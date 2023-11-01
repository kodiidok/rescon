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
EXPOSE 3333

# Define environment variable
# ARG UI_URL
# ENV UI=$UI_URL

ENV PORT=3333
ENV UI=http://139.59.24.47:3000
ENV DB_HOST=rescon-postgres
ENV DB_PORT=5432
ENV DB_NAME=rescon
ENV DB_USER=rescon
ENV DB_PASSWORD=rescon

# Command to run the application
CMD ["npm", "run", "start"]