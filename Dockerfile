FROM node:12
WORKDIR /src

# Project dependencies
COPY package.json package.json
RUN npm install

# Project sources
COPY . /src
RUN npm run build

# Node serve
RUN npm install -g serve

# Launch
EXPOSE 5000
CMD ["serve", "-s", "build"]