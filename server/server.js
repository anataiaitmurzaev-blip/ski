const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'base',
  password: '123',
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  },
});


const upload = multer({ storage });

const JWT_SECRET = 'your-secret-key';

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

app.post('/api/captcha', (req, res) => {
  const { response } = req.body;


  if (response) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

const fs = require('fs');

const createUploadsFolder = () => {
  const folderPath = 'uploads/';

  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Не удалось создать папку uploads/', err);
    } else {
      console.log('Папка uploads/ успешно создана');
    }
  });
};

createUploadsFolder();

app.get('/api/admin', authenticateToken, (req, res) => {
  if (req.user.role === 'admin') {
    res.send('Вы администратор. Доступ разрешен.');
  } else {
    res.sendStatus(403);
  }
});

app.post('/api/register', (req, res) => {
  const { name, last_name, email, number, password } = req.body;

  pool.query(
    'INSERT INTO users (first_name, last_name, email, phone_number, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, last_name, email, number, password, 'user'],
    (err, result) => {
      if (err) {
        console.error('Ошибка выполнения запроса', err);
        res.status(500).send('Произошла ошибка при регистрации');
      } else {
        const user = result.rows[0];
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
        res.status(200).json({ message: 'Регистрация прошла успешно', token });
      }
    }
  );
});

app.post('/api/login', (req, res) => {
  const { number, password } = req.body;

  pool.query(
    'SELECT * FROM users WHERE phone_number = $1 AND password = $2',
    [number, password],
    (err, result) => {
      if (err) {
        console.error('Ошибка выполнения запроса', err);
        res.status(500).send('Произошла ошибка при выполнении входа');
      } else {
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
          res.status(200).json({ message: 'Вход выполнен успешно', token });
        } else {
          res.status(401).json({ message: 'Неверный номер или пароль' });
        }
      }
    }
  );
});

app.get('/api/user', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;

  pool.query('SELECT * FROM users WHERE id = $1', [userId], (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).send('Произошла ошибка при получении данных пользователя');
    } else {
      if (result.rows.length > 0) {
        const user = result.rows[0];
        res.status(200).json({ ...user, role: userRole });
      } else {
        res.status(404).send('Пользователь не найден');
      }
    }
  });
});

app.put('/api/user', authenticateToken, (req, res) => {
  const { id } = req.user;
  const { name, last_name, email, number } = req.body;

  pool.query(
    'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *',
    [name, last_name, email, id],
    (err, result) => {
      if (err) {
        console.error('Ошибка выполнения запроса', err);
        res.status(500).send('Произошла ошибка при обновлении данных пользователя');
      } else {
        const updatedUser = result.rows[0];
        res.status(200).json(updatedUser);
      }
    }
  );
});

app.post('/api/admin', authenticateToken, (req, res) => {
  if (req.user.role === 'admin') {
    res.send('Вы администратор. Доступ разрешен.');
  } else {
    res.sendStatus(403);
  }
});


app.get('/api/equipment', (req, res) => {
  pool.query('SELECT * FROM equipment', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).send('Произошла ошибка при получении данных снарежении');
    } else {
      const tours = result.rows;
      res.status(200).json(tours);
    }
  });
});

app.get('/api/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error('Ошибка при скачивании файла', err);
      res.status(500).send('Произошла ошибка при скачивании файла');
    }
  });
});

app.get('/api/equipment/:equipmentId', (req, res) => {
  const { equipmentId } = req.params;

  pool.query('SELECT * FROM equipment WHERE id = $1', [equipmentId], (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).send('Произошла ошибка при получении данных снарежения');
    } else {
      if (result.rows.length > 0) {
        const tour = result.rows[0];
        res.status(200).json(tour);
      } else {
        res.status(404).send('Снаредение не найдено');
      }
    }
  });
});



app.put('/api/equipment/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, image_url, price, category, stock } = req.body;

  pool.query(
    `UPDATE equipment
     SET name = $1,
         description = $2,
         image_url = $3,
         price = $4,
         category = $5,
         stock = $6,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $7
     RETURNING *`,
    [name, description, image_url, price, category, stock, id],
    (err, result) => {
      if (err) {
        console.error('Ошибка выполнения запроса', err);
        return res.status(500).send('Ошибка при обновлении');
      }

      if (result.rows.length === 0) {
        return res.status(404).send('Снаряжение не найдено');
      }

      res.status(200).json(result.rows[0]);
    }
  );
});





app.put('/api/equipment/:equipmentId', (req, res) => {
  const { equipmentId } = req.params;
  const { name, description,   date, price } = req.body;

console.log(date, typeof date);
  let datesArray = [];

    if (Array.isArray(date)) {
      datesArray = date.map(d => d.split('T')[0]);
    } else if (typeof date === 'string') {
      datesArray = date
        .split(',')
        .map(d => d.trim().split('T')[0]);
    } else {
      return res.status(400).json({ error: 'Некорректный формат даты' });
    }

  pool.query(
    'UPDATE equipment SET name = $1, description = $2,  date = $3, price = $4 WHERE id = $5 RETURNING *',
    [name, description, datesArray, price, equipmentId],
    (err, result) => {
      if (err) {
        console.error('Ошибка выполнения запроса', err);
        res.status(500).send('Произошла ошибка при обновлении данных снарежения');
      } else {
        const updatedTour = result.rows[0];
        res.status(200).json(updatedTour);
      }
    }
  );
});


app.delete('/api/equipment/delete/:recordId', (req, res) => {
  const { recordId } = req.params;
  console.log('Deleting equipment with ID:', recordId);
  pool.query('DELETE FROM equipment WHERE id = $1', [recordId], (err) => {
    if (err) {
      console.error('Ошибка выполнения запроса', err);
      res.status(500).send('Произошла ошибка при удалении снарежения');
    } else {
      res.sendStatus(200);
    }
  });
});





app.post('/api/participants', (req, res) => {
  const participantData = req.body;
  if (!participantData.date || !participantData.name || !participantData.lastname || !participantData.number || !participantData.paymentMethod) {
    return res.status(400).send('Не все поля заполнены');
  }
  pool.query(
    'INSERT INTO participants (date, name, lastname, number, paymentMethod) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [participantData.date, participantData.name, participantData.lastname, participantData.number, participantData.paymentMethod],
    (err, result) => {
      if (err) {
        console.error('Ошибка выполнения запроса', err);
        return res.status(500).send('Произошла ошибка при сохранении данных участника');
      }

      const newParticipant = result.rows[0];
      res.status(200).json(newParticipant);
    }
  );
});

app.get('/api/check-auth', authenticateToken, (req, res) => {
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Добро пожаловать на сервер');
});

// ============================================
// API для управления снаряжением
// ============================================

// GET - получить все снаряжение
app.get('/api/equipment', (req, res) => {
  pool.query('SELECT * FROM equipment ORDER BY created_at DESC', (err, result) => {
    if (err) {
      console.error('Ошибка получения снаряжения:', err);
      res.status(500).json({ error: 'Ошибка при получении снаряжения' });
    } else {
      res.json(result.rows);
    }
  });
});

// POST - добавить новое снаряжение
app.post('/api/equipment', authenticateToken, upload.single('image'), (req, res) => {
  // Проверка прав администратора
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Только администраторы могут добавлять снаряжение' });
  }

  const { name, description, price, category, stock } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !description || !price || !category) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

  if (!image_url) {
    return res.status(400).json({ error: 'Изображение обязательно' });
  }

  pool.query(
    'INSERT INTO equipment (name, description, image_url, price, category, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, description, image_url, parseFloat(price), category, parseInt(stock) || 0],
    (err, result) => {
      if (err) {
        console.error('Ошибка добавления снаряжения:', err);
        res.status(500).json({ error: 'Ошибка при добавлении снаряжения: ' + err.message });
      } else {
        res.status(201).json({ message: 'Снаряжение успешно добавлено', equipment: result.rows[0] });
      }
    }
  );
});

// PUT - обновить снаряжение
app.put('/api/equipment/:id', authenticateToken, upload.single('image'), (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Только администраторы могут редактировать' });
  }

  const { id } = req.params;
  const { name, description, price, category, stock } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  let query = 'UPDATE equipment SET name=$1, description=$2, price=$3, category=$4, stock=$5, updated_at=CURRENT_TIMESTAMP';
  let values = [name, description, price, category, stock || 0];

  if (image_url) {
    query += ', image_url=$6';
    values.push(image_url);
  }

  query += ` WHERE id=${values.length + 1} RETURNING *`;
  values.push(id);

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Ошибка обновления:', err);
      res.status(500).json({ error: 'Ошибка при обновлении' });
    } else if (result.rows.length === 0) {
      res.status(404).json({ error: 'Снаряжение не найдено' });
    } else {
      res.json({ message: 'Снаряжение обновлено', equipment: result.rows[0] });
    }
  });
});

// DELETE - удалить снаряжение
app.delete('/api/equipment/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Только администраторы могут удалять' });
  }

  const { id } = req.params;
console.log('Deleting equipment with ID:', id);
  pool.query('DELETE FROM equipment WHERE id=$1 RETURNING *', [id], (err, result) => {
    if (err) {
      console.error('Ошибка удаления:', err);
      res.status(500).json({ error: 'Ошибка при удалении' });
    } else if (result.rows.length === 0) {
      res.status(404).json({ error: 'Снаряжение не найдено' });
    } else {
      res.json({ message: 'Снаряжение удалено' });
    }
  });
});

// ============================================
// API для управления локациями
// ============================================

// GET - получить все локации
app.get('/api/locations', (req, res) => {
  pool.query('SELECT * FROM ski_locations ORDER BY created_at DESC', (err, result) => {
    if (err) {
      console.error('Ошибка получения локаций:', err);
      res.status(500).json({ error: 'Ошибка при получении локаций' });
    } else {
      res.json(result.rows);
    }
  });
});

// POST - добавить новую локацию
app.post('/api/locations', authenticateToken, upload.single('image'), (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Только администраторы могут добавлять локации' });
  }

  const { name, description, difficulty, elevation, latitude, longitude, region } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !description || !difficulty) {
    return res.status(400).json({ error: 'Все основные поля обязательны' });
  }

  if (!image_url) {
    return res.status(400).json({ error: 'Изображение обязательно' });
  }

  // Преобразуем координаты в числа
  const lat = latitude ? parseFloat(latitude) : null;
  const lng = longitude ? parseFloat(longitude) : null;
  const elev = elevation ? parseInt(elevation) : null;

  pool.query(
    'INSERT INTO ski_locations (name, description, image_url, difficulty, elevation, latitude, longitude, region) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [name, description, image_url, difficulty, elev, lat, lng, region || null],
    (err, result) => {
      if (err) {
        console.error('Ошибка добавления локации:', err);
        res.status(500).json({ error: 'Ошибка при добавлении локации: ' + err.message });
      } else {
        res.status(201).json({ message: 'Локация успешно добавлена', location: result.rows[0] });
      }
    }
  );
});

// PUT - обновить локацию
app.put('/api/locations/:id', authenticateToken, upload.single('image'), (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Только администраторы могут редактировать' });
  }

  const { id } = req.params;
  const { name, description, difficulty, elevation, latitude, longitude, region } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  let query = 'UPDATE ski_locations SET name=$1, description=$2, difficulty=$3, elevation=$4, latitude=$5, longitude=$6, region=$7, updated_at=CURRENT_TIMESTAMP';
  let values = [name, description, difficulty, elevation, latitude, longitude, region];

  if (image_url) {
    query += ', image_url=$8';
    values.push(image_url);
  }

  query += ` WHERE id=$${values.length + 1} RETURNING *`;
  values.push(id);

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Ошибка обновления:', err);
      res.status(500).json({ error: 'Ошибка при обновлении' });
    } else if (result.rows.length === 0) {
      res.status(404).json({ error: 'Локация не найдена' });
    } else {
      res.json({ message: 'Локация обновлена', location: result.rows[0] });
    }
  });
});

// DELETE - удалить локацию
app.delete('/api/locations/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Только администраторы могут удалять' });
  }

  const { id } = req.params;

  pool.query('DELETE FROM ski_locations WHERE id=$1 RETURNING *', [id], (err, result) => {
    if (err) {
      console.error('Ошибка удаления:', err);
      res.status(500).json({ error: 'Ошибка при удалении' });
    } else if (result.rows.length === 0) {
      res.status(404).json({ error: 'Локация не найдена' });
    } else {
      res.json({ message: 'Локация удалена' });
    }
  });
});

app.use((req, res, next) => {
  res.status(404).send('Страница не найдена');
});

app.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});