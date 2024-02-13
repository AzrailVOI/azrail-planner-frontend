'use client'
interface IHeading {
	title: string
}

export default function Heading({ title }: IHeading) {
	return (
		<div>
			<h1 className='text-2xl font-bold'>{title}</h1>
			<div className='my-1.5 h-0.5 bg-border w-full' />
		</div>
	)
}
