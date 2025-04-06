# Use the official Node.js image from the Docker Hub
FROM node:18 AS build

# Set the working directory
WORKDIR /frontend

# Copy the package.json and package-lock.json to install dependencies first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

RUN npm i -g serve

# Copy the entire project directory to the container
COPY . .
RUN npm run build

EXPOSE 5173

CMD serve -s dist -l 5173
