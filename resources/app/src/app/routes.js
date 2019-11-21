module.exports = (app, passport) => {
	//login view
	app.get("/login", (req, res) => {
		res.render("login", {
			message: req.flash("loginMessage")
		});
	});

	app.post(
		"/login",
		passport.authenticate("local-login", {
			successRedirect: "/welcome",
			failureRedirect: "/login",
			failureFlash: true
		})
	);

	// signup view
	app.get("/signup", (req, res) => {
		res.render("signup", {
			message: req.flash("signupMessage")
		});
	});

	app.post(
		"/signup",
		passport.authenticate("local-signup", {
			successRedirect: "/login",
			failureRedirect: "/signup",
			failureFlash: true
		})
	);

	app.get("/welcome", isLoggedIn, (req, res) => {
		res.render("welcome", {
			user: req.user
		});
	});

	// Busqueda de los datos del estudiante
	app.get("/search", isLoggedIn, (req, res) => {
		const datosEstudiantes = require("./models/estudiantes");
		datosEstudiantes.find((err, personas) => {
			// console.log(data);
			if (err) throw err;
			res.render("search", {
				datosEstudiantes: personas,
				user: req.user
			});
		});
	});

	app.post("/showDatos", isLoggedIn, (req, res) => {
		const datosEstudiantes = require("./models/estudiantes");
		// let nombre = req.body.buscar;
		// let nombre = "Carolina";
		let nombre = req.body.buscar;

		// console.log(`La persona a buscar es: ${nombre}`)
		datosEstudiantes.findOne({ nombre: nombre }, (err, persona) => {
			// console.log(persona);
			if (err) {
				throw err;
			}
			if (persona != null) {
				res.render("datos", {
					title: "Registro de estudiantes",
					nombre: persona.nombre,
					apellido: persona.apellido,
					imagen: persona.imagen,
					fechaNac: persona.fechaNac,
					edad: persona.edad,
					residencia: persona.residencia,
					celular: persona.celular,
					telResidencial: persona.telResidencial,
					lugarNacimiento: persona.lugarNacimiento,
					nacionalidad: persona.nacionalidad,
					matricula: persona.matricula,
					estadoCivil: persona.estadoCivil,
					genero: persona.genero,
					carrera: persona.carrera,
					materiasCursando: persona.materiasCursando,
					tanda: persona.tanda,
					sangre: persona.sangre,
					estado: persona.estado,
					id: persona._id,
					user: req.user
				});
			} else {
				res.render("estudianteNoEncontrado", {
					nombre: nombre,
					user: req.user
				});
			}
		});
	});

	// Introducción de datos
	app.get("/input-person", isLoggedIn, (req, res) => {
		const datosEstudiantes = require("./models/estudiantes");
		res.render("input_person", {
			user: req.user
		});
	});

	app.post("/input-person", isLoggedIn, (req, res) => {
		const datosEstudiantes = require("./models/estudiantes");
		const nombre = req.body.nombre;
		const apellido = req.body.apellido;
		const imagen = req.body.imagen;
		const fechaNac = req.body.fNaC;
		const edad = req.body.edad;
		const nacionalidad = req.body.nacionalidad;
		const residencia = req.body.residencia;
		const celular = req.body.celular;
		const telResidencial = req.body.numTel;
		const lugarNacimiento = req.body.lugarNac;
		const matricula = req.body.mat;
		const estadoCivil = req.body.estadoCivil;
		const genero = req.body.gen;
		const carrera = req.body.carrera;
		const materiasCursando = req.body.materiasC;
		const tanda = req.body.tanda;
		const estado = req.body.estado;
		const sangre = req.body.sangre;

		let estudiantes = new datosEstudiantes();
		estudiantes.nombre = nombre;
		estudiantes.apellido = apellido;
		estudiantes.imagen = imagen;
		estudiantes.fechaNac = fechaNac;
		estudiantes.edad = edad;
		estudiantes.nacionalidad = nacionalidad;
		estudiantes.residencia = residencia;
		estudiantes.celular = celular;
		estudiantes.telResidencial = telResidencial;
		estudiantes.lugarNacimiento = lugarNacimiento;
		estudiantes.matricula = matricula;
		estudiantes.estadoCivil = estadoCivil;
		estudiantes.genero = genero;
		estudiantes.carrera = carrera;
		estudiantes.materiasCursando = materiasCursando;
		estudiantes.tanda = tanda;
		estudiantes.estado = estado;
		estudiantes.sangre = sangre;
		estudiantes.save();
		setTimeout(() => {
			res.redirect("input-person");
		}, 1200);
	});

	app.get("/team", isLoggedIn, (req, res) => {
		res.render("team", {
			user: req.user
		});
	});

	// Actualizar datos
	app.get("/actualizar/:id", isLoggedIn, (req, res, next) => {
		const datosEstudiantes = require("./models/estudiantes");
		let idPersona = req.params.id;
		// console.log("+++++++++++++++++> " + idPersona);
		datosEstudiantes.findOne({ _id: idPersona }, (err, persona) => {
			//console.log(persona);
			if (err) throw err;
			res.render("nombreActualizar", {
				id: idPersona,
				nombre: persona.nombre,
				apellido: persona.apellido,
				imagen: persona.imagen,
				fechaNac: persona.fechaNac,
				edad: persona.edad,
				residencia: persona.residencia,
				celular: persona.celular,
				telResidencial: persona.telResidencial,
				lugarNacimiento: persona.lugarNacimiento,
				nacionalidad: persona.nacionalidad,
				matricula: persona.matricula,
				estadoCivil: persona.estadoCivil,
				genero: persona.genero,
				carrera: persona.carrera,
				materiasCursando: persona.materiasCursando,
				tanda: persona.tanda,
				sangre: persona.sangre,
				estado: persona.estado,
				id: persona._id,
				user: req.user
			});
		});
	});

	app.post("/actualizar/:id", isLoggedIn, (req, res, next) => {
		const datosEstudiantes = require("./models/estudiantes");
		let nombre = req.params.id;
		// console.log("--------------> " + nombre);
		datosEstudiantes
			.findByIdAndUpdate({ _id: nombre }, req.body)
			.then(function() {
				datosEstudiantes
					.findOne({ _id: nombre })
					.then(function(persona) {
						setTimeout(() => {
							res.redirect("/search");
						}, 1200);
					});
			});
	});

	//Eliminar datos
	app.get("/delete/:id", isLoggedIn, (req, res, next) => {
		const datosEstudiantes = require("./models/estudiantes");
		let nombre = req.params.id;
		// console.log("He eliminado a " + nombre);
		datosEstudiantes.remove({ nombre: nombre }, err => {
			if (err) throw err;
			setTimeout(() => {
				res.redirect("/search");
			}, 1200);
		});
	});

	// Settings, actualizar datos del usuario
	app.get("/settings/:id", isLoggedIn, (req, res, next) => {
		const usarioUpdate = require("./models/user");
		let idUsuario = req.params.id;
		// console.log("+++++++++++++++++> " + idUsuario);
		usarioUpdate.findOne({ _id: idUsuario }, (err, usuario) => {
			// console.log(usuario);
			// console.log(usuario.datosUsuario.residencia);
			if (err) throw err;
			res.render("settings", {
				id: idUsuario,
				user: req.user,
				nombre: usuario.nombre,
				usuario: usuario.usuario,
				pais: usuario.pais,
				ciudad: usuario.ciudad,
				residencia: usuario.residencia,
				imagen: usuario.imagen

				// nombre: usuario.local.nombre,
				// usuario: usuario.local.usuario,
				// pais: usuario.datosUsuario.pais,
				// ciudad: usuario.datosUsuario.ciudad,
				// residencia: usuario.datosUsuario.residencia,
				// imagen: usuario.datosUsuario.imagen
			});
		});
	});

	app.post("/settings/:id", isLoggedIn, (req, res, next) => {
		const user = require("./models/user");
		// console.log("------------>" + req.body.nombre);
		let usuario = req.params.id;
		let residencia = "Quisqueya Manaza 31 #31"
		// console.log("--------------> " + usuario);
		user
			.findByIdAndUpdate({ _id: usuario }, req.body)
			.then(function() {
				user.findOne({ _id: usuario })
				.then(function(usuario) {
					// console.log('==================>' + usuario)
					setTimeout(() => {
						res.redirect("/welcome");
					}, 1200);
				});
			});
	});

	// Salir
	app.get("/logout", (req, res) => {
		req.logout();
		res.redirect("/login");
	});
};

// Terminación de la función principal

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
}
