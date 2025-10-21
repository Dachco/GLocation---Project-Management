FROM node:18

WORKDIR /usr/src/app

# Copiar archivos de dependencias primero para mejor cache de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de archivos
COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]
