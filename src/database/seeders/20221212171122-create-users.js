const bcryptjs = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'users',
			[
				{
					name: 'John Doe',
					email: 'johndoen@gmail.com',
					password_hash: await bcryptjs.hash('123456', 8),
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					name: 'Mary Doe',
					email: 'marydoe@gmail.com',
					password_hash: await bcryptjs.hash('123456', 8),
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					name: 'Joseph Doe',
					email: 'josephdoe@gmail.com',
					password_hash: await bcryptjs.hash('123456', 8),
					created_at: new Date(),
					updated_at: new Date()
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {})
	}
}
