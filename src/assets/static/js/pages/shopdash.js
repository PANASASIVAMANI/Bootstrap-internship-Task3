// ShopDash - E-Commerce Analytics Dashboard
// Fetches data from data.json and dynamically renders all components

const DATA_URL = 'assets/static/data.json';

// ─── Utility Helpers ────────────────────────────────────────────────────────
const fmt = {
  currency: (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v),
  number: (v) => new Intl.NumberFormat('en-IN').format(v),
  percent: (v) => `${v > 0 ? '+' : ''}${v}%`,
};

const statusBadge = (status) => {
  const map = {
    'Delivered': 'success',
    'Processing': 'warning',
    'Shipped': 'info',
    'Cancelled': 'danger',
  };
  return `<span class="badge bg-${map[status] || 'secondary'} rounded-pill">${status}</span>`;
};

const trendIcon = (trend) =>
  trend === 'up'
    ? `<i class="bi bi-arrow-up-short"></i>`
    : `<i class="bi bi-arrow-down-short"></i>`;

// ─── Stats Cards ─────────────────────────────────────────────────────────────
function renderStats(stats) {
  const items = [
    { id: 'revenue', label: 'revenue', val: fmt.currency(stats.revenue.value), change: stats.revenue.change, trend: stats.revenue.trend },
    { id: 'orders', label: 'orders', val: fmt.number(stats.orders.value), change: stats.orders.change, trend: stats.orders.trend },
    { id: 'customers', label: 'customers', val: fmt.number(stats.customers.value), change: stats.customers.change, trend: stats.customers.trend },
    { id: 'products', label: 'products', val: fmt.number(stats.products.value), change: stats.products.change, trend: stats.products.trend },
  ];

  items.forEach(({ id, val, change, trend }) => {
    const valEl = document.getElementById(`stat-${id}`);
    const changeEl = document.getElementById(`stat-${id}-change`);
    if (valEl) {
      valEl.textContent = val;
      valEl.classList.add('animate-count');
    }
    if (changeEl) {
      const cls = trend === 'up' ? 'text-success' : 'text-danger';
      changeEl.innerHTML = `<span class="${cls}">${trendIcon(trend)} ${fmt.percent(change)} vs last month</span>`;
    }
  });
}

// ─── Revenue Chart ───────────────────────────────────────────────────────────
function renderRevenueChart(chartData) {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: 'Revenue (₹)',
        data: chartData.data,
        borderColor: '#435ebe',
        backgroundColor: 'rgba(67, 94, 190, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#435ebe',
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` Revenue: ${fmt.currency(ctx.raw)}`,
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { callback: (v) => '₹' + (v / 1000).toFixed(0) + 'K' }
        }
      }
    }
  });
}

// ─── Category Donut Chart ────────────────────────────────────────────────────
function renderCategoryChart(chartData) {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: chartData.labels,
      datasets: [{
        data: chartData.data,
        backgroundColor: ['#435ebe', '#28ab55', '#eaca4a', '#f3616d', '#56b6f7'],
        borderWidth: 0,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 15, usePointStyle: true }
        },
        tooltip: {
          callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.raw}%` }
        }
      }
    }
  });
}

// ─── Recent Orders Table ──────────────────────────────────────────────────────
function renderOrders(orders) {
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><a href="#" class="text-primary fw-semibold">${o.id}</a></td>
      <td>${o.customer}</td>
      <td class="text-muted">${o.product}</td>
      <td class="fw-semibold">${fmt.currency(o.amount)}</td>
      <td>${statusBadge(o.status)}</td>
    </tr>
  `).join('');
}

// ─── Top Products ─────────────────────────────────────────────────────────────
function renderTopProducts(products) {
  const container = document.getElementById('top-products-list');
  if (!container) return;

  container.innerHTML = products.map((p, i) => `
    <div class="d-flex align-items-center mb-3 ${i < products.length - 1 ? 'pb-3 border-bottom' : ''}">
      <div class="product-rank fw-bold text-muted me-3">#${i + 1}</div>
      <div class="flex-grow-1">
        <div class="fw-semibold">${p.name}</div>
        <small class="text-muted">${p.category}</small>
      </div>
      <div class="text-end">
        <div class="fw-semibold text-primary">${fmt.currency(p.revenue)}</div>
        <small class="text-muted">${fmt.number(p.sales)} sales</small>
      </div>
      <div class="ms-3">
        <span class="badge ${p.stock < 50 ? 'bg-danger' : 'bg-success'} rounded-pill">${p.stock} left</span>
      </div>
    </div>
  `).join('');
}

// ─── Top Customers ────────────────────────────────────────────────────────────
function renderTopCustomers(customers) {
  const row = document.getElementById('top-customers-row');
  if (!row) return;

  row.innerHTML = customers.map(c => `
    <div class="col-12 col-md-6 col-lg-3 mb-3">
      <div class="d-flex align-items-center p-3 bg-light rounded-3">
        <div class="customer-avatar me-3">${c.avatar}</div>
        <div>
          <div class="fw-semibold">${c.name}</div>
          <small class="text-muted d-block">${c.email}</small>
          <small class="text-primary">${c.totalOrders} orders &bull; ${fmt.currency(c.totalSpent)}</small>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── Bootstrap Page Title ─────────────────────────────────────────────────────
function updatePageTitle() {
  document.title = 'ShopDash | Dashboard';
}

// ─── Main Init ────────────────────────────────────────────────────────────────
async function init() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    updatePageTitle();
    renderStats(data.stats);
    renderRevenueChart(data.revenueChart);
    renderCategoryChart(data.categoryChart);
    renderOrders(data.recentOrders);
    renderTopProducts(data.topProducts);
    renderTopCustomers(data.topCustomers);
  } catch (err) {
    console.error('ShopDash: Failed to load data:', err);
    const errMsg = `<div class="alert alert-danger m-3">Failed to load dashboard data. Make sure the dev server is running (<code>npm run dev</code>).</div>`;
    document.querySelector('#stats-section')?.insertAdjacentHTML('beforebegin', errMsg);
  }
}

document.addEventListener('DOMContentLoaded', init);


