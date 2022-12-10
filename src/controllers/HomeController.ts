import { Request, Response } from 'express'

class HomeController {
	index = async (
		request: Request,
		response: Response
	): Promise<void | Error> => {
		try {
			response.status(200).json({ message: 'Tudo certo' })
		} catch (error) {
			return new Error(error as string)
		}
	}
}

export default new HomeController()
