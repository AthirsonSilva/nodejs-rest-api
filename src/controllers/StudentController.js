import Student from '../models/Student'
import StudentPhoto from '../models/StudentPhoto'

class StudentController {
	index = async (request, response) => {
		try {
			const students = await Student.findAll({
				attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
				order: [
					['id', 'DESC'],
					[StudentPhoto, 'id', 'DESC']
				],
				include: {
					model: StudentPhoto,
					attributes: ['id', 'original_name', 'file_name']
				}
			})

			response
				.status(200)
				.json({ message: 'Studends fetched with success!', students })
		} catch (error) {
			response.status(400).json({
				message: 'Error at fetching students',
				error: error.errors ? error.errors.map(e => e.message) : error
			})
		}
	}

	show = async (request, response) => {
		try {
			if (!request.params.id) {
				response.status(400).json({ message: 'ID is required!' })
			}

			const student = await Student.findByPk(request.params.id, {
				attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
				order: [
					['id', 'DESC'],
					[StudentPhoto, 'id', 'DESC']
				],
				include: {
					model: StudentPhoto,
					attributes: ['id', 'original_name', 'file_name', 'url']
				}
			})

			if (!student) {
				response.status(400).json({ message: 'Student not found!' })
			}

			response
				.status(200)
				.json({ message: 'Student fetched with success!', student })
		} catch (error) {
			response.status(400).json({
				message: 'Error at fetch student',
				error: error.errors ? error.errors.map(e => e.message) : error
			})
		}
	}

	store = async (request, response) => {
		try {
			const newStudent = await Student.create(request.body)

			response
				.status(200)
				.json({ message: 'Student created with success!', newStudent })
		} catch (error) {
			response.status(400).json({
				message: 'Error at create student',
				error: error.errors ? error.errors.map(e => e.message) : error
			})
		}
	}

	update = async (request, response) => {
		try {
			if (!request.params.id) {
				response.status(400).json({ message: 'ID is required!' })
			}

			const student = await Student.findByPk(request.params.id)

			if (!student) {
				response.status(400).json({ message: 'Student not found!' })
			}

			const updatedStudent = await student.update(request.body)

			response
				.status(200)
				.json({ message: 'Student updated with success!', updatedStudent })
		} catch (error) {
			response.status(400).json({
				message: 'Error at update student',
				error: error.errors ? error.errors.map(e => e.message) : error
			})
		}
	}

	delete = async (request, response) => {
		try {
			if (!request.params.id) {
				response.status(400).json({ message: 'ID is required!' })
			}

			const student = await Student.findByPk(request.params.id)

			if (!student) {
				response.status(400).json({ message: 'Student not found!' })
			}

			await student.destroy()

			response
				.status(200)
				.json({ message: 'Student deleted with success!', student })
		} catch (error) {
			response.status(400).json({
				message: 'Error at delete student',
				error: error.errors ? error.errors.map(e => e.message) : error
			})
		}
	}
}

export default new StudentController()
