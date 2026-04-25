import { useEffect, useState } from "react";
import { api } from "../utils/api";
import CardProducts from "../components/cardproducts";

export default function Products() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setList(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      {list.map((p) => (
        <CardProducts key={p.id} product={p} />
      ))}
    </div>
  );
}
