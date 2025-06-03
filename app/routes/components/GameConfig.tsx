
interface GameConfigProps {
  gameStarted:boolean,
  setGameStarted:React.Dispatch<React.SetStateAction<boolean>>,
  setPlayersPiece: React.Dispatch<React.SetStateAction<"X" | "O">>
}


export const GameConfig = (props: GameConfigProps)=>{

  const buttonClassName = "w-[7rem] h-[2.5rem] text-3xl bg-gray-400  font-bold mx-1 rounded-md ";

  const HandleClick = (event: React.MouseEvent)=>{
    const target = event.target as HTMLElement;
    props.setPlayersPiece(target.innerText === "X" ? "X" : "O");
    props.setGameStarted(true)
  }

  return(

    <div className={`bg-gray-500 rounded-4xl ${props.gameStarted ? "hide" : "h-[10rem]" } overflow-hidden w-[20rem] md:w-[30rem] lg:w-[30rem] mt-2 flex flex-col justify-evenly items-center `} >

      <h1 className="text-2xl mb-[1rem] font-bold " >Choose Your Piece</h1>

      <div onClick={HandleClick}>
        <button className={`${buttonClassName} `} >X</button>
        <button className={`${buttonClassName}`} >O</button>
      </div>
    </div>
  )
}
