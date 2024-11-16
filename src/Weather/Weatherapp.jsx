//src/Weather/Weatherapp.jsx
import React, { useState, forwardRef, useImperativeHandle } from 'react';

// 画像をインポート
import sunnyImg from './imgs/sunny.png';
import cloudyImg from './imgs/cloudy.png';
import rainyImg from './imgs/rainy.png';
import snowImg from './imgs/snow.png';
import stormImg from './imgs/storm.png';
import rainbowImg from './imgs/rainbow.png';
import partialcloudyImg from './imgs/partialcloudy.png';
import tornadoImg from './imgs/tornado.png';
import windImg from './imgs/wind.png';

const Weather = forwardRef((props, ref) => {
  // 初期値を'sunny'に設定
  const [selectedWeather, setSelectedWeather] = useState('sunny');

  // 画像情報のマッピング
  const weatherImages = [
    { type: 'sunny', img: sunnyImg },
    { type: 'cloudy', img: cloudyImg },
    { type: 'rainy', img: rainyImg },
    { type: 'snow', img: snowImg },
    { type: 'storm', img: stormImg },
    { type: 'rainbow', img: rainbowImg },
    { type: 'partialcloudy', img: partialcloudyImg },
    { type: 'tornado', img: tornadoImg },
    { type: 'wind', img: windImg },
  ];

  // 外部から選択された天気を取得できるようにする
  useImperativeHandle(ref, () => ({
    getSelectedWeather: () => selectedWeather,
  }));

  // クリックイベントハンドラ
  const handleImageClick = (type) => {
    setSelectedWeather(type);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {weatherImages.map(({ type, img }) => (
          <img
            key={type}
            src={img}
            alt={`${type} weather`}
            onClick={() => handleImageClick(type)}
            style={{
              width: selectedWeather === type ? '120px' : '100px',
              height: selectedWeather === type ? '120px' : '100px',
              transform: selectedWeather === type ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s, width 0.3s, height 0.3s',
              boxShadow: selectedWeather === type ? '0px 4px 15px rgba(0, 0, 0, 0.3)' : 'none',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
});

export default Weather;
