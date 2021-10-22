let B = ['&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;',"&#9823"];
let W = ["&#9817;", "&#9814;", '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', "&#9814;"];
  

function generarTabla() {
  let value = 0;
  let casillas = ["A", "B", "C", "D","E", "F", "G", "H"];
  let chess = [['&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;'],
                ["&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;"],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ["&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;"],
                ["&#9814;", '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', "&#9814;"]
  ]
  
console.log(chess)
    let filas= document.getElementById("filas").value;
      if (filas < 4){
          alert("Filas invalidas")
      }
    let columnas= document.getElementById("columnas").value;
      if (columnas < 8){
          alert ("columnas invalidas")
      }

      let tabla="<table border=\"0\">";
    
      tabla+="<tr><td></td>";
      for(j=0;j<columnas;j++){ 
          tabla+="<td>"+(casillas[j])+ "</td>";
      }
      tabla+="</tr>";
      
      for(i=0;i<filas;i++){
          tabla+="<tr>";
          tabla+="<td>"+(i+1)+ "</td>";
          for(j=0;j<columnas;j++){ 
            if(i%2 == 0){
            if(value%2!=0){ 
              console.log(value)
              tabla+='<td style="background-color: white">'+chess[i][j]+ "</td>";
            }
            else{
              tabla+="<td>"+chess[i][j]+ "</td>";
            }}
            else {
              if(value%2==0){ 
                console.log(value)
                tabla+='<td style="background-color: white">'+chess[i][j]+ "</td>";
              }
              else{
                tabla+="<td>"+chess[i][j]+ "</td>";
              }
            }
            value++
          }
          tabla+="</tr>";
        
    }
      tabla+="</table>";
      document.getElementById("resultado").innerHTML=tabla;
  }

  function limpiar() {
    document.getElementById("resultado").innerHTML="";
}




  function capturar_ficha(e) {

      if(e.path[0].innerHTML!="" ){
          ficha = e.path[0].innerHTML;
          e.path[0].innerHTML= "";
          
      }else if(e.path[0].innerHTML===""){
          e.path[0].innerHTML = ficha;
          ficha=""; 
      
      }
      
}

document.getElementById("tabla").addEventListener("click", capturar_ficha, false);





let fichaAnterior = null
let turnoActual = W;

function captura_click(e) {
    
    const fichaDOM = e.path[0];

    // Valida si es el turno correcto
    if (!validarTurno(fichaDOM)) {
        console.log('no es tu turno aun!')
        return;
    }

    // validar si di click sobre una ficha que ya estaba seleccionada
    if (fichaDOM.classList.contains('fichaHover')) {
        return false;
    }


    if ( fichaDOM.innerHTML!="" ) {
        seleccionarFicha(fichaDOM)

    } else if(e.path[0].innerHTML===""){
        ponerFicha(fichaDOM)
    
    }
}

function obtenerEstadoFicha(fichaDOM) {
    const f = fichaDOM.dataset.fila
    const c = fichaDOM.dataset.col

    return chess[f][c]
}

function esMiFicha(fichaDOM) {
    return obtenerEstadoFicha(fichaDOM).indexOf(turnoActual)===0
}

function seleccionarFicha(fichaDOM) {

    // Valida si no estoy dando click sobre otra pieza mia
    if (fichaAnterior && esMiFicha(fichaDOM)) {
        return false;
    }
    else if (fichaAnterior ) {
        // Validar si estoy es comiendo otra ficha
        ponerFicha(fichaDOM)
    }


    fichaDOM.classList.add('fichaHover')
    fichaAnterior = fichaDOM

    // poner efecto de click
    fichaDOM.classList.add('clicked')
    setTimeout(function(){
        fichaDOM.classList.remove('clicked')
    }, 200)
}

function actualizarEstado(fichaDOM, fichaAnterior) {
    const newF = fichaDOM.dataset.fila
    const newC = fichaDOM.dataset.col

    const oldF = fichaAnterior.dataset.fila
    const oldC = fichaAnterior.dataset.col

    chess[newF][newC] = chess[oldF][oldC]
    chess[oldF][oldC] = ""
}

function ponerFicha(fichaDOM) {
    fichaDOM.innerHTML = fichaAnterior.innerHTML;
    fichaAnterior.innerHTML= "";
    fichaAnterior.classList.remove('fichaHover')
    

    actualizarEstado(fichaDOM, fichaAnterior)

    fichaAnterior = null

    // if (turnoActual==="W") {
    //     turnoActual = "B"
    // } else {
    //     turnoActual = "W"
    // }

    // Condicional ternario:
    turnoActual = (turnoActual=== W) ? B : W
}

function validarTurno(fichaDOM) {
    if (!fichaDOM) {
        return false
    }

    const f = fichaDOM.dataset.fila
    const c = fichaDOM.dataset.col

    if (!f && !c) {
        return false;
    }

    // Si tengo ya una ficha seleccionada, permito el turno
    if (fichaAnterior!==null) {
        return true
    }

    const nombreFicha = chess[f][c]

    // ficha: W-Q
    // turno: W
    if (nombreFicha.indexOf(turnoActual)===0) {
        return true
    }

    return false
}

// 

// document.querySelectorAll('container').addEventListener("click", captura_click, false);

// var allParas = document.getElementsByTagName("p");

// const artd = document.querySelectorAll('td');
// // articleImgs.addEventListener('click', captura_click)
// 