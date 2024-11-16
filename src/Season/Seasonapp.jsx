//src/Time/Seasonapp.jsx
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import Img from './season_picture.jpg';

const Season = forwardRef((props, ref) => {
  const [rotation, setRotation] = useState(-90);
  const [isDragging, setIsDragging] = useState(false);
  const circleRef = useRef(null);

  // 数字から月名へのマッピング
  const monthMapping = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  // 回転を計算する関数
  const calculateRotation = (event) => {
    if (!isDragging) return;

    const circle = circleRef.current;
    if (!circle) return;

    const rect = circle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    setRotation((angle * 180) / Math.PI);
  };

  // ドラッグ開始
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  // ドラッグ終了
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 現在の針が指している月番号を計算
  const getCurrentMonthNumber = () => {
    const normalizedRotation = (rotation + 90 + 360) % 360; // -90度を0度基準に正規化
    const closestIndex = Math.round(normalizedRotation / 30); // 30度刻み
    const numberMapping = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5]; // 数字の配置
    return numberMapping[closestIndex % 12]; // 配置された数字を取得
  };

  // 現在の月名を取得
  const getCurrentMonth = () => {
    const monthNumber = getCurrentMonthNumber();
    return monthMapping[monthNumber];
  };

  // 外部から`getCurrentMonth`を呼び出せるように設定
  useImperativeHandle(ref, () => ({
    getCurrentMonth,
  }));

  // 数字の位置を計算し、針に近い数字を大きくする
  const renderNumbers = () => {
    const radius = 120;
    const numberMapping = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];
    return Array.from({ length: 12 }, (_, i) => {
      const numberAngle = i * 30;
      const angleDiff = Math.abs(((rotation + 90 - numberAngle + 360) % 360));
      const scale = 1 + Math.max(0, 1 - angleDiff / 15);

      const angleInRadians = (numberAngle - 90) * (Math.PI / 180);
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
            transition: 'transform 0.1s ease',
          }}
        >
          {numberMapping[i]}
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
      onMouseMove={calculateRotation}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
          backgroundImage: `url(${Img})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {renderNumbers()}
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
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          onMouseDown={handleMouseDown}
          style={{
            width: '100px',
            height: '10px',
            backgroundColor: 'red',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transformOrigin: '0 50%',
            transform: `rotate(${rotation}deg)`,
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
});

export default Season;
