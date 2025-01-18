import React from 'react';

const PlayerInfo = ({playerId}: {playerId: number}) => {
  const borderColor =
    playerId == 0 ? 'bg-red-200' :
      playerId == 1 ? 'bg-blue-200' :
        playerId == 2 ? 'bg-emerald-200' :
          playerId == 3 ? 'bg-purple-200' :
            playerId == 4 ? 'bg-amber-200' :
              playerId == 5 ? 'bg-fuchsia-200' :
                'bg-gray-500';
  const textColor =
    playerId == 0 ? 'text-red-500' :
      playerId == 1 ? 'text-blue-500' :
        playerId == 2 ? 'text-emerald-500' :
          playerId == 3 ? 'text-purple-500' :
            playerId == 4 ? 'text-amber-500' :
              playerId == 5 ? 'text-fuchsia-500' :
                'text-gray-500';
  return (
    <div className={`flex justify-center items-center border-2 ${borderColor} p-4 w-full`}>
      {/* Information about the current player */}
      <p className={`font-bold text-4xl ${textColor}`}>{playerId}番 チーム</p>
    </div>
  );
};

export default PlayerInfo;
