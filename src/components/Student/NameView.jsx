import React, { useState } from 'react';
import { socket } from '../../socket';

export const NameView = ({ username, setUsername, roomID, setRoomID, finished }) => {
    const famousPeople = ['Thomas Bayes', 'Tim Berners-Lee', 'Andrey Kolmogorov', 'Alan Turing', 'Barbara Liskov', 'Grace Hopper', 'Ada Lovelace']
    const [famousPerson, setFamousPerson] = useState(famousPeople[Math.floor(Math.random() * famousPeople.length)])
    const [error, setError] = useState(false)

    function submit() {
        if (username.length >= 2) {
            finished()
            setError(false)
            socket.emit(`join ${roomID}`, username)
        } else {
            setError(true)
        }
    }

    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-center align-items-center">
                <h2 className="mr-2">Are you ready to join the swarm?</h2>
            </div>
            <label htmlFor="code">What room number?</label>
            <div className="input-group mt-2">
                <input className="form-control" placeholder="Room Number (ex. 2357)"
                    onChange={(e) => setRoomID(e.target.value)} />
            </div>
            <label htmlFor="name" className="mt-3">Who's joining?</label>
            <div className="input-group mt-2">
                <input type="text" className="form-control"
                    placeholder={famousPerson}
                    onChange={(e) => setUsername(e.target.value)} />
            </div>
            {error && (
                <div className="text-danger">
                    Please provide a valid username.
                </div>
            )}
            <button className="btn btn-primary mt-2" type="button" onClick={() => submit(username, roomID)}>Join</button>
        </div>
    )
}