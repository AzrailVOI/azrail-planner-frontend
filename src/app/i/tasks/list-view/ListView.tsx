'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import styles from './ListView.module.scss'
import { COLUMNS } from '@/app/i/tasks/colums.data'
import { useTaskDnd } from '@/app/i/tasks/hooks/useTaskDnd'
import { useTasks } from '@/app/i/tasks/hooks/useTasks'
import ListRowParent from '@/app/i/tasks/list-view/ListRowParent'

interface IListView {}

export default function ListView({}: IListView) {
	const { items, setItems } = useTasks()

	const { onDragEnd } = useTaskDnd()
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.table}>
				<div className={styles.header}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
					<div></div>
				</div>

				<div className={styles.parentsWrapper}>
					{COLUMNS.map(column => (
						<ListRowParent
							value={column.value}
							label={column.label}
							items={items}
							setItems={setItems}
							key={column.value}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	)
}
