//src/App.jsx
import React, { useRef, useState } from 'react';
import Color from './Color/Colorapp';
import Weather from './Weather/Weatherapp';
import Season from './Season/Seasonapp';
import Time from './Time/Timeapp';

const App = () => {
  const timeRef = useRef(null);
  const seasonRef = useRef(null);
  const weatherRef = useRef(null);
  const colorRef = useRef(null);

  const [prompt, setPrompt] = useState(''); // プロンプトを保存
  const [generatedImage, setGeneratedImage] = useState(null); // 生成された画像のURLを保存
  const [loading, setLoading] = useState(false); // ローディング状態

  // 数字をAM/PMフォーマットに変換する関数
  const formatTime = (timeNumber) => {
    const isPM = timeNumber >= 12;
    const hour = timeNumber % 12 === 0 ? 12 : timeNumber % 12;
    const period = isPM ? 'PM' : 'AM';
    return `${hour}:00 ${period}`;
  };

  const handleStart = async () => {
    setLoading(true); // ローディング開始
    let generatedPrompt = 'Please create a landscape image using the following colors. ';

    if (colorRef.current) {
      const currentColors = colorRef.current.getColors();
      generatedPrompt += `Use ${currentColors.join(', ')} as the main colors. `;
    }

    if (timeRef.current) {
      const currentTimeNumber = timeRef.current.getCurrentNumber();
      const formattedTime = formatTime(currentTimeNumber);
      generatedPrompt += `${formattedTime}`;
    }

    if (seasonRef.current) {
      const currentSeason = seasonRef.current.getCurrentMonth();
      generatedPrompt += ` in ${currentSeason}`;
    }

    if (weatherRef.current) {
      const currentWeather = weatherRef.current.getSelectedWeather();
      generatedPrompt += `, ${currentWeather}`;
    }

    setPrompt(generatedPrompt); // プロンプトを保存

    // Hugging Face APIに送信
    const imageUrl = await fetchImageFromHuggingFace(generatedPrompt);
    setGeneratedImage(imageUrl); // 生成された画像を保存
    setLoading(false); // ローディング終了
  };

  // Hugging Face APIを使用して画像生成
  const fetchImageFromHuggingFace = async (generatedPrompt) => {
    const API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large-turbo';
 // モデル名を指定
    const API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: generatedPrompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image from Hugging Face API');
      }

      const data = await response.blob(); // 画像データを取得
      return URL.createObjectURL(data); // ブラウザで表示可能なURLを作成
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '120px', width: '100%' }}>
        <Color ref={colorRef} />
        <Season ref={seasonRef} />
        <Time ref={timeRef} />
      </div>
      <div>
        <Weather ref={weatherRef} />
      </div>
      <button
        onClick={handleStart}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          fontSize: '30px',
          fontWeight: 'bold',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '250px',  
          height: '60px', 
        }}
        disabled={loading} // ローディング中はボタンを無効化
      >
        {loading ? 'Generating...' : 'Start'}
      </button>
      {prompt && (
        <p style={{ marginTop: '10px', fontSize: '18px', textAlign: 'center', whiteSpace: 'pre-wrap' }}>
          {prompt}
        </p>
      )}
      {generatedImage && (
        <img
          src={generatedImage}
          alt="Generated Landscape"
          style={{ marginTop: '20px', width: '300px', height: 'auto', borderRadius: '10px' }}
        />
      )}
    </div>
  );
};

export default App;


