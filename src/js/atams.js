import { BACKEND } from '.';
import { getBank } from './api';

export default function atams() {
  const section = document.createElement('section');
  section.classList.add('atams');
  const container = document.createElement('div');
  container.classList.add('container', 'atams__container');
  const title = document.createElement('h1');
  title.classList.add('atams__title');
  title.textContent = 'Карта банкоматов';

  const map = document.createElement('div');
  map.id = 'map';
  map.style = 'width: auto; max-width: 100%; height: 728px';

  section.append(container);
  container.append(title);
  container.append(map);

  function getMarkMap() {
    if ((localStorage.getItem('auth_token_skillbox') != null)) {
      const user = JSON.parse(localStorage.getItem('auth_token_skillbox'));

      getBank(user.token, BACKEND).then((data) => {
        ymaps.ready(init);
        function init() {
          const myMap = new ymaps.Map('map', {
            center: [55.76, 37.64],
            zoom: 10,

          });
          const myGeoObject = new ymaps.GeoObject({});
          const arrMark = [{ lat: '55.684758', lon: '37.738521' }, { lat: '55.684758', lon: '30.038521' }];
          myMap.geoObjects
            .add(myGeoObject);
          myMap.controls.remove('searchControl');
          for (let i = 0; i < data.payload.length; i++) {
            myMap.geoObjects.add(new ymaps.Placemark([data.payload[i].lat, data.payload[i].lon], {
              balloonContent: 'Coin',
            }, {
              preset: 'islands#icon',
              iconColor: '#0095b6',
            }));
          }
        }
      });
    }
  }

  getMarkMap();

  function createMap() {

  }
  createMap();
  return section;
}
