# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app/frontend-web

# Copy package.json and yarn.lock (if you use yarn) to the working directory
COPY frontend-web/package.json ./

# Clear yarn cache and install dependencies
RUN yarn cache clean && yarn install

# Copy the rest of the application code
COPY frontend-web/ ./

# Build the React app for production
RUN yarn build

# Serve the static files using a lightweight web server like Nginx or serve
# For simplicity, we'll use 'serve' here. Install it globally.
RUN yarn global add serve

# Expose the port the app runs on
EXPOSE 3001

# Command to run the production build
CMD ["serve", "-s", "build", "-l", "3001"]
