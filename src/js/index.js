document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

function iniciarApp() {
    busquedaFlexible();
    menuFixed();
}

function busquedaFlexible() {

    const busqueda = document.querySelector('.header__busqueda-boton');
    busqueda.addEventListener('click', function(e) {
        e.preventDefault();

        const headerBusqueda = document.querySelector('.header__busqueda');

        const div = document.createElement('DIV');
        div.classList.add('header__busqueda-contenedor');
        
        const input = document.createElement('input');
        input.classList.add('header__busqueda-search');
        input.placeholder = '¿Estas buscando algo en especial?';

        const boton = document.createElement('button');
        boton.classList.add('header__busqueda-buscar');
        boton.textContent = 'Buscar';

        headerBusqueda.appendChild(div);
        div.appendChild(input);
        div.appendChild(boton);
    })

}
