const express = require("express")
const app = express()
app.use(express.json())
const {
	models: { User },
} = require("./db")
const path = require("path")

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")))

app.post("/api/auth", async (req, res, next) => {
	try {
		res.send({ token: await User.authenticate(req.body) })
	} catch (ex) {
		next(ex)
	}
})

app.get("/api/auth", async (req, res, next) => {
	try {
		res.send(await User.byToken(req.headers.authorization))
	} catch (ex) {
		next(ex)
	}
})

app.get("/api/users/:id/notes", async (req, res, next) => {
  try {
    const userId = req.params.id;
    res.send(await User.findByPk(userId))
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
	console.log(err)
	res.status(err.status || 500).send({ error: err.message })
})

module.exports = app
