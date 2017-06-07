# Use Node v6 as the base image.
FROM node:6
MAINTAINER Louis Debraine <louisdebraine@gmail.com>

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /api

RUN npm install -g nodemon

WORKDIR /api

ADD package.json package.json
RUN npm install

# Expose our server port.
EXPOSE 3000

# Run our app.
CMD ["npm", "start"]
