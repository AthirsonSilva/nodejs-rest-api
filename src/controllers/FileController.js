import multer from 'multer'
import multerConfig from '../config/multerConfig'

const upload = multer(multerConfig).single('photo')

class FileController {
	store = async (request, response) => {
		upload(request, response, error => {
			if (error) {
				return response.status(400).json({ errors: [error.message] })
			} else if (!verifyFileExtension(request, request.file)) {
				return response.status(400).json({
					errors: 'Invalid file type. Only JPG, PNG or JPEG images are allowed.'
				})
			}

			return response
				.status(200)
				.json({ message: 'File uploaded successfully!', file: request.file })
		})
	}
}

const verifyFileExtension = (request, file) => {
	const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

	if (allowedMimes.includes(file.mimetype)) {
		return true
	} else {
		return false
	}
}

export default new FileController()
