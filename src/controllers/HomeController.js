import Student from '../models/Student'

class HomeController {
	index = async (request, response) => {
		try {
			const newStudent = await Student.create(request.body)

			response
				.status(200)
				.json({ message: 'User created with success!', newStudent })
		} catch (error) {
			response.status(400).json({
				message: 'Error at creating new student',
				error: error.errors.map(e => e.message) ?? error
			})
		}
	}
}

export default new HomeController()
