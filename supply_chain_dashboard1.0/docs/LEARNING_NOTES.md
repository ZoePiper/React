# Learning Notes — Supply Chain Exception Dashboard

These notes document the React, TypeScript, and JavaScript concepts practiced while building the dashboard.

## TypeScript and Inventory Models

A union type restricts the inventory status to specific values:

```ts
export type InventoryStatus = "critical" | "warning" | "healthy";
```

An intersection type extends the base inventory item with a calculated status:

```ts
export type EnrichedInventoryItem = InventoryItem & {
  status: InventoryStatus;
};
```

The `&` means the resulting type contains all properties of `InventoryItem` **and** the `status` property.

Type annotations describe the expected data shape; they do not automatically populate missing values or validate arbitrary runtime data.

## Business Logic and Array Methods

The status calculation is kept in `utils/inventoryStatus.ts`, separate from rendering logic. The thresholds in this project are:

- Critical: 3 days or fewer
- Warning: 4–7 days
- Healthy: more than 7 days

### `.map()` — transform every item

```ts
const enrichedItems = inventory.map((item) => ({
  ...item,
  status: getInventoryStatus(item.daysOfStock),
}));
```

`.map()` returns a new array with the transformed results.

### `.forEach()` — perform a side effect

```ts
inventory.forEach((item) => console.log(item.product));
```

Unlike `.map()`, `.forEach()` returns `undefined`; it is not intended for creating a transformed array.

### `.filter()` — keep matching items

```ts
const numbers = [1, 2, 3, 4, 5];
const filtered = numbers.filter((number) => number > 3);
// [4, 5]
```

The dashboard combines status and search checks:

```ts
const query = searchTerm.trim().toLowerCase();

const filteredItems = enrichedItems.filter((item) => {
  const matchesStatus =
    statusFilter === "all" || item.status === statusFilter;

  const matchesSearch =
    item.product.toLowerCase().includes(query) ||
    item.sku.toLowerCase().includes(query);

  return matchesStatus && matchesSearch;
});
```

`||` means **OR**; `&&` means **AND**. A product must satisfy the selected status **and** match either its name or SKU.

### `.reduce()` — accumulate a result

```ts
const numbers = [10, 20, 30];
const total = numbers.reduce((acc, number) => acc + number, 0);
// 60
```

`acc` is the accumulator and `0` is its initial value. The dashboard uses `.reduce()` to count products by inventory status.

### `.sort()` — order a copy of the array

```ts
const sortedItems = [...filteredItems].sort((a, b) => a.stock - b.stock);
```

`.sort()` mutates the array on which it is called. `[...filteredItems]` creates a new array first, preserving the existing filtered array. `a.stock - b.stock` sorts ascending; `b.stock - a.stock` sorts descending.

## React Components and Props

Props are values passed from a parent component to a child component. For example:

```tsx
<InventoryTable items={sortedItems} onSelectProduct={setSelectedProduct} />
```

The table receives inventory items and a callback. When a user selects a row, it calls the callback with that product. `App.tsx` owns the selected-product state.

```tsx
const [selectedProduct, setSelectedProduct] =
  useState<EnrichedInventoryItem | null>(null);
```

`null` means no product has been selected yet.

### `useState`

`useState` is a React Hook for storing values that can change over time. Call Hooks at the top level of a React component or a custom Hook, not outside components or inside conditional branches.

### Conditional rendering

```tsx
{selectedProduct && <ProductDetails product={selectedProduct} />}
```

The details appear only when a product is selected. TypeScript can narrow `selectedProduct` from `EnrichedInventoryItem | null` to `EnrichedInventoryItem` in this conditional expression.

### Empty state

```tsx
if (items.length === 0) {
  return <p>No products found. Try another search or filter.</p>;
}
```

`items.length === 0` checks the number of elements in an array. `items === 0` compares an array object with the number zero, which is not the same thing.

### Event handlers

```tsx
<button onClick={resetFilters}>Reset filters</button>
```

This passes a function reference to React. Writing `onClick={resetFilters()}` instead invokes the function immediately during rendering.

For a function call with arguments, use a callback:

```tsx
<button onClick={() => setStatusFilter("all")}>Reset status</button>
```

### Reusable status badges

```tsx
<span className={`status-badge ${status}`}>{status}</span>
```

A dynamic CSS class applies the appropriate status style. Reusing `StatusBadge` in multiple components avoids duplicating styling and status presentation.

## CSS and Responsive Design

### Selected table row

```tsx
className={selectedProductId === item.id ? "selected" : ""}
```

The ternary expression adds the `selected` class only when the row's ID matches the selected product ID.

```css
tbody tr.selected {
  background-color: rgba(59, 130, 246, 0.25);
}
```

`tr.selected` matches a `<tr>` element with class `selected`. `tr .selected` matches a descendant of `<tr>` with that class. Similarly, `tbody` targets an HTML element, while `.tbody` targets a CSS class.

### Equal-width grid columns

```css
.product-details-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
```

This defines three equal-width columns. `1fr` represents one share of available grid space.

### Media query

```css
@media (max-width: 600px) {
  .product-details-grid {
    grid-template-columns: 1fr;
  }
}
```

At widths of **600px or less**, the cards stack in one column.

### Horizontal table scrolling

```css
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table-wrapper table {
  width: 100%;
  min-width: 600px;
}
```

`overflow-x: auto` allows horizontal scrolling when needed; `overflow-x: hidden` clips overflowing content.

## Build and Verification

```bash
npm run build
```

The project uses a TypeScript-aware build command to detect issues that might not prevent the development preview from rendering.

## Development Milestones

1. Set up React, TypeScript, and Vite.
2. Define inventory models and create fictional data.
3. Render inventory items with `.map()`.
4. Add reusable status badges and inventory classification logic.
5. Build summary cards and status counts.
6. Add status filtering, product/SKU search, and empty states.
7. Add stock sorting and reset controls.
8. Add product selection, details, and selected-row highlighting.
9. Improve responsive layout and review the production build.
10. Document the project for GitHub.
