# Use Node v6 as the base image.
FROM node:6
MAINTAINER Louis Debraine <louisdebraine@gmail.com>
RUN ls -la
# Add everything in the current directory to our image, in the 'app' folder.
ADD . /api
RUN ls -la
RUN npm install -g nodemon
RUN ls -la
WORKDIR /api
RUN ls -la
ADD package.json package.json
RUN npm install
RUN ls -la
# Expose our server port.
EXPOSE 3000
RUN ls -la
# Run our app.
CMD ["npm", "start"]
