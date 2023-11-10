FROM node:20.9.0-alpine3.18 as build-stage_prod
RUN addgroup user && adduser -S -G user user
USER user
WORKDIR /frontend
USER root
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN chown -R user:user /frontend
USER user  
COPY --from=build-stage_prod /frontend/dist /frontend/dist
