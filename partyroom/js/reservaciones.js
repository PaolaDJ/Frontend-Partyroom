//const URLBase = "http://localhost:8080/api/Reservation/";
const URLBase = "http://144.22.56.230:8080/api/Reservation/";

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

function obtenerClientes() {
    $.ajax({
        url: 'http://144.22.56.230:8080/api/Client/all',
        type: 'GET',
        datatype: "JSON",
        success: function (respuesta) {

            $("#ListaClientes").empty();
            mostrarClientes(respuesta);
        }
    });
}
function obtenerSalones() {
    $.ajax({
        url: 'http://144.22.56.230:8080/api/Partyroom/all',
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#ListaPartymooms").empty();
            mostrarSalones(respuesta);

        }
    });
}

function mostrarClientes(items){
     
    let selectClientes = ""
    for(var i = 0; i < items.length; i++){
        selectClientes += "<option value='"+items[i].idClient+"'>"+items[i].name+"</option>"
        $("#select-client").append(selectClientes)
    }
    console.log("los clientes son: "+selectClientes)
    
    
}

function mostrarSalones(items){
    
    let selectSalones = ""
    for(var i = 0; i< items.length; i++){
        selectSalones +="<option value='"+items[i].id+"'>"+items[i].name+"</option>"
        $("#select-partyroom").append(selectSalones);
    }

    
    
}

function agregarReservaciones() {
    
        let reservacion = {
            startDate: $("#reservacionesStarDate").val(),
            devolutionDate: $("#reservacionesDevolutionDate").val(),
            status: $("#reservacionesStatus").val(),
            partyroom: {id:Number($("#select-partyroom").val())},
            client: {idClient:Number($("#select-client").val())},

        };
        let thisDoesntMatter=JSON.stringify(reservacion)
        $.ajax({
            url: "http://144.22.56.230:8080/api/Reservation/save",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        data: thisDoesntMatter,
        success: function (respuesta) {
            alert("Su mensaje fue registrado")
            $("#ResultReservations").empty();
            obtenerReservaciones();
        },
        error:function (xhr,status){
            alert("Error "+xhr+" estatus "+status)

        }
        });


    }

   
    function obtenerReservaciones() {
        $.ajax({
            url: urlGET(),
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                $("#ResultReservations").empty();

                mostrarReservaciones(respuesta);

            }
        });
    }

    function borrarReservacion(id) {

        $.ajax({
            url: urlDELETE(id),
            type: "DELETE",

            success: function () {
                $("#ResultReservations").empty();
                obtenerReservaciones();
                alert("El item fue eliminado correctamente");
            }
        });
    }

    function mostrarReservaciones(items) {
        let reservaciones = "<table class='table'>";
        reservaciones += "<thead class='p-3 mb-2 bg-dark text-white'>";

        reservaciones += "<th>STARDATE</th>";
        reservaciones += "<th>DEVOLUTIONDATE</th>";
        reservaciones += "<th>STATUS</th>";
        reservaciones += "<th>PARTYROOM</th>"
        reservaciones += "<th>CLIENT</th>"
        reservaciones += "<th>UPDATE</th>";
        reservaciones += "<th>DELETE</th>";
        reservaciones += "</thead>";
        reservaciones += "<tbody>";
        for (let i = 0; i < items.length; i++) {
            reservaciones += "<tr>";

            reservaciones += "<td id='rplStarDate" + items[i].idReservation + "'>" + items[i].startDate + "</td>";
            reservaciones += "<td id='rplDevolutionDate" + items[i].idReservation + "'>" + items[i].devolutionDate + "</td>";
            reservaciones += "<td id='rplStatus" + items[i].idReservation + "'>" + items[i].status + "</td>";
            reservaciones += "<td id='rplPartyroom" + items[i].idReservation + "'>" + items[i].partyroom.name + "</td>";
            reservaciones += "<td id='rplClient" + items[i].idReservation + "'>" + items[i].client.name + "</td>";
            reservaciones += "<td><button onclick='actualizarReservas(" + items[i].idReservation + ")' id='rplConfirmar" + items[i].idReservation + "' class='btn btn-dark'>Editar</button></td>";
            reservaciones += "<td><button onclick='borrarReservacion(" + items[i].idReservation + ")' id='rplCancelar" + items[i].idReservation + "' class='btn btn-dark'>Borrar</button></td>";
            reservaciones += "</tr>";
        }
        reservaciones += "</tbody>";

        reservaciones += "</table>";
        $("#Result").append(reservaciones);
        $('td:nth-child(1), th:nth-child(1)').hide();
    }

    function actualizarReservas(id) {
        $.ajax({
            url: urlGETID(id),
            type: "GET",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (respuesta) {

                $("#rplIdReservation" + respuesta.idReservation).replaceWith("<td><input type='hidden' id='reservacionIdAc' class='form-control' value='" + respuesta.idReservation + "'></td>");
                $("#rplStarDate" + respuesta.idReservation).replaceWith("<td><input type='date' id='reservacionesSDAc' class='form-control' value='" + respuesta.startDate + "'></td>");
                $("#rplDevolutionDate" + respuesta.idReservation).replaceWith("<td><input type='date' id='reservacionesDDAc' class='form-control' value='" + respuesta.devolutionDate + "'></td>");
                $("#rplStatus" + respuesta.idReservation).replaceWith("<td><input type='text' id='reservacionesSAc' class='form-control' value='" + respuesta.status + "'></td>");
                $("#rplPartyroom" + respuesta.idReservation).replaceWith("<td><input type='text/javascript' id ='reservacionesParAc' class='form-control' value='" + respuesta.partyroom.id + "'></td>");
                $("#rplClient" + respuesta.idReservation).replaceWith("<td><input type='text/javascript' id ='reservacionesCliAc' class='form-control' value='" + respuesta.client.name + "'></td>");
                $('td:nth-child(1), th:nth-child(1)').hide();
                $("#rplConfirmar" + respuesta.idReservation).replaceWith("<td><button onclick='updateReservacion()' class='btn btn-dark'>Confirmar</button></td>");
                $("#rplCancelar" + respuesta.idReservation).replaceWith("<td><button onclick='obtenerReservaciones()' class='btn btn-dark'>Cancelar</button></td>");
            }
        });
    }

    function updateReservacion() {
        let actualizarReservacion = {
            idReservation: $("#reservacionIdAc").val(),
            startDate: $("#reservacionesSDAc").val(),
            devolutionDate: $("#reservacionesDDAc").val(),
            status: $("#reservacionesSAc").val(),
            
        };
        let jsonActualizarReservacion = JSON.stringify(actualizarReservacion);
        $.ajax({
            url: urlUPDATE(),
            data: jsonActualizarReservacion,
            type: "PUT",
            datatype: "JSON",
            contentType: "application/json",
            success: function () {
                alert("Se ha actualizado la reservacion correctamente")
                $("#Result").empty();
                obtenerReservaciones();
            },
            error: function (xhr, status) {
                alert("Todos los valores son obligatorios");
            }
        });
    }

