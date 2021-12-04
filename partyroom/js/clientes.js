var URLBase = "http://144.22.56.230:8080/api/Client/"

function urlPOST() {
    return URLBase + "save";
}

function urlGET() {
    return URLBase + "all";
}

function urlGETID(id) {
    return URLBase + id;
}

function urlUPDATE() {
    return URLBase + "update";
}

function urlDELETE(id) {
    return URLBase + id;
}

function agregarCliente() {
    let cliente = {
        name: $("#clientName").val(),
        email: $("#clientEmail").val(),
        password: $("#clientPassword").val(),
        age: $("#clientAge").val()
    };
//
    $.ajax({
        url: urlPOST(),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cliente),
        datatype: "JSON",
        success: function (respuesta) {
            $("#clientIdClient").val('');
            $("#clientName").val('');
            $("#clientEmail").val('');
            $("#clientPassword").val('');
            $("#clientAge").val('');
            $("#ResultClient").empty();
            alert("Gracias por su registro");
            obtenerClientes();
        },
        error:function (xhr,status){alert("Los campos son obligatorios")}
    });
}

function obtenerClientes() {
    $.ajax({
        url: urlGET(),
        type: 'GET',
        datatype: "JSON",
        success: function (respuesta) {

            $("#ResultClient").empty();
            mostrarClientes(respuesta);
        }
    });
}

function mostrarClientes(items) {
    let clientes = "<table class='table'>";
    clientes += "<thead class='p-3 mb-2 bg-dark text-white'>";
    clientes += "<th>ID</th>"
    clientes += "<th>NAME</th>";
    clientes += "<th>EMAIL</th>";
    clientes += "<th>PASSWORD</th>";
    clientes += "<th>AGE</th>";
    clientes += "<th>UPDATE</th>";
    clientes += "<th>DELETE</th>";
    clientes += "</thead>";
    clientes += "<tbody>";
    for (let i = 0; i < items.length; i++) {
        clientes += "<tr>";
        clientes += "<td id='rplIdClient"+items[i].idClient +"'>" + items[i].idClient + "</td>";
        clientes += "<td id='rplName"+items[i].idClient+"'>" + items[i].name + "</td>";
        clientes += "<td id='rplEmail"+items[i].idClient+"'>" + items[i].email + "</td>";
        clientes += "<td id='rplPassword"+items[i].idClient+"'>" + items[i].password + "</td>";
        clientes += "<td id='rplAge"+items[i].idClient+"'>" + items[i].age + "</td>";

        clientes += "<td><button onclick='actualizarClientes(" + items[i].idClient + ")' id='rplConfirmar"+items[i].idClient+"' class='btn btn-dark'>Editar</button></td>";
        clientes += "<td><button onclick='borrarClientes(" + items[i].idClient + ")' id='rplCancelar"+items[i].idClient+"' class='btn btn-dark'>Borrar</button></td>";
        clientes += "</tr>";
    }
    clientes += "</tbody>";
    clientes += "</table>";
    $("#ResultClient").append(clientes);
    $('td:nth-child(1), th:nth-child(1)').hide();
}

function actualizarClientes(id) {
    $.ajax({
        url: urlGETID(id),
        data: {},
        type: "GET",
        datatype: "JSON",
        contentType: "application/json; charset=utf-8",
        success: function (respuesta) {
            $("#rplIdClient"+respuesta.idClient).replaceWith("<td><input type='hidden' id='clientesIdAc' class='form-control' value='" + respuesta.idClient + "'></td>");
            $("#rplName"+respuesta.idClient).replaceWith("<td><input type='text' id='clientesNamAc' class='form-control' value='" + respuesta.name + "'></td>");
            $("#rplEmail"+respuesta.idClient).replaceWith("<td><input type='text' id='clientesEmAc' class='form-control' value='" + respuesta.email + "'></td>");
            $("#rplPassword"+respuesta.idClient).replaceWith("<td><input type='text' id='clientesPassAc' class='form-control' value='" + respuesta.password + "'></td>");
            $("#rplAge"+respuesta.idClient).replaceWith("<td><input type='text' id='clientesAgAc' class='form-control' value='" + respuesta.age + "'></td>");
            $('td:nth-child(1), th:nth-child(1)').hide();
            $("#rplConfirmar"+respuesta.idClient).replaceWith("<td><button onclick='updateClientes()' class='btn btn-dark'>Confirmar</button></td>");
            $("#rplCancelar"+respuesta.idClient).replaceWith("<td><button onclick='obtenerClientes()' class='btn btn-dark'>Cancelar</button></td>");
        }
    });
}

function updateClientes(){
    let actualizarClientes = {
        idClient: $("#clientesIdAc").val(),
        name: $("#clientesNamAc").val(),
        email: $("#clientesEmAc").val(),
        password: $("#clientesPassAc").val(),
        age: $("#clientesAgAc").val()
    };
    let jsonActualizarClientes = JSON.stringify(actualizarClientes);
    $.ajax({
        url: urlUPDATE(),
        data: jsonActualizarClientes,
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta){
            alert("Se ha actualizado el Cliente")
            $("#ResultClient").empty();
            obtenerClientes();
        },
        error: function (xhr, status) {
            alert("Todos los valores son obligatorios");
        }
    });
}

function borrarClientes(id) {


    $.ajax({
        url: urlDELETE(id),
        type: "DELETE",
        //contentType: "application/JSON",
        //datatype: "JSON",
        success: function (respuesta) {
            $("#ResultClient").empty();
            obtenerClientes();
            alert("Fue eliminado con éxito")
        }
    });
}



