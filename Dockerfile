FROM node:18-alpine as build

ARG NEXT_PUBLIC_API_KEY
ARG NEXT_PUBLIC_AUTH_DOMAIN
ARG NEXT_PUBLIC_PROJECT_ID
ARG NEXT_PUBLIC_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_APP_ID
ARG NEXT_PUBLIC_MEASUREMENT_ID

ENV NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY
ENV NEXT_PUBLIC_AUTH_DOMAIN=$NEXT_PUBLIC_AUTH_DOMAIN
ENV NEXT_PUBLIC_PROJECT_ID=$NEXT_PUBLIC_PROJECT_ID
ENV NEXT_PUBLIC_MESSAGING_SENDER_ID=$NEXT_PUBLIC_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_APP_ID=$NEXT_PUBLIC_APP_ID
ENV NEXT_PUBLIC_MEASUREMENT_ID=$NEXT_PUBLIC_MEASUREMENT_ID

RUN mkdir app
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build:ui
RUN npm run build:server

FROM node:18-alpine as service
RUN mkdir app
WORKDIR /app
COPY --from=build /app/.next ./.next/
COPY --from=build /app/dist ./dist/
COPY --from=build /app/public ./public/
COPY --from=build /app/package*.json ./
RUN npm i --omit=dev
CMD npm run start
