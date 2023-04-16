import React, { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { RollScreen } from './RollScreen';
import { NameView } from './NameView';


export const Student = () => {
  const [seeNameView, setSeeNameView] = useState(true)
  const [username, setUsername] = useState('')
  const [roomID, setRoomID] = useState('')

  // lifecycle
  useEffect(() => {
    socket.connect();

    return () => {
      // disconnect
    };
  }, []);

  function enterRoom() {
    setSeeNameView(false)
  }

  return (
    <div className="App">
      {seeNameView ? 
        <NameView username={username} setUsername={setUsername} roomID={roomID} setRoomID={setRoomID} finished={enterRoom} /> :
        <RollScreen username={username} />
      }
    </div>
  );
}

