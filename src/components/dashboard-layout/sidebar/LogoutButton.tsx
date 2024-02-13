'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'

export default function LogoutButton() {
	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			router.push('/auth')
		}
	})

	const router = useRouter()
	return (
		<div className='absolute bottom-6 w-full flex justify-center'>
			<button
				className='flex gap-2.5 items-center py-1.5 mt-2 px-layout transition-colors hover:bg-border rounded-lg'
				onClick={() => mutate()}
			>
				<LogOutIcon size={20} />
				<span>Logout</span>
			</button>
		</div>
	)
}
