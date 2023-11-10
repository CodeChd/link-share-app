FROM node:20.9.0-alpine3.18
RUN addgroup user && adduser -S -G user user
USER user
WORKDIR /backend
USER root
COPY package*.json ./
RUN npm install
COPY . ./
RUN chown -R user:user /backend
USER user
EXPOSE 5000
CMD ["npm", "start"]
