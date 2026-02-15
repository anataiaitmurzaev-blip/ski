import React, { useState } from 'react';
import './EditForm.css'

const EditForm = ({ userData, onUpdateUser }) => {
  const [updatedData, setUpdatedData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(updatedData);
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className='edit-title'>
      <h2>Изменение данных</h2>
      </div>
      <div className="form-row">
        <label className="form-label">
          <span className="label-text">Имя:</span>
          <input className='input-edit'
            type="text"
            name="name"
            value={updatedData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-row">
        <label className="form-label">
          <span className="label-text">Фамилия:</span>
          <input className='input-edit'
            type="text"
            name="last_name"
            value={updatedData.last_name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-row">
        <label className="form-label">
          <span className="label-text">Email:</span>
          <input className='input-edit'
            type="email"
            name="email"
            value={updatedData.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-row">
        <label className="form-label">
          <span className="label-text">Номер:</span>
          <input className='input-edit'
            type="number"
            name="number"
            value={updatedData.number}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className='edit-btn'>
      <button type="submit">Сохранить</button>
      </div>
    </form>
  );
};

export default EditForm;
