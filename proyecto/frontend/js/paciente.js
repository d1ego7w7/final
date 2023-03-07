const token = localStorage.getItem('token');
const url='http://localhost:3000/paciente';
const contenedor=document.getElementById('data');
let resultado='';
const carga_paciente = (paciente)=>{
    paciente.forEach(paciente => {
        resultado+=`<tr style="border-bottom: 2px solid  #000000">
                          <td>${paciente.codPaciente}</td>
                          <td>${paciente.nombreMascota}</td>
                          <td>${paciente.especie}</td>
                          <td>${paciente.raza}</td>
                          <td>${paciente.color}</td>
                          <td>${paciente.tamaño}</td>
                          <td>${paciente.peso}</td>
                          <td>${paciente.sexo}</td>
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
   .then(data => carga_paciente(data))
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
    fetch(url +'/'+codigo,{method:'DELETE', headers: { 'Authorization': token
}})
    .then(response=>response.json())
    .then(()=>location.reload())
})
//-------------POST
let operacion='adicionar'
form_paciente.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(operacion=='adicionar'){
        fetch(url,{ method:'POST',
        headers:{'Content-type':'application/json','Authorization': token},
        body:JSON.stringify({
            nombreMascota:nombreMascota.value,
            especie:especie.value,
            raza:raza.value,
            color:color.value,
            tamaño:tamaño.value,
            peso:peso.value,
            sexo:sexo.value
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
        fetch(url+'/'+codPaciente,{method:'PUT',
        headers:{'Content-type':'application/json','Authorization': token},
        body:JSON.stringify({
            nombreMascota:nombreMascota.value,
            especie:especie.value,
            raza:raza.value,
            color:color.value,
            tamaño:tamaño.value,
            peso:peso.value,
            sexo:sexo.value
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
let codPaciente=0;
on(document,'click','.btnEditar',e=>{
    const fila=e.target.parentNode.parentNode
    codPaciente=fila.children[0].innerHTML
    const fnombreMascota=fila.children[1].innerHTML
    const fespecie=fila.children[2].innerHTML
    const fraza=fila.children[3].innerHTML
    const fcolor=fila.children[4].innerHTML
    const ftamaño=fila.children[5].innerHTML
    const fpeso=fila.children[6].innerHTML
    const fsexo=fila.children[7].innerHTML

    nombreMascota.value=fnombreMascota,
    especie.value=fespecie,
    raza.value=fraza,
    color.value=fcolor,
    tamaño.value=ftamaño,
    peso.value=fpeso,
    sexo.value=fsexo
    operacion='modificar'
    chil
})

