import React, { useState, useRef } from 'react';
import Img from './sun_moon.jpg';

const Time = () => {
  // 初期角度を -90 度（上向き）に設定
  const [rotation, setRotation] = useState(-90);
  const [isDragging, setIsDragging] = useState(false);
  const circleRef = useRef(null);

  // 回転を計算する関数
  const calculateRotation = (event) => {
    if (!isDragging) return; // ドラッグ中でなければ処理を停止

    const circle = circleRef.current;
    if (!circle) return;

    // 丸の中心位置を取得
    const rect = circle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // マウス位置と中心位置から角度を計算
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    setRotation((angle * 180) / Math.PI); // ラジアンを度に変換
  };

  // ドラッグ開始
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  // ドラッグ終了
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 数字の位置を計算し、針に近い数字を大きくする
  const renderNumbers = () => {
    const radius = 120; // 数字を配置する半径
    const numbers = Array.from({ length: 12 }, (_, i) => i * 2); // 0, 2, 4, ..., 22
    return numbers.map((num, i) => {
      const numberAngle = i * 30; // 各数字の角度（0度が12）
      const angleDiff = Math.abs(((rotation + 90 - numberAngle + 360) % 360)); // 角度差を0-180の範囲で求める
      const scale = 1 + Math.max(0, 1 - angleDiff / 15); // 角度差に応じてサイズをスムーズに変化

      const angleInRadians = (numberAngle - 90) * (Math.PI / 180); // 各数字の角度をラジアンに変換
      const x = radius * Math.cos(angleInRadians);
      const y = radius * Math.sin(angleInRadians);
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `calc(50% + ${y}px)`,
            left: `calc(50% + ${x}px)`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            fontSize: '20px',
            fontWeight: 'bold',
            transition: 'transform 0.1s ease', // サイズ変化を滑らかに
          }}
        >
          {num}
        </div>
      );
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '55vh',
      }}
      onMouseMove={calculateRotation} // マウス移動時に回転を計算
      onMouseUp={handleMouseUp}       // マウスが離れたときにドラッグ終了
      onMouseLeave={handleMouseUp}     // ウィンドウ外に出たときもドラッグ終了
    >
      {/* 外側の円 */}
      <div
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '5px solid gray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundImage: `url(${Img})`, // 修正: 画像を文字列として指定
          backgroundPosition: 'center', // 画像の中心を円の中心に配置
          backgroundSize: 'cover', // 画像を円に合わせて拡大縮小
        }}
      >
        {/* 数字 */}
        {renderNumbers()}

        {/* 中心の丸 */}
        <div
          ref={circleRef}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'blue',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // 中心に配置
          }}
        />

        {/* 棒 */}
        <div
          onMouseDown={handleMouseDown} // マウスが押されたときにドラッグ開始
          style={{
            width: '100px',
            height: '10px',
            backgroundColor: 'red',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transformOrigin: '0 50%', // 棒の左端を中心に固定
            transform: `rotate(${rotation}deg)`,
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
};

export default Time;












