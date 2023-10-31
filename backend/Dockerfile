FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./

COPY pnpm*.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3333

CMD ["pnpm", "start"]
