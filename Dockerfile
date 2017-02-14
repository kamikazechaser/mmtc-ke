FROM node:alpine

ARG NODE_ENV
WORKDIR /opt/app/
EXPOSE 8080
CMD ["npm", "start"]

ADD package.json /tmp/
RUN cd /tmp/ && npm install
RUN cp -a /tmp/node_modules/ /opt/app/

ADD . /opt/app/
