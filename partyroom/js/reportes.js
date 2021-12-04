function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://144.22.56.230:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaStatus(respuesta);
        }
    });

    function pintarRespuestaStatus(items) {
        let status = "<table class='table'>";
        status += "<thead class='p-3 mb-2 bg-dark text-white'>";

        status += "<th>COMPLETADAS</th>";
        status += "<th>CANCELADAS</th>";
        status += "<th>UPDATE</th>";
        status += "<th>DELETE</th>";
        status += "</thead>";
        status += "<tbody>";
        for (let i = 0; i < items.length; i++) {
            status += "<tr>";

            status += "<td id='rplCompl"+items[i].idReservation+"'>" + items[i].completed + "</td>";
            status += "<td id='rplCancel"+items[i].idReservation+"'>" + items[i].cancelled + "</td>";
            status += "</tr>";
        }
        status += "</tbody>";
        status += "</table>";
        $("ResultStatus").append(status);
        $('td:nth-child(1), th:nth-child(1)').hide();
    }



    function traerReporteDate(){

        var fechaInicio = document.getElementById("RstarDate").value;
        var fechaCierre = document.getElementById("RdevolutionDate").value;
        console.log(fechaInicio);
        console.log(fechaCierre);

        $.ajax({
            url:"http://144.22.56.230:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
    function pintarRespuestaDate(items) {
        let date = "<table class='table'>";
        date += "<thead class='p-3 mb-2 bg-dark text-white'>";

        date += "<th>DEVOLUTION DATE</th>";
        date += "<th>STAR DATE</th>";
        date += "<th>STATUS</th>";

        date += "</thead>";
        date += "<tbody>";
        for (let i = 0; i < items.length; i++) {
            date += "<tr>";

            date += "<td id='rplDD"+items[i].idReservation+"'>" + items[i].devolutionDate + "</td>";
            date += "<td id='rplSD"+items[i].idReservation+"'>" + items[i].startDate + "</td>";
            date += "<td id='rplSt"+items[i].idReservation+"'>" + items[i].status + "</td>";
            date += "</tr>";
        }
        date += "</tbody>";
        date += "</table>";
        $("ResultDate").append(date);
        $('td:nth-child(1), th:nth-child(1)').hide();
    }






    function reporteClientes(){
        $.ajax({
            url:"http://144.22.56.230:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }

    function pintarRespuestaClientes(items) {
        let clientes = "<table class='table'>";
        clientes += "<thead class='p-3 mb-2 bg-dark text-white'>";
        clientes += "<th>TOTAL</th>"
        clientes += "<th>NAME</th>";
        clientes += "<th>EMAIL</th>";
        clientes += "<th>AGE</th>";
        clientes += "</thead>";
        clientes += "<tbody>";
        for (let i = 0; i < items.length; i++) {
            clientes += "<tr>";
            clientes += "<td id='rplIdClient"+items[i].idClient +"'>" + items[i].idClient + "</td>";
            clientes += "<td id='rplName"+items[i].idClient+"'>" + items[i].name + "</td>";
            clientes += "<td id='rplEmail"+items[i].idClient+"'>" + items[i].email + "</td>";
            clientes += "<td id='rplAge"+items[i].idClient+"'>" + items[i].age + "</td>";
            clientes += "</tr>";
        }
        clientes += "</tbody>";
        clientes += "</table>";
        $("#ResultClient").append(clientes);
        $('td:nth-child(1), th:nth-child(1)').hide();
    }
}