import React from 'react';
import { useData } from '../../hooks/data';
import MapImg from '../../images/map.png';

export const Map = () => {
    const { data, update } = useData();
    const progress = (data.points / data.difficulty) * 100;

    const timeToDiscover = Math.round((data.difficulty - data.points) / data.facilities.filter(f => f.active).length);



    return (
        <>
{/* 
            <div style={{ alignSelf: 'flex-start' }}>
                {data.players.filter((player) => player.party === 'defender').map((player) => (
                    <span style={{ border: `2px solid ${player.alive ? 'green': 'red'} `}}>
                        &#128100;
                    </span>

                ))}
            </div>

            <div style={{ alignSelf: 'flex-start' }}>
                {data.players.filter((player) => player.party === 'mutant').map((player) => (
                    <span style={{ border: `2px solid ${player.alive ? 'green': 'red'} `}}>
                        &#128025;

                    </span>

                ))}
            </div> */}

            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="40 0 1022 944"
            >
                <image
                    width="1022"
                    height="944"
                    xlinkHref={MapImg}
                ></image>
                {data.facilities.map((facility, index) => {
                    return (
                        <React.Fragment key={facility.name}>
                            <text x={facility.x - 6} y={facility.y + 6} fill="white">
                                {facility.name_short}
                            </text>
                            <circle
                                cx={facility.x}
                                cy={facility.y}
                                r="40"
                                fill={facility.active ? 'green' : 'red'}
                                onClick={() => update((draft) => {
                                    draft.facilities[index].active = !facility.active;
                                    return draft;
                                })}
                            >
                                <animate attributeType="SVG" attributeName="r" begin="0s" dur="1.5s" repeatCount="indefinite" from="20" to="40" />
                                <animate attributeType="CSS" attributeName="opacity" begin="0s" dur="1.5s" repeatCount="indefinite" from="0.7" to="0" />
                            </circle>
                        </React.Fragment>
                    );
                })}
                <text x="500" y="500" fill="white">
                    progress: {progress.toFixed(2)}%
                </text>
                <text x="500" y="530" fill="white">
                    time to discover: {timeToDiscover}
                </text>
                <text x="500" y="560" fill="white">
                    limit: {data.timeLimit - data.timestamp}
                </text>
            </svg>
            {/* &#127875; */}

        </>
    )
}