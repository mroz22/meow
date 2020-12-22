import React from 'react';

import { Map } from '../Map';
import { Party } from '../../components';
import { useData } from '../../hooks/data';

export const CommandCenter = () => {
    const { data } = useData();
    const commands = [{
        time: '10.00 - 12.00',
        text: 'Capture all scientific facilities (A-G) and hold them.'
    }, {
        time: '12.00',
        text: 'Explore ...'
    }];
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20vw', padding: '8px' }}>
                <h2>Commands</h2>
                { commands.map((c) => (
                    <div style={{ textAlign: 'left', marginBottom: '12px' }}>
                        <div style={{ fontSize: '0.8em', color: 'gray'}}>{c.time} </div>
                        <div>{c.text}</div>
                    </div>
                    
                ))}
            </div>
            <div style={{ width: '70vw' }}>
                <Map />
            </div>
            <div style={{ width: '10vw' }}>
                <h2>Defenders</h2>
                <Party
                    timestamp={data.timestamp}
                    members={data.players.filter(player => player.party === 'defender')}
                    name="" />
            </div>

        </div>
    )
}