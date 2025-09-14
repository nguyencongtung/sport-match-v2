# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and yarn.lock (if you use yarn) to the working directory
COPY frontend/package.json ../yarn.lock ./

# Install any dependencies
RUN yarn install --frozen-lockfile
RUN yarn global add react-native-cli

# Copy the rest of the application code
COPY frontend/ ./

# Expose the default React Native packager port
EXPOSE 8081

# The command to start the React Native packager (for development)
# This might need to be run on the host machine for actual development with emulators/simulators
CMD ["yarn", "start"]
