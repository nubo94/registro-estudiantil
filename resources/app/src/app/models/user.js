const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema(
	{
		// local: {
		nombre: { type: String, lowercase: true, unique: true, default: "Unfilled field"},
		usuario: { type: String, lowercase: true, unique: true, default: "Unfilled field" },
		email: {
			type: String,
			unique: true,
			lowercase: true,
			required: true,
			required: true
		},
		password: { type: String, required: true, required: true },
		// },
		// datosUsuario: {
		imagen: { type: String, lowercase: true, default: "imagen.jpg" },
		pais: { type: String, lowercase: true, default: "Unfilled field"  },
		ciudad: { type: String, lowercase: true, default: "Unfilled field"  },
		residencia: { type: String, lowercase: true, default: "Unfilled field"  }
	},
	// },
	{
		timestamps: true
	}
);

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	// return bcrypt.compareSync(password, this.local.password);
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
