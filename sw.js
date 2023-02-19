//Asignar nombre y versión de la cache
const CACHE_NAME='v1_cache_BCH_PWA';

//configuración de los ficheros
var urlsToCache= [
    './',
    './css/styles.css',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './facebook.png',
    './img/favicon-16.png',
    './img/favicon-32.png',
    './img/favicon-64.png',
    './img/favicon-96.png',
    './img/favicon-128.png',
    './img/favicon-192.png',
    './img/favicon-256.png',
    './img/favicon-384.png',
    './img/favicon-512.png',
    './img/favicon-1024.png',
    './instagram.png',
    './twitter.png'

];
//Eventos del ServerWorker
//Evento Install
//se encarga de la instalacion del SW
//guarda en cache los recursos estáticos
//la variable self permite recoger del SW

self.addEventListener('install', e=>{
    //utilizamos la variable del evento

    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                //le mandamos los elementos que tenemos en el array
                return cache.addAll(urlsToCache)
                            .then(()=>{
                                self.skipWaiting();
                    })
       })
       .catch(err=>console.log('No se ha registrado el cache', err))
    );

});

//Evento activate

//este evento permite  que la aplicación funcione offline
self.addEventListener('activate',e => {
    const cacheWhitelist = [CACHE_NAME];

    //que el evento espere a que termine de ejecutar
    e.waitUntil(
        caches.keys()
            .then(cacheNames=>{
                return Promise.all(
                    cacheNames.map(cacheName => {
                    if(cacheWhitelist.indexOf(cacheName)== -1)
                    {
                        //borrar elementos que no se necesitan
                        return cache.delete(cacheName);
                    }

                })
             );
        })
        .then(()=> {
            self.clients.claim(); //activa la cache en el dispositivo.

        })
    );
});

//Evento fetch 
//consigue la información de internet... hace una consulta al backend
//cuando se salta de una pagina a otra pagina... por ejemplo

//checa si ya tiene los recursos en cache y sino los solicita.

self.addEventListener('fetch',e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    //devuelvo datos desde cache
                    return res;
                }
                return fetch(e.request);//hago petición al servidor en caso de que no este en cache 

            })

    );

});
