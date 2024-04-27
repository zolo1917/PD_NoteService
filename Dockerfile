FROM node:20-alpine
WORKDIR /NoteService/
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]