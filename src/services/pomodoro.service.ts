import {
	IPomodoroSessionResponse,
	TypePomodoroRoundState,
	TypePomodoroSessionFormState
} from '@/types/pomodoro.types'

import { axiosWithAuth } from '@/api/interseptors'

class PomodoroService {
	private BASE_URL = '/user/timer'

	async getTodaySession() {
		const response = await axiosWithAuth.get<IPomodoroSessionResponse>(
			`${this.BASE_URL}/today`
		)

		return response
	}

	async createSession() {
		const response = await axiosWithAuth.post<IPomodoroSessionResponse>(
			this.BASE_URL
		)

		return response
	}

	async updateSession(id: string, data: TypePomodoroSessionFormState) {
		const response = await axiosWithAuth.put<IPomodoroSessionResponse>(
			`${this.BASE_URL}/${id}`,
			data
		)

		return response
	}

	async deleteSession(id: string) {
		const response = await axiosWithAuth.delete<IPomodoroSessionResponse>(
			`${this.BASE_URL}/${id}`
		)

		return response
	}

	async updateRound(id: string, data: TypePomodoroRoundState) {
		const response = await axiosWithAuth.put<IPomodoroSessionResponse>(
			`${this.BASE_URL}/round/${id}`,
			data
		)

		return response
	}
}

export const pomodoroService = new PomodoroService()
