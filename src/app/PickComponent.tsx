// PickComponent.tsx
import React from 'react';
import Champion from './Champion';
import { ChampionData } from '../types';

interface PickComponentProps {
  pickedChampions: (ChampionData | null)[];
  onRemove: (champion: ChampionData) => void;
}

const PickComponent: React.FC<PickComponentProps> = ({ pickedChampions, onRemove }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-5 gap-2 min-w-[value] mx-auto">
        {pickedChampions.map((champion, index) => (
          <div key={index} onClick={() => champion && onRemove(champion)} className="cursor-pointer h-[240px] w-[160px] my-2 flex justify-center items-center">
            {champion ? (
              <Champion champion={champion} />
            ) : (
              <div className="empty-slot bg-gray-200 border border-gray-300 h-[240px] w-[160px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickComponent;


