import { useContext, useEffect, useState } from "react";
import Winner, { HandleSquareClick, type valueType } from "~/util/gameLogic";
import "../../app.css"
import { AppState } from "./Board";


export const Square = (props:{ value: valueType, playersPiece:"X" | "O"})=>{
 
    const context = useContext(AppState);
    const [scale, setScale] = useState<number>(1)
    const [backgroundColor, setBackGroundColor] = useState<string>("");

    const isPlayersTurn = ()=>{
        return context?.turn === props.playersPiece 
    }
  
    useEffect(()=>{
      if(context?.isGameOver){
  
        const winner = Winner(context.state)
  
        // scale squares when game is over
        if(winner[0] === "Draw"){
          setScale(0.9)
          setBackGroundColor("lightgrey")
          return
        } 

        let [a, b, c]: number[] = Winner(context.state)?.[1]!

        // scale up winning squares and change their colors
        if(props.value.id == a || props.value.id == b || props.value.id === c){
            setScale(1.07)
            setBackGroundColor( winner[0] === props.playersPiece ? "lightgreen": "red")
        }else{
            setScale(0.9)
            setBackGroundColor("lightgrey")
          }
       return   
      }
  
      setScale(1)
      setBackGroundColor("")
  
    }, [context?.isGameOver])
  
     return(
  
      <div onClick={()=> isPlayersTurn() && HandleSquareClick(context?.isGameOver, context?.turn, context?.state, props.value.id, context?.setState,context?.setTurn, context?.setIsGameOver)}  
      style={{ cursor:'pointer', scale: scale, transition: 'scale 0.9s ease', backgroundColor:backgroundColor }} className="bg-gray-300 aspect-square md:w-[7rem]  transition-transform  h-4/5 flex justify-center items-center mx-2 rounded-md " >
  
        <h1 className="text-black text-[4rem] w-full h-full flex justify-center items-center " >{props.value.value && props.value.value  }</h1>
  
      </div>
    )
  }