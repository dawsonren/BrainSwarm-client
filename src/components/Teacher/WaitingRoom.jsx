import React, { useEffect } from 'react';
import { socket } from '../../socket';

export const WaitingRoom = ({roomID, finished}) => {
    useEffect(() => {
        socket.connect();

        
    })

    return (
        <div>
            <h3 className="mb-3">Type the code</h3>
            <h1 className="mb-3">{roomID}</h1>
            <h3 className="mb-5">into your browser!</h3>
            <button className="btn btn-primary" onClick={finished}>Let's get this party started!</button>
        </div>
    )
}