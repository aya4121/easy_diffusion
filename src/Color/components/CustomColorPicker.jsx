// src/components/CustomColorPicker.jsx

import React from "react";
import ColorPicker from "react-color-picker-wheel";

function CustomColorPicker({ onColorChange }) {
  return (
    <ColorPicker
      initialColor="#FF0000"
      onChange={(color) => {
        console.log(color); // コンソール出力
        onColorChange(color.hex); // 色が変更されたときに親コンポーネントに伝える
      }}
      size={220}
    />
  );
}

export default CustomColorPicker;

