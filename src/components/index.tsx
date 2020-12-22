import React from 'react';
import { Link } from 'react-router-dom';

import { Player } from '../provider';

export const Icon = ({ icon }: { icon: Player['party'] }) => {
    switch (icon) {
        case 'defender':
            return <>&#128100;</>;
        case 'mutant':
            return <>&#128025;</>
    }
}

export const PlayerIcon = ({ player }: { player: Player }) => {
    return (
        <span style={{ border: `2px solid ${player.alive ? 'green' : 'red'} ` }}>
            <Icon icon={player.party} />
        </span>
    )
}

export const Party = ({ members, name, timestamp }: { members: Player[], name: string, timestamp: number }) => {
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