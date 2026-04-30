# ShopDash — E-Commerce Analytics Dashboard

### Task 3 | Front-End Skill Assessment | KeshavSoft Internship

> A fully customized, data-driven admin dashboard built on top of [Mazer](https://github.com/zuramai/mazer) — an open-source Bootstrap 5 template.

---

## Live Preview

**Deployed URL:** [https://elegant-caramel-339073.netlify.app](https://elegant-caramel-339073.netlify.app)

Run locally using: `npm run dev` — [http://localhost:5173](http://localhost:5173)

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | KPI stats, revenue chart, orders table, top products and customers |
| Analytics | `/analytics.html` | Monthly bar chart, category pie chart, product performance table |
| Products | `/products.html` | Full product catalog with stock and rating display |
| Orders | `/orders.html` | All orders with live status filter buttons |
| Customers | `/customers.html` | Customer cards with order history and total spend |
| Settings | `/settings.html` | Store configuration form with notification toggles |

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Mazer](https://github.com/zuramai/mazer) | Base Bootstrap 5 admin template (MIT Licensed) |
| Bootstrap 5 | Layout, grid, components |
| Vite | Dev server and asset bundler |
| Nunjucks | HTML templating engine (sidebar, layouts) |
| Chart.js v4 | Line, bar, donut, and pie charts |
| Vanilla ES6 JS | fetch() API data binding, DOM manipulation |
| SCSS | Custom theme overrides |

---

## Project Structure

```
Bootstrap-Task3/
├── src/
│   ├── assets/
│   │   ├── js/              # Mazer core JS
│   │   ├── scss/
│   │   │   └── pages/
│   │   │       └── shopdash.scss   # Custom ShopDash styles
│   │   └── static/
│   │       ├── data.json           # Sample e-commerce data
│   │       └── js/
│   │           ├── chart.umd.js    # Chart.js library
│   │           └── pages/
│   │               └── shopdash.js # Main data-binding logic
│   ├── layouts/             # Nunjucks layout templates
│   ├── index.html           # Dashboard (customized)
│   ├── analytics.html       # Analytics page (new)
│   ├── orders.html          # Orders page (new)
│   ├── products.html        # Products page (new)
│   ├── customers.html       # Customers page (new)
│   ├── settings.html        # Settings page (new)
│   └── sidebar-items.json   # Custom sidebar navigation
├── netlify.toml             # Netlify deployment configuration
├── vite.config.js           # Updated with ShopDash title
└── package.json
```

Files marked above are new or significantly customized from the original Mazer template.

---

## Data Binding Logic

All dashboard data is loaded dynamically from a single source:

**`src/assets/static/data.json`**

The JavaScript file **`src/assets/static/js/pages/shopdash.js`** uses the native ES6 `fetch()` API to retrieve this JSON and populate the UI:

```js
async function init() {
    const response = await fetch('assets/static/data.json');
    const data = await response.json();

    renderStats(data.stats);
    renderRevenueChart(data.revenueChart);
    renderCategoryChart(data.categoryChart);
    renderOrders(data.recentOrders);
    renderTopProducts(data.topProducts);
    renderTopCustomers(data.topCustomers);
}
```

### Data Schema (data.json)

```json
{
  "stats": { "revenue": {}, "orders": {}, "customers": {}, "products": {} },
  "recentOrders": [ { "id", "customer", "product", "date", "amount", "status" } ],
  "topProducts":  [ { "name", "category", "sales", "revenue", "stock", "rating" } ],
  "revenueChart": { "labels": [], "data": [] },
  "categoryChart": { "labels": [], "data": [] },
  "topCustomers": [ { "name", "email", "totalOrders", "totalSpent", "avatar" } ]
}
```

---

## UI Customizations

1. **Sidebar** — Rebuilt `sidebar-items.json` for ShopDash navigation (Dashboard, Analytics, Store Management, System).
2. **Theme** — Customized `_variables.scss` for an indigo/blue ShopDash palette. Added `shopdash.scss` with stat card accent borders, icon backgrounds, customer avatars, and fade-up animations.
3. **Dashboard** — Replaced the original profile statistics page with a full e-commerce KPI dashboard.
4. **New Pages** — Created `analytics.html`, `orders.html`, `products.html`, `customers.html`, and `settings.html` from scratch.
5. **Vite Config** — Updated `web_title` to "ShopDash | E-Commerce Dashboard".
6. **Charts** — Integrated Chart.js (line, bar, doughnut, pie) on Dashboard and Analytics pages.
7. **Interactive Filters** — Orders page has status filter buttons (All / Delivered / Processing / Shipped / Cancelled) that filter dynamically without page reload.

---

## Setup and Run

```bash
# 1. Clone the repository
git clone https://github.com/PANASASIVAMANI/Bootstrap-internship-Task3.git
cd Bootstrap-Task3

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Run the development server
npm run dev

# 4. Open in browser
# http://localhost:5173/
```

> Note: You must use `npm run dev` to run the project. Opening `index.html` directly will not work because the project uses Vite for asset bundling and Nunjucks for HTML templating.

---

## Assessment Checklist

- Forked from `zuramai/mazer` (MIT licensed)
- UI/UX customized — new theme, colors, sidebar, animations
- Data-driven — all components rendered from `data.json` via fetch()
- Bootstrap 5 components — cards, tables, badges, forms, grids
- ES6 JavaScript — fetch(), async/await, arrow functions, template literals
- Fully responsive — tested on mobile and desktop
- New pages created — Analytics, Orders, Products, Customers, Settings
- Clean, commented code

---

## License

This project is based on [Mazer](https://github.com/zuramai/mazer) which is licensed under the [MIT License](LICENSE).
