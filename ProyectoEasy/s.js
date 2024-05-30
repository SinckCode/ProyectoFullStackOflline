const btnGETClientes = document.getElementById("btnGETClientes");
const btnPOSTClientes = document.getElementById("btnPOSTClientes");
const divResEmple = document.getElementById("divResEmple");

const btnGETEmple = document.getElementById("btnGETEmple");
const btnPOSTEmple = document.getElementById("btnPOSTEmple");
const divResClientes = document.getElementById("divResClientes");

const btnGETProyectos = document.getElementById("btnGETProyectos");
const btnPOSTProyectos = document.getElementById("btnPOSTProyectos");
const divResProyectos = document.getElementById("divResProyectos");

btnGETClientes.addEventListener('click', getClientes);
btnPOSTClientes.addEventListener('click', postClientes);

btnGETEmple.addEventListener('click', getEmple);
btnPOSTEmple.addEventListener('click', postEmple);

btnGETProyectos.addEventListener('click', getProyecto);
btnPOSTProyectos.addEventListener('click', postProyecto);

// Funciones para manejar las solicitudes POST en caso de falta de conexión
function pushToStack(request) {
    let stack = JSON.parse(localStorage.getItem('offlineRequests')) || [];
    stack.push(request);
    localStorage.setItem('offlineRequests', JSON.stringify(stack));
}

async function processStack() {
    let stack = JSON.parse(localStorage.getItem('offlineRequests')) || [];
    while (stack.length > 0) {
        let request = stack.pop();
        try {
            const response = await fetch(request.url, {
                method: request.method,
                headers: request.headers,
                body: JSON.stringify(request.body),
            });
            if (response.ok) {
                console.log('Solicitud procesada:', request);
            } else {
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            stack.push(request);
            break;
        }
    }
    localStorage.setItem('offlineRequests', JSON.stringify(stack));
}

function checkConnection() {
    setInterval(async () => {
        if (navigator.onLine) {
            await processStack();
        } else {
            console.log("No estás en línea. Comprueba tu conexión a internet.");
        }
    }, 1000);
}

// Iniciar la verificación de conexión
checkConnection();

// CLIENTES
async function getClientes() {
    try {
        const response = await fetch('http://localhost:3000/clientes');
        const data = await response.json();
        console.log(JSON.stringify(data));
        divResClientes.innerHTML = JSON.stringify(data);
    } catch (error) {
        console.error(error);
    }
}

async function postClientes() {
    var data = {
        Nombre: "HENNESSY",
        Direccion: "123 Calle Principal",
        Email: "hennessy@example.com",
        Telefono: "123-456-7890"
    };
    const request = {
        url: "http://localhost:3000/ClientesInsert",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data
    };

    try {
        const response = await fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(request.body),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        alert("Success:", result);
    } catch (error) {
        console.error("Error:", error);
        pushToStack(request);
        alert("Sin conexión. La solicitud se guardó y se enviará cuando haya conexión.");
    }
}

// EMPLEADOS
async function getEmple() {
    try {
        const response = await fetch('http://localhost:3000/empleados');
        const data = await response.json();
        console.log(JSON.stringify(data));
        divResEmple.innerHTML = JSON.stringify(data);
    } catch (error) {
        console.error(error);
    }
}

async function postEmple() {
    var data = {
        Nombre: "HENNESSY",
        Cargo: "Ingeniero de Software",
        Fecha_Contratacion: "2024-05-27",
        Salario: 75000
    };
    const request = {
        url: "http://localhost:3000/EmpleadosInsert",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data
    };

    try {
        const response = await fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(request.body),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        alert("Success:", result);
    } catch (error) {
        console.error("Error:", error);
        pushToStack(request);
        alert("Sin conexión. La solicitud se guardó y se enviará cuando haya conexión.");
    }
}

// PROYECTOS
async function getProyecto() {
    try {
        const response = await fetch('http://localhost:3000/proyectos');
        const data = await response.json();
        console.log(JSON.stringify(data));
        divResProyectos.innerHTML = JSON.stringify(data);
    } catch (error) {
        console.error(error);
    }
}

async function postProyecto() {
    var data = {
        Nombre: "Nuevo Proyecto",
        Fecha_Inicio: "2024-06-01",
        Responsable: "HENNESSY"
    };
    const request = {
        url: "http://localhost:3000/ProyectosInsert",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data
    };

    try {
        const response = await fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(request.body),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        alert("Success:", result);
    } catch (error) {
        console.error("Error:", error);
        pushToStack(request);
        alert("Sin conexión. La solicitud se guardó y se enviará cuando haya conexión.");
    }
}