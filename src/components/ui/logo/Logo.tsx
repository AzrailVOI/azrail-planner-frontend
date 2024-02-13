import clsx from 'clsx'
import { CSSProperties } from 'react'

import styles from '@/components/ui/logo/Logo.module.scss'

interface ILogo {
	style?: CSSProperties
}
export default function Logo({ style }: ILogo) {
	return (
		<div
			className='flex justify-center flex-col align-middle gap-2.5'
			style={style}
		>
			<span className={styles.logo_azrail}>
				AZRAЇL
				<span
					className={clsx(
						styles.logo_version,
						'absolute -top-2 -right-8 opacity-40 rotate-[20deg] font-normal'
					)}
				>
					beta <br />
					v0.0.1
				</span>
			</span>
			<span className={styles.logo_planner}>PLANNER</span>
		</div>
	)
}
