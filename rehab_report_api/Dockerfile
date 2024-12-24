FROM eclipse-temurin:8-jdk
ENV npm_config_cache=/usr/src/app/.npm
#SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
#RUN apt-get install -qq --no-install-recommends python2.7
RUN apt-get update -qq && apt-get install -qq --no-install-recommends \
  nodejs \
  && rm -rf /var/lib/apt/lists/*
RUN npm install -g npm
WORKDIR /usr/src/app
COPY . .
RUN npm install
#RUN npm install pm2
RUN chgrp -R 0 /usr/src/app && \
    chmod -R g=u /usr/src/app
USER 1001
CMD ["npm", "start"]