'use client'

import { Cog, Pause, Play, RefreshCcw } from 'lucide-react'

import MenuItem from '@/components/dashboard-layout/sidebar/MenuItem'
import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { formatTime } from '@/app/i/timer/format-time/format-time'
import { useCreateSession } from '@/app/i/timer/hooks/useCreateSession'
import { useDeleteSession } from '@/app/i/timer/hooks/useDeleteSession'
import { useTimer } from '@/app/i/timer/hooks/useTimer'
import { useTimesActions } from '@/app/i/timer/hooks/useTimesActions'
import { useTodaySession } from '@/app/i/timer/hooks/useTodaySession'
import PomodoroRounds from '@/app/i/timer/rounds/PomodoroRounds'

export default function Pomodoro() {
	const timerState = useTimer()
	const { isLoading, sessionResponse, workInterval } =
		useTodaySession(timerState)
	const rounds = sessionResponse?.data?.rounds
	const actions = useTimesActions({
		...timerState,
		rounds
	})
	const { createSession, isCreatePending } = useCreateSession()
	const { deleteSession, isDeletePending } = useDeleteSession(() =>
		timerState.setSecondsLeft(workInterval * 60)
	)
	return (
		<div className='relative w-80 text-center'>
			{!isLoading && (
				<div className='text-7xl font-semibold'>
					{formatTime(timerState.secondsLeft)}
				</div>
			)}
			{isLoading ? (
				<Loader />
			) : sessionResponse?.data ? (
				<>
					<PomodoroRounds
						rounds={rounds}
						nextRoundHandler={actions.nextRoundHandler}
						prevRoundHandler={actions.prevRoundHandler}
						activeRound={timerState.activeRound}
					/>

					<button
						className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
						onClick={
							timerState.isRunning ? actions.pauseHandler : actions.playHandler
						}
						disabled={actions.isUpdateRoundPending}
					>
						{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button>
					<button
						onClick={() => {
							timerState.setIsRunning(false)
							deleteSession(sessionResponse.data.id)
						}}
						className='absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity'
						disabled={isDeletePending}
					>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button
					onClick={() => createSession()}
					className='mt-1'
					disabled={isCreatePending}
				>
					Create session
				</Button>
			)}
			<MenuItem
				styles={{
					justifyContent: 'center'
				}}
				item={{
					icon: Cog,
					link: DASHBOARD_PAGES.SETTINGS,
					name: 'Settings'
				}}
			/>
		</div>
	)
}
