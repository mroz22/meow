import React from 'react';

import { Map } from '../Map';
import { Party } from '../../components';
import { useData } from '../../hooks/data';

export const CommandCenter = () => {
    const { data } = useData();

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '70vw' }}>
                <Map />
            </div>
            <div style={{ width: '30vw' }}>
                <Party
                    timestamp={data.timestamp}
                    members={data.players.filter(player => player.party === 'defender')}
                    name="" />
            </div>

        </div>
    )
}