import React from 'react';
import "./EmotionItem.scss";

const EmotionItem = ({ id, img, name, onClick, isSelected }) => {
  const handleOnClick = () => {
    onClick(id);
  }
  return (
    <div 
      className={[ 
      "EmotionItem", 
      isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`,
      ].join(" ")}
      onClick={handleOnClick}
      >
      <div className='EmotionItem' onClick={handleOnClick}>
        <img alt={`emotion${id}`} src={img} />
          <span>{name}</span>
      </div>
    </div>
  )
}

export default React.memo(EmotionItem);