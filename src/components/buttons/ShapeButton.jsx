import React from 'react' 
import "./ShapeButton.css"

function ShapeButton({ type, label, onClick, color, size = 60}) {
    return (
        <div
         className={`shape-button ${type}`}
         onClick={onClick}
         style={{
            width: size,
            height: size,
            backgroundColor: color,
         }}
        >
            <span>{label}</span>
        </div>
    )
}

export default ShapeButton;
