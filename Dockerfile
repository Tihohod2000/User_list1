FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем остальной код
COPY . .

# Открываем порт (по умолчанию 3000)
EXPOSE 3000

# Запуск с ts-node
CMD ["npx", "ts-node", "src/index.ts"]
