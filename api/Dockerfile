# Escolha a imagem Node.js
FROM node:16

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY package*.json ./
COPY . .

# Instale as dependências
RUN npm install

# Exponha a porta onde o backend será executado
EXPOSE 3000

# Comando para iniciar o backend
CMD ["npm", "start"]