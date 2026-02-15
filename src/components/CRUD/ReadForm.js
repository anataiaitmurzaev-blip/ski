import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateForm from './UpdateForm';
import DeleteForm from './DeleteForm';

const API_URL = 'http://localhost:5000';

const ReadForm = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/equipment`);
      setRecords(response.data);
    } catch (error) {
      console.log('Ошибка получения записей', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDeleteRecord = async (recordId) => {
    try {
      await axios.delete(`${API_URL}/api/equipment/delete/${recordId}`);
      await fetchRecords(); // ✅ обновить таблицу сразу
      setSelectedRecord(null);
    } catch (error) {
      console.log('Ошибка при удалении записи', error);
    }
  };

  const handleUpdateRecord = (record) => {
    setSelectedRecord(record);
  };

  return (
    <div>
      <h2>Просмотр записей</h2>

      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Категория</th>
            <th>В наличии</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.description}</td>
              <td>{record.category}</td>
              <td>{record.stock}</td>
              <td>{record.price}</td>
              <td>
                <button onClick={() => handleUpdateRecord(record)}>Изменить</button>
                <button onClick={() => handleDeleteRecord(record.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRecord && (
        <div>
          <UpdateForm
            recordId={selectedRecord.id}
            onCancel={() => setSelectedRecord(null)}
            onUpdated={fetchRecords}   // ✅ после сохранения обновить список
          />

          <DeleteForm
            recordId={selectedRecord.id}
            handleDeleteRecord={handleDeleteRecord}
            onCancel={() => setSelectedRecord(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ReadForm;
