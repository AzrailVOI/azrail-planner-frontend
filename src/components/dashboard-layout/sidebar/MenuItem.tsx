'use client'

import Link from 'next/link'
import { CSSProperties } from 'react'

import type { IMenuItem } from '@/components/dashboard-layout/sidebar/menu.interface'

type TMenuItem = {
	item: IMenuItem
	styles?: CSSProperties
}

export default function MenuItem({ item, styles }: TMenuItem) {
	return (
		<div>
			<Link
				href={item.link}
				className='flex gap-2.5 items-center py-1.5 mt-2 px-layout transition-colors hover:bg-border rounded-lg'
				style={styles ? styles : undefined}
			>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	)
}
