FROM node:20
# RUN apt update; apt-get update -y

# mount-path in contanier
WORKDIR /home/app

# install
COPY package*.json ./
RUN npm i

# install nuxtapp
COPY . .
RUN npm run build

# open $PORT; [default=3000]
ENV PORT=3000
EXPOSE $PORT

# run default start command
CMD [ "npm", "start" ]

