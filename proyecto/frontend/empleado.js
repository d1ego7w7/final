const url='http://localhost:3000/empleado';
const contenedor1=document.getElementById('data');
let resultado1='';
const carga_empleado = (empleado)=>{
    empleado.forEach(empleado => {
        resultado1+=`<tr style="border-bottom: 1px solid  #6c567b">
                          <td>${empleado.codEmpleado}</td>
                          <td>${empleado.tipoEmpleado}</td>
                          <td>${empleado.codUsuario}</td>
                          <td style="cursor:pointer" bgcolor="#f67280" ><a  class='btnDelete' >Eliminar</a></td>
                          <td style="cursor:pointer" bgcolor="#ffbfb0" ><a class='btnEditar' >Editar</a></td>
                          </tr>`
    });
    contenedor1.innerHTML=resultado1;
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
form_empleado.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(operacion=='adicionar'){
        fetch(url,{ method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            tipoEmpleado:tipoEmpleado.value,
            codUsuario:codUsuario.value
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
        fetch(url+'/'+codEmpleado,{method:'PUT',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            tipoEmpleado:tipoEmpleado.value,
            codUsuario:codUsuario.value
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
let codEmpleado=0;
on(document,'click','.btnEditar',e=>{
    const fila=e.target.parentNode.parentNode
    codEmpleado=fila.children[0].innerHTML
    const ftipoEmpleado=fila.children[1].innerHTML
    const fcodUsuario=fila.children[2].innerHTML

    tipoEmpleado.value=ftipoEmpleado,
    codUsuario.value=fcodUsuario
    operacion='modificar'
    chil
})
fetch(url)
.then(response => response.json())
 .then(data => carga_cita(data))
.catch(error => console.log(error))
