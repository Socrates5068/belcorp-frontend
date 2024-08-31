# Stage-1 & specify a name 'builder'
#FROM node:22-alpine3.19 AS build-stage
FROM node:22-alpine3.19

# Create a directory  and go to the directory 
WORKDIR /usr/src/belcorp-frontend

# Copy the package.json file to my current directory to install the necessary dependence  
COPY package.json .

# Install the dependence
RUN npm install

# Copy other files to my current directory
COPY . .

# Open the port for the express server
EXPOSE $REACT_LOCAL_PORT

# Build and optimize static file
CMD ["npm", "run", "dev"]

# Stage-2 - step for release to PROD
#FROM nginx:1.26.1-alpine

# Copy the static file to my Nginx folder to serve static contain
#COPY --from=build-stage /belcorp-frontend/dist /usr/share/nginx/html
#EXPOSE $REACT_DOCKER_PORT

# Run nginx in the foreground
#CMD sh -c "nginx -g 'daemon off;' && npm run dev"
#CMD nginx -g 'daemon off;'

