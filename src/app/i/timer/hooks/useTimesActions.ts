import { IPomodoroRoundResponse } from '@/types/pomodoro.types'

import { useLoadSettings } from '@/app/i/timer/hooks/useLoadSettings'
import { useUpdateRound } from '@/app/i/timer/hooks/useUpdateRound'
import type { ITimerState } from '@/app/i/timer/timer.types'

type TypeUseTimesActions = ITimerState & {
	rounds: IPomodoroRoundResponse[] | undefined
}

export function useTimesActions({
	activeRound,
	setIsRunning,
	secondsLeft,
	rounds,
	setActiveRound
}: TypeUseTimesActions) {
	const { workInterval } = useLoadSettings()
	const { updateRound, isUpdateRoundPending } = useUpdateRound()
	const pauseHandler = () => {
		setIsRunning(false)
		if (!activeRound?.id) return

		// console.log(secondsLeft)

		updateRound({
			id: activeRound?.id,
			data: {
				totalSeconds: secondsLeft,
				isCompleted: Math.floor(secondsLeft / 60) >= workInterval
			}
		})
	}
	const playHandler = () => {
		setIsRunning(true)
	}

	const nextRoundHandler = () => {
		if (!activeRound?.id) return

		updateRound({
			id: activeRound?.id,
			data: {
				isCompleted: true,
				totalSeconds: workInterval * 60
			}
		})
	}

	const prevRoundHandler = () => {
		//ES2023
		const lastCompletedRound = rounds?.findLast(round => round.isCompleted)

		if (!lastCompletedRound?.id) return

		updateRound({
			id: lastCompletedRound?.id,
			data: {
				totalSeconds: 0,
				isCompleted: false
			}
		})

		setActiveRound(lastCompletedRound)
	}

	return {
		isUpdateRoundPending,
		pauseHandler,
		playHandler,
		nextRoundHandler,
		prevRoundHandler
	}
}
