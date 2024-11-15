// src/components/Selector.jsx

import React from "react";

function Selector({ selected, setSelected, circleColors }) {
  // クリック時に選択された円のインデックスをAppのselected状態に反映
  const handleCircleClick = (index) => {
    setSelected(index);
  };

  return (
    <div style={styles.container}>
      {circleColors.map((color, index) => (
        <div
          key={index}
          style={{
            ...styles.circle,
            backgroundColor: color, // 各円の個別の色を適用
            ...(selected === index ? styles.selectedCircle : {}),
          }}
          onClick={() => handleCircleClick(index)}
        ></div>
      ))}
    </div>
  );
}

// スタイルの定義
const styles = {
  container: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  circle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  selectedCircle: {
    width: "60px",
    height: "60px",
  },
};

export default Selector;






