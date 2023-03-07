const url='http://localhost:3000/acc'
const on = function(element, event, selector, handler) { 
    element.addEventListener(event, function(e) { 
        if (e.target.closest(selector)) { 
            handler(e); 
        } 
    }); 
}; 

FrmData.addEventListener('submit', function(e) { 
    e.preventDefault(); 
    axios.post(url, { 
        usuario: usuario.value, 
        contraseña: contraseña.value 
    }
    ) 
    .then(response => {
        localStorage.setItem('token',response.data.token)
        if(response.data.token){
        window.location = "index.html";
        }
        else{
            swal("Error", "Datos incorrectos","error");
        }
    }
        )
    .catch(err => { 
        console.log(err); 
        
    }); 
    
});
function eliminar(){
    if(confirm('estas seguro?')){
        localStorage.removeItem('token')
        window.location = "login.html";
    }
}