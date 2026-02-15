import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './CreateForm.css';

const API_URL = 'http://localhost:5000';

const CreateForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    duration: '',
    activity: '',
    date: '',
    price: '',
  });

  const [file, setFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'date') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.split(',').map((date) => date.trim()),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  
  
  const handleImageChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: event.target.files[0],
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('file', file);
    formDataToSend.append('duration', formData.duration);
    formDataToSend.append('activity', formData.activity);
    formDataToSend.append('date', formData.date.join(', '));
    formDataToSend.append('price', formData.price);

    try {
      await axios.post(`${API_URL}/api/my_tour`, formDataToSend, config);

      alert('Запись успешно создана');
      setFormData({
        title: '',
        description: '',
        image: null,
        duration: '',
        activity: '',
        date: '',
        price: '',
      });
      setFile(null);
    } catch (error) {
      console.error(error);
      alert('Ошибка при создании записи');
    }
  };

  return (
    <div className="create-form-container">
      <h2>Создать запись</h2>
      <Form onSubmit={handleSubmit} className="create-form">
        <Form.Group>
          <Form.Label>Название:</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Описание:</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Изображение:</Form.Label>
          <Form.Control type="file" name="image" accept="image/*" onChange={handleImageChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Длительность:</Form.Label>
          <Form.Control type="text" name="duration" value={formData.duration} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Активность:</Form.Label>
          <Form.Control type="text" name="activity" value={formData.activity} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Дата:</Form.Label>
          <Form.Control type="text" name="date" value={formData.date} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Цена:</Form.Label>
          <Form.Control type="text" name="price" value={formData.price} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Файл:</Form.Label>
          <Form.Control type="file" name="file" onChange={handleFileChange} required />
        </Form.Group>
        <Button type="submit">Создать</Button>
      </Form>
    </div>
  );
};

export default CreateForm;
