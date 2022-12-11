import Student from '../models/Student'

class HomeController {
	index = async (request, response) => {
		try {
			const newStudent = await Student.create({
				name: 'John',
				surname: 'Doe',
				email: 'johndoe@gmail.com',
				age: 20,
				weight: 80.5,
				height: 1.75
			})

			response
				.status(200)
				.json({ message: 'User created with success!', newStudent })
		} catch (error) {
			response.status(500).json({ message: 'Error at creating new user', error })
		}
	}
}

export default new HomeController()
