const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const sql = require('mssql');

app.get('/', (req, res) => {
    res.send('Hola, el servidor está funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`El servidor está en el puerto ${PORT}`);
});

// Middleware
app.use(express.json());
app.use(cors());

const config = {
    user: 'sa',
    password: '200413',
    server: 'SINCK\\SQLEXPRESS',
    database: 'TallerFullstack',
    options: {
        port: 1433,
        encrypt: false
    },
};

// Conexión a la base de datos
sql.connect(config, (err) => {
    if (err) {
        console.error('Error de conexión:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// EMPLEADOS
app.get('/empleados', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Empleados`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener empleados', error);
        res.status(500).json({error: 'Error al obtener Empleados'});
    }
});

app.post('/EmpleadosInsert', async (req, res) => {
    try {
        const { Nombre, Cargo, Fecha_Contratacion, Salario } = req.body;
        const result = await sql.query`
            INSERT INTO Empleados (Nombre, Cargo, Fecha_Contratacion, Salario)
            OUTPUT INSERTED.ID_Empleado
            VALUES (${Nombre}, ${Cargo}, ${Fecha_Contratacion}, ${Salario});`
            ;
        const nuevoId = result.recordset[0].ID_Empleado;
        res.json({ message: `Se agregó el empleado ${Nombre} con ID ${nuevoId}` });
    } catch (error) {
        console.error('Error al agregar empleado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// CLIENTES
app.get('/clientes', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Clientes`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener clientes', error);
        res.status(500).json({error: 'Error al obtener Clientes'});
    }
});

app.post('/ClientesInsert', async (req, res) => {
    try {
        const { Nombre, Direccion, Email, Telefono } = req.body;
        const result = await sql.query`
            INSERT INTO Clientes (Nombre, Direccion, Email, Telefono)
            OUTPUT INSERTED.ID_Cliente
            VALUES (${Nombre}, ${Direccion}, ${Email}, ${Telefono});
        `;
        const nuevoId = result.recordset[0].ID_Cliente;
        res.json({ message: `Se agregó el cliente ${Nombre} con ID ${nuevoId}` });
    } catch (error) {
        console.error('Error al agregar cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// PROYECTOS
app.get('/proyectos', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Proyectos`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener proyectos', error);
        res.status(500).json({error: 'Error al obtener Proyectos'});
    }
});

app.post('/ProyectosInsert', async (req, res) => {
    try {
        const { Nombre, Fecha_Inicio, Responsable } = req.body;
        const result = await sql.query`
            INSERT INTO Proyectos (Nombre, Fecha_Inicio, Responsable)
            OUTPUT INSERTED.ID_Proyecto
            VALUES (${Nombre}, ${Fecha_Inicio}, ${Responsable});
        `;
        const nuevoId = result.recordset[0].ID_Proyecto;
        res.json({ message: `Se agregó el proyecto ${Nombre} con ID ${nuevoId}` });
    } catch (error) {
        console.error('Error al agregar proyecto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
