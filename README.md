# Cервис работы с пользователями

Для запуска используется докер. Также для запуска необходимо создать .env файл

Пример .env файла:
```
DB_DATABASE = postgres
DB_USERNAME = postgres
DB_PASSWORD = 12345
DB_PORT = 5432
PORT = 3000
```

Команда для запуска:
```
docker-compose up --build
```

Реализованы следующие endpoint:
1.	Регистрация пользователя
   
    Регистрация производится по следующему POST endpoind:
   ```
  	http://localhost:3000/registration
   ```
   пример вводимых данных для регистрации пользователя:
   ```
{
    "full_name": "Иванов Иван Иванович",
    "birth_date": "02.02.2002",
    "password": "123",
    "email": "dev@gmail.com"
}
   ```

3.	Авторизация пользователя
   
Авторизация производится по следующему POST endpoind:
   ```
  	http://localhost:3000/authorization
   ```
   В ответ получем:
   ```
{
    "text": "authorization successful!",
    "yourID": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBtYWlsLnJ1IiwiaWF0IjoxNzUyNDg1NTU2LCJleHAiOjE3NTI0ODkxNTZ9.DwLkLty8mwsy-pu6tzXFjXSsQv-uUsYYY7QZjy_4vZ8"
}
   ```
Далее токен понадобится для всех оставшихся endpoint

5.	Получение пользователя по ID (Может получить либо админ либо пользователь сам себя)
GET endpoint:
```
http://localhost:3000/getUserById
```
Пример запроса:
```
{
    "id": 2,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBtYWlsLnJ1IiwiaWF0IjoxNzUyNDg2Nzg2LCJleHAiOjE3NTI0OTAzODZ9.PBOIRl9ARKrDUTIvVFKXqyzB1REkQ-7ap8oGqgOMN5o"
}
```

В ответ получаем:
```
 "user": {
        "id": 2,
        "full_name": "Иванов Иван Иванович",
        "birth_date": "2002-02-02T00:00:00.000Z",
        "email": "dev@gmail.com",
        "password": "$2b$10$Y0YQXqKqb2OZS48NOPag8.OXtuw.ljCJth5Rj86j7MbY8akMWHGze",
        "role": "user",
        "is_active": true
    }
```
   
7.	Получение списка пользователей - только для админа
GET endpoint:
```
http://localhost:3000/getUserList
```

Пример запроса:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBtYWlsLnJ1IiwiaWF0IjoxNzUyNDg2Nzg2LCJleHAiOjE3NTI0OTAzODZ9.PBOIRl9ARKrDUTIvVFKXqyzB1REkQ-7ap8oGqgOMN5o"
}
```
   
9.	Блокировка пользователя - либо админ либо пользователь сам себя
POST endpoint:
```
http://localhost:3000/BlockUse
```
Пример запроса:
```
{
    "id": 2,    
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBtYWlsLnJ1IiwiaWF0IjoxNzUyNDg2Nzg2LCJleHAiOjE3NTI0OTAzODZ9.PBOIRl9ARKrDUTIvVFKXqyzB1REkQ-7ap8oGqgOMN5o"
}
```

При первом запуске автоматически в БД добавляется администратор:
```
"full_name": "Admin",
"email": "admin@mail.ru",
"password": "123",
"role": "admin"
```

