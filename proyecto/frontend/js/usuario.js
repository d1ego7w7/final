
const url='http://localhost:3000/usuario';
const contenedor=document.getElementById('data');
let resultado='';
const carga_usuario = (usuario)=>{
    usuario.forEach(usuario => {
        resultado+=`<tr style="border-bottom: 1px solid  #6c567b">
                        <td>${usuario.ci}</td>
                          <td>${usuario.nombres}</td>
                          <td>${usuario.paterno}</td>
                          <td>${usuario.materno}</td>
                          <td>${usuario.direccion}</td>
                          <td>${usuario.genero}</td>
                          <td>${usuario.celular}</td>
                          <td>${usuario.fechaNacimiento}</td>
                          <td>${usuario.email}</td>
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
form_usuario.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(operacion=='adicionar'){
        fetch(url,{ method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            
            ci:ci.value,
            nombres:nombres.value,
            paterno:paterno.value,
            materno:materno.value,
            direccion:direccion.value,
            genero:genero.value,
            celular:celular.value,
            fechaNacimiento:fechaNacimiento.value,
            email:email.value
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
        fetch(url+'/'+ci,{method:'PUT',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            ci:ci.value,
            nombres:nombres.value,
            paterno:paterno.value,
            materno:materno.value,
            direccion:direccion.value,
            genero:genero.value,
            celular:celular.value,
            fechaNacimiento:fechaNacimiento.value,
            email:email.value
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
let ci=0;
on(document,'click','.btnEditar',e=>{
    const fila=e.target.parentNode.parentNode
    ci=fila.children[0].innerHTML

    const fnom=fila.children[1].innerHTML
    const fpat=fila.children[2].innerHTML
    const fmat=fila.children[3].innerHTML
    const fdir=fila.children[4].innerHTML
    const fgen=fila.children[5].innerHTML
    const fcel=fila.children[6].innerHTML
    const ffecha=fila.children[7].innerHTML
    const femail=fila.children[8].innerHTML
    nombres.value=fnom,
    paterno.value=fpat,
    materno.value=fmat,
    direccion.value=fdir,
    genero.value=fgen,
    celular.value=fcel,
    fechaNacimiento.value=ffecha,
    email.value=femail
    operacion='modificar'
})
fetch(url)
.then(response => response.json())
 .then(data => carga_usuario(data))
.catch(error => console.log(error))
