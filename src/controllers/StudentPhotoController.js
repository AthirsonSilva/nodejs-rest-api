import multer from 'multer'
import multerConfig from '../config/multerConfig'

import Student from '../models/Student'
import StudentPhoto from '../models/StudentPhoto'

const upload = multer(multerConfig).single('photo')

class StudentPhotoController {
	store = async (request, response) => {
		upload(request, response, async error => {
			try {
				if (error) {
					return response.status(400).json({ errors: [error.message] })
				} else if (!verifyFileExtension(request, request.file)) {
					return response.status(400).json({
						errors: 'Invalid file type. Only JPG, PNG or JPEG images are allowed.'
					})
				} else if (!request.params.id) {
					return response.status(400).json({ errors: 'Student ID is required.' })
				}

				const user = await Student.findByPk(request.params.id)

				if (!user) {
					return response.status(400).json({ errors: 'Student not found.' })
				}

				const { originalname: originalName, filename: fileName } = request.file
				const studentPhoto = await StudentPhoto.create({
					original_name: originalName,
					file_name: fileName,
					student_id: request.params.id
				})

				return response
					.status(200)
					.json({ message: 'File uploaded successfully!', file: studentPhoto })
			} catch (error) {
				return response.status(400).json({ errors: error.message })
			}
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

export default new StudentPhotoController()
