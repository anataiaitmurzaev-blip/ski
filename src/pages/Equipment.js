import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import '../styles.css';

const API_URL = 'http://localhost:5000';

const Equipment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загружаем снаряжение с API при загрузке страницы
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/equipment`);
        setEquipmentList(response.data);
        setError(null);
      } catch (err) {
        console.error('Ошибка загрузки снаряжения:', err);
        setError('Ошибка при загрузке снаряжения');
        // Используем пустой массив, если API недоступен
        setEquipmentList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const filteredEquipment = equipmentList.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    item.price >= minPrice && item.price <= maxPrice
  );

  if (loading) {
    return <div className="equipment-page"><h2>Загрузка снаряжения...</h2></div>;
  }

  if (error) {
    return <div className="equipment-page"><h2>{error}</h2></div>;
  }

  return (
    <div className="equipment-page">
      <div className="equipment-title">
        <h1>Снаряжение для лыж</h1>
      </div>
    <img
  src={"https://habarskoe.ru/assets/galleries/47/1.jpg"}
  alt="Снаряжение для лыж"
  style={{
    width: "100%",
    height: "500px",
    objectFit: "cover",
    display: "block",
    margin: "20px auto 30px",
    borderRadius: "10px",
  }}
/>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="price-filter">
        <h3>Фильтровать по цене:</h3>
        <label>
          Минимальная цена:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
            onFocus={(e) => e.target.value = ''}
            min="0"
            placeholder="0"
          />
        </label>
        <label>
          Максимальная цена:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value) || 10000)}
            onFocus={(e) => e.target.value = ''}
            min="0"
            placeholder="10000"
          />
        </label>
      </div>

      <div className="grid-container">
        {filteredEquipment.length > 0 ? (
          filteredEquipment.map((item) => {
            // Определяем URL картинки
            let imageUrl = 'https://via.placeholder.com/300';
            if (item.image_url) {
              // Если уже полный URL (http/https), используем как есть
              if (item.image_url.startsWith('http://') || item.image_url.startsWith('https://')) {
                imageUrl = item.image_url;
              } else {
                // Если локальный путь, добавляем API_URL
                imageUrl = `${API_URL}${item.image_url}`;
              }
            }

            return (
              <div key={item.id} className="grid-item">
                <img 
                  src={imageUrl}
                  alt={item.name}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p><strong>Цена:</strong> {item.price} сом</p>
                <p><strong>Категория:</strong> {item.category}</p>
                <p><strong>В наличии:</strong> {item.stock}</p>
                <a 
                  href={`https://wa.me/996707375747?text=Хочу арендовать: ${encodeURIComponent(item.name)} за ${item.price} сом`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rent-button"
                >
                  Арендовать
                </a>
              </div>
            );
          })
        ) : (
          <p>Снаряжение не найдено</p>
        )}
      </div>
    </div>
  );
}

export default Equipment;
