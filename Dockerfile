FROM node:gallium-alpine3.16
WORKDIR /microservice
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT=8080
EXPOSE 8080
CMD ["node", "dist/main.js"]