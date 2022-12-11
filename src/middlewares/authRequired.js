import jwt from 'jsonwebtoken'

const authRequired = (request, response, next) => {
	const { authorization } = request.headers

	if (!authorization) {
		return response.status(401).json({ message: 'Token not provided' })
	}

	const [, token] = authorization.split(' ')

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		request.userId = decoded.id
		request.userEmail = decoded.email

		return next()
	} catch (error) {
		return response.status(401).json({ message: 'Token is expired or invalid' })
	}
}

export default authRequired
