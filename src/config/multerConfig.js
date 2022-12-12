import multer from 'multer'
import { extname, resolve } from 'path'

const randomString = () => Math.floor(Math.random() * 10_000 * 10_000)

export default {
	storage: multer.diskStorage({
		fileFilter: (request, file, callback) => {
			const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

			if (allowedMimes.includes(file.mimetype)) {
				callback(null, true)
			} else {
				callback(new multer.MulterError('Invalid file type.'))
			}
		},

		destination: (request, file, callback) => {
			callback(null, resolve(__dirname, '..', '..', 'uploads', 'images'))
		},

		filename: (request, file, callback) => {
			file.originalname = `${Date.now()}_${randomString()}${extname(
				file.originalname
			)}`
			callback(null, file.originalname)
		}
	})
}
