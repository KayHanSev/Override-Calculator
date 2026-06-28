import React from 'react'
import { useState, useEffect } from 'react';
import "./adder.css"
import { useScore } from '../contexts/scoreContext';
import { Teams } from '../constants/types';
import Adder from './adder';
import Park from './park';


function Midfield({ onZoneChange }) {
    const [zone, setZone] = useState(Teams.neutral)
    
    const [parked, setParked] = useState({
        red: [false, false],
        blue: [false, false]
    })

    const [adderScores, setAdderScores] = useState({
        neutral: 0,
        red: 0,
        blue: 0
    })

    const getZoneColor = (zone) => {
        if (zone === Teams.red) return '#ffdddd';
        if (zone === Teams.blue) return '#dde7ff';
        return '#f5f5f5'; // neutral
    };

    const countBonus = (arr) => (arr || []).filter(Boolean).length * 8;

    const emitChange = (scores, currentZone, parkedState) => {
        const red = scores.red
        const blue = scores.blue
        const neutral = scores.neutral

        let redBonus = countBonus(parkedState.red)
        let blueBonus = countBonus(parkedState.blue)

        let state = Teams.neutral
        if (redBonus > blueBonus) {
            state = Teams.red
        }
        else if (blueBonus > redBonus) {
            state = Teams.blue
        }

        setZone(state)

        if (onZoneChange) {
            onZoneChange({ red, blue, neutral, state, redBonus, blueBonus })
        }
    }

    const handleParkedChange = (update) => {
        setParked(prev => {
            const newState = typeof update === 'function' ? update(prev) : update

            emitChange(adderScores, zone, newState);
            return newState
        })
    }


    const handleScoreChange = (team, score) => {
        const updated = {
            ...adderScores,
            [team]: score
        }

        setAdderScores(updated)
        emitChange(updated, zone, parked)
    }

    const handleZoneChange = (newZone) => {
        setZone(newZone);
        emitChange(adderScores, newZone, parked)
    }



    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, backgroundColor: getZoneColor(zone), padding: 12,
          borderRadius: 12,
          transition: 'background-color 0.2s ease'}}>

            <Park
                team={Teams.red}
                parked={parked}
                setParked={handleParkedChange}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

                <Adder team={Teams.neutral} x={zone} onScoreChange={(score) => handleScoreChange(Teams.neutral, score)}/>
                <Adder team={Teams.red} onScoreChange={(score) => handleScoreChange(Teams.red, score)}/>
                <Adder team={Teams.blue} onScoreChange={(score) => handleScoreChange(Teams.blue, score)}/>

            </div>


            <Park
                team={Teams.blue}
                parked={parked}
                setParked={handleParkedChange}
            />
        </div>
    )
}

export default Midfield;