function eliminar(){
    
    if(confirm('estas seguro?')){
        localStorage.removeItem('token')
        window.location = "login.html";
    }
}