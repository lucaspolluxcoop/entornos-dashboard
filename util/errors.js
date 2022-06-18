/**
 * Simple function that format the errors displayed from the backend
 * @param errors
 */
export function formatCatchedErrors(err) {
	let errorMessage = ''
	Object.values(err.response.data.errors).forEach((error) => {
		errorMessage = errorMessage + '- ' + error + '\n'
	})
	return errorMessage
}
