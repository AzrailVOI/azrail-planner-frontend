import clsx from 'clsx'
import { GripVertical, Trash } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Loader from '@/components/ui/Loader'
import Checkbox from '@/components/ui/checkbox'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import SingleSelect from '@/components/ui/task-edit/SingleSelect'
import DatePicker from '@/components/ui/task-edit/date-picker/DatePicker'

import {
	type ITaskResponse,
	type TypeTaskFormState,
	priorityList
} from '@/types/task.types'

import styles from './KanbanView.module.scss'
import { useDeleteTask } from '@/app/i/tasks/hooks/useDeleteTask'
import { useTaskDebounce } from '@/app/i/tasks/hooks/useTaskDebounce'

interface IKanbanCard {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export default function KanbanCard({ item, setItems }: IKanbanCard) {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})

	useTaskDebounce({ watch, itemId: item.id })

	const { deleteTask, isDeletePending } = useDeleteTask()

	return (
		<div
			className={clsx(
				styles.card,
				{
					[styles.completed]: watch('isCompleted')
				},
				'animation-opacity'
			)}
		>
			<div className={styles.cardHeader}>
				<button aria-describedby='todo-item'>
					<GripVertical className={styles.grip} />
				</button>

				<Controller
					name='isCompleted'
					control={control}
					render={({ field: { value, onChange } }) => (
						<Checkbox
							checked={value}
							onChange={onChange}
						/>
					)}
				/>

				<TransparentField {...register('name')} />
			</div>

			<div className={styles.cardBody}>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							position='left'
							value={value || ''}
							onChange={onChange}
						/>
					)}
				/>

				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={priorityList.map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>

			<div className={styles.cardActions}>
				<button
					onClick={() =>
						item.id
							? deleteTask(item.id)
							: setItems(prevState => prevState?.slice(0, -1))
					}
					className='opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>

			<div className={styles.cardBody}></div>
		</div>
	)
}
