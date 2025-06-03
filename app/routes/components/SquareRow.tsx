import type { valueType } from "~/util/gameLogic"
import { Square } from "./Square"


export const SquareRow = (props: { data: valueType[], playersPiece:"X" | "O" })=>{

  return(
      <div className="flex h-full w-full justify-center items-center rounded-4xl " >

        <Square value={ props.data[0] } playersPiece={props.playersPiece} />
        <Square value={ props.data[1] }  playersPiece={props.playersPiece} />
        <Square value={ props.data[2] } playersPiece={props.playersPiece} />

      </div>
  )
}