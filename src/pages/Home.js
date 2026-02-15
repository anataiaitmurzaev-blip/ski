import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Banner from '../components/Banner';
import Section from '../components/Section';
import Equipment from './Equipment';
import Locations from './Locations';
import RentalInfo from './RentalInfo';
import '../styles.css';

const Home = () => {
  return (
    <div className="home">
      <Banner 
        title="Аренда горнолыжного снаряжения"
        subtitle="Лучшее оборудование для вашего идеального катания"
        imageUrl={require('./ski_banner.jpg')}
      />
      <div className="banner-text">
        <p>
          Готовитесь к зимнему отдыху? У нас вы найдете широкий выбор горнолыжного снаряжения для всех уровней подготовки. 
          Высококачественные лыжи, сноуборды, ботинки и аксессуары – все, что нужно для комфортного катания.
        </p>
        <p>
          Мы предлагаем удобные условия аренды, гибкие тарифы и профессиональные консультации. Выберите лучшее снаряжение 
          и наслаждайтесь снегом без забот!
        </p>
      </div>
      <div className="sections-container">
        <Link to="/rental-info" className="section-link">
          <Section
            title="Как арендовать?"
            description="Узнайте условия аренды, цены и процесс бронирования."
            image='https://avatars.mds.yandex.net/get-altay/3766813/2a0000017671426ff040ae677febddceb500/XXL_height'
          />
        </Link>
        
        <Link to="/equipment" className="section-link">
          <Section
            title="Наше снаряжение"
            description="Широкий выбор лыж, сноубордов и экипировки."
            image='https://avatars.mds.yandex.net/get-altay/10878016/2a0000018b3d54e39c98ca114e6d315405a9/XXL_height'
          />
        </Link>

        <Link to="/locations" className="section-link">
          <Section
            title="Где кататься?"
            description="Популярные горнолыжные курорты и трассы рядом с вами."
            image='https://cdnn21.img.ria.ru/images/07e7/0b/1e/1912866312_0:77:1500:921_1920x0_80_0_0_770930446aff9041c22300b1eedba821.jpg'
          />
        </Link>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/equipment" component={Equipment}/>
        <Route path="/locations" component={Locations} />
        <Route path="/rental-info" component={RentalInfo} />
      </Switch>
    </Router>
  );
};

export default App;
