import dotenv from 'dotenv'

dotenv.config()

import { Sequelize } from 'sequelize'
import Student from '../models/Student'
import StudentPhoto from '../models/StudentPhoto'
import User from '../models/User'

const models = [Student, User, StudentPhoto]

const connection = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.DATABASE_USERNAME,
	process.env.DATABASE_PASSWORD,
	{
		dialect: 'mariadb',
		host: process.env.DATABASE_HOST,
		port: 3306,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		define: {
			timestamps: true,
			underscored: true,
			underscoredAll: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		},
		dialectOptions: {
			timezone: 'America/Sao_Paulo'
		},
		timezone: 'America/Sao_Paulo'
	}
)

models.forEach(model => model.init(connection))
models.forEach(model => model.associate && model.associate(connection.models))
