import type { IAuthForm, IAuthResponse } from '@/types/auth.types'

import { axiosClassic } from '@/api/interseptors'

import {
	removeFromStorage,
	saveTokenStorage
} from '@/services/auth-token.service'

export const authService = {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},

	async logout() {
		const response = await axiosClassic.post('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	}
}
