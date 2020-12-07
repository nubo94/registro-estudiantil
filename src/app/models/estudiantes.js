const mongoose = require("mongoose");
const estudiantesSchemas = new mongoose.Schema({
	nombre: { type: String, unique: true },
	apellido: { type: String, lowercase: true },
	imagen: { type: String, lowercase: true },
	fechaNac: { type: String, lowercase: true },
	edad: { type: String, lowercase: true },
	nacionalidad: { type: String, lowercase: true },
	residencia: { type: String, lowercase: true },
	celular: { type: String, lowercase: true },
	telResidencial: { type: String, lowercase: true },
	lugarNacimiento: { type: String, lowercase: true },
	matricula: { type: String, lowercase: true },
	estadoCivil: { type: String, lowercase: true },
	genero: { type: String, lowercase: true },
	carrera: { type: String, lowercase: true },
	materiasCursando: { type: String, lowercase: true },
	tanda: { type: String, lowercase: true },
	estado: { type: String, lowercase: true },
	sangre: { type: String, lowercase: true }
});

module.exports = mongoose.model("datosEstudiantes", estudiantesSchemas);
