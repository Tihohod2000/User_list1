FROM node:20

# Рабочая директория
WORKDIR /app

# Указываем, что среда разработки
#ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Открываем порт
EXPOSE 3000

# Запуск с ts-node
CMD ["npm", "run", "start"]

