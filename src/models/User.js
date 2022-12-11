import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Sequelize, { Model } from 'sequelize'

export default class User extends Model {
	static init = sequelize => {
		super.init(
			{
				name: {
					type: Sequelize.STRING,
					defaultValue: '',
					validate: {
						notEmpty: {
							msg: 'Name cannot be empty'
						},
						len: {
							args: [3, 255],
							msg: 'Name must be between 3 and 255 characters'
						},
						is: {
							args: /^[a-zA-z]+$/i,
							msg: 'Name must contain only letters'
						},
						notContains: {
							args: ' ',
							msg: 'Name cannot contain spaces'
						}
					}
				},
				email: {
					type: Sequelize.STRING,
					defaultValue: '',
					unique: {
						msg: 'Email already exists'
					},
					validate: {
						notEmpty: {
							msg: 'Email cannot be empty'
						},
						len: {
							args: [3, 255],
							msg: 'Email must be between 3 and 255 characters'
						},
						isEmail: {
							msg: 'Email must be valid'
						},
						notContains: {
							args: ' ',
							msg: 'Email cannot contain spaces'
						}
					}
				},
				password: {
					type: Sequelize.VIRTUAL,
					defaultValue: '',
					validate: {
						notEmpty: {
							msg: 'Password cannot be empty'
						},
						len: {
							args: [6, 50],
							msg: 'Password must be between 3 and 255 characters'
						},
						notContains: {
							args: ' ',
							msg: 'Password cannot contain spaces'
						}
					}
				},
				password_hash: Sequelize.STRING
			},
			{
				sequelize,
				tableName: 'users'
			}
		)

		this.addHook('beforeSave', async user => {
			if (user.password) {
				user.password_hash = await bcryptjs.hash(user.password, 8)
			}
		})

		return this
	}

	checkIfUserExists = async email => {
		try {
			return await User.findOne({ where: { email } })
		} catch (error) {
			return false
		}
	}

	checkPassword = async password => {
		try {
			return await bcryptjs.compare(password, this.password_hash)
		} catch (error) {
			return false
		}
	}

	generateToken = () => {
		try {
			return jwt.sign({ id: this.id, email: this.email }, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_EXPIRES_IN
			})
		} catch (error) {
			return false
		}
	}
}
