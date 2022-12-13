import dotenv from 'dotenv'

dotenv.config()

import './database'

import cors from 'cors'
import helmet from 'helmet'

import express from 'express'
import AuthRoutes from './routes/AuthRoutes'
import HomeRoutes from './routes/HomeRoutes'
import StudentPhotoRoutes from './routes/StudentPhotoRoutes'
import StudentsRoutes from './routes/StudentRoutes'
import UserRoutes from './routes/UserRoutes'

import { resolve } from 'path'

const whiteList = ['http://localhost:3000']

const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.includes(origin) || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

class App {
	constructor() {
		this.app = express()
		this.middlewares()
		this.routes()
	}

	middlewares = () => {
		this.app.use(cors(corsOptions))
		this.app.use(helmet())
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(express.json())
		this.app.use(express.static(resolve(__dirname, '..', 'uploads')))
	}

	routes = () => {
		this.app.use('/', HomeRoutes)
		this.app.use('/users', UserRoutes)
		this.app.use('/students', StudentsRoutes)
		this.app.use('/auth', AuthRoutes)
		this.app.use('/files', StudentPhotoRoutes)
	}
}

export default new App().app
