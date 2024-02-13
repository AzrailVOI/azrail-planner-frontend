import { Edit, GripVertical, Trash } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import Loader from '@/components/ui/Loader'

import type {
	ITimeBlockResponse,
	TypeTimeBlockFormState
} from '@/types/time-block.types'

import styles from './TimeBlocking.module.scss'
import { useDeleteTimeBlock } from '@/app/i/time-blocking/hooks/useDeleteTimeBlock'
import { useTimeBlockSortable } from '@/app/i/time-blocking/hooks/useTimeBlockSortable'

export default function TimeBlock({ item }: { item: ITimeBlockResponse }) {
	const { attributes, style, setNodeRef, listeners } = useTimeBlockSortable(
		item.id
	)

	const { reset } = useFormContext<TypeTimeBlockFormState>()

	const { deleteTimeBlock, isDeleteTimeBlockPending } = useDeleteTimeBlock(
		item.id
	)

	return (
		<div
			ref={setNodeRef}
			style={style}
		>
			<div
				className={styles.block}
				style={{
					backgroundColor: item.color || 'lightslategray',
					height: `${item.duration}px`
				}}
			>
				<div className='flex items-center'>
					<button
						{...attributes}
						{...listeners}
						aria-describedby='time-block'
					>
						<GripVertical className={styles.grip} />
					</button>
					<div>
						{item.name}{' '}
						<i className='text-xs opacity-50'>({item.duration} min.)</i>
					</div>
				</div>

				<div className={styles.actions}>
					<button
						onClick={() => {
							reset({
								id: item.id,
								color: item.color,
								duration: item.duration,
								name: item.name,
								order: item.order
							})
						}}
						className='opacity-50 transition-opacity hover:opacity-100 mr-2'
					>
						<Edit size={16} />
					</button>
					<button
						onClick={() => deleteTimeBlock()}
						className='opacity-50 transition-opacity hover:opacity-100'
						disabled={isDeleteTimeBlockPending}
					>
						{isDeleteTimeBlockPending ? (
							<Loader size={16} />
						) : (
							<Trash size={16} />
						)}
					</button>
				</div>
			</div>
		</div>
	)
}
