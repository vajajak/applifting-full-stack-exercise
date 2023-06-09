###################
# BUILD FOR LOCAL DEVELOPMENT
###################

# Base image
FROM node:18-alpine As development

RUN apk update && apk add curl rm -rf /var/cache/apk/*

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY --chown=node:node . .

USER node

CMD ["npm", "run", "start:dev"]

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

RUN apk update && apk add curl rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Run the build command which creates the production bundle
RUN npm run build

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node . .

USER node

# Start the server using the production build
CMD ["npm", "run", "start:prod"]
