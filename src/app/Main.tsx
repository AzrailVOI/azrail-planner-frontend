'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/buttons/Button'
import Logo from '@/components/ui/logo/Logo'

export default function Main() {
	const navigation = useRouter()
	return (
		<div
			className='w-full flex flex-col justify-around items-center'
			style={{
				height: '100dvh'
			}}
		>
			<Logo
				style={{
					scale: 4,
					marginTop: '5rem'
				}}
			/>
			<div className='py-6 text-5xl'>
				<h1>Welcome to Azraїl's PLANNER</h1>
			</div>
			<Link href={'/auth'}>
				<Button
					onClick={() => navigation.push('/auth')}
					style={{ scale: 2, marginBottom: '5rem' }}
				>
					Go to auth
				</Button>
			</Link>
		</div>
	)
}
