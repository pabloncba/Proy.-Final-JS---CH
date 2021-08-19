
//**************************Entidades****************************//

class Tratamiento {
    constructor (nombre, descri, precio, duracion) {
        this.nombre=nombre,
        this.descri=descri,
        this.precio=precio,
        this.duracion=duracion;
        
    }
}


class Turno {
    constructor (tratamiento, fecha, hora, personal) {
    
        this.tratamiento=tratamiento,
        this.fecha=fecha,
        this.hora=hora,
        this.personal=personal;

    }
}

class Cliente {
    constructor (nombreCli, apellidoCli, mailCli, telefonoCli) {
        this.nombreCli=nombreCli,
        this.apellidoCli=apellidoCli,
        this.mailCli=mailCli,
        this.telefonoCli=telefonoCli;
    }
}


//**************************Variables****************************//

let contadorCod=-1;

let turnos= [];

const tratamientos = [];

let turnosDisp = [];

let clientes = [];

let turnosSelec = [];


 //------------------Agregar H1 y h2 a HTML--------------//

 const body = document.body;
 let contenedorTitulos = document.getElementById(`contenedorTitulos`);
 //let titulo1 = document.createElement (`h1`);
 //titulo1.setAttribute (`class`,`text-center m-5`);
 //contenedorTitulos.appendChild(titulo1);
 //titulo1.textContent = `CIPREA`;
 
 
 let titulo2 = document.createElement (`h2`);
 titulo2.setAttribute (`class`,`text-center m-3`);
 titulo2.setAttribute (`id`,`titulo2`);
 contenedorTitulos.appendChild(titulo2);
 titulo2.textContent = `Bienvenido al sistema de turnos, por favor complete el formulario:`;



//**************************Funciones*****************************//



//----------------Funcion Captar datos Cliente----------------------//

    function tomarDatos () {

        nombre = document.getElementById ("nombre").value;
        apellido = document.getElementById("apellido").value;
        mail= document.getElementById("mail").value;
        telefono = document.getElementById("telefono").value;


        let msjError = [];

        let error = document.getElementById(`error`);
        

        if (nombre === null || nombre === ``){

            msjError.push(`Ingrese su nombre`);

            removeAllChildNodes(error);

            let msj = document.createElement(`p`);
            msj.setAttribute (`class`, `text-center text-danger display-5 m3`);
            error.appendChild(msj);
            msj.textContent =   msjError.join (`, `)


        }else if  (apellido === null || apellido ===``) {
            
            removeAllChildNodes(error);
            msjError.push(`Ingrese su apellido, por favor`);
            let msj = document.createElement(`p`);
            msj.setAttribute (`class`, `text-center text-danger display-5 m-3`);
            error.appendChild(msj);
            msj.textContent =   msjError.join (`, `)


        }else if (!mail.includes("@")) {

            removeAllChildNodes(error);
            msjError.push(`Ingrese un mail valido, por favor`);
            let msj = document.createElement(`p`);
            msj.setAttribute (`class`, `text-center text-danger display-5 m-3`);
            error.appendChild(msj);
            msj.textContent =   msjError.join (`, `)
       
            
        }else {

            clientes.push (new Cliente (nombre, apellido, telefono));
            
            removeAllChildNodes(error);    
            removeAllChildNodes(form);


            saveLocal(clientes, clientes);

            mostrartratamientosIndex();
    
        };


     };


//----llevar datos a localStorage----/
    function saveLocal(dato) {
            let aJson = JSON.stringify(dato)
            localStorage.setItem(`clientes`, aJson)

        console.log(aJson);
    }


//----------------Funcion para mostrar tratamientos disponibles-----//

    function mostrartratamientosIndex() {
        removeAllChildNodes(cardsId);
        removeAllChildNodes(divCalendario)

        let deJson = JSON.parse(localStorage.getItem(`clientes`))

        let clientesDeJson = deJson

        //******************tomar datos con ajax de json local********************** */
        const URLGET = "json/tratamientos.json"
    
        $.get(URLGET, function (respuesta, estado) {
            if(estado === "success"){

              let tratamientos = respuesta
                                      
                titulo2.textContent = `Hola ${clientesDeJson[0].nombreCli}!!, Los Tratamientos disponibles para tus manos son:`;//Saludo usuario

                
                tratamientos.forEach(element => { //forEach para cargar tarjetas de tratamientos

                    let contenedorCards = document.getElementById(`cardsId`);                
                    let divCont = document.createElement (`div`);
                    divCont.setAttribute (`class`,`col`);
                    cardsId.appendChild(divCont);

                    let cards = document.createElement(`div`);
                    cards.setAttribute(`class`, `card p-2 m-3`);
                    cards.setAttribute(`style`, `width: auto;`);
                    divCont.appendChild(cards);

                    let cardsBody = document.createElement(`div`);
                    cardsBody.setAttribute(`class`, `card-body text-center`);
                    cards.appendChild(cardsBody);

                    let tituloCards = document.createElement(`h5`);
                    tituloCards.setAttribute(`class`,`card-title text-center mb-3`);
                    cardsBody.appendChild(tituloCards);
                    tituloCards.textContent = `${element.nombre}`;

                    let textCards = document.createElement(`p`);
                    textCards.setAttribute(`class`, `card-text`);
                    cardsBody.appendChild(textCards);
                    textCards.textContent = `${element.descri}, El precio es de: $ ${element.precio}`;

                    
                    let textCards2 = document.createElement(`p`);
                    textCards2.setAttribute(`class`, `card-text text-danger`);
                    cardsBody.appendChild(textCards2);
                    textCards2.textContent = `El tratamiento tiene un duracion de: ${element.duracion}`;            
                    
                    let boton = document.createElement(`button`);
                    boton.setAttribute(`id`, `${element.nombre}`);
                    boton.setAttribute(`type`, `button`);
                    boton.setAttribute(`class`, `btn btn-outline-primary`);
                    cardsBody.appendChild(boton);
                    boton.textContent=`Ver Turnos Disponibles`;

                                    
                });

                //-----Evento a boton y llamo a funcion de filtrar por tratamiento----//
                
                let botonS= document.getElementById("Semi-permanente");
                botonS.addEventListener("click", filtrarSemi);

                //$("#Semi-permanente").click(filtrarSemi);

                let botonCapping= document.getElementById("Capping");
                botonCapping.addEventListener("click", filtrarCapping);

                //$("#Capping").click(filtrarCapping);

                let botonSpa= document.getElementById("Spa");
                botonSpa.addEventListener("click", filtrarSpa);

                //$("#Spa").click(filtrarSpa);

    
             }
        })
    }


    //---------------filtros de turnos por tratamientos----------------//

    function filtrarSemi() {

        let turnoSemi = turnos.filter(Turno => Turno.tratamiento == "semi-permanente")
        
        turnosDisp=turnoSemi; 
        
        mostrarTurnos () //llamo funsion para que muestre los turnos disponibles  
    
    }


    function filtrarCapping() {

        let turnoCapping = turnos.filter(Turno => Turno.tratamiento == "Capping");

        turnosDisp=turnoCapping; 
        
        mostrarTurnos ()
    
    }

    function filtrarSpa() {

        let turnoSpa = turnos.filter(Turno => Turno.tratamiento =="Spa de manos");

        turnosDisp=turnoSpa; 
    
        mostrarTurnos ()
    }

    
    //Funcion para borrar todos los nodos child (hijos) del elemento parent que le pase por el atributo. firstChild siempre me devuelve el primer child del nodo que especifique
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }



    //-----------------mostrar turnos disponibles--------------//


    function mostrarTurnos () {

         contadorCod=-1; //reinicio contador

        titulo2.textContent = "Seleccione el turno que desee reservar:" //modifico H2 de Html

                  
        removeAllChildNodes(cardsId); // llamo a funcion para limpiar html 

        let mostrarCalendario = document.getElementById ("divCalendario");
                      
        let divCal = document.createElement (`div`);
        divCal.setAttribute (`class`,`input-group mb-3 mt-3`);
        mostrarCalendario.appendChild(divCal);

        let inputCal = document.createElement(`input`);
        inputCal.setAttribute(`class`,`form-control`);
        inputCal.setAttribute(`id`,`calendario`);
        inputCal.setAttribute(`type`,`text`);
        inputCal.setAttribute(`placeholder`,`Por favor seleccione una fecha...`);
        inputCal.setAttribute(`aria-describedby`,`basic-addon2`);      
        divCal.appendChild(inputCal);

        let spanCal = document.createElement(`span`);
        spanCal.setAttribute(`class`,`input-group-text`);
        spanCal.setAttribute(`id`,`basic-addon2`);
        divCal.appendChild(spanCal);

        let labelCal = document.createElement(`label`);
        labelCal.setAttribute(`class`,`form-label`);
        labelCal.setAttribute(`for`,`calendario`);
        spanCal.appendChild(labelCal);

        let iCal = document.createElement(`i`);
        iCal.setAttribute(`class`,`far fa-calendar-alt`);
        labelCal.appendChild(iCal);

        let botonCal = document.createElement(`button`);
        botonCal.setAttribute(`class`,`btn btn-outline-secondary`);
        botonCal.setAttribute(`id`,`buscarTurnos`);
        botonCal.setAttribute(`type`,`button`);
        divCal.appendChild(botonCal)
        botonCal.textContent=`Buscar`;


         //**********Mostrar Calendario de libreria Jquery *************** */
         $(function () {
            $("#calendario").datepicker();

            });
            
            //******Evento a boton de calendario****** */
            let botonTurnos= document.getElementById("buscarTurnos");
            botonTurnos.addEventListener("click", filtrarFecha); 
         
          
      
            let idImprimir = document.getElementById("cardsId");
    

            for (const turno of turnosDisp) {
        
                contadorCod++

                let contenedorCards = document.getElementById(`cardsId`);                
                let divCont = document.createElement (`div`);
                divCont.setAttribute (`class`,`col`);
                cardsId.appendChild(divCont);

                let cards = document.createElement(`div`);
                cards.setAttribute(`class`, `card p-2 m-3`);
                cards.setAttribute(`style`, `width: auto;`);
                divCont.appendChild(cards);

                let cardsBody = document.createElement(`div`);
                cardsBody.setAttribute(`class`, `card-body text-center`);
                cards.appendChild(cardsBody);

                let tituloCards = document.createElement(`h5`);
                tituloCards.setAttribute(`class`,`card-title text-center mb-3`);
                cardsBody.appendChild(tituloCards);
                tituloCards.textContent = `Turno disponible para ${turnosDisp[contadorCod].tratamiento}`;

                let textCards = document.createElement(`p`);
                textCards.setAttribute(`class`, `card-text`);
                cardsBody.appendChild(textCards);
                textCards.textContent = `El ${turnosDisp[contadorCod].fecha} a las ${turnosDisp[contadorCod].hora}`;

                
                let textCards2 = document.createElement(`p`);
                textCards2.setAttribute(`class`, `card-text text-danger`);
                cardsBody.appendChild(textCards2);
                textCards2.textContent = `Serás atendida/o por ${turnosDisp[contadorCod].personal}`;            
                
                let boton = document.createElement(`button`);
                boton.setAttribute(`id`, `${contadorCod}`);
                boton.setAttribute(`type`, `button`);
                boton.setAttribute(`class`, `click btn btn-outline-primary`);
                cardsBody.appendChild(boton);
                boton.textContent=`Seleccionar Turno`;
        
        };

        turnoSeleccionado(turnosDisp);
       
    }
    


    //----Funcion para mostrar calendario y filtrar turnos por fecha seleccionada----//
    function filtrarFecha () {

        let fechaSelec = $("#calendario").val();

        let turnoFecha = turnosDisp.filter(turno => turno.fecha == fechaSelec);

        if (turnoFecha.length == 0) {


            removeAllChildNodes(cardsId);

            $("#cardsId").append( `<h4 class="text-center m-5 text-danger">No hay turnos disponibles para la fecha seleccionada, por favor seleccione otra fecha</h4>`)


        }else {
            
            removeAllChildNodes(cardsId);

                
            let idImprimir = $("#cardsId");
        
                contadorCod = -1;

            for (const turno of turnoFecha) {
                
                contadorCod++

                $("#cardsId").append( `
                <div class="col">
                    <div class="card p-2 m-3 " style="width: auto;">
                        <div class="card-body text-center">
                                <h5 class="card-title text-center mb-3">Turno disponible para ${turnoFecha[contadorCod].tratamiento}</h5>
                                <p class="card-text">El ${turnoFecha[contadorCod].fecha} a las ${turnoFecha[contadorCod].hora}</p>
                                <p class="card-text text-danger">Serás atendida/o por ${turnoFecha[contadorCod].personal}</p>
                                <button id="${contadorCod}" type="button"  class="click btn btn-outline-primary text-center">Seleccionar Turno</button>
                                
                        </div>
                    </div>
                </div>
                        
                `)      
        
        };

        
        turnoSeleccionado(turnoFecha);

    }

    
    };

    //funcion para agregar evento click a cada elemento con class="click" y obtiene el atributo ID para mostrar mensaje


    function turnoSeleccionado (array){
        document.querySelectorAll(".click").forEach(el => { 
            el.addEventListener("click", e => {
                const id = e.target.getAttribute("id"); 
      

                //al precionar cualquier boton limpia pantalla y envia msj con datos de turno seleccionado
                removeAllChildNodes(cardsId);
                titulo2.textContent = "";

                let h4 = document.createElement(`h4`);
                h4.setAttribute(`class`, `text-center m-5 text-danger`);
                cardsId.appendChild(h4);
                h4.textContent=`Usted a Seleccionado turno para ${array[id].tratamiento}, el día ${array[id].fecha} a las ${array[id].hora}, seras atendido por ${array[id].personal}. Muchas Gracias`;
            
                

                //---Agrego boton de Seleccionar otro turno---//

                let botonVolver = document.createElement(`button`);
                botonVolver.setAttribute(`id`, `botonVolver`);
                botonVolver.setAttribute(`type`, `button`);
                botonVolver.setAttribute(`class`, `click btn btn-outline-primary col-4`);
                botonVolver.textContent=`Seleccionar otro Turno`;
                cardsId.appendChild (botonVolver);

                //----LLamo evento para mostrar nuevemente los distintos tratamientos---//
                let otroTurno = document.getElementById ("botonVolver");
                otroTurno.addEventListener ("click", mostrartratamientosIndex);


                
                //------Busca indice de turno selecionado---//
                let indice = turnos.findIndex((objeto) => {
                    return objeto.tratamiento == array[id].tratamiento && objeto.fecha == array[id].fecha && objeto.hora == array[id].hora ;
                });
            
                turnos.splice(indice,1) // Borra turno seleccionado del array
                
                console.log(turnos);
               

            });
  
        });

    };


      
  //********************animaciones********************************//


  $("#form").hide()

  .slideDown(1800, function(){

       
          $(`#botonEnviar`).hide(); //esconde boton 


          $(`#telefono`).keypress(function(){

            let valorTelefono=$(this).val()           

            if(valorTelefono.length > 5){  // muestra Boton luego de escribir 5 numeros
              $(`#botonEnviar`).fadeIn();


          }
      })
  });  
 


 //***************************Logica*******************************//


    //---agregar turnos----


    turnos.push(new Turno ("semi-permanente", "08/07/2021", "18:00", "Fernanda Linera"))
    turnos.push(new Turno ("semi-permanente", "08/07/2021", "19:00", "Fernanda Linera"))
    turnos.push(new Turno ("Capping", "09/07/2021", "18:00","Fernanda Linera"))
    turnos.push(new Turno ("semi-permanente", "11/07/2021", "18:00","Fernanda Linera"))
    turnos.push(new Turno ("Spa de manos", "08/07/2021", "18:00","Fernanda Linera"))
    turnos.push(new Turno ("semi-permanente", "09/07/2021", "18:00","Fernanda Linera"))
    turnos.push(new Turno ("Capping", "10/07/2121", "17:00","Fernanda Linera"))
    turnos.push(new Turno ("semi-permanente", "11/07/2021", "19:00","Fernanda Linera"))
    turnos.push(new Turno ("semi-permanente", "10/07/2021", "18:00", "Fernanda Linera"))
    turnos.push(new Turno ("Capping", "08/07/2021", "18:00","Fernanda Linera"))
    turnos.push(new Turno ("Spa de manos", "10/07/2021", "16:00","Fernanda Linera"))
    turnos.push(new Turno ("Spa de manos", "10/07/2021", "18:00","Fernanda Linera"))

    //------ordenar array de turnos por fecha----//

    turnos.sort((a, b) => a.fecha > b.fecha);



    //----agregar tratamiento-----

   /*  tratamientos.push(new Tratamiento ("Semi-permanente", "Un esmalte semipermanente es un tipo de manicura que se hace cada 2-3 semanas; a diferencia de los esmaltes clásicos, la estilización semipermenente no requiere que se la quite y ponga de nuevo con tanta frecuencia, todo eso gracias a su durabilidad", 800, "30 min.", "Fernanda Linera"));
    tratamientos.push(new Tratamiento ("Capping", "consiste en aplicar una fina capa de acrílico o gel fortificador sobre la uña que actuará como una barrera protectora. A diferencia de las uñas esculpidas, este baño en gel kapping no alarga la uña natural sino que acompaña el crecimiento de la misma y dura hasta 20 días.", 500, "30 min.", "Fernanda Linera"));
    tratamientos.push(new Tratamiento ("Spa", "Consiste en el tradicional servicio de 'manicuría' y 'belleza de pies' combinado un tratamiento que protege y cuida la piel de manos y pies. Por eso incluye, además de la belleza de uñas, un masaje pulidor, hidratación y fangoterapia.", 1200, "45 min.", "Fernanda Linera")); */


    //-------Eventos de botones------------------//

    let botonEnv = document.getElementById ("botonEnviar");
    botonEnv.addEventListener ("click", tomarDatos)

  

 console.log(turnos);


 


  