FROM node
RUN mkdir app
Add . /app
WORKDIR /app
RUN npm install -q
RUN npm install -gq nodemon
EXPOSE 8080
CMD ["npm","start"]
