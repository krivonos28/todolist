document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('#inputtask').focus();
});
document.addEventListener('keypress', (e)=>{
    if(e.keyCode !=0){
    document.querySelector('#inputtask').focus();
    }
});