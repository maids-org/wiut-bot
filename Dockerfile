FROM node:lts-slim AS base

# Create app directory
WORKDIR /app

# Files required by npm install
COPY package*.json .

# Install pnpm
RUN npm install -g pnpm

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Type check app
RUN pnpm build

FROM base AS runner

# Bundle app source
COPY . .

# Install only production app dependencies
RUN pnpm ci --only=production

USER node

# Start the app
EXPOSE 80
CMD ["npm", "run", "start"]