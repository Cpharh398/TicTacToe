import type { Route } from "./+types/home";
import { useState } from "react";
import { GameConfig } from "./components/GameConfig";
import { Board } from "./components/Board";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tic Tac Toe" },
    { name: "description", content: "Offline Tic Tac Toe Game" },
  ];
}

export default function Home() {

    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [playerPiece, setPlayersPiece] = useState<"X"| "O">("X");

    return (

      <div className="bg-gray-900 h-full w-full flex flex-col items-center justify-center " >
        <Board gameStarted={gameStarted} setGameStarted={setGameStarted} playerPiece={playerPiece} />
        <GameConfig gameStarted={gameStarted} setGameStarted={setGameStarted} setPlayersPiece={setPlayersPiece} />
      </div>
  );
}
