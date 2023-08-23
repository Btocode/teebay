# Use the official Node.js image as the base image
FROM node:16.13

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the port your Express app is listening on
EXPOSE 4000

# Set environment variables
ENV DATABASE_URL postgres://postgres:mysecretpassword@postgres:5432/mydb
ENV PORT 4000
ENV JWT_SECRET mysecret123

# Command to start the Express app
CMD npx prisma generate && npx prisma migrate dev --name "database migration" && node server.js