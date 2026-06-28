import React from 'react'
import { useState } from 'react';
import "./adder.css"
import { useScore } from '../contexts/scoreContext';
import { Teams } from '../constants/types';
import ShapeButton from './buttons/ShapeButton';


function Adder({ team, zone = Teams.neutral, onScoreChange }) {
    /**
     * Javascript goes here
     */
    const [num, setNum] = useState(0);

    const updateScore = (newNum) => {
        setNum(newNum)
        if (onScoreChange) {
            onScoreChange(newNum)
        }
    }

    function plus_one() {
        updateScore(num + 1)
    }



    function minus_one() {
        updateScore(Math.max(num - 1, 0))
    }

    // function parked() {
    //     if 
    // }


    let shapeType, color;
    if (team === Teams.red) {
        shapeType = 'circle';
        color = 'red';
    } else if (team === Teams.blue) {
        shapeType = 'square';
        color = 'blue';
    } else {
        shapeType = 'diamond';
        color = 'yellow';
    }


    /**
     * HTML Like content goes below here
     */
    return (
        <div className='adder'>
            <ShapeButton 
                type={shapeType}
                label={"-"}
                onClick={minus_one}
                color={color}
            />

            <div style={{ fontSize: 24, fontWeight: 'bold', margin: 8 }}>
                {num}
            </div>


            <ShapeButton 
                type={shapeType}
                label={"+"}
                onClick={plus_one}
                color={color}
            />
            


            {/* <button onClick={minus_one}>
                Minus One
            </button>
            <p>
                {num}
            </p>
            <button onClick={plus_one}>
                Add One
            </button> */}
            
        </div>
    )
}

export default Adder
