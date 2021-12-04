let idCategoria;
function idCategory(id){
    alert("id de categoria elegida es: "+id)
    idCategoria=id

}

function agregarSalon() {

    let salon = {
    owner: $("#salonesOwner").val(),
    capacity: $("#salonesCapacity").val(),
    category:{id:idCategoria},
    name:$("#salonesName").val(),
    description:$("#salonesDescription").val()
    };

    let jsonSalon = JSON.stringify(salon)
    console.log(jsonSalon)
    $.ajax({
        url: "http://144.22.56.230:8080/api/Partyroom/save",
        type: "POST",
        datatype: "JSON",
        contentType: "application/json",
        data: jsonSalon,
        success: function (respuesta) {
            alert("Se creo un nuevo salón");
            $("#Result").empty();
            obtenerSalones();
        },
        error: function (xhr, status) {
            alert("Los campos son obligatorios");
        }
    });
}


function obtenerSalones() {
    $.ajax({
        url: "http://144.22.56.230:8080/api/Partyroom/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#Result").empty();
            mostrarSalones(respuesta);
        }
    });
}

function mostrarSalones(items) {
    let salones = "<table class='table'>";
    salones += "<thead class='p-3 mb-2 bg-dark text-white'>";
    salones += "<th>ID</th>"
    salones += "<th>OWNER</th>";
    salones += "<th>CAPACITY</th>";
    salones += "<th>CATEGORY ID</th>";
    salones += "<th>NAME</th>";
    salones += "<th>DESCRIPTION</th>";
    salones += "<th>UPDATE</th>";
    salones += "<th>DELETE</th>";
    salones += "</thead>";
    salones += "<tbody>";
    for (let i = 0; i < items.length; i++) {
        salones += "<tr>";
        salones += "<td id='rplId"+items[i].id+"'>" + items[i].id + "</td>";
        salones += "<td id='rplOwener"+items[i].id+"'>" + items[i].owner + "</td>";
        salones += "<td id='rplCapacity"+items[i].id+"'>" + items[i].capacity + "</td>";
        salones += "<td id='rplCategory"+items[i].id+"'>" + items[i].category.id + "</td>";
        salones += "<td id='rplName"+items[i].id+"'>" + items[i].name + "</td>";
        salones += "<td id='rplDescription"+items[i].id+"'>" + items[i].description + "</td>";
        salones += "<td><button onclick='actualizarSalon(" + items[i].id + ")' id='rplConfirmar"+items[i].id+"' class='btn btn-dark'>Editar</button></td>";
        salones += "<td><button onclick='borrarSalones(" + items[i].id + ")' id='rplCancelar"+items[i].id+"' class='btn btn-dark'>Borrar</button></td>";
        salones += "</tr>";
    }
    salones += "</tbody>";
    salones += "</table>";
    $("#Result").append(salones);
    $('td:nth-child(1), th:nth-child(1)').hide();
}

function actualizarSalon(id) {
    $.ajax({
        url: "http://144.22.56.230:8080/api/Partyroom/"+id,
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta) {
            $("#rplId"+respuesta.id).replaceWith("<td><input type='hidden' id='salonesIdAc' class='form-control' value='" + respuesta.id + "'></td>");
            $("#rplOwener"+respuesta.id).replaceWith("<td><input type='text' id='salonesOwnerAc' class='form-control' value='" + respuesta.owner + "'></td>");
            $("#rplCapacity"+respuesta.id).replaceWith("<td><input type='number' id='salonesCapacityAc' class='form-control' value='" + respuesta.capacity + "'></td>");
            $("#rplCategory"+respuesta.id).replaceWith("<td><input type='number' id='salonesCategoryIdAc' class='form-control' value='" + respuesta.category.id+ "'></td>");
            $("#rplName"+respuesta.id).replaceWith("<td><input type='text' id ='salonesNameAc' class='form-control' value='" + respuesta.name + "'></td>");
            $("#rplDescription"+respuesta.id).replaceWith("<td><input type='text' id ='salonesDescriptionAc' class='form-control' value='" + respuesta.description + "'></td>");
            $('td:nth-child(1), th:nth-child(1)').hide();
            $("#rplConfirmar"+respuesta.id).replaceWith("<td><button onclick='updateSalon()' class='btn btn-dark'>Confirmar</button></td>");
            $("#rplCancelar"+respuesta.id).replaceWith("<td><button onclick='obtenerSalones()' class='btn btn-dark'>Cancelar</button></td>");
        }
    });
}

function updateSalon(){
    let actualizarSalon = {
        id: $("#salonesIdAc").val(),
        owner: $("#salonesOwnerAc").val(),
        capacity: $("#salonesCapacityAc").val(),
        category_id: $("#salonesCategoryIdAc").val(),
        name: $("#salonesNameAc").val(),
        description: $("#salonesDescriptionAc").val()
    };
    let jsonActualizarSalon = JSON.stringify(actualizarSalon);
    $.ajax({
        url: "http://144.22.56.230:8080/api/Partyroom/update",
        data: jsonActualizarSalon,
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta){
            alert("Se ha actualizado el salón")
            $("#Result").empty();
            obtenerSalones();
        },
        error: function (xhr, status) {
            alert("Todos los valores son obligatorios");
        }
    });
}

function borrarSalones(id) {

    $.ajax({
        url: 'http://144.22.56.230:8080/api/Partyroom/' + id,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#Result").empty();
            obtenerSalones();
            alert("El item fue eliminado correctamente")
        }
    });
}
