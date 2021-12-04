function agregarCategoria() {
    var inputName
    var inputDesc
    do{
        inputName = prompt("Dime el nombre de la categoria")
        inputDesc = prompt("Describe la categoria")
    }while (inputName == null || inputDesc == null)
    let categoria = {
        name: inputName,
        description: inputDesc
    };
    let convert = JSON.stringify(categoria)
    console.log(convert)
    $.ajax({
        url: "http://144.22.56.230:8080/api/Category/save",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: convert,
        success: function (respuesta) {
            alert("Se creo una nueva categoria");
            $("#resultCategorias").empty();
            obtenerCategorias();
        },
        error: function (xhr, status) {
            alert("Los campos son obligatorios");
        }
    });
}


function obtenerCategorias() {
    $.ajax({
        url: "http://144.22.56.230:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultCategorias").empty();
            mostrarcategorias(respuesta);
        }
    });
}

function mostrarcategorias(items) {
    let categorias = ""
    for (let i = 0; i < items.length; i++) {
        categorias += "<tr>";
        categorias += "<td id='rplId"+items[i].id+"'>" + items[i].id + "</td>";
        categorias += "<td onclick='idCategory("+items[i].id+")'  data-toggle='tooltip' data-placement='bottom' title='"+items[i].description+"'>" + items[i].name + "</td>";
        categorias += "<td><button onclick='updateCategoria(" + items[i].id + ")' id='rplConfirmar"+items[i].id+"' class='btn btn-dark'>Editar</button></td>";
        categorias += "<td><button onclick='borrarCategoria(" + items[i].id + ")' id='rplCancelar"+items[i].id+"' class='btn btn-dark'>Borrar</button></td>";
        categorias += "</tr>";
    }
    $("#resultCategorias").append(categorias);
    console.log(categorias)
    $('td:nth-child(1)').hide();
}

function updateCategoria(id){
    var inputName
    var inputDesc
    do{
        inputName = prompt("Dime el nombre de la categoria")
        inputDesc = prompt("Describe la categoria")
    }while (inputName == null || inputDesc == null)

    let categoria = {
        id:id,
        name: inputName,
        description: inputDesc
    };
    console.log("actualizar: "+categoria.id+"/"+categoria.name+"/"+categoria.description )
    let jsonCategoria = JSON.stringify(categoria);
    $.ajax({
        url: "http://144.22.56.230:8080/api/Category/update",
        data: jsonCategoria,
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta){
            alert("Se ha actualizado el salón")
            $("#Result").empty();
            obtenerCategorias();
        },
        error: function (xhr, status) {
            alert("Todos los valores son obligatorios");
        }
    });
}

function borrarCategoria(id) {
    $.ajax({
        url: 'http://144.22.56.230:8080/api/Category/'+id,
        type: "DELETE",
        success: function (respuesta) {
            $("#Result").empty();
            obtenerCategorias();
            alert("El item fue eliminado correctamente")
        },
        error: function (xhr,status) {
            prompt("algo a salido mal intentalo de nuevo")
        }
    });
}
