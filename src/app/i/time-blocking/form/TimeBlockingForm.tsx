import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'
import SingleSelect from '@/components/ui/task-edit/SingleSelect'

import type { TypeTimeBlockFormState } from '@/types/time-block.types'

import { COLORS } from '@/app/i/time-blocking/form/colors.data'
import { useCreateTimeBlock } from '@/app/i/time-blocking/form/useCreateTimeBlock'
import { useUpdateTimeBlock } from '@/app/i/time-blocking/form/useUpdateTimeBlock'

export default function TimeBlockingForm() {
	const { register, control, watch, reset, handleSubmit, getValues } =
		useFormContext<TypeTimeBlockFormState>()

	const existsId = watch('id')

	const { createTimeBlock, isCreateTimeBlockPending } = useCreateTimeBlock()

	const { updateTimeBlock } = useUpdateTimeBlock(existsId)

	const onSubmit: SubmitHandler<TypeTimeBlockFormState> = data => {
		const { color, id, ...rest } = data
		const dto = { ...rest, color: color || undefined }

		if (id) {
			updateTimeBlock({ id, data: dto })
		} else {
			createTimeBlock(dto)
		}

		reset({
			color: COLORS[COLORS.length - 1],
			duration: 0,
			name: '',
			id: undefined,
			order: 1
		})
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-3/5'
		>
			<Field
				{...register('name', { required: true })}
				id={'name'}
				label={'Enter name'}
				placeholder={'Enter name'}
				extra={'mb-4'}
			/>

			<Field
				{...register('duration', { required: true, valueAsNumber: true })}
				id={'duration'}
				label={'Enter duration (min.)'}
				placeholder={'Enter duration (min.)'}
				extra={'mb-4'}
				isNumber
			/>

			<div>
				<span className='inline-block mb-1.5'>Color</span>
				<Controller
					name={'color'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<SingleSelect
							data={COLORS.map(item => ({
								label: item,
								value: item
							}))}
							onChange={onChange}
							value={value || COLORS[COLORS.length - 1]}
							isColorSelect
						/>
					)}
				/>
			</div>

			<Button
				type='submit'
				disabled={isCreateTimeBlockPending}
				className='mt-6'
			>
				{existsId ? 'Update' : 'Create'}
			</Button>
		</form>
	)
}
