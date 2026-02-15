import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './CreateForm.css';

const API_URL = 'http://localhost:5000';

const AddLocationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    difficulty: 'Средняя', // Легкая, Средняя, Сложная
    elevation: '',
    longitude: '',
    latitude: '',
    region: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
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
    formDataToSend.append('difficulty', formData.difficulty);
    formDataToSend.append('elevation', formData.elevation);
    formDataToSend.append('longitude', formData.longitude);
    formDataToSend.append('latitude', formData.latitude);
    formDataToSend.append('region', formData.region);

    try {
      await axios.post(`${API_URL}/api/locations`, formDataToSend, config);

      alert('Локация успешно добавлена');
      setFormData({
        name: '',
        description: '',
        image: null,
        difficulty: 'Средняя',
        elevation: '',
        longitude: '',
        latitude: '',
        region: '',
      });
    } catch (error) {
      console.error(error);
      alert('Ошибка при добавлении локации');
    }
  };

  return (
    <div className="create-form-container">
      <h2>Добавить локацию горнолыжной базы</h2>
      <Form onSubmit={handleSubmit} className="create-form">
        <Form.Group>
          <Form.Label>Название базы:</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="Например: Каракол"
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
            placeholder="Подробное описание базы, инфраструктуры, условий"
            rows={3}
            required 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Регион:</Form.Label>
          <Form.Control 
            type="text" 
            name="region" 
            value={formData.region} 
            onChange={handleInputChange} 
            placeholder="Например: Чуйская область"
            required 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Сложность:</Form.Label>
          <Form.Control 
            as="select" 
            name="difficulty" 
            value={formData.difficulty} 
            onChange={handleInputChange}
            required
          >
            <option>Легкая</option>
            <option>Средняя</option>
            <option>Сложная</option>
            <option>Экстремальная</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Высота над уровнем моря (м):</Form.Label>
          <Form.Control 
            type="number" 
            name="elevation" 
            value={formData.elevation} 
            onChange={handleInputChange} 
            placeholder="2500"
            required 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Широта (Latitude):</Form.Label>
          <Form.Control 
            type="number" 
            step="0.0001"
            name="latitude" 
            value={formData.latitude} 
            onChange={handleInputChange} 
            placeholder="42.4975"
            required 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Долгота (Longitude):</Form.Label>
          <Form.Control 
            type="number" 
            step="0.0001"
            name="longitude" 
            value={formData.longitude} 
            onChange={handleInputChange} 
            placeholder="77.5964"
            required 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Изображение базы:</Form.Label>
          <Form.Control 
            type="file" 
            name="image" 
            accept="image/*" 
            onChange={handleImageChange} 
            required 
          />
        </Form.Group>

        <Button type="submit" variant="primary">Добавить локацию</Button>
      </Form>
    </div>
  );
};

export default AddLocationForm;
