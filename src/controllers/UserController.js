import User from '../models/User'

class UserController {
	store = async (request, response) => {
		try {
			const newUser = await User.create(request.body)

			response.status(200).json({ message: 'User created with success!', newUser })
		} catch (error) {
			response.status(400).json({
				message: 'Error at creating new user',
				error: error.errors.map(e => e.message) ?? error
			})
		}
	}
}

export default new UserController()
