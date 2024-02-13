'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import styles from './KanbanView.module.scss'
import { COLUMNS } from '@/app/i/tasks/colums.data'
import { useTaskDnd } from '@/app/i/tasks/hooks/useTaskDnd'
import { useTasks } from '@/app/i/tasks/hooks/useTasks'
import KanbanColumn from '@/app/i/tasks/kanban-view/KanbanColumn'

interface IListView {}

export default function KanbanView({}: IListView) {
	const { items, setItems } = useTasks()

	const { onDragEnd } = useTaskDnd()
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.board}>
				{COLUMNS.map(column => (
					<KanbanColumn
						key={column.value}
						value={column.value}
						label={column.label}
						items={items}
						setItems={setItems}
					/>
				))}
			</div>
		</DragDropContext>
	)
}
