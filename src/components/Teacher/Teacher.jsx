import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';
import HistogramChart from './Histogram';
import { WaitingRoom } from './WaitingRoom';

export const Teacher = () => {
  const [increment, setIncrement] = useState(0);
  const [counters, setCounters] = useState([0, 0, 0, 0, 0, 0]);
  const [rollCount, setRollCount] = useState(0);
  const [finished, setFinished] = useState(false)
  const [roomID, setRoomID] = useState(null)

  // lifecycle
  useEffect(() => {
    socket.connect();

    console.log('restart')

    socket.emit("new room", (response) => {
      console.log(response)
      setRoomID(response.roomID)
    });

    return () => {
      // disconnect
      socket.off("new room")
    };
  }, []);

  useEffect(() => {
    socket.on('receiveIncrement', receiveIncrement);

    return () => {
      socket.off('receiveIncrement', receiveIncrement);
    };
  }, [counters]);

  function receiveIncrement(num) {
    console.log(`received ${num}`);
    setIncrement(increment + num);
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[num - 1] += 1;
      return newCounters;
    });
    setRollCount((prevRollCount) => prevRollCount + 1);
  }

  return (
    <>
      {finished ?
        (
          <div className="App" style={{width: '500px'}}>
            <div className="badge bg-secondary mb-5">Room ID: {roomID}</div>
            <h1>Law of Large Numbers</h1>
            <div className="text-break mb-3">The  average of the results obtained from a large number of trials should be close to the expected value.</div>
            <div className="d-flex flex-row d-flex justify-content-between" style={{width: '500px'}}>
              <h4>Sample Mean: {rollCount === 0 ? 0 : Math.round(increment * 100 / rollCount) / 100}</h4>
              <h4>True Mean: 3.5</h4>
            </div>
            <h5>Histogram</h5>
            <HistogramChart data={counters} />
          </div>
        ) :
        <WaitingRoom roomID={roomID} finished={() => setFinished(true)} />
      }
    </>
  );
};
