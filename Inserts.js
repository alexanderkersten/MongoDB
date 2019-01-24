// bbdd knowtech
// colección alumno
// IdAlumno (entero)
// Nombre (string)
// Apellidos (string)
// Dni (string)

// 10000 Alumnos
// for

use knowtech

for (i = 1; i <= 1000; i++) {
	db.alumno.insertOne(
		{
			IdAlumno: NumberInt(31415),
			Nombre: "Hola",
			Apellidos: "Mundo",
			Dni: "12345678A"
		}
	);
}

db.alumno.drop();
