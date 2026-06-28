import React from 'react'

function Autonomous({team, auton, setAuton}) {
    return (<div>
        <input
            type='checkbox'
            checked={auton}
            onChange={() => setAuton(!auton)}
        />

    </div>)
    
}

export default Autonomous;
