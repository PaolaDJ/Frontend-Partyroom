
function agregarMensaje() {
    console.log($("#mensajeText").val())
    let mensaje = {
        messageText:$("#mensajeText").val(),
        client:{idClient:Number($("#select-client").val())},
        partyroom:{id:Number($("#select-partyroom").val())}
        
    };
    let thisDoesntMatter = JSON.stringify(mensaje)
    console.log(thisDoesntMatter)
    $.ajax({
        url: "http://144.22.56.230:8080/api/Message/save",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        data: thisDoesntMatter,
        success: function (respuesta) {
            alert("Su mensaje fue registrado")
            $("#ResultMensajes").empty();
            obtenerMensajes();
        },
        error:function (xhr,status){
            alert("Error "+xhr+" estatus "+status)

        }
    });
}

function obtenerMensajes() {
    $.ajax({
        url: 'http://144.22.56.230:8080/api/Message/all',
        type: 'GET',
        datatype: "JSON",
        success: function (respuesta) {
            $("#ResultMensajes").empty();
            mostrarMensajes(respuesta);
        }

    });
}

function obtenerClientes(){
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

function obtenerPartyroom(){
    $.ajax({
        url: 'http://144.22.56.230:8080/api/Partyroom/all',
        type: 'GET',
        datatype: "JSON",
        success: function (respuesta) {
            $("#ListaPartyrooms").empty();
            mostrarPartyroom(respuesta);
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


function mostrarPartyroom(items){
    
    let selectSalones = ""
    for(var i = 0; i< items.length; i++){
        selectSalones +="<option value='"+items[i].id+"'>"+items[i].name+"</option>"
        $("#select-partyroom").append(selectSalones);
    }

    
    
}

let  borrarMensajes= function (id) {

    $.ajax({
        url: 'http://144.22.56.230:8080/api/Message/'+id,
        type: "DELETE",
        success: function (respuesta) {
            $("#ResultMensajes").empty();
            obtenerMensajes();
            alert("Fue eliminado con éxito")
        }
    });
}


function mostrarMensajes(items) {
    //console.log(items)
    let mensajes = "<table class='table'>";
    mensajes += "<thead class='p-3 mb-2 bg-dark text-white'>";
    mensajes += "<th>ID</th>"
    mensajes += "<th>MESSAGETEXT</th>";
    mensajes += "<th>CLIENTE</th>";
    mensajes += "<th>PARTYROOM</th>";
    mensajes += "<th>UPDATE</th>";
    mensajes += "<th>DELETE</th>";
    mensajes += "</thead>";
    mensajes += "<tbody>";
    for (let i = 0; i < items.length; i++) {
        mensajes += "<tr>";
        mensajes += "<td id='rplId"+items[i].idMessage+"'>" + items[i].idMessage + "</td>";
        mensajes += "<td id='rplMessage"+items[i].idMessage+"'>" + items[i].messageText + "</td>";
        if (items[i].client == null) {
            mensajes += "<td id='rplClient"+items[i].idMessage+"'>" + "Sin cliente asignado" + "</td>";
        } else {
            mensajes += "<td id='rplClient"+items[i].idMessage+"'>" + items[i].client.name + "</td>";
        }

        if (items[i].partyroom == null) {
            mensajes += "<td id='rplPartyroom"+items[i].idMessage+"'>" + "No hay un salon asociado" + "</td>";
        } else {
            mensajes += "<td id='rplPartyroom"+items[i].idMessage+"'>" + items[i].partyroom.name + "</td>";
        }
        
        
        mensajes += "<td><button onclick='actualizarMensajes(" + items[i].idMessage + ")' id='rplConfirmar"+items[i].idMessage+"' class='btn btn-dark'>Editar</button></td>";
        mensajes += "<td><button onclick='borrarMensajes(" + items[i].idMessage + ")' id='rplCancelar"+items[i].idMessage+"' class='btn btn-dark'>Borrar</button></td>";
        mensajes += "</tr>";
    }
    mensajes += "</tbody>";
    mensajes += "</table>";
    $("#ResultMensajes").append(mensajes);
    $('td:nth-child(1), th:nth-child(1)').hide();
}
function  actualizarMensajes(id){
    $.ajax({
        url: "http://144.22.56.230:8080/api/Message/"+id,
        data: {},
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta) {
            $("#rplId"+respuesta.idMessage).replaceWith("<td><input type='hidden' id='mensajesIdAc' class='form-control' value='" + respuesta.idMessage + "'></td>");
            $("#rplMessage"+respuesta.idMessage).replaceWith("<td><input type='text' id='mensajesMenAc' class='form-control' value='" + respuesta.messageText + "'></td>");
            $("#rplMessage"+respuesta.idMessage).replaceWith("<td><input type='hidden' id='mensajesClientAc' class='form-control' value='" + respuesta.client.idClient + "'></td>");
            $("#rplMessage"+respuesta.idMessage).replaceWith("<td><input type='hidden' id='mensajesPartyroomAc' class='form-control' value='" + respuesta.partyroom.id + "'></td>");
            $("#rplClient"+respuesta.idMessage).replaceWith("<td><input type='text' class='form-control' value='" + respuesta.client.name + "' disabled></td>");
            $("#rplPartyroom"+respuesta.idMessage).replaceWith("<td><input type='text' class='form-control' value='" + respuesta.partyroom.name + "' disabled></td>");
            $('td:nth-child(1), th:nth-child(1)').hide();
            
            $("#rplConfirmar"+respuesta.idMessage).replaceWith("<td><button onclick='updateMensajes()' class='btn btn-dark'>Confirmar</button></td>");
            $("#rplCancelar"+respuesta.idMessage).replaceWith("<td><button onclick='obtenerMensajes()' class='btn btn-dark'>Cancelar</button></td>");
        }
    });
}

function updateMensajes() {


    let actualizarMensaje = {
        idMessage: $("#mensajesIdAc").val(),
        messageText: $("#mensajesMenAc").val()
    };
    let jsonActualizarSalon = JSON.stringify(actualizarMensaje);
    console.log("lo que envia el put: " + jsonActualizarSalon)
    $.ajax({
        url: "http://144.22.56.230:8080/api/Message/update",
        data: jsonActualizarSalon,
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta) {
            alert("Se ha actualizado el mensaje")
            $("#ResultMensajes").empty();
            obtenerMensajes();
        },
        error: function (xhr, status) {
            alert("Todos los valores son obligatorios");
        }
    });

}
    

