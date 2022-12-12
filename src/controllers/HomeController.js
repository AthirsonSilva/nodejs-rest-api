class HomeController {
	index = async (request, response) => {
		try {
			response.status(200).json({ message: 'Request received with success!' })
		} catch (error) {
			response.status(400).json({
				message: 'Error at fetch students',
				error: error.errors.map(e => e.message) ?? error
			})
		}
	}
}

export default new HomeController()
