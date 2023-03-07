const url2='http://localhost:3000/login'
const contenedor1=document.getElementById('data1');
let resultado1='';
const carga_login = (login)=>{
    login.forEach(login => {
        resultado1+=`<tr style="border-bottom: 1px solid  #6c567b">
                          <td>${login.usuario}</td>
                          <td>${login.contraseña}</td>
                          <td>${login.ci}</td>
                          <td>${login.usuResponsable}</td>
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
on (document,'click','.btnDelete1', e=>{
     fila=e.target.parentNode.parentNode 
    const codigo=fila.firstElementChild.innerHTML
    fetch(url2 +'/'+codigo,{method:'DELETE'})
    .then(response=>response.json())
    .then(()=>location.reload())
})
var usuRes= 'xlea'
//-------------POST
let operacion1='adicionar'
form_login.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    if(operacion1=='adicionar'){
        fetch(url2,{ method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            usuario:usuario.value,
            contraseña:contraseña.value,
            ci:cie.value,
            usuResponsable:usuRes
 })
})
        .then(response => response.json())
        .then (data1 => {
            const nuevo_producto=[]
            nuevo_producto.push(data1)
            //carga_ciudad(nuevo_producto);

        })
        .then(()=>location.reload())
}
    if(operacion1=='modificar'){
        fetch(url2+'/'+usuario,{method:'PUT',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            usuario:usuario.value,
            contraseña:contraseña.value,
            codUsuario:codUsuario.value,
            usuResponsable:usuResponsable.value
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

fetch(url2)
.then(response => response.json())
 .then(data1 => carga_login(data1))
.catch(error => console.log(error))