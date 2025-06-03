import React, { useEffect, useState } from "react";
import Winner, { HandleGameReset, HandleSquareClick, type valueType } from "~/util/gameLogic";
import { SquareRow } from "./SquareRow";
import { bestMove } from "~/util/gameLogic";

interface CurrentUserContextType {
    isGameOver: boolean,
    turn:"X"| "O",
    playersTurn:boolean,
    state:valueType[],
    setIsGameOver:React.Dispatch<React.SetStateAction<boolean>>,
    setTurn: React.Dispatch<React.SetStateAction<"X" | "O">>,
    setState:  React.Dispatch<React.SetStateAction<valueType[]>>,
    setPlayersTurn: React.Dispatch<React.SetStateAction<boolean>>,
  }
  
  export const AppState = React.createContext<CurrentUserContextType | null>(null)
  
  export const Board = (props: { gameStarted:boolean, setGameStarted:React.Dispatch<React.SetStateAction<boolean>>, playerPiece:"X" | "O"}) => {
    
    const [state, setState] = useState<valueType[] | any[]>([ 
      {value:null, id:0},  
      {value:null, id:1},  
      {value:null, id:2},  
      {value:null, id:3},  
      {value:null, id:4},  
      {value:null, id:5},  
      {value:null, id:6},  
      {value:null, id:7},  
      {value:null, id:8},  
    ])
  
    const [turn, setTurn] = useState<"X" | "O">("X");
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [playersTurn, setPlayersTurn] = useState<boolean>(props.playerPiece === turn ? true: false  );
  
    const ComputerPlay =()=>{
  
      // Computer only plays when the turn is not equal to the player's selected piece 
      if(turn != props.playerPiece && !isGameOver ){
        
            setTimeout(()=>{
                HandleSquareClick(isGameOver, turn, state, bestMove(state, props.playerPiece), setState, setTurn, setIsGameOver)
            }, 500) 
        }

    }
  
    useEffect(()=>{
      ComputerPlay() // check for the change in turns   
      }, [turn, props.playerPiece, isGameOver])
  
    
    return(
      <AppState.Provider value={{ isGameOver,setIsGameOver, turn,setTurn, setState, state, playersTurn, setPlayersTurn}} >
        <>
          <h1 className="mx-auto text-5xl font-bold " >Tic Tac Toe </h1>
  
          <div className={`bg-gray-700  w-[20rem] ${props.gameStarted ? "h-[20rem] show " : "hide"}  flex flex-col items-center justify-center rounded-3xl`} >
      
            <SquareRow data={ state.slice(0,3)} playersPiece={props.playerPiece} />
            <SquareRow data={ state.slice(3,6)} playersPiece={props.playerPiece} />
            <SquareRow data={ state.slice(6)}   playersPiece={props.playerPiece}/>
      
          </div>
  
          <div className={`${!isGameOver && "hidden" } flex flex-col absolute bottom-[1rem] lg:bottom-[5rem] md:bottom-[5rem]   justify-center w-[80%]  `} >
  
            <h1 className="text-2xl w-full flex justify-center " >Winner: {`${Winner(state)[0]}`}</h1>
  
            <button  onClick={ ()=> HandleGameReset(setIsGameOver, setState, setTurn)} style={{ cursor:"pointer" }} 
            className="bg-gray-400 font-bold p-[0.5rem] w-[100%] lg:w-[20%] md:w-[40%] rounded-3xl mt-1 self-center " >  Play Again?</button>  
  
          </div>
        </>
  
      </AppState.Provider>
  
    )
  }