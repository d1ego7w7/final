const token = localStorage.getItem('token');
const url='http://localhost:3000/historial';
const contenedor=document.getElementById('data');
let resultado='';
const carga_historial = (historial)=>{
    historial.forEach(historial => {
        resultado+=`<tr style="border-bottom: 1px solid  #6c567b">
                       <td>${historial.codHistorial}</td>
                          <td>${historial.descripcion}</td>
                          <td>${historial.fecha}</td>
                          <td>${historial.codServicio}</td>
                          <td>${historial.codEmpleado}</td>
                          <td>${historial.codPaciente}</td>
                          <td style="cursor:pointer" bgcolor="#f67280" ><a  class='btnDelete' >Eliminar</a></td>
                          <td style="cursor:pointer" bgcolor="#ffbfb0" ><a class='btnEditar' >Editar</a></td>
                          </tr>`
    });
    contenedor.innerHTML=resultado;
}  
fetch(url, {
    method: 'GET',
    headers: { 'Authorization': token
   }
  })
.then(response => response.json())
 .then(data => carga_historial(data))
.catch(error => console.log(error))
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
    fetch(url +'/'+codigo,{method:'DELETE',headers: { 'Authorization': token
}})
    .then(response=>response.json())
    .then(()=>location.reload())
})
//-------------POST
let operacion='adicionar'
form_historial.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(operacion=='adicionar'){
        fetch(url,{ method:'POST',
        headers:{'Content-type':'application/json','Authorization': token},
        body:JSON.stringify({
            
            descripcion:descripcion.value,
            codServicio:codServicio.value,
            codEmpleado:codEmpleado.value,
            codPaciente:codPaciente.value
 })
})
        .then(response => response.json())
        .then (data => {
            const nuevo_producto=[]
            nuevo_producto.push(data)

        })
        .then(()=>location.reload())
}
    if(operacion=='modificar'){
        fetch(url+'/'+codHistorial,{method:'PUT',
        headers:{'Content-type':'application/json','Authorization': token},
        body:JSON.stringify({
            descripcion:descripcion.value,
            codServicio:codServicio.value,
            codEmpleado:codEmpleado.value,
            codPaciente:codPaciente.value
        })
        })
        .then(response => response.json())
        .then (data => {
            const nuevo_producto=[]
            nuevo_producto.push(data)
        })
        .then(()=>location.reload())
    }
})
let codHistorial=0;
on(document,'click','.btnEditar',e=>{
    const fila=e.target.parentNode.parentNode
    codHistorial=fila.children[0].innerHTML
    const fdes=fila.children[1].innerHTML
    const fservicio=fila.children[3].innerHTML
    const fempleado=fila.children[4].innerHTML
    const fpaciente=fila.children[5].innerHTML
    descripcion.value=fdes,
    codServicio.value=fservicio,
    codEmpleado.value=fempleado,
    codPaciente.value=fpaciente,
    operacion='modificar'
    chil
})

