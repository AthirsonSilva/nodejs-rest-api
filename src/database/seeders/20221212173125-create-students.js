'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'students',
			[
				{
					name: 'Rafael',
					surname: 'Santos',
					email: 'rafasantos@school.org',
					age: 18,
					weight: 70.5,
					height: 1.75,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					name: 'Maria',
					surname: 'Silva',
					email: 'masilva@school.org',
					age: 19,
					weight: 60.5,
					height: 1.65,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					name: 'João',
					surname: 'Teixeira',
					email: 'joaot@school.org',
					age: 20,
					weight: 80.5,
					height: 1.85,
					created_at: new Date(),
					updated_at: new Date()
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('students', null, {})
	}
}
