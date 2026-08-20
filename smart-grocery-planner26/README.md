# 🛒 Smart Grocery Planner

Een compacte **React + TypeScript** applicatie waarin producten via een
externe API worden opgehaald en toegevoegd kunnen worden aan een
boodschappenlijst.

Het project is gebouwd om React en TypeScript praktisch toe te passen,
met aandacht voor componentarchitectuur, API-integratie, state
management en foutafhandeling.

<img width="553" alt="Samrt Grocery Planner" src="https://github.com/ZoePiper/React/blob/main/smart-grocery-planner26/images/product_page.png">

## ✨ Functionaliteiten

-   Producten ophalen vanuit een externe API
-   API-data omzetten naar een eigen TypeScript-model
-   Producten dynamisch renderen
-   Zoeken op productnaam
-   Producten toevoegen aan een boodschappenlijst
-   Hetzelfde product meerdere keren toevoegen
-   Automatisch de hoeveelheid (`quantity`) verhogen
-   Prijs per productregel berekenen
-   Totale boodschappenprijs berekenen
-   Loading state
-   Error state
-   Empty state
-   Responsive layout
-   Herbruikbare en typed React components

## 🛠 Tech stack

-   **React**
-   **TypeScript**
-   **Vite**
-   **ESLint**
-   **CSS**
-   **Fetch API**
-   **DummyJSON Products API**

## 📁 Projectstructuur

``` text
smart-grocery-planner/
│
├── public/
│
├── src/
│   ├── api/
│   │   └── productsApi.ts
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── ProductList.tsx
│   │   └── ShoppingList.tsx
│   ├── types/
│   │   ├── Product.ts
│   │   └── CartItem.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

## 🧩 Architectuur

De globale dataflow:

``` text
main.tsx
   │
   ▼
App.tsx
   │
   ├──────────────► productsApi.ts
   │                       │
   │                       ▼
   │                 DummyJSON API
   │                       │
   │                       ▼
   │                    Product[]
   │
   ▼
ProductList.tsx
   │
   ▼
ProductCard.tsx
   │
   │ gebruiker klikt "Toevoegen"
   ▼
App.tsx
   │
   ▼
shoppingList state
   │
   ▼
ShoppingList.tsx
```

`App.tsx` fungeert als centrale orchestrator. De losse componenten zijn
voornamelijk verantwoordelijk voor de presentatie van data.

## 📄 Uitleg per bestand

### `main.tsx`

Het startpunt van de React-applicatie. Hier wordt de `App` component
gekoppeld aan het `root` element uit `index.html`.

``` text
index.html
    ↓
main.tsx
    ↓
<App />
```

### `App.tsx`

Bevat de belangrijkste applicatielogica en beheert onder andere:

``` ts
products
shoppingList
searchTerm
loading
error
```

`App` is verantwoordelijk voor: - producten ophalen; - zoekresultaten
filteren; - producten toevoegen aan de boodschappenlijst; - hoeveelheden
verhogen; - de totaalprijs berekenen; - bepalen welke UI-state getoond
moet worden.

### `api/productsApi.ts`

Bevat de communicatie met de externe product-API.

De belangrijkste functie is:

``` ts
getProducts()
```

Deze stuurt een request naar DummyJSON:

``` ts
const response = await fetch(
  "https://dummyjson.com/products"
);
```

De HTTP-response wordt gecontroleerd:

``` ts
if (!response.ok) {
  throw new Error("API request failed");
}
```

Vervolgens wordt de response omgezet naar JSON en daarna naar het
interne `Product`-model.

## 🔄 API-model versus applicatiemodel

De externe API kan bijvoorbeeld dit model gebruiken:

``` ts
type ApiProduct = {
  id: number;
  title: string;
  category: string;
  price: number;
};
```

De applicatie gebruikt:

``` ts
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
};
```

De flow:

``` text
DummyJSON
   ↓
ApiProduct[]
   ↓
.map()
   ↓
Product[]
   ↓
React applicatie
```

Hierdoor is de UI niet direct afhankelijk van de datastructuur van de
externe API.

### `types/Product.ts`

Bevat het TypeScript-contract voor één product:

``` ts
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
};
```

### `types/CartItem.ts`

Een item in de boodschappenlijst bevat een product én een hoeveelheid:

``` ts
export type CartItem = {
  product: Product;
  quantity: number;
};
```

### `ProductCard.tsx`

Verantwoordelijk voor het tonen van één product.

``` ts
type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};
```

De knop gebruikt een callback:

``` tsx
<button onClick={() => onAdd(product)}>
  Toevoegen
</button>
```

`ProductCard` hoeft zelf niet te weten hoe de boodschappenlijst wordt
beheerd.

### `ProductList.tsx`

Ontvangt `Product[]` en gebruikt `.map()` om voor ieder product een
`ProductCard` te maken:

``` tsx
products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    onAdd={onAdd}
  />
))
```

### `ShoppingList.tsx`

Verantwoordelijk voor het tonen van de geselecteerde boodschappen.

``` ts
type ShoppingListProps = {
  items: CartItem[];
  totalPrice: number;
};
```

Toont onder andere: - productnaam; - hoeveelheid; - prijs per regel; -
totaalprijs; - empty state wanneer de lijst leeg is.

## ⚛️ State management

De applicatie gebruikt React `useState`:

``` ts
const [products, setProducts] =
  useState<Product[]>([]);

const [shoppingList, setShoppingList] =
  useState<CartItem[]>([]);

const [searchTerm, setSearchTerm] =
  useState<string>("");

const [loading, setLoading] =
  useState<boolean>(true);

const [error, setError] =
  useState<string | null>(null);
```

## 🔄 `useEffect`

De producten worden opgehaald wanneer de applicatie start:

``` ts
useEffect(() => {
  async function loadProducts() {
    // API request
  }

  loadProducts();
}, []);
```

De lege dependency array `[]` zorgt ervoor dat dit effect bij het
mounten van de component wordt uitgevoerd.

``` text
App wordt geladen
       ↓
useEffect
       ↓
getProducts()
       ↓
API request
       ↓
Product[]
       ↓
setProducts()
       ↓
React rendert opnieuw
```

## ⏳ Loading state

Tijdens het ophalen van API-data staat:

``` ts
loading === true
```

Wanneer het request klaar is:

``` ts
setLoading(false);
```

## ❌ Error handling

De API-call gebruikt:

``` ts
try {
  // request
} catch {
  // error
} finally {
  // loading beëindigen
}
```

``` text
             API request
                  │
          ┌───────┴───────┐
          ▼               ▼
       success           error
          │               │
          ▼               ▼
     Product[]      foutmelding
          │               │
          └───────┬───────┘
                  ▼
           loading = false
```

## 🔍 Producten zoeken

De zoekterm wordt opgeslagen in state:

``` ts
const [searchTerm, setSearchTerm] =
  useState<string>("");
```

Producten worden gefilterd:

``` ts
const filteredProducts = products.filter((product) =>
  product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
```

## 🛒 Product toevoegen

Met `.find()` wordt gecontroleerd of een product al in de
boodschappenlijst staat:

``` ts
const existingItem = shoppingList.find(
  (item) => item.product.id === product.id
);
```

Bestaat het product al, dan wordt `quantity` verhoogd. Anders wordt een
nieuw `CartItem` met `quantity: 1` toegevoegd.

## 💶 Totaalprijs berekenen

De totaalprijs wordt met `.reduce()` berekend:

``` ts
const totalPrice = shoppingList.reduce(
  (total, item) =>
    total + item.product.price * item.quantity,
  0
);
```

``` text
CartItem[]
    ↓
.reduce()
    ↓
één totaalbedrag
```

## 🧠 Belangrijke React-concepten

### Data via props

``` text
App
 ↓
ProductList
 ↓
ProductCard
```

### Actions via callbacks

``` text
ProductCard
 ↓
onAdd(product)
 ↓
ProductList
 ↓
App
 ↓
state update
```

Kort samengevat:

> **Data down, actions up.**

## 🧮 Gebruikte array-methodes

### `.map()`

Maakt vanuit een array nieuwe data of React-components.

### `.filter()`

Wordt gebruikt voor de zoekfunctionaliteit.

### `.find()`

Controleert of een product al in de boodschappenlijst staat.

### `.reduce()`

Berekent de totaalprijs.

## 🎨 Styling

De interface gebruikt onder andere:

-   responsive CSS Grid;
-   afgeronde productcards;
-   warme gradient achtergrond;
-   sticky boodschappenlijst op desktop;
-   responsive mobiele layout;
-   hover states;
-   loading/error/empty states.

De belangrijkste styling staat in `App.css`. Globale basisregels staan
in `index.css`.

## 🚀 Project lokaal starten

Dependencies installeren:

``` bash
npm install
```

Development server starten:

``` bash
npm run dev
```

Open daarna de lokale Vite-URL die in de terminal verschijnt,
bijvoorbeeld `http://localhost:5173/`.

## 🧪 Code controleren

ESLint:

``` bash
npm run lint
```

Production build:

``` bash
npm run build
```

Een succesvolle build wordt gegenereerd in `dist/`.

## 🎯 Wat ik met dit project heb geoefend

-   React component architecture
-   TypeScript types
-   Typed props
-   Typed callback functions
-   `useState`
-   `useEffect`
-   REST API-integratie
-   `fetch`
-   `async / await`
-   Promises
-   API data mapping
-   Loading states
-   Error handling
-   Empty states
-   Conditional rendering
-   Search/filtering
-   State updates
-   `.map()`
-   `.filter()`
-   `.find()`
-   `.reduce()`
-   Responsive CSS

## 🔮 Mogelijke uitbreidingen

-   `+` en `−` controls voor aantallen
-   Product verwijderen uit boodschappenlijst
-   `localStorage`
-   Productafbeeldingen
-   Categorie-filters
-   Sorteren op prijs
-   Budget instellen
-   Budget-progressbar
-   Aanbiedingen
-   React Router
-   Custom hooks
-   Unit tests
-   API pagination
-   Dark mode

## Status

**MVP complete** ✅

``` text
External API
    ↓
typed data
    ↓
React state
    ↓
filtering
    ↓
typed components
    ↓
user interaction
    ↓
business logic
    ↓
responsive UI
```
