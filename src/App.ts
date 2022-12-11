import express from 'express'
import HomeRoutes from './routes/HomeRoutes'

class App {
	app: express.Application

	constructor() {
		this.app = express()
		this.middlewares()
		this.routes()
	}

	middlewares = (): void => {
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(express.json())
	}

	routes = (): void => {
		this.app.use('/', HomeRoutes)
	}
}

export default new App().app
