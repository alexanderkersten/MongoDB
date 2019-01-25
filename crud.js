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
