import dotenv from 'dotenv'
dotenv.config()

export const databaseConfig = {
	dialect: 'mariadb',
	host: process.env.DATABASE_HOST ?? 'localhost',
	port: process.env.DATABASE_PORT ?? 3306,
	username: process.env.DATABASE_USERNAME ?? 'root',
	password: process.env.DATABASE_PASSWORD ?? 'root',
	database: process.env.DATABASE_NAME ?? 'db_school',
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
