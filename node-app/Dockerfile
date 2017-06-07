# Use Node v6 as the base image.
FROM node:6
MAINTAINER Louis Debraine <louisdebraine@gmail.com>

RUN npm install -g nodemon

# Install dependencies
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /api && cp -a /tmp/node_modules /api/

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /api

WORKDIR /api

# Expose our server port.
EXPOSE 3000

# Run our app.
CMD ["npm", "start"]
