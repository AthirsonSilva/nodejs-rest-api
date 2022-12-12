import jwt from 'jsonwebtoken'
import User from '../models/User'

const authRequired = async (request, response, next) => {
	const { authorization } = request.headers

	if (!authorization) {
		return response.status(401).json({ message: 'Token not provided' })
	}

	const [, token] = authorization.split(' ')

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const user = await User.findOne({
			where: { id: decoded.id, email: decoded.email }
		})

		if (!user) {
			return response.status(401).json({
				message:
					'User not found. Try logging in again to refresh your authentication.'
			})
		}

		if (!user.is_active) {
			return response.status(401).json({ message: 'User is not active' })
		}

		request.userId = decoded.id
		request.userEmail = decoded.email

		return next()
	} catch (error) {
		return response.status(401).json({ message: 'Token is expired or invalid' })
	}
}

export default authRequired
