FROM node:18

# Install language runtimes
RUN apt-get update && \
    apt-get install -y python3 g++ && \
    npm install -g ts-node typescript

WORKDIR /app
COPY run.js .

CMD ["node", "run.js"]

