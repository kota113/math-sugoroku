import React from 'react';

interface PlayerProps {
  name: string;
  position: number;
}

const Player: React.FC<PlayerProps> = ({ name, position }) => {
  return (
    <div>
      <p>{name} is at position {position}</p>
    </div>
  );
};

export default Player;
