import Sequelize, { Model } from 'sequelize'

export default class Student extends Model {
	static init = sequelize => {
		super.init(
			{
				name: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue: '',
					validate: {
						len: {
							args: [3, 255],
							msg: 'The field name must be between 3 and 255 characters.'
						},
						notContains: {
							args: ' ',
							msg: 'Email cannot contain spaces'
						}
					}
				},
				surname: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue: '',
					validate: {
						len: {
							args: [3, 255],
							msg: 'The field name must be between 3 and 255 characters.'
						},
						notContains: {
							args: ' ',
							msg: 'Email cannot contain spaces'
						}
					}
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue: '',
					unique: {
						args: true,
						msg: 'Email address already in use!'
					},
					validate: {
						len: {
							args: [3, 255],
							msg: 'The field name must be between 3 and 255 characters.'
						},
						isEmail: {
							args: true,
							msg: 'The field name must be a valid email.'
						},
						notContains: {
							args: ' ',
							msg: 'Email cannot contain spaces'
						}
					}
				},
				age: {
					type: Sequelize.INTEGER,
					allowNull: false,
					defaultValue: '',
					validate: {
						isInt: {
							args: true,
							msg: 'The field name must be an integer.'
						},
						notContains: {
							args: ' ',
							msg: 'Email cannot contain spaces'
						}
					}
				},
				weight: {
					type: Sequelize.FLOAT,
					allowNull: false,
					defaultValue: '',
					validate: {
						isFloat: {
							args: true,
							msg: 'The field name must be a float.'
						},
						notContains: {
							args: ' ',
							msg: 'Email cannot contain spaces'
						}
					}
				},
				height: {
					type: Sequelize.FLOAT,
					allowNull: false,
					defaultValue: '',
					validate: {
						isFloat: {
							args: true,
							msg: 'The field name must be a float.'
						},
						notContains: {
							args: ' ',
							msg: 'Email cannot contain spaces'
						}
					}
				}
			},
			{
				sequelize,
				tableName: 'students'
			}
		)

		return this
	}

	static verifyInputs = body => {
		const errors = []

		if (!body.name) {
			errors.push('The field name is required.')
		}

		if (!body.surname) {
			errors.push('The field surname is required.')
		}

		if (!body.email) {
			errors.push('The field email is required.')
		}

		if (!body.age) {
			errors.push('The field age is required.')
		}

		if (!body.weight) {
			errors.push('The field weight is required.')
		}

		if (!body.height) {
			errors.push('The field height is required.')
		}

		if (errors.length > 0) {
			return errors
		}

		return true
	}

	returnNonSensitiveData = () => {
		return {
			id: this.id,
			name: this.name,
			surname: this.surname,
			age: this.age,
			email: this.email,
			weight: this.weight,
			height: this.height
		}
	}

	static associate = models => {
		this.hasMany(models.StudentPhoto, { foreignKey: 'student_id' })
	}
}
