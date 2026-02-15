import React from 'react';
import '../styles.css';

const Locations = () => {
  return (
    <div className="locations-page">
      <div className="locations-title">
        <h1>Горнолыжные базы Кыргызстана</h1>
      </div>

      <div className="grid-container">

        {/* Чункурчак */}
        <div className="grid-item">
          <img
            src="https://diesel.elcat.kg/uploads/monthly_02_2017/post-28827-0-91668300-1486561689.jpg"
            alt="Чункурчак"
          />
          <h3>Чункурчак</h3>
          <p>
            Один из самых популярных горнолыжных курортов, расположенный вблизи Бишкека.
            Отличается мягким снегом и живописными пейзажами.
          </p>
          <a
            href="https://www.chunkurchak.kg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Подробнее
          </a>
        </div>

        {/* Каракол */}
        <div className="grid-item">
          <img
            src="https://avatars.dzeninfra.ru/get-zen_doc/1900011/pub_6362168aa2ad1163429f1a06_63621bc92d221a4b30a34154/scale_1200"
            alt="Каракол"
          />
          <h3>Каракол</h3>
          <p>
            Самый крупный и развитый горнолыжный курорт Кыргызстана,
            предлагающий трассы для всех уровней сложности.
          </p>
          <a
            href="https://karakol-ski.kg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Подробнее
          </a>
        </div>

        {/* Кашкулак */}
        <div className="grid-item">
          <img
            src="https://kyrtag.kg/upload/iblock/fa6/33.jpg"
            alt="Кашкулак"
          />
          <h3>Кашкулак</h3>
          <p>
            Отличное место для катания на лыжах и сноуборде
            с разнообразными трассами и прекрасными видами на горы.
          </p>
          <a
            href="https://www.instagram.com/ski.kashkulak/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Подробнее
          </a>
        </div>

        {/* Кашка-Суу */}
        <div className="grid-item">
          <img
            src="https://avatars.mds.yandex.net/i?id=40cafc28d2148df1470c4cfa3808ffa9_l-5486461-images-thumbs&n=13"
            alt="Кашка-Суу"
          />
          <h3>Кашка-Суу</h3>
          <p>
            Горнолыжный курорт, расположенный недалеко от столицы,
            предлагающий комфортные условия для зимнего отдыха.
          </p>
          <a
            href="https://kashka-suu.kg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Подробнее
          </a>
        </div>

        {/* ЗИЛ */}
        <div className="grid-item">
          <img
            src="https://avatars.mds.yandex.net/i?id=528d535771e644ee38c18ffa7e7a1210_l-7469517-images-thumbs&n=13"
            alt="ЗИЛ"
          />
          <h3>ЗИЛ</h3>
          <p>
            Отличный курорт для семейного отдыха,
            оснащенный современными подъемниками и трассами различной сложности.
          </p>
          <a
            href="https://zil.kg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Подробнее
          </a>
        </div>

        {/* Орловка */}
        <div className="grid-item">
          <img
            src="https://avatars.mds.yandex.net/i?id=a8c6f0226c59a0c47b95b3e2ccd57f71_l-5167278-images-thumbs&n=13"
            alt="Орловка"
          />
          <h3>Орловка</h3>
          <p>
            Один из лучших курортов для начинающих лыжников и сноубордистов,
            с удобными трассами и хорошей инфраструктурой.
          </p>
          <a
            href="http://orlovka.kg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Подробнее
          </a>
        </div>

      </div>
    </div>
  );
};

export default Locations;
