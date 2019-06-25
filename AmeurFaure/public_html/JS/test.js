function validEnvoi() {
    let nbcocher = window.document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < 8; i++){
        nbcocher[i].disabled = false;
    }
 
}