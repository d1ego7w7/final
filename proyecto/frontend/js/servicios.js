const token = localStorage.getItem('token');
const url='http://localhost:3000/servicio';
const contenedor=document.getElementById('data');
let resultado='';
const carga_servicio = (servicio)=>{
    servicio.forEach(servicio => {
        resultado+=`<tr style="border-bottom: 1px solid  #6c567b">
                       <td>${servicio.codServicio}</td>
                          <td>${servicio.tipoServicio}</td>
                          <td>${servicio.precio}</td>
                          <td>${servicio.descripcion}</td>
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
 .then(data => carga_servicio(data))
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
form_servicio.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(operacion=='adicionar'){
        fetch(url,{ method:'POST',
        headers:{'Content-type':'application/json','Authorization': token},
        body:JSON.stringify({
            tipoServicio:tipoServicio.value,
            precio:precio.value,
            descripcion:descripcion.value
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
        fetch(url+'/'+codServicio,{method:'PUT',
        headers:{'Content-type':'application/json','Authorization': token},
        body:JSON.stringify({
            tipoServicio:tipoServicio.value,
            precio:precio.value,
            descripcion:descripcion.value
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
let codServicio=0;
on(document,'click','.btnEditar',e=>{
    const fila=e.target.parentNode.parentNode
    codServicio=fila.children[0].innerHTML
    const ftipo=fila.children[1].innerHTML
    const fprecio=fila.children[2].innerHTML
    const fdescripcion=fila.children[3].innerHTML
    tipoServicio.value=ftipo,
    precio.value=fprecio,
    descripcion.value=fdescripcion,
    operacion='modificar'
})


