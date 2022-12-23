import ymaps from 'ymaps'

export function createYandexMap (adress) {
  
  
  ymaps.load("https://api-maps.yandex.ru/2.1/?apikey=11eb3ace-b7a7-4f8d-a457-c0679f545196&lang=ru_RU").then(maps => {
    var geocoder = maps.geocode(adress);
    let map;
    geocoder.then(
      function (res) {
        // координаты объекта
        var coordinates = res.geoObjects.get(0).geometry.getCoordinates();
        map = new maps.Map('map', {
          center: coordinates ,
          zoom: 10,
        })
       }
    );
    // После того, как поиск вернул результат, вызывается callback-функция
    geocoder.then(
        function (res) {
          // координаты объекта
          var coordinates = res.geoObjects.get(0).geometry.getCoordinates();
         
          // Добавление метки (Placemark) на карту
          var placemark = new maps.Placemark(
              coordinates, {
                  'hintContent': adress,
                  'balloonContent': `${adress}`
              }, {
                  'preset': 'islands#redDotIcon'
              }
          );
          map.geoObjects.add(placemark);
        }
      );
  });
}