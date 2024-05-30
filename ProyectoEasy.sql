--CREAMOS LA BASE DE DATOS
CREATE DATABASE TallerFullstack
GO

USE TallerFullstack
GO

-- Tabla de Empleados
CREATE TABLE Empleados (
    ID_Empleado INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(255),
    Cargo VARCHAR(100),
    Fecha_Contratacion DATE,
    Salario MONEY
);

-- Tabla de Proyectos
CREATE TABLE Proyectos (
    ID_Proyecto INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(255),
    Fecha_Inicio DATE,
    Responsable VARCHAR(100)
	);

-- Tabla de Clientes
CREATE TABLE Clientes (
    ID_Cliente INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(255),
    Direccion VARCHAR(255),
    Email VARCHAR(100),
    Telefono VARCHAR(20)
);

SELECT * FROM Proyectos
SELECT * FROM Empleados