import React, { useState } from 'react';
import AddEquipmentForm from './CRUD/AddEquipmentForm';
import AddLocationForm from './CRUD/AddLocationForm';
import '../styles.css';
import ReadForm from './CRUD/ReadForm';

const AdminForm = () => {
  const [activePanel, setActivePanel] = useState('none');

  return (
    <div className="admin-title">
      <h2>Администратор - Управление контентом</h2>
      <div className="button-group">
        <button 
          onClick={() => setActivePanel(activePanel === 'equipment' ? 'none' : 'equipment')}
          className={activePanel === 'equipment' ? 'active' : ''}
        >
           Управление снаряжением
        </button>
        <button 
          onClick={() => setActivePanel(activePanel === 'location' ? 'none' : 'location')}
          className={activePanel === 'location' ? 'active' : ''}
        >
           Управление локациями
        </button>
      </div>

      <div className="admin-panel">
        {activePanel === 'equipment' && (
          <div className="panel-content">
            <AddEquipmentForm />
          </div>
        )}
        {activePanel === 'equipment' && (
          <div className="panel-content">
            <ReadForm />
          </div>
        )}
        {activePanel === 'location' && (
          <div className="panel-content">
            <AddLocationForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminForm;
