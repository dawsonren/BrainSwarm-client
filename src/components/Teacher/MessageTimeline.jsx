import React, { useState, useEffect } from 'react';

const MessageTimeline = ({ message }) => {
  const [messages, setMessages] = useState([]);

  // Function to add a new message to the timeline
  const addMessageToTimeline = (newMessage) => {
    // Reverse the order of messages and limit to 5
    setMessages((prevMessages) => [
      newMessage,
      ...prevMessages.slice(0, 4), // Limit to 4 previous messages to show a maximum of 5 messages
    ]);
  };

  useEffect(() => {
    // Add the incoming message to the timeline
    if (message) {
      addMessageToTimeline(message.split('@#$%')[0]);
    }
  }, [message]); // Only run the effect when the message prop changes

  return (
    <div>
      <h1>Message Timeline</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // Keep messages in column direction
          maxHeight: '300px', // Set a maximum height for the messages
          overflowY: 'auto', // Add vertical scrollbar if overflow occurs
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              opacity: index === 0 ? 1 : 0.5, // Make the most recent message fully opaque and fade others
              transition: 'opacity 0.5s ease-in-out', // Add transition effect
              backgroundColor: index === 0 ? 'green' : 'white', // Make the most recent message green
              color: index === 0 ? 'white' : 'black', // Set text color for the most recent message
              border: 'none', // Remove border
              borderRadius: '4px',
              padding: '8px',
              margin: '0', // Remove margin
              marginBottom: '4px', // Add spacing between cards
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow effect
            }}
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageTimeline;
