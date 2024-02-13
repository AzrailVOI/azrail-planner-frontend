'use client'

import Loader from '@/components/ui/Loader'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import SwitcherView from '@/app/i/tasks/SwitcherView'
import KanbanView from '@/app/i/tasks/kanban-view/KanbanView'
import ListView from '@/app/i/tasks/list-view/ListView'

interface ITasksView {}
export type TypeView = 'list' | 'kanban'
export default function TasksView({}: ITasksView) {
	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'view-type',
		defaultValue: 'list'
	})

	if (isLoading) return <Loader />

	return (
		<div>
			<SwitcherView
				type={type}
				setType={setType}
			/>
			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	)
}
