import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import type { Product } from "./types/Product";
import { getProducts } from "./api/productsApi";
import type { CartItem } from "./types/CartItem";
import ShoppingList from "./components/ShoppingList";
import "./App.css";
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shoppingList, setShoppingList] = useState<CartItem[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch {
        setError("Producten konden niet worden geladen.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPrice = shoppingList.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  function handleAddToShoppingList(product: Product) {
    const existingItem = shoppingList.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      setShoppingList(
        shoppingList.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setShoppingList([
        ...shoppingList,
        {
          product: product,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">Boodschappen Budget</p>
        <h1> Plan je boodschappen slimmer</h1>

        <p>Zoek producten, voeg ze toe en houd direct je totaalbedrag bij.</p>
      </header>

      <section className="search-section">
        <input
          type="text"
          placeholder="Zoek een product..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </section>

      <div className="app-layout">
        <section>
          {loading ? (
            <p>Producten laden...</p>
          ) : error ? (
            <p> {error}</p>
          ) : filteredProducts.length === 0 ? (
            <p>Geen producten gevonden.</p>
          ) : (
            <ProductList
              products={filteredProducts}
              onAdd={handleAddToShoppingList}
            />
          )}
        </section>

        <ShoppingList items={shoppingList} totalPrice={totalPrice} />
      </div>
    </main>
  );
}
export default App;
