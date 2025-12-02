/*************************************************
 * HTORI ERP – Optimized Version
 * SPA + GitHub Pages Safe Routing
 *************************************************/

const LANGS = ["EN", "KR", "ID"];

const state = {
  lang: localStorage.getItem("htori_lang") || "EN",
  page: localStorage.getItem("htori_page") || "dashboard",
};

/*************************************************
 * I18N (다국어 데이터)
 *************************************************/
/*************************************************
 * I18N (간단 버전)
 *************************************************/
const i18n = {
  EN: {
    appTitle: "HTORI ERP",
    sidebar: {
      dashboard: "Dashboard",
      stock: "Stock",
      purchase: "Purchase",
      outgoing: "Outgoing",
      production: "Production",
      bom: "BOM",
      outsourcing: "Outsourcing",
      finished: "Finished Goods",
      employees: "Employees",
      attendance: "Attendance",
      payroll: "Payroll",
      logs: "Logs",
      suppliers: "Suppliers",
      settings: "Settings",
    },
    pages: {
      dashboardTitle: "Dashboard",
      dashboardDesc: "Factory indicators and charts.",
      stockTitle: "Stock",
      stockDesc: "Raw / semi-finished / finished inventory.",
      purchaseTitle: "Purchase",
      purchaseDesc: "Incoming materials.",
      // 폼 placeholder
      purchaseFormCodePlaceholder: "Material Code",
      purchaseFormNamePlaceholder: "Material Name",
      purchaseFormQtyPlaceholder: "Qty",
      outgoingTitle: "Outgoing",
      outgoingDesc: "Manual outgoing.",
      productionTitle: "Production",
      productionDesc: "Production and material usage.",
      bomTitle: "BOM",
      bomDesc: "Bill of Materials.",
      outsourcingTitle: "Outsourcing",
      outsourcingDesc: "Out → In with vendor and defect.",
      finishedTitle: "Finished Goods",
      finishedDesc: "Finished products stock.",
      suppliersTitle: "Supplier Management",
      suppliersDesc: "Add / delete suppliers.",
      logsTitle: "Logs",
      logsDesc: "System activity history.",
      settingsTitle: "Settings",
      settingsDesc: "ERP basic settings.",
      dashRawLabel: "Raw Material Stock",
      dashFinishedLabel: "Finished Goods Stock",
      dashTodayProdLabel: "Today Production",
      dashDefectLabel: "Outsourcing Defect Rate",
      dashPurchase7Title: "Purchase (7 days)",
      dashOutgoing7Title: "Outgoing (7 days)",
      dashProduction7Title: "Production (7 days)",
      employeesTitle: "Employees",
      employeesDesc: "Employee master data.",
      attendanceTitle: "Attendance",
      attendanceDesc: "Clock-in / Clock-out records.",
      payrollTitle: "Payroll",
      payrollDesc: "Monthly payroll overview.",
    },
    common: {
      add: "Add",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      close: "Close",
      register: "Register",
      pdfExport: "PDF Export",
      excelDownload: "Excel Download",
      productCode: "Product Code",     // Production placeholder
    }
  },

  KR: {
    appTitle: "HTORI ERP",
    sidebar: {
      dashboard: "대시보드",
      stock: "재고",
      purchase: "입고",
      outgoing: "출고",
      production: "생산",
      bom: "BOM",
      outsourcing: "외주",
      finished: "완제품",
      employees: "직원",
      attendance: "근태",
      payroll: "급여",
      logs: "로그",
      suppliers: "공급업체",
      settings: "설정",
    },
    pages: {
      dashboardTitle: "대시보드",
      dashboardDesc: "공장 지표 및 그래프.",
      stockTitle: "재고 관리",
      stockDesc: "원자재 / 반제품 / 완제품 재고.",
      purchaseTitle: "입고 관리",
      purchaseDesc: "자재 입고 기록.",
      purchaseFormCodePlaceholder: "자재 코드",
      purchaseFormNamePlaceholder: "자재 이름",
      purchaseFormQtyPlaceholder: "수량",
      outgoingTitle: "출고 관리",
      outgoingDesc: "자재 출고 기록.",
      productionTitle: "생산 관리",
      productionDesc: "생산 및 자재 사용.",
      bomTitle: "BOM 관리",
      bomDesc: "제품별 필요 자재.",
      outsourcingTitle: "외주 관리",
      outsourcingDesc: "외주 출고/입고 및 불량.",
      finishedTitle: "완제품 재고",
      finishedDesc: "완제품 재고 현황.",
      suppliersTitle: "공급업체 관리",
      suppliersDesc: "공급업체 추가/삭제.",
      logsTitle: "로그",
      logsDesc: "시스템 작업 기록.",
      settingsTitle: "설정",
      settingsDesc: "기본 설정.",
      dashRawLabel: "원자재 재고",
      dashFinishedLabel: "완제품 재고",
      dashTodayProdLabel: "오늘 생산량",
      dashDefectLabel: "외주 불량률",
      dashPurchase7Title: "입고 (7일)",
      dashOutgoing7Title: "출고 (7일)",
      dashProduction7Title: "생산 (7일)",
      employeesTitle: "직원 관리",
      employeesDesc: "직원 기본 정보.",
      attendanceTitle: "근태 관리",
      attendanceDesc: "출근/퇴근 기록.",
      payrollTitle: "급여 관리",
      payrollDesc: "월별 급여 현황.",
    },
    common: {
      add: "추가",
      edit: "수정",
      delete: "삭제",
      save: "저장",
      close: "닫기",
      register: "등록",
      pdfExport: "PDF 다운로드",
      excelDownload: "Excel 다운로드",
      productCode: "완제품 코드",
    }
  },

  ID: {
    appTitle: "HTORI ERP",
    sidebar: {
      dashboard: "Dashboard",
      stock: "Stok",
      purchase: "Pembelian",
      outgoing: "Pengeluaran",
      production: "Produksi",
      bom: "BOM",
      outsourcing: "Outsourcing",
      finished: "Barang Jadi",
      employees: "Karyawan",
      attendance: "Absensi",
      payroll: "Gaji",
      logs: "Log",
      suppliers: "Pemasok",
      settings: "Pengaturan",
    },
    pages: {
      dashboardTitle: "Dashboard",
      dashboardDesc: "Indikator dan grafik pabrik.",
      stockTitle: "Stok",
      stockDesc: "Stok bahan baku / semi / jadi.",
      purchaseTitle: "Pembelian",
      purchaseDesc: "Data bahan masuk.",
      purchaseFormCodePlaceholder: "Kode Material",
      purchaseFormNamePlaceholder: "Nama Material",
      purchaseFormQtyPlaceholder: "Qty",
      outgoingTitle: "Pengeluaran",
      outgoingDesc: "Data bahan keluar.",
      productionTitle: "Produksi",
      productionDesc: "Produksi & pemakaian bahan.",
      bomTitle: "BOM",
      bomDesc: "Bill of Materials.",
      outsourcingTitle: "Outsourcing",
      outsourcingDesc: "Out → In dengan vendor.",
      finishedTitle: "Barang Jadi",
      finishedDesc: "Stok barang jadi.",
      suppliersTitle: "Manajemen Supplier",
      suppliersDesc: "Tambah / hapus supplier.",
      logsTitle: "Log",
      logsDesc: "Riwayat aktivitas.",
      settingsTitle: "Pengaturan",
      settingsDesc: "Pengaturan dasar.",
      dashRawLabel: "Stok Bahan Baku",
      dashFinishedLabel: "Stok Barang Jadi",
      dashTodayProdLabel: "Produksi Hari Ini",
      dashDefectLabel: "Tingkat Cacat Outsourcing",
      dashPurchase7Title: "Pembelian (7 hari)",
      dashOutgoing7Title: "Pengeluaran (7 hari)",
      dashProduction7Title: "Produksi (7 hari)",
      employeesTitle: "Karyawan",
      employeesDesc: "Data karyawan.",
      attendanceTitle: "Absensi",
      attendanceDesc: "Data masuk / pulang.",
      payrollTitle: "Gaji",
      payrollDesc: "Ringkasan gaji bulanan.",
    },
    common: {
      add: "Tambah",
      edit: "Edit",
      delete: "Hapus",
      save: "Simpan",
      close: "Tutup",
      register: "Daftar",
      pdfExport: "Ekspor PDF",
      excelDownload: "Unduh Excel",
      productCode: "Kode Produk",
    }
  },
};

/*************************************************
 * 기본 로컬 저장소 핸들러
 *************************************************/
const LS = {
  get(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/*************************************************
 * 로그
 *************************************************/
function writeLog(action, detail) {
  const logs = LS.get("logs");
  logs.unshift({ time: new Date().toLocaleString(), action, detail });
  LS.set("logs", logs);
}

/*************************************************
 * 페이지 렌더링 공통
 *************************************************/

function renderHeader() {
  document.querySelector(".logo").textContent = i18n[state.lang].appTitle;
}

function renderSidebar() {
  const t = i18n[state.lang].sidebar;
  document.querySelectorAll(".sidebar li").forEach((li) => {
    const pageId = li.getAttribute("onclick").replace("loadPage('", "").replace("')","");
    li.textContent = t[pageId];
  });
}

function loadPage(page) {
  state.page = page;
  localStorage.setItem("htori_page", page);
  renderAll();
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("htori_lang", lang);
  renderAll();
}

function renderAll() {
  renderHeader();
  renderSidebar();
  renderPage();
}

/*************************************************
 * 페이지 컨테이너 렌더링
 *************************************************/

function renderPage() {
  const page = state.page;
  const content = document.getElementById("content");

  // HTML 템플릿은 Part 2에서 제공
  if (PageTemplates[page]) {
    content.innerHTML = PageTemplates[page](state.lang);
  }

  // 후처리 로직들은 Part 3에서 제공
  if (PageRenders[page]) {
    PageRenders[page]();
  }
}

window.loadPage = loadPage;
window.setLanguage = setLanguage;

document.addEventListener("DOMContentLoaded", renderAll);
/*************************************************
 * PAGE TEMPLATES (각 메뉴마다 HTML 반환)
 *************************************************/

const PageTemplates = {

  dashboard(lang) {
    const t = i18n[lang].pages || {};
    return `
      <h2>${t.dashboardTitle || "Dashboard"}</h2>

      <div class="cards">
        <div class="card"><div class="card-label">Raw</div><div id="dashRaw" class="card-value">0</div></div>
        <div class="card"><div class="card-label">Finished</div><div id="dashFinished" class="card-value">0</div></div>
        <div class="card"><div class="card-label">Today</div><div id="dashTodayProd" class="card-value">0</div></div>
        <div class="card"><div class="card-label">Defect</div><div id="dashDefect" class="card-value">0%</div></div>
      </div>

      <h3>7 Days Charts</h3>
      <canvas id="chartPurchase"></canvas>
      <canvas id="chartOutgoing"></canvas>
      <canvas id="chartProduction"></canvas>
    `;
  },

  stock() {
    return `
      <h2>Stock</h2>

      <table class="erp-table">
        <thead><tr>
          <th>Code</th><th>Name</th><th>Qty</th><th>Updated</th><th>Edit</th>
        </tr></thead>
        <tbody id="stockTableBody"></tbody>
      </table>
    `;
  },

  purchase(lang) {
    const common = i18n[lang].common;
    const suppliers = LS.get("suppliers");
    return `
      <h2>${i18n[lang].sidebar.purchase}</h2>

      <div class="form-row">
        <input id="pCode" placeholder="Code">
        <input id="pName" placeholder="Name">
        <input id="pQty" type="number" placeholder="Qty">
        <input id="pPrice" type="number" placeholder="Price">
        <select id="pCurrency">
          <option value="USD">USD</option>
          <option value="IDR">IDR</option>
          <option value="KRW">KRW</option>
        </select>

        <select id="pSupplier">
          ${suppliers.map(s => `<option value="${s.name}">${s.name}</option>`).join("")}
        </select>

        <button onclick="onPurchase()" class="btn-primary">${common.register}</button>
      </div>

      <table class="erp-table" style="margin-top:16px;">
        <thead><tr>
          <th>Date</th><th>Supplier</th><th>Code</th><th>Name</th>
          <th>Qty</th><th>Price</th><th>Cur</th><th>Updated</th><th>Edit</th>
        </tr></thead>
        <tbody id="purchaseTableBody"></tbody>
      </table>
    `;
  },

  outgoing(lang) {
    const common = i18n[lang].common;
    return `
      <h2>${i18n[lang].sidebar.outgoing}</h2>

      <div class="form-row">
        <input id="oCode" placeholder="Code">
        <input id="oName" placeholder="Name">
        <input id="oQty" type="number" placeholder="Qty">
        <button onclick="onOutgoing()" class="btn-primary">${common.register}</button>
      </div>

      <table class="erp-table" style="margin-top:16px;">
        <thead><tr>
          <th>Date</th><th>Code</th><th>Name</th><th>Qty</th><th>Updated</th>
        </tr></thead>
        <tbody id="outgoingTableBody"></tbody>
      </table>
    `;
  },

  production(lang) {
    const common = i18n[lang].common;
    return `
      <h2>${i18n[lang].sidebar.production}</h2>

      <div class="form-row">
        <input id="prodProduct" placeholder="${common.productCode}">
        <input id="prodQty" type="number" placeholder="Qty">
        <button onclick="onProduction()" class="btn-primary">${common.register}</button>
      </div>

      <table class="erp-table" style="margin-top:16px;">
        <thead><tr>
          <th>Date</th><th>Product</th><th>Qty</th><th>Updated</th><th>Edit</th>
        </tr></thead>
        <tbody id="prodTableBody"></tbody>
      </table>
    `;
  },

  bom() {
    return `
      <h2>BOM</h2>

      <div class="form-row">
        <input id="bomProduct" placeholder="Product">
        <input id="bomMatCode" placeholder="Material Code">
        <input id="bomMatName" placeholder="Material Name">
        <input id="bomQty" type="number" placeholder="Qty">
        <button onclick="saveBOMItem()" class="btn-primary">Save</button>
      </div>

      <table class="erp-table" style="margin-top:16px;">
        <thead><tr>
          <th>Product</th><th>MatCode</th><th>MatName</th><th>Qty</th><th>Updated</th>
        </tr></thead>
        <tbody id="bomTableBody"></tbody>
      </table>
    `;
  },

  outsourcing() {
    const vendors = LS.get("vendors");
    return `
      <h2>Outsourcing</h2>

      <div class="form-row">
        <input id="outOutCode" placeholder="Out Code">
        <input id="outOutName" placeholder="Out Name">
        <input id="outOutQty" type="number" placeholder="Qty Out">

        <input id="outInCode" placeholder="In Code">
        <input id="outInName" placeholder="In Name">
        <input id="outInQty" type="number" placeholder="Qty In">

        <select id="outVendor">
          ${vendors.map(v => `<option value="${v}">${v}</option>`).join("")}
        </select>

        <button onclick="onOutsourcing()" class="btn-primary">Save</button>
      </div>

      <table class="erp-table" style="margin-top:16px;">
        <thead><tr>
          <th>Date</th><th>OutCode</th><th>OutName</th><th>QtyOut</th>
          <th>InCode</th><th>InName</th><th>QtyIn</th><th>Defect</th><th>Vendor</th><th>Updated</th>
        </tr></thead>
        <tbody id="outsourcingTableBody"></tbody>
      </table>
    `;
  },

  finished() {
    return `
      <h2>Finished Goods</h2>
      <table class="erp-table">
        <thead><tr><th>Code</th><th>Name</th><th>Qty</th><th>Edit</th></tr></thead>
        <tbody id="fgTableBody"></tbody>
      </table>
    `;
  },

  suppliers(lang) {
    const common = i18n[lang].common;
    return `
      <h2>${i18n[lang].sidebar.suppliers}</h2>

      <div class="form-row" style="flex-wrap:wrap;gap:10px;">
        <input id="newSupplier" placeholder="Supplier Name">
        <input id="supplierVendorName" placeholder="Vendor Name">
        <input id="supplierContact" placeholder="Contact">
        <input id="supplierEmail" placeholder="Email">
        <input id="supplierAddress" placeholder="Address">
        <input id="supplierPhone" placeholder="Phone">
        <button onclick="addSupplier()" class="btn-primary">${common.add}</button>
      </div>

      <table class="erp-table" style="margin-top:16px;">
        <thead><tr>
          <th>Supplier</th><th>Vendor</th><th>Contact</th><th>Email</th>
          <th>Address</th><th>Phone</th><th>Action</th>
        </tr></thead>
        <tbody id="supplierTableBody"></tbody>
      </table>
    `;
  },

  logs() {
    return `
      <h2>Logs</h2>
      <table class="erp-table">
        <thead><tr><th>Time</th><th>Action</th><th>Detail</th></tr></thead>
        <tbody id="logsTableBody"></tbody>
      </table>
    `;
  },

  settings() {
    return `
      <h2>Settings</h2>
      <p>Use the language buttons above.</p>
    `;
  },
};
/*************************************************
 * RENDER FUNCTIONS (각 페이지별 테이블 그리기)
 *************************************************/

/* ---- STOCK ---- */
function renderStockPage() {
  const tbody = document.getElementById("stockTableBody");
  if (!tbody) return;

  const stock = LS.get("stock");
  tbody.innerHTML = "";

  stock.forEach(i => {
    tbody.innerHTML += `
      <tr>
        <td>${i.code}</td>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>${i.updated}</td>
        <td><button class="btn-mini" onclick="editStockQty('${i.code}')">Edit</button></td>
      </tr>
    `;
  });
}

function editStockQty(code) {
  let stock = LS.get("stock");
  let item = stock.find(s => s.code === code);
  if (!item) return alert("Not found");

  const newQty = Number(prompt("New Qty", item.qty));
  if (isNaN(newQty)) return;

  item.qty = newQty;
  item.updated = new Date().toLocaleString();

  LS.set("stock", stock);
  writeLog("STOCK EDIT", `${code} → ${newQty}`);

  loadPage("stock");
}

/* ---- PURCHASE ---- */
function onPurchase() {
  const code = document.getElementById("pCode").value.trim();
  const name = document.getElementById("pName").value.trim();
  const qty = Number(document.getElementById("pQty").value);
  const price = Number(document.getElementById("pPrice").value);
  const cur = document.getElementById("pCurrency").value;
  const supplier = document.getElementById("pSupplier").value;

  if (!code || !name || !qty || !price) return alert("Missing fields");

  const stock = LS.get("stock");
  let item = stock.find(s => s.code === code);

  if (!item) {
    stock.push({
      code, name, qty,
      updated: new Date().toLocaleString()
    });
  } else {
    item.qty += qty;
    item.updated = new Date().toLocaleString();
  }

  LS.set("stock", stock);

  const list = LS.get("purchase");
  list.push({
    date: new Date().toLocaleDateString(),
    code, name, qty, price, currency: cur,
    supplier,
    updated: new Date().toLocaleString(),
  });
  LS.set("purchase", list);

  writeLog("PURCHASE", `${code} ${qty}EA`);

  loadPage("purchase");
}

function renderPurchasePage() {
  const tbody = document.getElementById("purchaseTableBody");
  if (!tbody) return;

  const list = LS.get("purchase");
  tbody.innerHTML = "";

  list.forEach((p, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.date}</td>
        <td>${p.supplier}</td>
        <td>${p.code}</td>
        <td>${p.name}</td>
        <td>${p.qty}</td>
        <td>${p.price}</td>
        <td>${p.currency}</td>
        <td>${p.updated}</td>
        <td><button class="btn-mini" onclick="editPurchase(${idx})">Edit</button></td>
      </tr>
    `;
  });
}

function editPurchase(i) {
  let list = LS.get("purchase");
  let p = list[i];

  const newQty = Number(prompt("Qty", p.qty));
  const newPrice = Number(prompt("Price", p.price));

  if (isNaN(newQty) || isNaN(newPrice)) return;

  const stock = LS.get("stock");
  let item = stock.find(s => s.code === p.code);
  item.qty += (newQty - p.qty);
  item.updated = new Date().toLocaleString();
  LS.set("stock", stock);

  p.qty = newQty;
  p.price = newPrice;
  p.updated = new Date().toLocaleString();

  LS.set("purchase", list);

  writeLog("PURCHASE EDIT", `${p.code} → ${newQty}`);

  loadPage("purchase");
}

/* ---- OUTGOING ---- */
function onOutgoing() {
  const code = document.getElementById("oCode").value.trim();
  const name = document.getElementById("oName").value.trim();
  const qty = Number(document.getElementById("oQty").value);

  if (!code || !qty) return alert("Missing");

  const stock = LS.get("stock");
  let item = stock.find(s => s.code === code);

  if (!item || item.qty < qty) return alert("Not enough stock");

  item.qty -= qty;
  item.updated = new Date().toLocaleString();
  LS.set("stock", stock);

  const list = LS.get("outgoing");
  list.push({
    date: new Date().toLocaleDateString(),
    code, name, qty,
    updated: new Date().toLocaleString(),
  });
  LS.set("outgoing", list);

  writeLog("OUTGOING", `${code} ${qty}`);

  loadPage("outgoing");
}

function renderOutgoingPage() {
  const tbody = document.getElementById("outgoingTableBody");
  if (!tbody) return;

  const list = LS.get("outgoing");
  tbody.innerHTML = "";

  list.forEach(o => {
    tbody.innerHTML += `
      <tr>
        <td>${o.date}</td>
        <td>${o.code}</td>
        <td>${o.name}</td>
        <td>${o.qty}</td>
        <td>${o.updated}</td>
      </tr>
    `;
  });
}

/* ---- BOM ---- */
function renderBOMPage() {
  const tbody = document.getElementById("bomTableBody");
  if (!tbody) return;

  const bom = LS.get("bom");
  tbody.innerHTML = "";

  bom.forEach(b => {
    tbody.innerHTML += `
      <tr>
        <td>${b.product}</td>
        <td>${b.matCode}</td>
        <td>${b.matName}</td>
        <td>${b.qty}</td>
        <td>${b.updated}</td>
      </tr>
    `;
  });
}

function saveBOMItem() {
  const product = document.getElementById("bomProduct").value.trim();
  const code = document.getElementById("bomMatCode").value.trim();
  const name = document.getElementById("bomMatName").value.trim();
  const qty = Number(document.getElementById("bomQty").value);

  if (!product || !code || !name || !qty) return alert("Missing");

  const bom = LS.get("bom");
  bom.push({
    product,
    matCode: code,
    matName: name,
    qty,
    updated: new Date().toLocaleString(),
  });

  LS.set("bom", bom);
  writeLog("BOM ADD", product);

  loadPage("bom");
}

/* ---- PRODUCTION ---- */
function renderProductionPage() {
  const tbody = document.getElementById("prodTableBody");
  if (!tbody) return;

  const list = LS.get("production");
  tbody.innerHTML = "";

  list.forEach((p, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.date}</td>
        <td>${p.product}</td>
        <td>${p.qty}</td>
        <td>${p.updated}</td>
        <td><button onclick="editProduction(${idx})" class="btn-mini">Edit</button></td>
      </tr>
    `;
  });
}

function onProduction() {
  const product = document.getElementById("prodProduct").value.trim();
  const qty = Number(document.getElementById("prodQty").value);

  if (!product || !qty) return alert("Missing");

  const bom = LS.get("bom").filter(b => b.product === product);
  if (bom.length === 0) return alert("No BOM");

  const stock = LS.get("stock");

  // 재고 체크
  for (const b of bom) {
    const need = b.qty * qty;
    const item = stock.find(s => s.code === b.matCode);
    if (!item || item.qty < need) {
      return alert(`Stock shortage: ${b.matCode}`);
    }
  }

  // 차감
  bom.forEach(b => {
    const need = b.qty * qty;
    let item = stock.find(s => s.code === b.matCode);
    item.qty -= need;
    item.updated = new Date().toLocaleString();
  });

  // 완제품 증가
  let fg = stock.find(s => s.code === product);
  if (!fg) {
    stock.push({ code: product, name: product, qty, updated: new Date().toLocaleString() });
  } else {
    fg.qty += qty;
    fg.updated = new Date().toLocaleString();
  }

  LS.set("stock", stock);

  const list = LS.get("production");
  list.push({
    date: new Date().toLocaleDateString(),
    product,
    qty,
    updated: new Date().toLocaleString(),
  });
  LS.set("production", list);

  writeLog("PRODUCTION", `${product} ${qty}`);

  loadPage("production");
}

function editProduction(i) {
  let list = LS.get("production");
  let p = list[i];

  const newQty = Number(prompt("Qty", p.qty));
  if (isNaN(newQty)) return;

  p.qty = newQty;
  p.updated = new Date().toLocaleString();

  LS.set("production", list);
  writeLog("PROD EDIT", p.product);

  loadPage("production");
}

/* ---- OUTSOURCING ---- */
function renderOutsourcingPage() {
  const tbody = document.getElementById("outsourcingTableBody");
  if (!tbody) return;

  const list = LS.get("outsourcing");
  tbody.innerHTML = "";

  list.forEach(r => {
    tbody.innerHTML += `
      <tr>
        <td>${r.date}</td>
        <td>${r.outCode}</td>
        <td>${r.outName}</td>
        <td>${r.outQty}</td>
        <td>${r.inCode}</td>
        <td>${r.inName}</td>
        <td>${r.inQty}</td>
        <td>${r.defect}</td>
        <td>${r.vendor}</td>
        <td>${r.updated}</td>
      </tr>
    `;
  });
}

function onOutsourcing() {
  const outCode = document.getElementById("outOutCode").value.trim();
  const outName = document.getElementById("outOutName").value.trim();
  const outQty = Number(document.getElementById("outOutQty").value);

  const inCode = document.getElementById("outInCode").value.trim();
  const inName = document.getElementById("outInName").value.trim();
  const inQty = Number(document.getElementById("outInQty").value);

  const vendor = document.getElementById("outVendor").value;

  if (!outCode || !inCode || !outQty || !inQty) return alert("Missing");

  const stock = LS.get("stock");
  let outItem = stock.find(s => s.code === outCode);

  if (!outItem || outItem.qty < outQty) return alert("OUT stock shortage");

  outItem.qty -= outQty;
  outItem.updated = new Date().toLocaleString();

  let inItem = stock.find(s => s.code === inCode);

  if (!inItem) {
    stock.push({ code: inCode, name: inName, qty: inQty, updated: new Date().toLocaleString() });
  } else {
    inItem.qty += inQty;
    inItem.updated = new Date().toLocaleString();
  }

  LS.set("stock", stock);

  const defect = outQty - inQty;

  const list = LS.get("outsourcing");
  list.push({
    date: new Date().toLocaleDateString(),
    outCode,
    outName,
    outQty,
    inCode,
    inName,
    inQty,
    defect,
    vendor,
    updated: new Date().toLocaleString(),
  });

  LS.set("outsourcing", list);
  writeLog("OUTSOURCING", `${outCode} → ${inCode}`);

  loadPage("outsourcing");
}

/* ---- SUPPLIERS ---- */
function renderSupplierPage() {
  const tbody = document.getElementById("supplierTableBody");
  if (!tbody) return;

  const list = LS.get("suppliers");
  tbody.innerHTML = "";

  list.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.vendorName || ""}</td>
        <td>${s.contactPerson || ""}</td>
        <td>${s.email || ""}</td>
        <td>${s.address || ""}</td>
        <td>${s.phone || ""}</td>
        <td><button class="btn-mini" onclick="openSupplierModal('${s.name}')">Edit</button></td>
      </tr>
    `;
  });
}

function addSupplier() {
  const name = document.getElementById("newSupplier").value.trim();
  if (!name) return alert("Enter name");

  const list = LS.get("suppliers");
  if (list.some(s => s.name === name)) return alert("Exists");

  list.push({
    name,
    vendorName: "",
    contactPerson: "",
    email: "",
    address: "",
    phone: ""
  });

  LS.set("suppliers", list);
  writeLog("SUPPLIER ADD", name);

  loadPage("suppliers");
}

function openSupplierModal(name) {
  const list = LS.get("suppliers");
  const s = list.find(x => x.name === name);
  if (!s) return;

  document.getElementById("editSupplierName").value = s.name;
  document.getElementById("editVendorName").value = s.vendorName || "";
  document.getElementById("editContactPerson").value = s.contactPerson || "";
  document.getElementById("editEmail").value = s.email || "";
  document.getElementById("editAddress").value = s.address || "";
  document.getElementById("editPhone").value = s.phone || "";

  document.getElementById("supplierModal").style.display = "block";
}

function closeSupplierModal() {
  document.getElementById("supplierModal").style.display = "none";
}

function saveSupplierEdit() {
  const name = document.getElementById("editSupplierName").value.trim();

  let list = LS.get("suppliers");
  let s = list.find(x => x.name === name);
  if (!s) return;

  s.vendorName = document.getElementById("editVendorName").value.trim();
  s.contactPerson = document.getElementById("editContactPerson").value.trim();
  s.email = document.getElementById("editEmail").value.trim();
  s.address = document.getElementById("editAddress").value.trim();
  s.phone = document.getElementById("editPhone").value.trim();

  LS.set("suppliers", list);
  writeLog("SUPPLIER EDIT", name);

  closeSupplierModal();
  loadPage("suppliers");
}

/* ---- FINISHED GOODS ---- */
function renderFGPage() {
  const tbody = document.getElementById("fgTableBody");
  if (!tbody) return;

  const list = LS.get("stock").filter(s => s.code.startsWith("VC"));
  tbody.innerHTML = "";

  list.forEach(i => {
    tbody.innerHTML += `
      <tr>
        <td>${i.code}</td>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td><button class="btn-mini" onclick="editStockQty('${i.code}')">Edit</button></td>
      </tr>
    `;
  });
}

/* ---- LOGS ---- */
function renderLogsPage() {
  const tbody = document.getElementById("logsTableBody");
  if (!tbody) return;

  const logs = LS.get("logs");
  tbody.innerHTML = "";

  logs.forEach(l => {
    tbody.innerHTML += `
      <tr>
        <td>${l.time}</td>
        <td>${l.action}</td>
        <td>${l.detail}</td>
      </tr>
    `;
  });
}

/* ---- DASHBOARD ---- */

function getDashboardStats() {
  const stock = LS.get("stock");
  const prod = LS.get("production");
  const out = LS.get("outsourcing");

  const totalRaw = stock.filter(i => !i.code.startsWith("VC"))
                        .reduce((a,b)=>a + b.qty, 0);

  const totalFinished = stock.filter(i => i.code.startsWith("VC"))
                             .reduce((a,b)=>a + b.qty, 0);

  const today = new Date().toLocaleDateString();

  const todayProd = prod.filter(p => p.date === today)
                        .reduce((a,b)=>a + b.qty, 0);

  const totalOut = out.reduce((a,b)=>a + b.outQty, 0);
  const totalDef = out.reduce((a,b)=>a + b.defect, 0);

  const defectRate = totalOut === 0 ? 0 : Math.round((totalDef / totalOut) * 100);

  return { totalRaw, totalFinished, todayProd, defectRate };
}

function renderDashboardPage() {
  const stat = getDashboardStats();

  document.getElementById("dashRaw").textContent = stat.totalRaw;
  document.getElementById("dashFinished").textContent = stat.totalFinished;
  document.getElementById("dashTodayProd").textContent = stat.todayProd;
  document.getElementById("dashDefect").textContent = stat.defectRate + "%";
}
/*************************************************
 * PAGE TEMPLATES (화면 레이아웃 모음)
 *************************************************/
const PageTemplates = {
  dashboard(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.dashboardTitle}</h2>
      <p>${t.dashboardDesc}</p>

      <div class="cards">
        <div class="card">
          <div class="card-label">${t.dashRawLabel}</div>
          <div class="card-value" id="dashRaw">0</div>
        </div>
        <div class="card">
          <div class="card-label">${t.dashFinishedLabel}</div>
          <div class="card-value" id="dashFinished">0</div>
        </div>
        <div class="card">
          <div class="card-label">${t.dashTodayProdLabel}</div>
          <div class="card-value" id="dashTodayProd">0</div>
        </div>
        <div class="card">
          <div class="card-label">${t.dashDefectLabel}</div>
          <div class="card-value" id="dashDefect">0%</div>
        </div>
      </div>
    `;
  },

  stock(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.stockTitle}</h2>
      <p>${t.stockDesc}</p>

      <table class="erp-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Updated</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody id="stockTableBody"></tbody>
      </table>
    `;
  },

  purchase(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.purchaseTitle}</h2>
      <p>${t.purchaseDesc}</p>

      <div class="form-row">
        <input id="pCode" placeholder="${t.purchaseFormCodePlaceholder}">
        <input id="pName" placeholder="${t.purchaseFormNamePlaceholder}">
        <input id="pQty" type="number" placeholder="${t.purchaseFormQtyPlaceholder}">
        <input id="pPrice" type="number" placeholder="Unit Price">
        <input id="pSupplier" placeholder="Supplier">
        <select id="pCurrency">
          <option value="USD">USD</option>
          <option value="IDR">IDR</option>
          <option value="KRW">KRW</option>
        </select>
        <button class="btn-primary" onclick="onPurchase()">
          ${i18n[lang].common.register}
        </button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>Date</th>
            <th>Supplier</th>
            <th>Code</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Cur</th>
            <th>Updated</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody id="purchaseTableBody"></tbody>
      </table>
    `;
  },

  outgoing(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.outgoingTitle}</h2>
      <p>${t.outgoingDesc}</p>

      <div class="form-row">
        <input id="oCode" placeholder="Code">
        <input id="oName" placeholder="Name">
        <input id="oQty" type="number" placeholder="Qty">
        <button class="btn-primary" onclick="onOutgoing()">
          ${i18n[lang].common.register}
        </button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>Date</th>
            <th>Code</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody id="outgoingTableBody"></tbody>
      </table>
    `;
  },

  production(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.productionTitle}</h2>
      <p>${t.productionDesc}</p>

      <div class="form-row">
        <input id="prodProduct" placeholder="${i18n[lang].common.productCode}">
        <input id="prodQty" type="number" placeholder="Qty">
        <button class="btn-primary" onclick="onProduction()">
          ${i18n[lang].common.register}
        </button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Updated</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody id="prodTableBody"></tbody>
      </table>
    `;
  },

  bom(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.bomTitle}</h2>
      <p>${t.bomDesc}</p>

      <div class="form-row">
        <input id="bomProduct" placeholder="Product">
        <input id="bomMatCode" placeholder="Material Code">
        <input id="bomMatName" placeholder="Material Name">
        <input id="bomQty" type="number" placeholder="Qty per 1 product">
        <button class="btn-primary" onclick="saveBOMItem()">
          Save BOM
        </button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>Product</th>
            <th>MatCode</th>
            <th>MatName</th>
            <th>Qty</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody id="bomTableBody"></tbody>
      </table>
    `;
  },

  outsourcing(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.outsourcingTitle}</h2>
      <p>${t.outsourcingDesc}</p>

      <div class="form-row">
        <h3>OUT</h3>
        <input id="outOutCode" placeholder="Out Code">
        <input id="outOutName" placeholder="Out Name">
        <input id="outOutQty" type="number" placeholder="Qty Out">

        <h3>IN</h3>
        <input id="outInCode" placeholder="In Code">
        <input id="outInName" placeholder="In Name">
        <input id="outInQty" type="number" placeholder="Qty In">

        <h3>Vendor</h3>
        <input id="outVendor" placeholder="Vendor">

        <button class="btn-primary" style="margin-top:10px;" onclick="onOutsourcing()">
          ${t.outsourcingTitle}
        </button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>Date</th>
            <th>OutCode</th>
            <th>OutName</th>
            <th>QtyOut</th>
            <th>InCode</th>
            <th>InName</th>
            <th>QtyIn</th>
            <th>Defect</th>
            <th>Vendor</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody id="outsourcingTableBody"></tbody>
      </table>
    `;
  },

  finished(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.finishedTitle}</h2>
      <p>${t.finishedDesc}</p>

      <table class="erp-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody id="fgTableBody"></tbody>
      </table>
    `;
  },

  suppliers(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.suppliersTitle}</h2>
      <p>${t.suppliersDesc}</p>

      <div class="form-row">
        <input id="newSupplier" placeholder="Supplier Name">
        <button class="btn-primary" onclick="addSupplier()">
          ${i18n[lang].common.add}
        </button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Vendor</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="supplierTableBody"></tbody>
      </table>
    `;
  },

  employees(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.employeesTitle}</h2>
      <p>${t.employeesDesc}</p>
      <p>※ 추후 HR 모듈 확장 예정.</p>
    `;
  },

  attendance(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.attendanceTitle}</h2>
      <p>${t.attendanceDesc}</p>
      <p>※ 추후 출근/퇴근 기록 기능 예정.</p>
    `;
  },

  payroll(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.payrollTitle}</h2>
      <p>${t.payrollDesc}</p>
      <p>※ 추후 급여 계산 기능 예정.</p>
    `;
  },

  logs(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.logsTitle}</h2>
      <p>${t.logsDesc}</p>

      <table class="erp-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Action</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody id="logsTableBody"></tbody>
      </table>
    `;
  },

  settings(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.settingsTitle}</h2>
      <p>${t.settingsDesc}</p>
      <p>언어 변경은 오른쪽 상단 EN / KR / ID 버튼을 사용하세요.</p>
    `;
  },
};

/*************************************************
 * RENDERING + NAVIGATION
 *************************************************/
function renderContent() {
  const lang = state.lang;
  const page = state.page || "dashboard";
  const contentEl = document.getElementById("content");
  const tmpl = PageTemplates[page] || PageTemplates.dashboard;

  contentEl.innerHTML = tmpl(lang);

  // 페이지별 데이터 렌더링 호출
  if (page === "dashboard") renderDashboardPage();
  else if (page === "stock") renderStockPage();
  else if (page === "purchase") renderPurchasePage();
  else if (page === "outgoing") renderOutgoingPage();
  else if (page === "production") renderProductionPage();
  else if (page === "bom") renderBOMPage();
  else if (page === "outsourcing") renderOutsourcingPage();
  else if (page === "finished") renderFGPage();
  else if (page === "suppliers") renderSupplierPage();
  else if (page === "logs") renderLogsPage();
}

function renderSidebar() {
  const lang = state.lang;
  const t = i18n[lang].sidebar;
  const items = document.querySelectorAll(".sidebar li");

  items.forEach((li, idx) => {
    const pageId = MENU_ORDER[idx];
    li.dataset.page = pageId;
    li.textContent = t[pageId];
    li.classList.toggle("active", pageId === state.page);
  });
}

function renderHeader() {
  const logoEl = document.querySelector(".logo");
  if (logoEl) {
    logoEl.textContent = i18n[state.lang].appTitle;
  }
}

function rerenderAll() {
  renderHeader();
  renderSidebar();
  renderContent();
}

/*************************************************
 * LANGUAGE + PAGE CHANGE
 *************************************************/
function setLanguage(lang) {
  if (!LANGS.includes(lang)) return;
  state.lang = lang;
  LS.set("htori_lang", lang);
  rerenderAll();
}

function loadPage(pageId) {
  if (!PageTemplates[pageId]) pageId = "dashboard";
  state.page = pageId;
  LS.set("htori_page", pageId);
  rerenderAll();
}

/*************************************************
 * INITIAL BINDING
 *************************************************/
document.addEventListener("DOMContentLoaded", () => {
  // 전역 함수 export (HTML onclick에서 사용)
  window.setLanguage     = setLanguage;
  window.loadPage        = loadPage;

  window.onPurchase      = onPurchase;
  window.onOutgoing      = onOutgoing;
  window.onProduction    = onProduction;
  window.onOutsourcing   = onOutsourcing;

  window.saveBOMItem     = saveBOMItem;
  window.editStockQty    = editStockQty;
  window.editPurchase    = editPurchase;
  window.editProduction  = editProduction;

  window.addSupplier        = addSupplier;
  window.openSupplierModal  = openSupplierModal;
  window.closeSupplierModal = closeSupplierModal;
  window.saveSupplierEdit   = saveSupplierEdit;

  // 첫 렌더
  rerenderAll();
});
