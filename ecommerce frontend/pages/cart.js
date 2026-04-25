import { useCart } from "../store/usecart";

export default function Cart() {
  const { items, removeItem, clearCart } = useCart();

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>

      {items.length === 0 && <p>No items in cart.</p>}

      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <strong>{item.name}</strong> — {item.price} PKR
          <button
            onClick={() => removeItem(item.id)}
            style={{ marginLeft: 10 }}
          >
            Remove
          </button>
        </div>
      ))}

      {items.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
    </div>
  );
}
