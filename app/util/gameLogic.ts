


export type valueType = {
    value: string | null,
    id:number
  }

export default function Winner(state: valueType[]): [string, number[]] | [null, number[]]{
    // winning sequence of board
    const winnigSeq:number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]


    // Check if anyone has won the game
    for(const win of winnigSeq){

        // if squares are still null dont check for winner in these squares
        if(state[win[0]].value === null || state[win[1]].value === null || state[win[2]].value === null ) continue

        // check for winner
        if( state[win[0]].value === state[win[1]].value &&  state[win[1]].value === state[win[2]].value){
            return [state[win[0]].value, win ];
        }
    }

    // Loop through game state and check if theres any available square, if there is return null otherwise the game is a draw 
    for(const s of state){
        if(s.value === null)return [null, [0,0,0,]] 
    }

    return ["Draw", [0,0,0,]]
}




export const HandleSquareClick = (isGameOver:boolean | undefined , turn: "X"|"O" | undefined , state:valueType[] | undefined ,squareId:number | undefined, 
    setState:React.Dispatch<React.SetStateAction<any[] | valueType[]>> | undefined , setTurn:React.Dispatch<React.SetStateAction<"X" | "O">> | undefined
    , setIsGameOver:React.Dispatch<React.SetStateAction<boolean>>| undefined )=>
        
    {

        // if the game is over dont allow any plays
        if(isGameOver)return true
    
        const newState = [...state!]
    
        if(newState[squareId!].value == null)
        {
    
          if(turn){ newState[squareId!].value = turn } // play X or O at the selected square
    
          setState!(newState)
          setTurn!(turn === "X" ? "O" : "X")
          
          // if the winner function returns a winner (X or O) than set gameOver as true
          setIsGameOver!( Winner(state!)[0] != null ? true : false )

          return true
        }

        return false     
    }





// This is a static evaluation for the miniMax function
// This function will return a score of zero for a draw, a score of 10 for a win and a score of -10 for a loss 
const staticEval = (state: valueType[], human: "X" | "O") => {

    switch(Winner(state)[0]){
        case "Draw":
            return 0;
        case human:
            return -10;
        case human === "X" ? "O" : "X":
            return 10;
    }

}





export const miniMax = (state: valueType[], depth:number, alpha:number, beta:number, maximizingPlayer:boolean,human: "X" | "O")=>{

    const winnerResult = Winner(state);
    if (depth === 0 || (winnerResult && winnerResult[0] !== null)) return staticEval(state, human); // base case for the recursive function 
    
    
    if(maximizingPlayer){

        let maxEval = -Infinity
        for(let i = 0; i < state.length; i++){

            if(state[i].value === null){

                const gameState = structuredClone(state);
                gameState[i].value = human === "X" ? "O" : "X"
                
                let currentEval = miniMax(gameState, depth - 1, alpha, beta, false, human) 
                maxEval = Math.max(currentEval!, maxEval)

                alpha = Math.max(currentEval!, alpha)
                if(beta <= alpha) break
            }
        }
        return maxEval

    }else{

        let minEval = Infinity
        for(let i = 0; i < state.length; i++){
            
            if(state[i].value === null){

                const gameState = structuredClone(state);
                gameState[i].value = human

                let currentEval = miniMax(gameState, depth - 1, alpha, beta, true, human)
                minEval = Math.min(currentEval!, minEval)                
                
                beta = Math.min(currentEval!, beta)
                if(beta <= alpha) break
            }
        }
        return minEval

    }

}




// Return the best move the computer can take
export const bestMove = (state:valueType[], human: "X" | "O")=>{

    let bestScore: number = -Infinity;
    let selectedSqure:number = 0;

    for(let i = 0; i < state.length ; i++){

        if(state[i].value === null){

            state[i].value = human === "X" ? "O" : "X" 
            
            let score = miniMax(state, 10, -Infinity, Infinity, false, human)!;
            state[i].value = null
            
            if(score > bestScore){
                bestScore = score    
                selectedSqure = i;               
            }
    
        }
    }
    return selectedSqure
}


export const HandleGameReset = (setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>, setState: React.Dispatch<React.SetStateAction<valueType[]>>
    ,setTurn:React.Dispatch<React.SetStateAction<"X" | "O">> )=>

    {
        setState(
            [ 
                {value:null, id:0},  
                {value:null, id:1},  
                {value:null, id:2},  
                {value:null, id:3},  
                {value:null, id:4},  
                {value:null, id:5},  
                {value:null, id:6},  
                {value:null, id:7},  
                {value:null, id:8},  
            ]
        )
        setTurn("X")
        setIsGameOver(false)
    }
