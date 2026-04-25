import { useCart } from "../store/usecart";

export default function CardProducts({ product }) {
  const { addItem } = useCart();

  return (
    <div style={{ border: "1px solid #ddd", padding: 15, margin: 10 }}>
      <h3>{product.name}</h3>
      <p>Price: {product.price} PKR</p>

      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}
