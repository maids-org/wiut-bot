FROM node:20-slim AS base

# Create app directory
WORKDIR /usr/src/app

# Files required by npm install
COPY package*.json .

# Install dependencies
RUN apt-get update
RUN apt-get install -y python3 build-essential

# Install pnpm
RUN npm install -g pnpm

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Type check app
RUN pnpm build

FROM base AS runner

WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install dependencies
RUN apt-get update
RUN apt-get install -y python3 build-essential cron unzip wget

# Install pnpm
RUN npm install -g pnpm

# Install only production app dependencies
RUN pnpm install --only=production

# Add executable permissions
RUN chmod 0644 /usr/src/app/update-data.sh

# Run data checker
RUN bash /usr/src/app/update-data.sh

# Run data checker every hour
RUN crontab -l | { cat; echo "0 0 * * * bash /usr/src/app/update-data.sh"; } | crontab -

# Non-root user
USER node

# Expose port 9000
EXPOSE 9000
ENV PORT 9000

# Start the app
CMD ["pnpm", "start"]