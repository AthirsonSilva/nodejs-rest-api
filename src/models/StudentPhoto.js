import Sequelize, { Model } from 'sequelize'
import appConfig from '../config/appConfig'

export default class StudentPhoto extends Model {
	static init = sequelize => {
		super.init(
			{
				original_name: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue: '',
					validate: {
						notEmpty: {
							args: true,
							msg: 'The field name must be between 3 and 255 characters.'
						},
						notContains: {
							args: ' ',
							msg: 'Email cannot contain spaces'
						}
					}
				},
				file_name: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue: '',
					validate: {
						notEmpty: {
							args: true,
							msg: 'The field name must be between 3 and 255 characters.'
						},
						notContains: {
							args: ' ',
							msg: 'Email cannot contain spaces'
						}
					}
				},
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `${appConfig.url}/images/${this.getDataValue('file_name')}`
					}
				}
			},
			{
				sequelize,
				tableName: 'students_photos'
			}
		)

		return this
	}

	static associate = models => {
		this.belongsTo(models.Student, { foreignKey: 'student_id' })
	}
}
