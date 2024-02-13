import type { Metadata } from 'next'

import Heading from '@/components/ui/Heading'

import Pomodoro from '@/app/i/timer/Pomodoro'

export const metadata: Metadata = {
	title: 'Pomodoro timer',
	description: ''
}

export default function PomodoroTimerPage() {
	return (
		<>
			<Heading title={'Pomodoro timer'} />
			<Pomodoro />
		</>
	)
}
