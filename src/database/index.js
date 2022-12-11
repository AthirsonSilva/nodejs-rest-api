import dotenv from 'dotenv'

dotenv.config()

import { Sequelize } from 'sequelize'
import { databaseConfig } from '../config/database'
import Student from '../models/Student'

const models = [Student]

const connection = new Sequelize(databaseConfig)

models.forEach(model => model.init(connection, Sequelize))
