import GlobalLoader from '@/components/dashboard-layout/header/GlobalLoader'
import DashboardProfile from '@/components/dashboard-layout/header/profile/DashboardProfile'

export default function DashboardHeader() {
	return (
		<header>
			<GlobalLoader />
			<DashboardProfile />
		</header>
	)
}
