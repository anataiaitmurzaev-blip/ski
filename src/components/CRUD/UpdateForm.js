import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const UpdateForm = ({ recordId, onCancel, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    price: '',
    category: '',
    stock: ''
  });

  const fetchRecordData = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/equipment/${recordId}`);
      const d = res.data;

      setFormData({
        name: d.name ?? '',
        description: d.description ?? '',
        image_url: d.image_url ?? '',
        price: d.price ?? '',
        category: d.category ?? '',
        stock: d.stock ?? ''
      });
    } catch (e) {
      console.log('Ошибка загрузки', e);
    }
  }, [recordId]);

  useEffect(() => {
    if (recordId) fetchRecordData();
  }, [fetchRecordData, recordId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/api/equipment/${recordId}`, formData);
      alert('Снаряжение обновлено');
      onUpdated();   // ✅ обновляем список
      onCancel();    // ✅ закрываем форму
    } catch (e) {
      console.log('Ошибка обновления', e);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Изменить снаряжение</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Название</Form.Label>
          <Form.Control name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Описание</Form.Label>
          <Form.Control name="description" value={formData.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Ссылка на изображение</Form.Label>
          <Form.Control name="image_url" value={formData.image_url} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Цена</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Категория</Form.Label>
          <Form.Control name="category" value={formData.category} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>В наличии</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit">Сохранить</Button>{' '}
        <Button variant="secondary" onClick={onCancel}>Отмена</Button>
      </Form>
    </div>
  );
};

export default UpdateForm;
