export interface ChampionData {
    id: string;
    name: string;
    title: string;
    image: {
        full: string;
    };
}

export interface ChampionsResponse {
    data: { [key: string]: ChampionData };
}
