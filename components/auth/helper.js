// helper method for authentication purposes
export const isAuthenticated = () => {
	const token = localStorage.getItem('token')
	const isLoggedIn = localStorage.getItem('isLoggedIn')
	if(isLoggedIn && token){
		return true
	}
	return false
}
