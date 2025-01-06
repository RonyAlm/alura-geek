import { obtenerProductos, agregarProducto, eliminarProducto } from './conexion.js';

const products = document.querySelector('[data-products]');
const form = document.querySelector('[data-form]');

const renderProducts = async () => {
    products.innerHTML = '';
    const productos = await obtenerProductos();
    productos.forEach(producto => {
        const product = document.createElement('ARTICLE');

        product.classList.add('product');
        product.innerHTML = `
            <picture class="product__img">
                <img src="${producto.image}" alt="${producto.name}">
            </picture>
            <p class="product__name">${producto.name}</p>
            <p class="product__price">$ ${producto.price}</p>
            <div class="product__buttons">
                <button type="button" class="btn btn__delete" data-id="${producto.id}" data-delete>
                    <i class="far fa-trash-alt"></i>
                    Eliminar
                </button>
            </div>
        `;
        products.appendChild(product);
    });
}

const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log('Formulario enviado');
    
    const formData = new FormData(form);
    const producto = Object.fromEntries(formData);
    
    // console.log(producto);
    
    const nuevoProducto = await agregarProducto(producto);
    if (nuevoProducto) {
        console.log('Producto agregado:', nuevoProducto);
        renderProducts();
        form.reset();
    }
}

const handleDelete = async (id) => {
    const productoEliminado = await eliminarProducto(id);
    if (productoEliminado) {
        renderProducts();
    }
}

renderProducts();
form.addEventListener('submit', handleSubmit);

products.addEventListener('click', (e) => {
    if (e.target.matches('.btn__delete, .btn__delete *')) {
        const button = e.target.closest('.btn__delete');
        const id = button.dataset.id;
        handleDelete(id);
    }
});
