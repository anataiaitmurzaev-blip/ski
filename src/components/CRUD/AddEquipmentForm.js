import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './CreateForm.css';

const API_URL = 'http://localhost:5000';

const AddEquipmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    price: '',
    category: 'Лыжи', // Сноуборды, Куртки, Ботинки и т.д.
    stock: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('stock', formData.stock);

    try {
      await axios.post(`${API_URL}/api/equipment`, formDataToSend, config);

      alert('Снаряжение успешно добавлено');
      setFormData({
        name: '',
        description: '',
        image: null,
        price: '',
        category: 'Лыжи',
        stock: '',
      });
    } catch (error) {
      console.error(error);
      alert('Ошибка при добавлении снаряжения');
    }
  };

  return (
    <div className="create-form-container">
      <h2>Добавить горнолыжное снаряжение</h2>
      <Form onSubmit={handleSubmit} className="create-form">
        <Form.Group>
          <Form.Label>Название:</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="Например: Лыжи FireTrack 9000"
            required 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Описание:</Form.Label>
          <Form.Control 
            as="textarea" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            placeholder="Подробное описание снаряжения"
            rows={3}
            required 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Категория:</Form.Label>
          <Form.Control 
            as="select" 
            name="category" 
            value={formData.category} 
            onChange={handleInputChange}
            required
          >
            <option>Лыжи</option>
            <option>Сноуборды</option>
            <option>Куртки</option>
            <option>Ботинки</option>
            <option>Перчатки</option>
            <option>Шлемы</option>
            <option>Очки</option>
            <option>Прочее</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Цена (сом):</Form.Label>
          <Form.Control 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleInputChange} 
            placeholder="1000"
            required 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Количество в наличии:</Form.Label>
          <Form.Control 
            type="number" 
            name="stock" 
            value={formData.stock} 
            onChange={handleInputChange} 
            placeholder="5"
            required 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Изображение:</Form.Label>
          <Form.Control 
            type="file" 
            name="image" 
            accept="image/*" 
            onChange={handleImageChange} 
            required 
          />
        </Form.Group>

        <Button type="submit" variant="success">Добавить снаряжение</Button>
      </Form>
    </div>
  );
};

export default AddEquipmentForm;
