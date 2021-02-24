export interface IncrementScore {

    readonly type: 'INCREMENT'
}

export interface ResetScore {

    readonly type: 'RESET'
}

export type Actions = | IncrementScore | ResetScore