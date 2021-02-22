export const SIMON_TURN = 0
export const USER_TURN = 1

interface ColorProps  {
    id : number
    color : string
    soundSimon : string
    soundUser : string 
}

export const ColorMap = [
        {
            id : 0,
            color : 'green',
            soundSimon : '',
            soundUser : ''
        },
        {
            id : 1,
            color : 'yellow',
            soundSimon : '',
            soundUser : ''
          
        },
        {
            id : 2,
            color : 'red',
            soundSimon : '',
            soundUser : ''
          
        },
        {
            id : 3,
            color : 'blue',
            soundSimon : '',
            soundUser : ''
        },
]

  
