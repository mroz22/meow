import React, { useCallback, useEffect, useState } from 'react';
import { Context } from './context';

type ValueOf<T> = T[keyof T];


export const PARTIES = {
    MUTANT: 'mutant',
    DEFENDER: 'defender',
} as const;

export const MODS = {
    NORMAL: 'normal',
    ZOMBIE: 'zombie',
} as const;

export interface Player {
    name: string,
    alive: boolean,
    party: ValueOf<typeof PARTIES>,
    respawnAt: number,
}

// export type State = {
// difficulty: number;
// points: number;
// timestamp: number;
// timeLimit: number;
// mods:  ValueOf<typeof MODS>;
// respawn: {[key: ValueOf<typeof PARTIES>]: number};
// lost: boolean;
// won: boolean;
// players: Player[];
// }

export const initialState = {
    // time to discover vaccine
    difficulty: 180,
    // current points
    points: 0,
    timestamp: 0,
    timeLimit: 180,
    mod: MODS.NORMAL,
    respawn: {
        [PARTIES.MUTANT]: 30,
        [PARTIES.DEFENDER]: 10,
    },
    lost: false,
    won: false,
    players: [{
        name: 'Granatovy Joe',
        alive: true,
        party: PARTIES.MUTANT,
        respawnAt: 0,
    }, {
        name: 'Ferenc Ledwinka',
        alive: true,
        party: PARTIES.DEFENDER,
        respawnAt: 0,
    }, {
        name: 'Ferenc Ledwinka 2',
        alive: true,
        party: PARTIES.MUTANT,
        respawnAt: 0,
    }, {
        name: 'Boris Pecinka',
        alive: false,
        party: PARTIES.MUTANT,
        respawnAt: 0,
    }],
    facilities: [{
        name: 'A',
        active: true,
        x: 680,
        y: 270,
        name_short: 'A',
    }, {
        name: 'B',
        active: true,
        x: 535,
        y: 280,
        name_short: 'B',
    }, {
        name: 'C',
        active: false,
        x: 365,
        y: 330,
        name_short: 'C',
    }, {
        name: 'D',
        active: false,
        x: 290,
        y: 470,
        name_short: 'D',
    }, {
        name: 'E',
        active: false,
        x: 340,
        y: 630,
        name_short: 'E',
    }, {
        name: 'F',
        active: false,
        x: 500,
        y: 690,
        name_short: 'F',
    }, {
        name: 'G',
        active: false,
        x: 660,
        y: 630,
        name_short: 'G',
    }],
};

export type Manipulator<T> = (draft: T) => T;

export const Provider: React.FunctionComponent = (props) => {
    const [data, setData] = useState(initialState);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    const update = useCallback((manipulator: Manipulator<typeof initialState>) => {
        const updated = manipulator({ ...data });
        setData({ ...updated });
    }, [data])

    useEffect(() => {
        if (!timer) {
            const interval = setInterval(() => {
                setData((prev) => {
                    const draft = { ...prev };
                    draft.timestamp++
                    draft.points += draft.facilities.filter(f => f.active).length;
                    return draft;
                })
            }, 1000);

            setTimer(interval);
        }

        return () => {
            if (timer) clearInterval(timer);
        };

    }, [timer]);

    useEffect(() => {
        if (data.timestamp >= data.timeLimit) {
            setData((data) => { data.lost = true; return data });

            if (timer) {
                clearInterval(timer);
            }
            return;
        }
        if (data.points >= data.difficulty) {
            setData((data) => { data.won = true; return data });
            if (timer) {
                clearInterval(timer);
            }
            return;
        }

        data.players.forEach((player, index) => {
            if (!player.alive && player.respawnAt <= data.timestamp) {
                player.alive = true;

                const utterance = new SpeechSynthesisUtterance(
                    `${player.name} is back to life.`
                );
                speechSynthesis.speak(utterance);
                data.players[index] = player;
                update(() => data);
            }
        });

    }, [data.points, data.difficulty, data.timestamp, data.timeLimit, data.players, timer, update, data])

    return (
        <Context.Provider value={{
            data,
            update,
        }}>
            {props.children}
        </Context.Provider>
    )
}