import React from 'react';

const DeleteForm = ({ handleDeleteRecord, onCancel }) => {
  const handleDelete = async () => {
    try {
      await handleDeleteRecord();
      alert('Запись успешно удалена');
      onCancel();
    } catch (error) {
      console.log('Ошибка удаления записи', error);
    }
  };

  return (
    <div>
      <h2>Удалить запись</h2>
      <p>Вы действительно хотите удалить эту запись?</p>
      <button onClick={handleDelete}>Удалить</button>
      <button onClick={onCancel}>Отмена</button>
    </div>
  );
};

export default DeleteForm;
