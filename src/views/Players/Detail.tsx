import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useData } from '../../hooks/data';

export const PlayerDetail = () => {
    const { data, update } = useData();
    // @ts-ignore
    const { name } = useParams();
    const player = data.players.find(p => p.name.replaceAll(' ', '-') === name);
    const history = useHistory();
    if (!player) {
        return <div>not found</div>
    }

    return (
        <div>
            <h1>{player.name}</h1>
            <h2>status: {player.alive ? 'alive' : 'dead'}</h2>
            {player.alive && (
                <h2>
                    {/* eslint-disable-next-line */}
                    <a style={{ cursor: 'pointer' }} onClick={() => {
                        update((draft) => {
                            const index = draft.players.findIndex((p => p.name === player.name));
                            draft.players[index].alive = false;
                            draft.players[index].respawnAt = data.timestamp + data.respawn[player.party];
                            return draft;
                        })

                        const utterance = new SpeechSynthesisUtterance(
                            `${player.name} died.`
                        );
                        speechSynthesis.speak(utterance);
                        history.goBack();
                        // history.push('/players')
                    }}>I died</a>
                </h2>
            )}

            {
                player.party === 'defender' && (<h2>
                    {/* eslint-disable-next-line */}
                    <a style={{ cursor: 'pointer' }}
                        onClick={() => {
                            update((draft) => {
                                const index = draft.players.findIndex((p => p.name === player.name));
                                draft.players[index].party = 'mutant';
                                return draft;
                            })
                            const utterance = new SpeechSynthesisUtterance(
                                `${player.name} turned into brainless mutant.`
                            );
                            speechSynthesis.speak(utterance);
                            history.goBack();
                        }}
                    >I became mutant</a>
                </h2>)
            }
        </div>
    )
}