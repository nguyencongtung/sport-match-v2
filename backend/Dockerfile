# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and yarn.lock (if you use yarn) to the working directory
COPY backend/package.json ../yarn.lock ./

# Install any dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY backend/ ./

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "server.js"]
