var conn = new Mongo();
var db = conn.getDB("knowtech");

// Asegurar que empezamos con una colección nueva
db.alumno.drop();

// Crear la colección "alumno" con las validaciones
db.createCollection("alumno", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "IdAlumno", "Nombre", "Apellidos" ],
            properties: {
                IdAlumno: {
                    bsonType: "int",
                    description: "must be an integer and is required"
                },
                Nombre: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                Apellidos: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                Dni: {
                    bsonType: "string",
                    description: "must be a string like 12345678A and is required"
                }
            }
        },
        $and: [
            { Dni: { $regex: /[0-9]{8}[A-Z]/ } }
        ]
    }
});

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

// Test
if (db.alumno.count() == 10000) {
	print("\nHa creado los 10000 alumnos correctamente");
} else {
	throw "\nNo podía crear todos los alumnos";
}

// Crear función findAlumno
db.system.js.save(
    {
        _id: "findAlumno",
        value: function(dni) {
            return db.alumno.find( { Dni: dni } );
        }
    }
);

// Crear función insertAlumno
db.system.js.save(
    {
        _id: "insertAlumno",
        value: function(dni, nombre, apellido1, apellido2) {
            var alumnos = db.alumno.find().sort( { IdAlumno: -1 } );
            
            db.alumno.insertOne(
                {
                    IdAlumno: NumberInt(alumnos[0].IdAlumno + 1),
                    Dni: dni,
                    Nombre: nombre,
                    Apellidos: apellido1 + " " + apellido2
                }
            );
        }
    }
);

// Crear función updateAlumno
db.system.js.save(
    {
        _id: "updateAlumno",
        value: function(dni, nombre, apellido1, apellido2) {            
            db.alumno.updateOne(
                { Dni: dni },
                { $set: {
                    Nombre: nombre,
                    Apellidos: apellido1 + " " + apellido2
                } }
            );
        }
    }
);

// Crear función deleteAlumno
db.system.js.save(
    {
        _id: "deleteAlumno",
        value: function(dni) {
            db.alumno.deleteOne(
                { Dni: dni }
            );
        }
    }
);

// Cargar nuevas funciones
db.loadServerScripts();

// Test
insertAlumno("12345678A", "Paco", "Sanchez", "Fernandez");

var numeroDocumentos = db.alumno.find({
	Dni: "12345678A",
	Nombre: "Paco",
	Apellidos: "Sanchez Fernandez"
}).count();

if (numeroDocumentos == 1) {
	print("\nHa creado el alumno correctamente");
} else {
	throw "\nNo podía crear el alumno";
}

findAlumno