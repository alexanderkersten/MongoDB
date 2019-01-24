// Asegurar que no hay alumnos en la colección
db.alumno.drop();

// Lista con nombres y apellidos
var nombres = ["Pepe", "Juan", "Jose", "Jordi", "Maria"];
var apellidos = ["Fernandez", "Hernandez", "Pujol", "Rico", "Sanchez"];

// Crear 10000 alumnos con los campos: IdAlumno, Nombre, Apellidos y Dni
for (i = 1; i <= 10000; i++) {
	var nombre = nombres[Math.floor(Math.random() * nombres.length)];
	var apellido1 = apellidos[Math.floor(Math.random() * apellidos.length)];
	var apellido2 = apellidos[Math.floor(Math.random() * apellidos.length)];
	var dni = "";
	
	for (j = 1; j <= 8; j++) {
		dni += Math.floor(Math.random() * 10);
	}
	
	dni += String.fromCharCode(65 + Math.floor(Math.random() * 26));;
	
	db.alumno.insertOne(
		{
			IdAlumno: NumberInt(i),
			Nombre: nombre,
			Apellidos: apellido1 + " " + apellido2,
			Dni: dni
		}
	);
}

// Comprobar cuantos alumnos hay
print("\nDocuments:");
printjson(db.alumno.count());

// Mostrar un alumno de ejemplo
print("\nExample:");
printjson(db.alumno.findOne());
