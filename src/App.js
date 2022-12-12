import dotenv from 'dotenv'

dotenv.config()

import './database'

import express from 'express'
import AuthRoutes from './routes/AuthRoutes'
import FileRoutes from './routes/FileRoutes'
import HomeRoutes from './routes/HomeRoutes'
import StudentsRoutes from './routes/StudentRoutes'
import UserRoutes from './routes/UserRoutes'

class App {
	constructor() {
		this.app = express()
		this.middlewares()
		this.routes()
	}

	middlewares = () => {
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(express.json())
	}

	routes = () => {
		this.app.use('/', HomeRoutes)
		this.app.use('/users', UserRoutes)
		this.app.use('/students', StudentsRoutes)
		this.app.use('/auth', AuthRoutes)
		this.app.use('/files', FileRoutes)
	}
}

export default new App().app
