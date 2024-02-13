'use client'

import { useIsFetching, useIsMutating } from '@tanstack/react-query'

import Loader from '@/components/ui/Loader'

interface IGlobalLoader {}

export default function GlobalLoader({}: IGlobalLoader) {
	const isMutating = useIsMutating()
	const isFetching = useIsFetching()

	return isFetching || isMutating ? (
		<div className='fixed top-layout z-50'>
			<Loader />
		</div>
	) : null
}
