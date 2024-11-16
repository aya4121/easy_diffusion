// src/Color/Colorapp.jsx
import React, { useState, forwardRef, useImperativeHandle } from "react";
import CustomColorPicker from "./components/CustomColorPicker";
import Selector from "./components/Selector";

const Color = forwardRef((props, ref) => {
  const [selected, setSelected] = useState(0);
  const [color, setColor] = useState("#FF0000");
  const [circleColors, setCircleColors] = useState(
    Array(4).fill("#FF0000")
  );

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setCircleColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[selected] = newColor;
      return updatedColors;
    });
  };

  // 外部から現在のカラーリストを取得できるようにする
  useImperativeHandle(ref, () => ({
    getColors: () => circleColors,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '50px' }}>
      <CustomColorPicker onColorChange={handleColorChange} />
      <Selector
        selected={selected}
        setSelected={setSelected}
        circleColors={circleColors}
      />
    </div>
  );
});

export default Color;










