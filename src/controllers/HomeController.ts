import { Request, Response } from 'express'

class HomeController {
	index = (request: Request, response: Response): void => {
		try {
			response.status(200).json({ message: 'Tudo certo' })
		} catch (error) {
			throw new Error(error as string)
		}
	}
}

export default new HomeController()
