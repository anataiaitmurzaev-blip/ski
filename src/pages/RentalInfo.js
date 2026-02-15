import React, { useState } from 'react';

const RentalInfo = () => {
  const [activeTab, setActiveTab] = useState('howToRent');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="rental-info">
      <h1>Как арендовать снаряжение</h1>

      <h5>
        <span
          className={activeTab === 'howToRent' ? 'active' : ''}
          onClick={() => handleTabClick('howToRent')}
        >
          Как арендовать
        </span>{' '}| {' '}
        <span
          className={activeTab === 'rentConditions' ? 'active' : ''}
          onClick={() => handleTabClick('rentConditions')}
        >
          Условия аренды
        </span>
      </h5>

      {activeTab === 'howToRent' ? (
        <div className="how-to-rent">
          <h2>Шаги для аренды снаряжения</h2>
          <p>Следуйте этим простым шагам для аренды снаряжения:</p>
          <ol>
            <li>Выберите необходимое снаряжение в нашем каталоге.</li>
            <li>Укажите дату и время аренды, а также место получения снаряжения.</li>
            <li>Заполните форму с вашими данными и контактной информацией.</li>
            <li>Подтвердите заказ и получите снаряжение в указанное время.</li>
          </ol>
        </div>
      ) : (
        <div className="rent-conditions">
          <h2>Условия аренды</h2>
          <p>Мы предлагаем гибкие условия аренды снаряжения, чтобы вам было удобно:</p>
          <ul>
            <li>Минимальный срок аренды: 1 день.</li>
            <li>Бронирование снаряжения возможно за 7 дней до начала аренды.</li>
            <li>Возврат снаряжения возможен в рабочие часы на нашем пункте выдачи.</li>
            <li>Все снаряжение проверяется перед сдачей, чтобы обеспечить его отличное состояние.</li>
            <li>Пожалуйста, бережно относитесь к арендованному снаряжению, чтобы избежать дополнительных затрат на повреждения.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RentalInfo;
