'use client'

import { GanttChartSquare } from 'lucide-react'
import Link from 'next/link'

import LogoutButton from '@/components/dashboard-layout/sidebar/LogoutButton'
import MenuItem from '@/components/dashboard-layout/sidebar/MenuItem'
import { MENU } from '@/components/dashboard-layout/sidebar/menu.data'
import Logo from '@/components/ui/logo/Logo'

import { COLORS } from '@/constants/color.constants'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

interface IDashboardSidebar {}

export default function DashboardSidebar({}: IDashboardSidebar) {
	return (
		<aside className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between'>
			<div className='h-full relative'>
				<Link
					href={DASHBOARD_PAGES.HOME}
					className='flex  items-center gap-2.5 p-layout border-b border-b-border text-center'
				>
					<GanttChartSquare
						size={40}
						color={COLORS.primary}
					/>
					{/*<span className='text-1.5xl font-bold relative'>Azraїl PLANNER</span>*/}
					<Logo />
				</Link>
				<div className='p-3 relative'>
					{MENU.map(item => (
						<MenuItem
							item={item}
							key={item.link}
						/>
					))}
				</div>
				<LogoutButton />
			</div>
			<footer className='text-xs opacity-40 font-normal text-center p-layout'>
				{new Date().getFullYear().toString()} &copy; With love from{' '}
				<a
					href='https://azrail.xyz/'
					target='_blank'
					rel='noreferrer'
					className='hover:text-primary text-brand-300 transition-colors'
				>
					Azraїl
				</a>
				<br /> All rights reserved
			</footer>
		</aside>
	)
}
