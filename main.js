//Cargar Service Worker
if('serviceWorker' in navigator) 
{
    console.log("Puedes usar el Service Worker");
    //configuración del SW
    navigator.serviceWorker.register('./sw.js')
                            .then(res=>console.log('SW cargado correctamente',res))
                            .catch(err => console.log('service Worker no se ha podido registrar',err));
}   
else
{
    console.log("No se puede usar el Service Worker")
}

//Scroll
$(document).ready(function() {
    alert("hola mundo");
    //console.log("Hola mundo");
    //evento click

    $("#menu a").click(function(e){
        /*se evita  
        que automaticamente haga una redireccion*/
        e.preventDefault();

        console.log($('#services').offset().top);
        
        //el offset consigue la posicion del elemento.
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        });
        return false;//
    })
})