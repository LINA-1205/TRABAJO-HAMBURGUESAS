
//Variables Globales 
let tablaCarrito = document.querySelector(".cart-table tbody");

//Agregar evento al navegador 
document.addEventListener("DOMContentLoaded" ,()=>{
    cargarProductos();
});


//Funcion cargar productos guardados
function cargarProductos() {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }

    //limpiar tabla
    tablaCarrito.innerHTML ="";

//Comprobar si hay productos en LocalStorage
    if(todosProductos.length != 0 ){

    todosProductos.forEach((producto , i)=>{
        //agregarProducto(producto);
        
        //cargar tabla
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="d-flex justify-content-evenly align-items-center">
                    <span onclick="borrarProducto(${i})" class="btn btn-danger"> X </span>
                    <img src="${producto.imagen}" width="70px"> 
                    ${producto.nombre}
                </td>
                <td> 
                $ <span> ${producto.precio} </span>
                </td>
                <td> 
                    <div class="quantity quantity-wrap">
                        <div class="decrement" onclick="actualizarCantidad(${i},-1)"> <i class="fa-solid fa-minus"></i> </div>
                            <input class="text" type="number" name="quantity" value="${producto.cantidad || 1 }" maxlenght="2" size="1" readonly>
                        <div class="increment" onclick="actualizarCantidad(${i},1)"><i class="fa-solid fa-plus"></i> </div>
                    </div>
                
                </td>
                <td> $${(producto.precio * producto.cantidad).toFixed(3)} </td>


        `;
        tablaCarrito.appendChild(fila);
    });
    }else{
        let fila = document.createElement("tr");
            fila.innerHTML = `
                <td colspan="4">
                    <p class="text-center fs-3"> No hay productos en el carrito </p>
                </td>

                    `;
        tablaCarrito.appendChild(fila);
}
}

//Funcion para actualizar cantidades del producto 
function actualizarCantidad( pos, cambio) {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }
    if(todosProductos[pos] ) {
        //Actualizar cantidad
        todosProductos[pos].cantidad = (todosProductos[pos].cantidad || 1) + cambio;

        //Asegurarse de que la cantidad no sea menor a 1 
        if(todosProductos[pos].cantidad < 1 ){

            todosProductos[pos].cantidad = 1;

        }

        //CALCULAR SUBTOTAL
        let subtotal = todosProductos[pos].precio * todosProductos[pos].cantidad;
    }

    //Actualizar en LocalStorage
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));

    //Recargar la tabla 
    cargarProductos();

}

//FUNCION PARA BORRAR PRODUCTOS DE DETALLE CARRITO
function borrarProducto(pos){
let todosProductos = [];
let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
if (productosPrevios != null) {
    todosProductos = Object.values(productosPrevios);
}

//ELIMINAR PRODUCTO
todosProductos.splice(pos, 1);
localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));

// RECARGAR TABLA

cargarProductos();
}
