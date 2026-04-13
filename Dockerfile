FROM node:20-slim

# Install OpenSSL (Debian name)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]