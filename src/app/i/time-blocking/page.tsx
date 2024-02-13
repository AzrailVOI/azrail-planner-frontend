import type { Metadata } from 'next'

import Heading from '@/components/ui/Heading'

import TimeBlocking from '@/app/i/time-blocking/TimeBlocking'

export const metadata: Metadata = {
	title: 'Time blocking',
	description: ''
}

export default function TimeBlockingPage() {
	return (
		<>
			<Heading title={'Time blocking'} />
			<TimeBlocking />
		</>
	)
}
