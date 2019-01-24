// Asegurar que no hay alumnos en la colección
db.alumno.drop();

// Crear 1000 alumnos con los campos: IdAlumno, Nombre, Apellidos y Dni
for (i = 1; i <= 1000; i++) {
	db.alumno.insertOne(
		{
			IdAlumno: NumberInt(i),
			Nombre: "Hola",
			Apellidos: "Mundo",
			Dni: "12345678A"
		}
	);
}

// Comprobar cuantos alumnos hay
print("\nDocuments:");
printjson(db.alumno.count());

// Mostrar un alumno de ejemplo
print("\nExample:");
printjson(db.alumno.findOne());
