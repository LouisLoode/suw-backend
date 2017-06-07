# Use Node v6 as the base image.
FROM node:6
MAINTAINER Louis Debraine <louisdebraine@gmail.com>

RUN npm install -g nodemon

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /api

WORKDIR /api

# Install dependencies
RUN npm install --production

# Expose our server port.
EXPOSE 3000

# Run our app.
CMD ["npm", "start"]
