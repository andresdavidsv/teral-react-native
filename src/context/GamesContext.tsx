import React, {createContext, useEffect, useState} from 'react';
import api from '../api/api';
import {Game, GamesResponse} from '../interfaces/appInterfaces';

type GamesContextProps = {
  games: Game[];
  loadGames: () => Promise<void>;
  addGame: (categoryId: string, productName: string) => Promise<Game>;
  updateGame: (
    categoryId: string,
    productName: string,
    gameId: string,
  ) => Promise<void>;
  deleteGame: (id: string) => Promise<void>;
  loadGameById: (id: string) => Promise<Game>;
};

export const GamesContext = createContext({} as GamesContextProps);

export const GamesProvider = ({children}: any) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    const resp = await api.get<GamesResponse>('/games?limite=50');
    setGames([...resp.data.games]);
  };

  const addGame = async (
    categoryId: string,
    productName: string,
  ): Promise<Game> => {
    const resp = await api.post<Game>('/games', {
      nombre: productName,
      categoria: categoryId,
    });
    setGames([...games, resp.data]);

    return resp.data;
  };

  const updateGame = async (
    categoryId: string,
    productName: string,
    gameId: string,
  ) => {
    const resp = await api.put<Game>(`/games/${gameId}`, {
      nombre: productName,
      categoria: categoryId,
    });
    setGames(
      games.map(gm => {
        return gm._id === gameId ? resp.data : gm;
      }),
    );
  };

  const deleteGame = async () => {};

  const loadGameById = async (id: string): Promise<Game> => {
    const resp = await api.get<Game>(`games/${id}`);
    return resp.data;
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        loadGames,
        addGame,
        updateGame,
        deleteGame,
        loadGameById,
      }}>
      {children}
    </GamesContext.Provider>
  );
};
