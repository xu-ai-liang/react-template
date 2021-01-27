FROM node:12-alpine as builder
WORKDIR /usr/builder
COPY . ./
RUN npm config set registry https://registry.npm.taobao.org && npm install && npm run build

FROM node:12-alpine
WORKDIR /usr/app
COPY --from=builder /usr/builder/dist /usr/app/dist
COPY . ./
RUN npm install --production

ENV NODE_ENV=production
ENV BACKEND=""

EXPOSE 3010
CMD [ "sh", "-c", "backend=${BACKEND} npm start"]