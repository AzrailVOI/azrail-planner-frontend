import type { Dispatch, SetStateAction } from 'react'

import type { IPomodoroRoundResponse } from '@/types/pomodoro.types'

export interface ITimerState {
	isRunning: boolean
	secondsLeft: number
	setIsRunning: Dispatch<SetStateAction<boolean>>
	activeRound: IPomodoroRoundResponse | undefined
	setSecondsLeft: Dispatch<SetStateAction<number>>
	setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
}
