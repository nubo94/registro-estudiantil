const LocalStrategy = require("passport-local").Strategy;
const User = require("../app/models/user");

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// Signup
	passport.use(
		"local-signup",
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true
			},
			function(req, email, password, done) {
				// User.findOne({ "local.email": email }, function(err, user) {
				User.findOne({ "email": email }, function(err, user) {
					if (err) {
						return done(err);
					}
					if (user) {
						return done(
							null,
							false,
							req.flash(
								"signupMessage",
								"Este correo eléctronico ya esta en uso"
							)
						);
					} else {
						// Login Usuario
						// .local
						// .local
						// .local
						// .local
						// .datosUsuario
						// .datosUsuario
						// .datosUsuario
						// .datosUsuario
						var newUser = new User();
						newUser.email = email;
						newUser.password = newUser.generateHash(password);
						newUser.nombre = req.body.nombre;
						newUser.usuario = req.body.usuario;
						newUser.pais = req.body.pais;
						newUser.imagen = req.body.imagen;
						newUser.ciudad = req.body.ciudad;
						newUser.residencia = req.body.residencia;
						newUser.save(function(err) {
							if (err) {
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
			}
		)
	);

	// login
	passport.use(
		"local-login",
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true
			},
			function(req, email, password, done) {
				// User.findOne({ "local.email": email }, function(err, user) {
				User.findOne({ "email": email }, function(err, user) {
					if (err) {
						return done(err);
					}
					if (!user) {
						return done(
							null,
							false,
							req.flash("loginMessage", "Usuario no encontrado")
						);
					}
					if (!user.validPassword(password)) {
						return done(
							null,
							false,
							req.flash("loginMessage", "Contraseña incorrecta")
						);
					}
					return done(null, user);
				});
			}
		)
	);
};
