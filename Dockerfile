# Base image
FROM node:lts

# Author
LABEL MAINTEINER="Roberto Umbelino"

RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Defining main directory
WORKDIR /app

# Instaling dependencies
ENV NODE_ENV production

# Copy application
COPY node_modules/ node_modules
COPY dist/ dist

# Defining environment variables
ENV PORT 80

# Exposing service running port
EXPOSE 80

# Starting app
CMD ["node", "dist/index.js"]
