# Use Node v6 as the base image.
FROM node:6
MAINTAINER Louis Debraine <louisdebraine@gmail.com>

RUN npm install -g nodemon
RUN ls -la
# Add everything in the current directory to our image, in the 'app' folder.
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /api && cp -a /tmp/node_modules /api/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible

WORKDIR /api
ADD . /api

ADD package.json package.json

# Expose our server port.
EXPOSE 3000

# Run our app.
CMD ["npm", "start"]
