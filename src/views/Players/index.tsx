import React from 'react';
import { Link } from 'react-router-dom';

import { useData } from '../../hooks/data';
import { PlayerIcon } from '../../components';
import { Player } from '../../provider';

const Party = ({ members, name, timestamp }: { members: Player[], name: string, timestamp: number }) => {
    return (
        <div style={{ alignSelf: 'flex-start', flex: 1 }}>
            <div>{name}</div>
            {members.map(((m) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }} key={m.name}>
                        <Link to={`/players/${m.name.replaceAll(' ', '-')}`} key={m.name} style={{ display: 'flex', textAlign: 'left', margin: '4px' }}>
                            <PlayerIcon player={m} />
                            <span style={{ marginLeft: '16px' }}>{m.name}</span>

                        </Link>
                        { m.respawnAt >= timestamp && (
                            <span style={{ marginLeft: '16px', fontSize: '0.8em' }}> respawn: {m.respawnAt - timestamp}</span>
                        )}
                    </div>
                )
            }))}
        </div>
    )
}

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