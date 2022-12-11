import User from '../models/User'

class AuthToken {
	index = async (request, response) => {
		try {
			response.status(200).json({ message: 'Ok' })
		} catch (error) {
			response.status(400).json({
				message: 'Error at auth token',
				error: error.errors.map(e => e.message) ?? error
			})
		}
	}

	store = async (request, response) => {
		try {
			const { email = '', password = '' } = request.body

			if (!email || !password) {
				return response
					.status(400)
					.json({ message: "Email and password mustn't be empty" })
			}

			const user = await User.findOne({ where: { email } })

			if (!user) {
				return response.status(400).json({ message: 'User not found' })
			}

			if (!(await user.checkPassword(password))) {
				return response.status(400).json({ message: 'Password does not match' })
			}

			return response
				.status(200)
				.json({ message: 'Ok', token: user.generateToken() })
		} catch (error) {
			response.status(400).json({
				message: 'Error at fetch students',
				error: error.errors.map(e => e.message) ?? error
			})
		}
	}
}

export default new AuthToken()
