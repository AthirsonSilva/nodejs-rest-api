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

	index = async (request, response) => {
		try {
			const users = await User.findAll()

			response.status(200).json({ message: 'Users found with success!', users })
		} catch (error) {
			response.status(400).json({
				message: 'Error at getting users',
				error: error.errors.map(e => e.message) ?? error
			})
		}
	}

	show = async (request, response) => {
		try {
			if (!request.params.id) {
				return response.status(400).json({ message: 'User id is required' })
			}

			const user = await User.findByPk(request.params.id)

			if (!user) return response.status(404).json({ message: 'User not found' })

			response.status(200).json({ message: 'User found with success!', user })
		} catch (error) {
			response.status(400).json({
				message: 'Error at getting user',
				error: error.errors.map(e => e.message) ?? error
			})
		}
	}

	update = async (request, response) => {
		try {
			if (!request.params.id) {
				return response.status(400).json({ message: 'User id is required' })
			}

			const user = await User.findByPk(request.params.id)

			if (!user) return response.status(404).json({ message: 'User not found' })

			const updatedUser = await user.update(request.body)

			response.status(200).json({
				message: 'User updated with success!',
				updatedUser
			})
		} catch (error) {
			response.status(400).json({
				message: 'Error at updating user',
				error: error.errors.map(e => e.message) ?? error
			})
		}
	}

	delete = async (request, response) => {
		try {
			if (!request.params.id) {
				return response.status(400).json({ message: 'User id is required' })
			}

			const user = await User.findByPk(request.params.id)

			if (!user) return response.status(404).json({ message: 'User not found' })

			await user.destroy()

			response.status(200).json({ message: 'User deleted with success!' })
		} catch (error) {
			response.status(400).json({
				message: 'Error at deleting user',
				error: error.errors.map(e => e.message) ?? error
			})
		}
	}
}

export default new UserController()
