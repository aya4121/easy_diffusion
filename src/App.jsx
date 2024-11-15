// src/App.jsx
import React from 'react';
import Color from './Color/Colorapp';
import Weather from './Weather/Weatherapp';
import Season from './Season/Seasonapp';
import Time from './Time/Timeapp';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
      {/* 上部の3つのコンポーネントを横並びで表示 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '120px', width: '100%' }}>
        <Color />
        <Season />
        <Time />
      </div>
      
      {/* 下部のWeatherappを配置 */}
      <div>
        <Weather />
      </div>
    </div>
  );
};

export default App;


