// pages.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Champion from './Champion';
import PickComponent from './PickComponent';
import html2canvas from 'html2canvas';
import { ChampionData, ChampionsResponse } from '../types';

async function fetchData() {
  const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.6.1/data/en_US/champion.json');
  if (!response.ok) {
    throw new Error('Failed to fetch champions');
  }
  const data: ChampionsResponse = await response.json();
  return Object.values(data.data);
}

const ChampionsPage: React.FC = () => {
  const [champions, setChampions] = useState<ChampionData[]>([]);
  const [pickedChampions, setPickedChampions] = useState<(ChampionData | null)[]>(new Array(10).fill(null));
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData().then(setChampions).catch(console.error);
  }, []);

  const handleChampionClick = (champion: ChampionData) => {
    if (pickedChampions.includes(champion)) {
      handleRemoveChampion(champion);
    } else {
      const index = pickedChampions.findIndex(c => c === null);
      if (index !== -1) {
        const newPickedChampions = [...pickedChampions];
        newPickedChampions[index] = champion;
        setPickedChampions(newPickedChampions);
      }
    }
  };

  const handleRemoveChampion = (champion: ChampionData) => {
    const updatedPickedChampions = pickedChampions.map(c => c === champion ? null : c);
    updatedPickedChampions.sort((a, b) => (a === null) ? 1 : (b === null) ? -1 : 0);
    setPickedChampions(updatedPickedChampions);
  };

  const downloadPickedChampionsImage = () => {
    const element = document.getElementById('pickedChampions');
    if (element) {
      html2canvas(element, { useCORS: true }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'picked-champions.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div>
      <div id="pickedChampions">
        <PickComponent pickedChampions={pickedChampions} onRemove={handleRemoveChampion} />
      </div>
      <div className="flex justify-center my-4">
        <button onClick={downloadPickedChampionsImage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Image
        </button>
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filter champions"
          className="mb-4"
        />
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-5 gap-2 mt-4 min-w-[value] mx-auto">
          {champions
            .filter(champion => champion.id.toLowerCase().startsWith(filter.toLowerCase()))
            .map(champion => (
              <div key={champion.id} onClick={() => handleChampionClick(champion)} className={`cursor-pointer ${pickedChampions.includes(champion) ? 'bg-blue-500' : ''}`}>
                <Champion champion={champion} />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChampionsPage;
