import React, { useEffect, useState } from 'react'

import { useScore } from '../contexts/scoreContext';
import { Teams } from '../constants/types';
import Zone from '../components/zone';
import Midfield from '../components/midfield';
import Autonomous from '../components/autonomous';

function Override() {
    const [redTotal, setRedTotal] = useState(0);
    const [blueTotal, setBlueTotal] = useState(0);

    const [redAuton, setRedAuton] = useState(false)
    const [blueAuton, setBlueAuton] = useState(false)


    const [zones, setZones] = useState([
        { red: 0, blue: 0, neutral: 0, state: Teams.neutral},
        { red: 0, blue: 0, neutral: 0, state: Teams.neutral},
        { red: 0, blue: 0, neutral: 0, state: Teams.neutral},
        { red: 0, blue: 0, neutral: 0, state: Teams.neutral},
        { red: 0, blue: 0, neutral: 0, state: Teams.neutral, redBonus: 0, blueBonus: 0},
    ])

    const updateZone = (index, score) => {
        const updated = [...zones]
        updated[index] = score;
        setZones(updated)
    }

    useEffect(() => {
        let tmpRedTotal = 0;
        let tmpBlueTotal = 0;
        // for zone in zones:
        zones.forEach((zone) => {
            tmpRedTotal += (zone.red * 5)
            tmpBlueTotal += (zone.blue * 5)

            if (zone.state === Teams.red) {
                tmpRedTotal += (zone.neutral * 10)
            }
            if (zone.state === Teams.blue) {
                tmpBlueTotal += (zone.neutral * 10);
            }

            if (zone.redBonus) {
                tmpRedTotal += zone.redBonus
            }
            if (zone.blueBonus) {
                tmpBlueTotal += zone.blueBonus
            }
        })
        if (redAuton == true && blueAuton == true) {
            tmpRedTotal += 6
            tmpBlueTotal += 6
        }

        else if (redAuton == true) {
            tmpRedTotal += 12
        }
        else if (blueAuton == true) {
            tmpBlueTotal += 12
        }

        setRedTotal(tmpRedTotal)
        setBlueTotal(tmpBlueTotal)
    }, [zones, redAuton, blueAuton])

    console.log(zones)

    return (
        <div>
            <h1 style={{ marginTop: '20px', textAlign: 'center', fontSize: '2rem', fontWeight: '700' }}>Override Calculator</h1>
            <div style={{ marginTop: '20px', fontStyle: 'italic' }}>By: Kayra Han Sevinc</div>
            <div>Red Total: {redTotal}</div>
            <div>Blue Total: {blueTotal}</div>

            <Autonomous team={Teams.red} auton={redAuton} setAuton={setRedAuton}/>
            <Autonomous team={Teams.blue} auton={blueAuton} setAuton={setBlueAuton}/>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <div style={{ flex: '0 0 calc(50% - 10px)' }}>
                    <Zone onZoneChange={(score) => updateZone(0, score)} />
                </div>
                <div style={{ flex: '0 0 calc(50% - 10px)' }}>
                    <Zone onZoneChange={(score) => updateZone(1, score)} />
                </div>
                <div style={{ flex: '0 0 calc(50% - 10px)' }}>
                    <Zone onZoneChange={(score) => updateZone(2, score)} />
                </div>
                <div style={{ flex: '0 0 calc(50% - 10px)' }}>
                    <Zone onZoneChange={(score) => updateZone(3, score)} />
                </div>
                <div>
                    <Midfield onZoneChange={(score) => updateZone(4, score)} />
                </div>
                
            </div>
        </div>
    )
}

export default Override
