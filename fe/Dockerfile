###################
# BUILD FOR LOCAL DEVELOPMENT
###################

# Base image
FROM node:18-alpine As development

RUN apk add g++ make py3-pip

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY --chown=node:node . .

USER node

CMD ["npm", "run", "docker-dev"]

# ###################
# # BUILD FOR PRODUCTION
# ###################

# FROM node:18-alpine As build

# RUN apk add g++ make py3-pip

# WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./

# RUN npm install

# COPY --chown=node:node . .

# # Set NODE_ENV environment variable
# ENV NODE_ENV production

# ARG API_ENDPOINT_GRAPHQL_CODEGEN

# # Run the build command which creates the production bundle
# RUN npm run build

# USER node

# ###################
# # PRODUCTION
# ###################

# FROM node:18-alpine As production

# # Copy the bundled code from the build stage to the production image
# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/.next ./.next

# # Start the server using the production build
# CMD ["npm", "run", "start"]
