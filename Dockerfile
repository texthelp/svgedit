FROM ubuntu:bionic

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:openjdk-r/ppa
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y build-essential libssl-dev
run apt-get install -y openjdk-8-jdk

run mkdir -p /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 10.16.3

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH