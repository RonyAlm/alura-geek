async function obtenerProductos() {
    try {
        const response = await fetch('http://localhost:3003/products');
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
}

async function agregarProducto(producto) {
    try {
        const response = await fetch('http://localhost:3003/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        const nuevoProducto = await response.json();
        return nuevoProducto;
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        return null;
    }
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`http://localhost:3003/products/${id}`, {
            method: 'DELETE'
        });
        const productoEliminado = await response.json();
        return productoEliminado;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return null;
    }
}

export { obtenerProductos, agregarProducto, eliminarProducto };