import clsx from 'clsx'
import { X } from 'lucide-react'

import Badge from '@/components/ui/Badge'

import { useOutside } from '@/hooks/useOutside'

interface IOption {
	label: string
	value: string
}
interface ISingleSelect {
	data: Array<IOption>
	onChange: (value: string) => void
	value: string
	isColorSelect?: boolean
}

export default function SingleSelect({
	data,
	isColorSelect,
	value,
	onChange
}: ISingleSelect) {
	const { isShow, setIsShow, ref } = useOutside(false)

	const getValue = () => data.find(item => item.value === value)?.value

	return (
		<div
			className={clsx('relative min-w-36', {
				'w-max': isColorSelect
			})}
			ref={ref}
		>
			<button
				onClick={event => {
					event.preventDefault()
					setIsShow(!isShow)
				}}
			>
				{getValue() ? (
					<Badge
						variant={value}
						className='capitalize'
						style={isColorSelect ? { backgroundColor: value } : {}}
					>
						{getValue()}
					</Badge>
				) : (
					<Badge>Click for select</Badge>
				)}
			</button>
			{value && (
				<button
					className='absolute top-0 right-0 opacity-30 hover:opacity-100 transition-opacity'
					onClick={e => {
						e.preventDefault()
						onChange('')
					}}
				>
					<X size={14} />
				</button>
			)}
			{isShow && (
				<div
					className={clsx(
						'absolute w-full p-2.5 left-0 slide bg-sidebar z-10 shadow rounded-lg'
					)}
					style={{
						top: 'calc(100% + .5rem)'
					}}
				>
					{data.map(item => (
						<button
							key={item.value}
							onClick={e => {
								e.preventDefault()
								onChange(item.value)
								setIsShow(false)
							}}
							className='block mb-4 last:mb-0 capitalize rounded-lg'
							style={isColorSelect ? { backgroundColor: item.value } : {}}
						>
							<Badge variant={item.value}>{item.label}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
