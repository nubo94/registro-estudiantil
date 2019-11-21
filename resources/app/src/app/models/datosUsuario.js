const mongoose = require("mongoose");
const usuarioSchema = new mongoose.Schema({
	nombre: { type: String },
	nombreUsuario: { type: String },
	imagen: { type: String },
	cargo: { type: String },
	pais: { type: String },
	ciudad: { type: String },
	residencia: { type: String },
	identificacion: { type: String },
	codigoI: { type: String }
});

module.exports = mongoose.model("usuario", usuarioSchema);
