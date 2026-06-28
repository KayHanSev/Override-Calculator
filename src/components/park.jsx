import React from 'react'

function Park({ team, parked, setParked}) {
    return (
    <div>
        <input
            type='checkbox'
            checked={parked[team][0]}
            onChange={() => setParked(prev => ({
                ...prev,
                [team] : [
                    !prev[team][0],
                    prev[team][1]
                ]
            }))}
        />
        <input
            type='checkbox'
            checked={parked[team][1]}
            onChange={() => setParked(prev => ({
                ...prev,
                [team] : [
                    prev[team][0],
                    !prev[team][1]
                ]
            }))}
        />


    </div>
    )
}

export default Park;
