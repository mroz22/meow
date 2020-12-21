import React from 'react';

import { PARTIES, Player } from '../provider';

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