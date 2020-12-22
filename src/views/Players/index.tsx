import React from 'react';

import { useData } from '../../hooks/data';
import { Party } from '../../components';

export const Players = () => {
    const { data } = useData();

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Party
                timestamp={data.timestamp}
                members={data.players.filter(player => player.party === 'mutant')}
                name="Mutants" />
            <Party
                timestamp={data.timestamp}
                members={data.players.filter(player => player.party === 'defender')}
                name="Defenders" />
        </div>
    )
}