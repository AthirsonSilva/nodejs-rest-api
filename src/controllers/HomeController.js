import Student from '../models/Student'

class HomeController {
	index = async (request, response) => {
		try {
			const newStudent = await Student.findAll()

			response
				.status(200)
				.json({ message: 'Studends fetched with success!', newStudent })
		} catch (error) {
			response.status(400).json({
				message: 'Error at fetch students',
				error: error.errors.map(e => e.message) ?? error
			})
		}
	}
}

export default new HomeController()
