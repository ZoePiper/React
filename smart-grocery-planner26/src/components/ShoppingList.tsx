import type { CartItem } from "../types/CartItem";

type ShoppingListProps = {
  items: CartItem[];
  totalPrice: number;
};

function ShoppingList({ items, totalPrice }: ShoppingListProps) {
  return (
    <section className="shopping-list">
      <h2>Mijn boodschappenlijst</h2>

      {items.length === 0 ? (
        <p>Je boodschappenlijst is nog leeg.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.product.id}>
                <span>
                  {item.product.name} - {item.quantity}x
                </span>

                <strong>
                  €{(item.product.price * item.quantity).toFixed(2)}
                </strong>
              </li>
            ))}
          </ul>

          <p className="shopping-list-total">
            Totaal: €{totalPrice.toFixed(2)}
          </p>
        </>
      )}
    </section>
  );
}

export default ShoppingList;
