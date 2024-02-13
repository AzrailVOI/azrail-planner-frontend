import { Loader2 as LoaderIcon } from 'lucide-react'

interface ILoader {
	size?: number
}

export default function Loader({ size }: ILoader) {
	return (
		<div>
			<LoaderIcon
				size={size}
				className='animate-spin h-5 w-5 text-white'
			/>
		</div>
	)
}
