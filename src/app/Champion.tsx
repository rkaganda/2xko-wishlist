// Champion.tsx
import React from 'react';
import { ChampionData } from '../types';

interface ChampionProps {
    champion: ChampionData;
}

const Champion: React.FC<ChampionProps> = ({ champion }) => {
    const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;

    return (
        <div>
            <h2>{champion.name}</h2>
            <img src={imageUrl} alt={champion.name} className="h-[240px] w-[160px] object-contain" />
        </div>
    );
};

export default Champion;