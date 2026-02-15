const { Client } = require('pg');

// Создание клиента PostgreSQL
const client = new Client({
  user: 'Admin',
  host: 'localhost',
  database: 'base',
  password: '1223',
  port: 5432, // порт по умолчанию для PostgreSQL
});

// Подключение к базе данных
client.connect();

// Выполнение SQL-запроса
client.query('SELECT * FROM users', (err, result) => {
  if (err) {
    console.error('Ошибка выполнения запроса:', err);
  } else {
    console.log('Результаты запроса:', result.rows);
  }

  // Закрытие подключения к базе данных
  client.end();
});
