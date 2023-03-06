const url='http://localhost:3000/acc'

const on = function(element,event,selector,handler){
    element.addEventListener(event,function(e){
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

FrmData.addEventListener('submit', function(e) { 
    e.preventDefault(); 
    axios.post(url, { 
      usuario: usuario.value, 
      contraseña: contraseña.value 
    }) 
    .then(response => { 
      localStorage.setItem('token', response.data.token); 
      window.location.href = "../proyecto/index.html";
    }) 
    .catch(err => console.log(err)); 
    return false;
  });