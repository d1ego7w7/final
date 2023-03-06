const url='http://localhost:3000/cita';
const contenedor=document.getElementById('data');
let resultado='';
const carga_cita = (cita)=>{
    cita.forEach(cita => {
        resultado+=`<tr style="border-bottom: 1px solid  #6c567b">
                          <td>${cita.codCita}</td>
                          <td>${cita.codPaciente}</td>
                          <td>${cita.fecha}</td>
                          <td>${cita.descripcion}</td>
                          <td>${cita.fechaProxima}</td>
                          <td>${cita.hora}</td>
                          <td style="cursor:pointer" bgcolor="#f67280" ><a  class='btnDelete' >Eliminar</a></td>
                          <td style="cursor:pointer" bgcolor="#ffbfb0" ><a class='btnEditar' >Editar</a></td>
                          </tr>`
    });
    contenedor.innerHTML=resultado;
}  
const on=(element,event,selector,handler)=>{
    element.addEventListener(event, e =>{
    if(e.target.closest(selector)){
        handler(e)
    }
})
}
//------DELETE
on (document,'click','.btnDelete', e=>{
     fila=e.target.parentNode.parentNode 
    const codigo=fila.firstElementChild.innerHTML
    fetch(url +'/'+codigo,{method:'DELETE'})
    .then(response=>response.json())
    .then(()=>location.reload())
})
//-------------POST
let operacion='adicionar'
form_cita.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(operacion=='adicionar'){
        fetch(url,{ method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            codPaciente:codPaciente.value,
            descripcion:descripcion.value,
            fechaProxima:fechaProxima.value,
            hora:hora.value
 })
})
        .then(response => response.json())
        .then (data => {
            const nuevo_producto=[]
            nuevo_producto.push(data)
            //carga_ciudad(nuevo_producto);

        })
        .then(()=>location.reload())
}
    if(operacion=='modificar'){
        fetch(url+'/'+codCita,{method:'PUT',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            codPaciente:codPaciente.value,
            descripcion:descripcion.value,
            fechaProxima:fechaProxima.value,
            hora:hora.value
        })
        })
        .then(response => response.json())
        .then (data => {
            const nuevo_producto=[]
            nuevo_producto.push(data)
            //carga_Productos(nuevo_producto);
        })
        .then(()=>location.reload())
    }
})
let codCita=0;
on(document,'click','.btnEditar',e=>{
    const fila=e.target.parentNode.parentNode
    codCita=fila.children[0].innerHTML
    const fcodPac=fila.children[1].innerHTML
    const fdescripcion=fila.children[3].innerHTML
    const ffecha=fila.children[4].innerHTML
    const fhora=fila.children[5].innerHTML

    codPaciente.value=fcodPac,
    descripcion.value=fdescripcion,
    fechaProxima.value=ffecha,
    hora.value=fhora
    operacion='modificar'
    chil
})
fetch(url)
.then(response => response.json())
 .then(data => carga_cita(data))
.catch(error => console.log(error))
