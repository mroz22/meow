import React from 'react';
import { Link } from 'react-router-dom';

export const Control = () => {
    return (
        <div style={{ height: '100vh', alignItems: 'center' }}>

            <h1>
                <Link to="/players">Players</Link>
            </h1>
            <h1>
                <Link to="/map">Map</Link>
            </h1>

            <h1>
                <Link to="/command-center">Command center (defenders)</Link>
            </h1>

        </div>
    )
}