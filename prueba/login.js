localStorage.setItem('token',"token")
const url='http://localhost:3000/acc'
const on = function(element,event,selector,handler){
    element.addEventListener(event,function(e){
        if(e.target.closet(selector)){
            handler(e)
        }
    })
}
frmData.addEventListener('submit',function(e){
    e.preventDefault()
    fetch(url,{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            usuario:usuario.value,
            clave:clave.value                       
        })
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data,'token')
    })
    .catch(err =>console.log(err))
    
})
