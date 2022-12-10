import App from './App'

const port = process.env.PORT || 3001

App.listen(port, () => {
	console.log(`Server running on address http://127.0.0.1:${port}`)
})
