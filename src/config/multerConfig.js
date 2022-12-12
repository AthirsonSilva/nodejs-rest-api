import multer from 'multer'
import { extname, resolve } from 'path'

const randomString = () => Math.floor(Math.random() * 10_000 * 10_000)

export default {
	storage: multer.diskStorage({
		destination: (request, file, callback) => {
			callback(null, resolve(__dirname, '..', '..', 'uploads'))
		},

		filename: (request, file, callback) => {
			file.originalname = `${Date.now()}_${randomString()}${extname(
				file.originalname
			)}`
			callback(null, file.originalname)
		}
	})
}
