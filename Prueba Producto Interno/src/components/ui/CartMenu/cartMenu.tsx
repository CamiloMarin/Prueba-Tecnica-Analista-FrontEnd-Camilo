// components/CartMenu.tsx
import { useCart } from '@/components/context/cartContext';

const CartMenu = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="cart-menu">
      {cart.map(item => (
        <div key={item.id + item.size}>
          <img src={item.image} alt={item.name} />
          <p>{item.name} - {item.size}</p>
          <p>${item.price} x {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};
