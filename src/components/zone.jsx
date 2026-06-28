 import React from 'react'
import Adder from '../components/adder';
import { Teams } from '../constants/types';
import { useState } from 'react';


function Zone({ onZoneChange }) {
    const [zone, setZone] = useState(Teams.neutral)

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

    const emitChange = (scores, currentZone) => {

        const red = scores.red
        const blue = scores.blue
        const neutral = scores.neutral
        const state = currentZone

        if (onZoneChange) {
            onZoneChange({ red, blue, neutral, state })
        }
    }

    const handleScoreChange = (team, score) => {
        const updated = {
            ...adderScores,
            [team]: score
        }

        setAdderScores(updated)
        emitChange(updated, zone)
    }

    const handleZoneChange = (newZone) => {
        setZone(newZone);
        emitChange(adderScores, newZone)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, backgroundColor: getZoneColor(zone), padding: 12,
          borderRadius: 12,
          transition: 'background-color 0.2s ease'}}>
            <Adder team={Teams.neutral} zone={zone} onScoreChange={(score) => handleScoreChange(Teams.neutral, score)}/>
            <Adder team={Teams.red} onScoreChange={(score) => handleScoreChange(Teams.red, score)}/>
            <Adder team={Teams.blue} onScoreChange={(score) => handleScoreChange(Teams.blue, score)}/>

            <div>
                <button onClick={() => handleZoneChange(Teams.red)}>
                    Red
                </button>
                <button onClick={() => handleZoneChange(Teams.neutral)}>
                    Neutral
                </button>
                <button onClick={() => handleZoneChange(Teams.blue)}>
                    Blue
                </button>
            </div>
        </div>
    )
}

export default Zone


