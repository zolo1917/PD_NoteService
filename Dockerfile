FROM node:20-alpine
WORKDIR /NoteService/
COPY package.json ./
RUN npm install
COPY . .
ENTRYPOINT ["npm", "start"]