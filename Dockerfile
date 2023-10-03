FROM node:20-slim AS base

# Create app directory
WORKDIR /app

# Files required by npm install
COPY package*.json .

# Install dependencies
RUN apt-get update
RUN apt-get install -y python3 build-essential git

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

# Install dependencies
RUN apt-get update
RUN apt-get install -y python3 build-essential git cron

# Install pnpm
RUN npm install -g pnpm

# Install only production app dependencies
RUN pnpm install --only=production

# Add executable permissions
RUN chmod 0644 /app/update-data.sh

# Run data checker
RUN bash /app/update-data.sh

# Run data checker every hour
RUN crontab -l | { cat; echo "0 0 * * * bash /app/update-data.sh"; } | crontab -

# Switch to non-root
USER node

# Expose port 9000
EXPOSE 9000
ENV PORT 9000

# Start the app
CMD ["pnpm", "start"]