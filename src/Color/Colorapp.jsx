// src/App.jsx

import React, { useState } from "react";
import CustomColorPicker from "./components/CustomColorPicker";
import Selector from "./components/Selector";

const Color = () => {
  // 現在選択されている円のインデックス（位置）を保持
  const [selected, setSelected] = useState(0);
  // ColorPickerで選択された色を保持
  const [color, setColor] = useState("#FF0000");
  // 各円の色を管理する状態。初期色として#FF0000を設定
  const [circleColors, setCircleColors] = useState(
    Array(4).fill("#FF0000")
  );

  // 色が変更されたときのコールバック関数
  const handleColorChange = (newColor) => {
    setColor(newColor);
    // 選択中の円の色を更新
    setCircleColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[selected] = newColor;
      return updatedColors;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '50px' }}>
      <CustomColorPicker onColorChange={handleColorChange} />
      {/* CustomColorPickerの下にSelectorを配置 */}
      <Selector
        selected={selected}
        setSelected={setSelected}
        circleColors={circleColors}
      />
    </div>
  );
}

export default Color;









