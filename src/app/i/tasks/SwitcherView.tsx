import clsx from 'clsx'
import { Kanban, ListTodo } from 'lucide-react'

import { TypeView } from '@/app/i/tasks/TasksView'

interface ISwitcherView {
	type: TypeView
	setType: (value: TypeView) => void
}

export default function SwitcherView({ setType, type }: ISwitcherView) {
	return (
		<div className='flex items-center gap-4 mb-5'>
			<button
				className={clsx('flex items-center gap-1', {
					'opacity-40': type === 'kanban'
				})}
				onClick={() => setType('list')}
			>
				<ListTodo />
				List
			</button>

			<button
				className={clsx('flex items-center gap-1', {
					'opacity-40': type === 'list'
				})}
				onClick={() => setType('kanban')}
			>
				<Kanban />
				Board
			</button>
		</div>
	)
}
