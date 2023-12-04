// Importa useState desde React para manejar el estado en el componente
import { useState } from 'react';

// Definición del componente Header con destructuring de props
export const Header = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  // Estado local para manejar la visibilidad del carrito
  const [active, setActive] = useState(false);

  // Función para eliminar un producto del carrito
  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);

    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  // Función para limpiar todo el carrito
  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  // JSX que representa la estructura del encabezado
  return (
    <header>
      <h1>Tienda</h1>

      {/* Contenedor del icono del carrito */}
      <div className='container-icon'>
        <div
          className='container-cart-icon'
          onClick={() => setActive(!active)}
        >
          {/* Icono del carrito */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='icon-cart'
          >
            {/* Contenido del icono del carrito */}
          </svg>
          {/* Contador de productos en el carrito */}
          <div className='count-products'>
            <span id='contador-productos'>{countProducts}</span>
          </div>
        </div>

        {/* Contenedor de productos en el carrito */}
        <div
          className={`container-cart-products ${
            active ? '' : 'hidden-cart'
          }`}
        >
          {/* Verifica si hay productos en el carrito */}
          {allProducts.length ? (
            <>
              {/* Muestra la lista de productos en el carrito */}
              <div className='row-product'>
                {allProducts.map((product) => (
                  <div className='cart-product' key={product.id}>
                    {/* Información del producto en el carrito */}
                    <div className='info-cart-product'>
                      <span className='cantidad-producto-carrito'>
                        {product.quantity}
                      </span>
                      <p className='titulo-producto-carrito'>
                        {product.nameProduct}
                      </p>
                      <span className='precio-producto-carrito'>
                        ${product.price}
                      </span>
                    </div>
                    {/* Icono para eliminar el producto del carrito */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='icon-close'
                      onClick={() => onDeleteProduct(product)}
                    >
                      {/* Contenido del icono de cierre */}
                    </svg>
                  </div>
                ))}
              </div>

              {/* Muestra el total y botón para vaciar el carrito */}
              <div className='cart-total'>
                <h3>Total:</h3>
                <span className='total-pagar'>${total}</span>
              </div>
              <button className='btn-clear-all' onClick={onCleanCart}>
                Vaciar Carrito
              </button>
            </>
          ) : (
            // Mensaje si el carrito está vacío
            <p className='cart-empty'>El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};
