/*************************************************
 * HTORI ERP – Frontend Single Page App (FULL VERSION)
 * - Dashboard / Stock / Purchase / Outgoing
 * - Production (BOM deduction)
 * - BOM Management
 * - Outsourcing (Out → In, defect, vendor select)
 * - Stock / Purchase / Production 수정 가능
 * - Multi Language (EN / KR / ID)
 *************************************************/

/** 사용 가능한 언어 */
const LANGS = ["EN", "KR", "ID"];

/** 글로벌 상태 */
const state = {
  lang: localStorage.getItem("htori_lang") || "EN",
  page: localStorage.getItem("htori_page") || "dashboard",
};

/*************************************************
 * I18N – 다국어 사전
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
      settings: "Settings",
    },
    pages: {
      dashboardTitle: "Dashboard",
      dashboardDesc: "Factory key indicators.",

      stockTitle: "Stock",
      stockDesc: "Current inventory.",
      stockCodeHeader: "Code",
      stockNameHeader: "Name",
      stockQtyHeader: "Qty",
      stockMinHeader: "Min",
      stockUnitHeader: "Unit",
      stockUpdatedHeader: "Updated",
      stockEditHeader: "Edit",

      purchaseTitle: "Purchase",
      purchaseDesc: "Incoming material records.",
      purchaseFormCodePlaceholder: "Material Code",
      purchaseFormNamePlaceholder: "Material Name",
      purchaseFormQtyPlaceholder: "Qty",
      purchaseFormButton: "Register Incoming",
      purchaseTableDate: "Date",
      purchaseTableCode: "Code",
      purchaseTableName: "Name",
      purchaseTableQty: "Qty",
      purchaseTableUpdated: "Updated",
      purchaseTableEdit: "Edit",

      outgoingTitle: "Outgoing",
      outgoingDesc: "Material outgoing.",
      outgoingFormCodePlaceholder: "Material Code",
      outgoingFormNamePlaceholder: "Material Name",
      outgoingFormQtyPlaceholder: "Qty",
      outgoingFormButton: "Register Outgoing",

      productionTitle: "Production",
      productionDesc: "Daily production results.",
      prodProductPlaceholder: "Finished Product (same as BOM product)",
      prodQtyPlaceholder: "Qty",
      prodButton: "Register Production",
      prodNote:
        "Product must match BOM to deduct raw materials automatically.",
      prodTableDate: "Date",
      prodTableProduct: "Product",
      prodTableQty: "Qty",
      prodTableUpdated: "Updated",
      prodTableEdit: "Edit",

      bomTitle: "BOM",
      bomDesc: "Bill of Materials.",
      bomProductPlaceholder: "Finished Product",
      bomMatCodePlaceholder: "Material Code",
      bomMatNamePlaceholder: "Material Name",
      bomQtyPlaceholder: "Qty per 1 product",
      bomSaveButton: "Save BOM",
      bomTableProduct: "Product",
      bomTableMatCode: "Material Code",
      bomTableMatName: "Material Name",
      bomTableQty: "Qty",
      bomTableUpdated: "Updated",

      outsourcingTitle: "Outsourcing",
      outsourcingDesc: "Out → In code change with defect tracking.",
      outsourcingFormVendorPlaceholder: "Vendor",
      outsourcingFormButton: "Register Outsourcing",
      outsourcingTableDate: "Date",
      outsourcingTableOutCode: "Out Code",
      outsourcingTableOutName: "Out Name",
      outsourcingTableQtyOut: "Qty Out",
      outsourcingTableInCode: "In Code",
      outsourcingTableInName: "In Name",
      outsourcingTableQtyIn: "Qty In",
      outsourcingTableDefect: "Defect",
      outsourcingTableVendor: "Vendor",
      outsourcingTableUpdated: "Updated",

      finishedTitle: "Finished Goods",
      finishedDesc: "Finished products (demo).",

      employeesTitle: "Employees",
      employeesDesc: "Employee master (demo).",

      attendanceTitle: "Attendance",
      attendanceDesc: "Attendance records (demo).",

      payrollTitle: "Payroll",
      payrollDesc: "Payroll overview (demo).",

      logsTitle: "Logs",
      logsDesc: "System logs (demo).",

      settingsTitle: "Settings",
      settingsDesc: "System configuration",
      settingsLangLabel: "Language",
      settingsTimezoneLabel: "Timezone",
      settingsVersionLabel: "Version",
    },
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
      settings: "설정",
    },
    pages: {
      dashboardTitle: "대시보드",
      dashboardDesc: "공장 운영 핵심 지표.",

      stockTitle: "재고 관리",
      stockDesc: "원자재 / 반제품 재고 현황.",
      stockCodeHeader: "코드",
      stockNameHeader: "품명",
      stockQtyHeader: "수량",
      stockMinHeader: "안전재고",
      stockUnitHeader: "단위",
      stockUpdatedHeader: "최종 수정",
      stockEditHeader: "수정",

      purchaseTitle: "입고 관리",
      purchaseDesc: "입고 내역.",
      purchaseFormCodePlaceholder: "자재 코드",
      purchaseFormNamePlaceholder: "자재 명",
      purchaseFormQtyPlaceholder: "입고 수량",
      purchaseFormButton: "입고 등록",
      purchaseTableDate: "날짜",
      purchaseTableCode: "코드",
      purchaseTableName: "품명",
      purchaseTableQty: "수량",
      purchaseTableUpdated: "수정일",
      purchaseTableEdit: "수정",

      outgoingTitle: "출고 관리",
      outgoingDesc: "출고 / 조정 내역.",
      outgoingFormCodePlaceholder: "자재 코드",
      outgoingFormNamePlaceholder: "자재 명",
      outgoingFormQtyPlaceholder: "출고 수량",
      outgoingFormButton: "출고 등록",

      productionTitle: "생산 관리",
      productionDesc: "일일 생산량 및 자재 사용.",
      prodProductPlaceholder: "완제품 코드 (BOM과 동일)",
      prodQtyPlaceholder: "생산 수량",
      prodButton: "생산 등록",
      prodNote:
        "※ BOM에 등록된 product 값과 동일해야 원자재 자동 차감됩니다.",
      prodTableDate: "날짜",
      prodTableProduct: "제품",
      prodTableQty: "수량",
      prodTableUpdated: "수정일",
      prodTableEdit: "수정",

      bomTitle: "BOM (자재명세서)",
      bomDesc: "완제품과 필요 원자재를 연결합니다.",
      bomProductPlaceholder: "완제품 코드",
      bomMatCodePlaceholder: "자재 코드",
      bomMatNamePlaceholder: "자재 명",
      bomQtyPlaceholder: "완제품 1개당 필요 수량",
      bomSaveButton: "BOM 저장",
      bomTableProduct: "제품",
      bomTableMatCode: "자재 코드",
      bomTableMatName: "자재 명",
      bomTableQty: "수량",
      bomTableUpdated: "수정일",

      outsourcingTitle: "외주 관리",
      outsourcingDesc: "단순 작업 외주 (출고/입고/불량 기록).",
      outsourcingFormVendorPlaceholder: "외주 업체",
      outsourcingFormButton: "외주 등록",
      outsourcingTableDate: "날짜",
      outsourcingTableOutCode: "OUT 코드",
      outsourcingTableOutName: "OUT 품명",
      outsourcingTableQtyOut: "출고 수량",
      outsourcingTableInCode: "IN 코드",
      outsourcingTableInName: "IN 품명",
      outsourcingTableQtyIn: "입고 수량",
      outsourcingTableDefect: "불량",
      outsourcingTableVendor: "외주 업체",
      outsourcingTableUpdated: "등록일",

      finishedTitle: "완제품 재고",
      finishedDesc: "출고 가능한 완제품 (예시 화면).",

      employeesTitle: "직원 관리",
      employeesDesc: "직원 정보 (예시 화면).",

      attendanceTitle: "근태 관리",
      attendanceDesc: "출근/퇴근 기록 (예시 화면).",

      payrollTitle: "급여 관리",
      payrollDesc: "급여 현황 (예시 화면).",

      logsTitle: "로그",
      logsDesc: "시스템 로그 (예시).",

      settingsTitle: "설정",
      settingsDesc: "시스템 기본 설정.",
      settingsLangLabel: "언어",
      settingsTimezoneLabel: "타임존",
      settingsVersionLabel: "버전",
    },
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
      settings: "Pengaturan",
    },
    pages: {
      dashboardTitle: "Dashboard",
      dashboardDesc: "Indikator utama pabrik.",

      stockTitle: "Stok",
      stockDesc: "Stok bahan baku / semi jadi.",
      stockCodeHeader: "Kode",
      stockNameHeader: "Nama",
      stockQtyHeader: "Qty",
      stockMinHeader: "Min",
      stockUnitHeader: "Unit",
      stockUpdatedHeader: "Update",
      stockEditHeader: "Edit",

      purchaseTitle: "Pembelian",
      purchaseDesc: "Data bahan masuk.",
      purchaseFormCodePlaceholder: "Kode Bahan",
      purchaseFormNamePlaceholder: "Nama Bahan",
      purchaseFormQtyPlaceholder: "Qty",
      purchaseFormButton: "Input Pembelian",
      purchaseTableDate: "Tanggal",
      purchaseTableCode: "Kode",
      purchaseTableName: "Nama",
      purchaseTableQty: "Qty",
      purchaseTableUpdated: "Update",
      purchaseTableEdit: "Edit",

      outgoingTitle: "Pengeluaran",
      outgoingDesc: "Bahan keluar.",
      outgoingFormCodePlaceholder: "Kode Bahan",
      outgoingFormNamePlaceholder: "Nama Bahan",
      outgoingFormQtyPlaceholder: "Qty",
      outgoingFormButton: "Input Pengeluaran",

      productionTitle: "Produksi",
      productionDesc: "Hasil produksi harian.",
      prodProductPlaceholder: "Produk Jadi (sama dengan BOM)",
      prodQtyPlaceholder: "Qty",
      prodButton: "Input Produksi",
      prodNote:
        "Product harus sama dengan di BOM agar pemakaian bahan otomatis dipotong.",
      prodTableDate: "Tanggal",
      prodTableProduct: "Produk",
      prodTableQty: "Qty",
      prodTableUpdated: "Update",
      prodTableEdit: "Edit",

      bomTitle: "BOM",
      bomDesc: "Bill of Materials.",
      bomProductPlaceholder: "Produk Jadi",
      bomMatCodePlaceholder: "Kode Bahan",
      bomMatNamePlaceholder: "Nama Bahan",
      bomQtyPlaceholder: "Qty per 1 produk",
      bomSaveButton: "Simpan BOM",
      bomTableProduct: "Produk",
      bomTableMatCode: "Kode Bahan",
      bomTableMatName: "Nama Bahan",
      bomTableQty: "Qty",
      bomTableUpdated: "Update",

      outsourcingTitle: "Outsourcing",
      outsourcingDesc: "Proses ke vendor luar, dengan defect.",
      outsourcingFormVendorPlaceholder: "Vendor",
      outsourcingFormButton: "Input Outsourcing",
      outsourcingTableDate: "Tanggal",
      outsourcingTableOutCode: "Out Code",
      outsourcingTableOutName: "Out Name",
      outsourcingTableQtyOut: "Qty Out",
      outsourcingTableInCode: "In Code",
      outsourcingTableInName: "In Name",
      outsourcingTableQtyIn: "Qty In",
      outsourcingTableDefect: "Defect",
      outsourcingTableVendor: "Vendor",
      outsourcingTableUpdated: "Update",

      finishedTitle: "Barang Jadi",
      finishedDesc: "Barang jadi (contoh).",

      employeesTitle: "Karyawan",
      employeesDesc: "Data karyawan (contoh).",

      attendanceTitle: "Absensi",
      attendanceDesc: "Data absensi (contoh).",

      payrollTitle: "Gaji",
      payrollDesc: "Ringkasan gaji (contoh).",

      logsTitle: "Log",
      logsDesc: "Riwayat sistem (contoh).",

      settingsTitle: "Pengaturan",
      settingsDesc: "Pengaturan dasar ERP.",
      settingsLangLabel: "Bahasa",
      settingsTimezoneLabel: "Zona Waktu",
      settingsVersionLabel: "Versi",
    },
  },
};

/** 메뉴 순서 */
const MENU_ORDER = [
  "dashboard",
  "stock",
  "purchase",
  "outgoing",
  "production",
  "bom",
  "outsourcing",
  "finished",
  "employees",
  "attendance",
  "payroll",
  "logs",
  "settings",
];

/*************************************************
 * PAGE TEMPLATES
 *************************************************/

const PageTemplates = {
  dashboard(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.dashboardTitle}</h2>
      <p>${t.dashboardDesc}</p>
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
            <th>${t.stockCodeHeader}</th>
            <th>${t.stockNameHeader}</th>
            <th>${t.stockQtyHeader}</th>
            <th>${t.stockMinHeader}</th>
            <th>${t.stockUnitHeader}</th>
            <th>${t.stockUpdatedHeader}</th>
            <th>${t.stockEditHeader}</th>
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
        <button onclick="onPurchase()" class="btn-primary">
          ${t.purchaseFormButton}
        </button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>${t.purchaseTableDate}</th>
            <th>${t.purchaseTableCode}</th>
            <th>${t.purchaseTableName}</th>
            <th>${t.purchaseTableQty}</th>
            <th>${t.purchaseTableUpdated}</th>
            <th>${t.purchaseTableEdit}</th>
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
        <input id="oCode" placeholder="${t.outgoingFormCodePlaceholder}">
        <input id="oName" placeholder="${t.outgoingFormNamePlaceholder}">
        <input id="oQty" type="number" placeholder="${t.outgoingFormQtyPlaceholder}">
        <button onclick="onOutgoing()" class="btn-secondary">
          ${t.outgoingFormButton}
        </button>
      </div>
    `;
  },

  production(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.productionTitle}</h2>
      <p>${t.productionDesc}</p>

      <div class="form-row">
        <input type="text" id="prodProduct" placeholder="${t.prodProductPlaceholder}">
        <input type="number" id="prodQty" placeholder="${t.prodQtyPlaceholder}">
        <button class="btn-primary" onclick="onProduction()">
          ${t.prodButton}
        </button>
      </div>

      <p style="font-size: 12px; opacity: 0.7; margin-top: 8px;">
        ${t.prodNote}
      </p>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>${t.prodTableDate}</th>
            <th>${t.prodTableProduct}</th>
            <th>${t.prodTableQty}</th>
            <th>${t.prodTableUpdated}</th>
            <th>${t.prodTableEdit}</th>
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
        <input id="bomProduct" placeholder="${t.bomProductPlaceholder}">
        <input id="bomMatCode" placeholder="${t.bomMatCodePlaceholder}">
        <input id="bomMatName" placeholder="${t.bomMatNamePlaceholder}">
        <input id="bomQty" type="number" placeholder="${t.bomQtyPlaceholder}">
        <button onclick="saveBOM()" class="btn-primary">
          ${t.bomSaveButton}
        </button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>${t.bomTableProduct}</th>
            <th>${t.bomTableMatCode}</th>
            <th>${t.bomTableMatName}</th>
            <th>${t.bomTableQty}</th>
            <th>${t.bomTableUpdated}</th>
          </tr>
        </thead>
        <tbody id="bomTableBody"></tbody>
      </table>
    `;
  },

  outsourcing(lang) {
    const t = i18n[lang].pages;
    const vendors = getVendors();

    return `
      <h2>${t.outsourcingTitle}</h2>
      <p>${t.outsourcingDesc}</p>

      <div class="form-row">

        <h3>OUT</h3>
        <input id="outCode" placeholder="${t.outsourcingTableOutCode}">
        <input id="outName" placeholder="${t.outsourcingTableOutName}">
        <input id="outQty" type="number" placeholder="${t.outsourcingTableQtyOut}">

        <h3 style="margin-top:20px;">IN</h3>
        <input id="inCode" placeholder="${t.outsourcingTableInCode}">
        <input id="inName" placeholder="${t.outsourcingTableInName}">
        <input id="inQty" type="number" placeholder="${t.outsourcingTableQtyIn}">

        <h3 style="margin-top:20px;">Vendor</h3>
        <select id="outVendor">
          ${vendors.map(v => `<option value="${v}">${v}</option>`).join("")}
        </select>

        <button onclick="onOutsourcing()" class="btn-primary" style="margin-top:20px;">
          ${t.outsourcingFormButton}
        </button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>${t.outsourcingTableDate}</th>
            <th>${t.outsourcingTableOutCode}</th>
            <th>${t.outsourcingTableOutName}</th>
            <th>${t.outsourcingTableQtyOut}</th>
            <th>${t.outsourcingTableInCode}</th>
            <th>${t.outsourcingTableInName}</th>
            <th>${t.outsourcingTableQtyIn}</th>
            <th>${t.outsourcingTableDefect}</th>
            <th>${t.outsourcingTableVendor}</th>
            <th>${t.outsourcingTableUpdated}</th>
          </tr>
        </thead>
        <tbody id="outsourcingTableBody"></tbody>
      </table>
    `;
  },

  finished(lang) {
    const t = i18n[lang].pages;
    return `<h2>${t.finishedTitle}</h2><p>${t.finishedDesc}</p>`;
  },
  employees(lang) {
    const t = i18n[lang].pages;
    return `<h2>${t.employeesTitle}</h2><p>${t.employeesDesc}</p>`;
  },
  attendance(lang) {
    const t = i18n[lang].pages;
    return `<h2>${t.attendanceTitle}</h2><p>${t.attendanceDesc}</p>`;
  },
  payroll(lang) {
    const t = i18n[lang].pages;
    return `<h2>${t.payrollTitle}</h2><p>${t.payrollDesc}</p>`;
  },
  logs(lang) {
    const t = i18n[lang].pages;
    return `<h2>${t.logsTitle}</h2><p>${t.logsDesc}</p>`;
  },
  settings(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.settingsTitle}</h2>
      <p>${t.settingsDesc}</p>

      <div class="settings-grid">
        <div class="settings-item">
          <label>${t.settingsLangLabel}</label>
          <div>
            <button onclick="setLanguage('EN')" class="btn-mini">EN</button>
            <button onclick="setLanguage('KR')" class="btn-mini">KR</button>
            <button onclick="setLanguage('ID')" class="btn-mini">ID</button>
          </div>
        </div>
        <div class="settings-item">
          <label>${t.settingsTimezoneLabel}</label>
          <input type="text" value="Asia/Jakarta" disabled />
        </div>
        <div class="settings-item">
          <label>${t.settingsVersionLabel}</label>
          <input type="text" value="0.4 (Full Prototype)" disabled />
        </div>
      </div>
    `;
  },
};

/*************************************************
 * RENDERING
 *************************************************/

function renderContent() {
  const lang = state.lang;
  const page = state.page || "dashboard";
  const contentEl = document.getElementById("content");

  const tmpl = PageTemplates[page] || PageTemplates.dashboard;
  contentEl.innerHTML = tmpl(lang);

  if (page === "stock") {
    renderStockPage();
  } else if (page === "bom") {
    loadBOM();
  } else if (page === "outsourcing") {
    renderOutsourcingPage();
  } else if (page === "purchase") {
    renderPurchasePage();
  } else if (page === "production") {
    renderProductionPage();
  }
}

function renderSidebar() {
  const lang = state.lang;
  const t = i18n[lang].sidebar;

  document.querySelectorAll(".sidebar li").forEach((li, idx) => {
    const pageId = MENU_ORDER[idx];
    li.dataset.page = pageId;
    li.textContent = t[pageId];
    li.classList.toggle("active", pageId === state.page);
  });
}

function renderHeader() {
  const logoEl = document.querySelector(".logo");
  if (logoEl) logoEl.textContent = i18n[state.lang].appTitle;
}

function rerenderAll() {
  renderHeader();
  renderSidebar();
  renderContent();
}

/*************************************************
 * PAGE / LANGUAGE
 *************************************************/

function setLanguage(lang) {
  if (!LANGS.includes(lang)) return;
  state.lang = lang;
  localStorage.setItem("htori_lang", lang);
  rerenderAll();
}

function loadPage(pageId) {
  if (!PageTemplates[pageId]) pageId = "dashboard";
  state.page = pageId;
  localStorage.setItem("htori_page", pageId);
  rerenderAll();
}

/*************************************************
 * INITIAL
 *************************************************/
document.addEventListener("DOMContentLoaded", rerenderAll);
window.setLanguage = setLanguage;
window.loadPage = loadPage;

/*************************************************
 * STOCK MODULE
 *************************************************/

function getStock() {
  return JSON.parse(localStorage.getItem("stock") || "[]");
}
function saveStock(stock) {
  localStorage.setItem("stock", JSON.stringify(stock));
}

/* 재고 증가 (입고 / 기타) – 화면 전환 없음 */
function increaseStock(code, name, qty) {
  let stock = getStock();
  qty = Number(qty);
  if (!qty || qty <= 0) return;

  let item = stock.find((i) => i.code === code);
  const now = new Date().toLocaleString();

  if (item) {
    item.qty += qty;
    item.lastUpdate = now;
  } else {
    stock.push({
      code,
      name,
      qty,
      minQty: 0,
      unit: "SET",
      lastUpdate: now,
    });
  }
  saveStock(stock);
}

/* 재고 감소 (출고 / 생산 / 외주) – 화면 전환 없음 */
function decreaseStock(code, qty) {
  let stock = getStock();
  qty = Number(qty);
  if (!qty || qty <= 0) return false;

  let item = stock.find((i) => i.code === code);
  if (!item) return false;
  if (item.qty < qty) return false;

  item.qty -= qty;
  item.lastUpdate = new Date().toLocaleString();
  saveStock(stock);
  return true;
}

/* 입고 버튼 */
function onPurchase() {
  const code = document.getElementById("pCode").value.trim();
  const name = document.getElementById("pName").value.trim();
  const qty = document.getElementById("pQty").value.trim();

  if (!code || !name || !qty) {
    alert("모든 값을 입력하세요.");
    return;
  }

  // 1) 재고 반영
  increaseStock(code, name, qty);

  // 2) Purchase 기록 저장
  let list = getPurchase();
  list.push({
    date: new Date().toLocaleDateString(),
    code,
    name,
    qty: Number(qty),
    updated: new Date().toLocaleString(),
  });
  savePurchase(list);

  alert("입고 완료!");
  loadPage("purchase");
}

/* 출고 버튼 */
function onOutgoing() {
  const code = document.getElementById("oCode").value.trim();
  const name = document.getElementById("oName").value.trim();
  const qty = document.getElementById("oQty").value.trim();
  const nQty = Number(qty);

  if (!code || !name || !qty) {
    alert("모든 값을 입력하세요.");
    return;
  }
  if (nQty <= 0 || isNaN(nQty)) {
    alert("수량을 확인하세요.");
    return;
  }

  const ok = decreaseStock(code, nQty);
  if (!ok) {
    alert("재고 부족 또는 코드 없음.");
    return;
  }

  alert("출고 완료!");
  loadPage("outgoing");
}

/* STOCK 페이지 렌더 */
function renderStockPage() {
  const tbody = document.getElementById("stockTableBody");
  if (!tbody) return;

  const stock = getStock();
  tbody.innerHTML = "";
  stock.forEach((i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i.code}</td>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>${i.minQty}</td>
        <td>${i.unit}</td>
        <td>${i.lastUpdate || ""}</td>
        <td><button class="btn-mini" onclick="editStockQty('${i.code}')">수정</button></td>
      </tr>
    `;
  });
}

/* STOCK 수량 수정 */
function editStockQty(code) {
  let stock = getStock();
  let item = stock.find((i) => i.code === code);
  if (!item) return alert("재고를 찾을 수 없습니다.");

  const newQty = prompt("새 수량:", item.qty);
  if (newQty === null) return;
  const n = Number(newQty);
  if (isNaN(n) || n < 0) {
    alert("수량이 올바르지 않습니다.");
    return;
  }

  item.qty = n;
  item.lastUpdate = new Date().toLocaleString();
  saveStock(stock);
  alert("재고 수정 완료!");
  loadPage("stock");
}

/*************************************************
 * PURCHASE MODULE (기록 + 수정)
 *************************************************/

function getPurchase() {
  return JSON.parse(localStorage.getItem("purchase") || "[]");
}
function savePurchase(list) {
  localStorage.setItem("purchase", JSON.stringify(list));
}

function renderPurchasePage() {
  const tbody = document.getElementById("purchaseTableBody");
  if (!tbody) return;

  const list = getPurchase();
  tbody.innerHTML = "";
  list.forEach((p, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.date}</td>
        <td>${p.code}</td>
        <td>${p.name}</td>
        <td>${p.qty}</td>
        <td>${p.updated}</td>
        <td><button class="btn-mini" onclick="editPurchase(${idx})">수정</button></td>
      </tr>
    `;
  });
}

/* PURCHASE 수정 (차액만큼 재고 반영) */
function editPurchase(index) {
  let list = getPurchase();
  let p = list[index];
  if (!p) return;

  const newQtyStr = prompt("새 입고 수량:", p.qty);
  if (newQtyStr === null) return;
  const n = Number(newQtyStr);
  if (isNaN(n) || n <= 0) {
    alert("수량이 올바르지 않습니다.");
    return;
  }

  const diff = n - p.qty; // +면 재고 증가, -면 감소
  let stock = getStock();
  let item = stock.find((i) => i.code === p.code);
  if (!item && diff < 0) {
    alert("재고 데이터가 없어 감소 처리 불가.");
    return;
  }
  if (!item && diff > 0) {
    increaseStock(p.code, p.name, diff);
  } else if (item) {
    if (item.qty + diff < 0) {
      alert("수정 시 재고가 음수가 됩니다.");
      return;
    }
    item.qty += diff;
    item.lastUpdate = new Date().toLocaleString();
    saveStock(stock);
  }

  p.qty = n;
  p.updated = new Date().toLocaleString();
  savePurchase(list);

  alert("Purchase 수정 완료!");
  loadPage("purchase");
}

/*************************************************
 * BOM MODULE
 *************************************************/

function getBOM() {
  return JSON.parse(localStorage.getItem("bom") || "[]");
}
function saveBOMData(bom) {
  localStorage.setItem("bom", JSON.stringify(bom));
}

function saveBOM() {
  const product = document.getElementById("bomProduct").value.trim();
  const matCode = document.getElementById("bomMatCode").value.trim();
  const matName = document.getElementById("bomMatName").value.trim();
  const qtyVal = document.getElementById("bomQty").value.trim();
  const qty = Number(qtyVal);

  if (!product || !matCode || !matName || !qtyVal || !qty || qty <= 0) {
    alert("BOM 정보를 정확히 입력하세요.");
    return;
  }

  const bom = getBOM();
  bom.push({
    product,
    matCode,
    matName,
    qty,
    updated: new Date().toLocaleString(),
  });

  saveBOMData(bom);
  alert("BOM 저장 완료!");
  loadPage("bom");
}

function loadBOM() {
  const tbody = document.getElementById("bomTableBody");
  if (!tbody) return;

  const bom = getBOM();
  tbody.innerHTML = "";
  bom.forEach((i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i.product}</td>
        <td>${i.matCode}</td>
        <td>${i.matName}</td>
        <td>${i.qty}</td>
        <td>${i.updated}</td>
      </tr>
    `;
  });
}

/*************************************************
 * PRODUCTION MODULE (BOM 기반 + 기록/수정)
 *************************************************/

function getBomForProduct(productKey) {
  const bom = getBOM();
  return bom.filter((i) => i.product === productKey);
}

function getProduction() {
  return JSON.parse(localStorage.getItem("production") || "[]");
}
function saveProduction(list) {
  localStorage.setItem("production", JSON.stringify(list));
}

/* 생산 시 원자재 차감 (새 생산) */
function runProduction(productKey, qtyVal) {
  const qty = Number(qtyVal);
  if (!productKey || !qtyVal || !qty || qty <= 0) {
    alert("제품과 수량을 확인하세요.");
    return false;
  }

  const bomList = getBomForProduct(productKey);
  if (bomList.length === 0) {
    alert("BOM에 제품 정보가 없습니다.");
    return false;
  }

  let stock = getStock();
  let errors = [];

  bomList.forEach((b) => {
    const need = b.qty * qty;
    const mat = stock.find((s) => s.code === b.matCode);
    if (!mat) {
      errors.push(`${b.matCode} (${b.matName}) 재고 없음`);
    } else if (mat.qty < need) {
      errors.push(
        `${b.matCode} (${b.matName}) 재고 부족: 필요 ${need}, 현재 ${mat.qty}`
      );
    }
  });

  if (errors.length > 0) {
    alert("생산 불가 (재고 부족):\n" + errors.join("\n"));
    return false;
  }

  bomList.forEach((b) => {
    const need = b.qty * qty;
    const mat = stock.find((s) => s.code === b.matCode);
    mat.qty -= need;
    mat.lastUpdate = new Date().toLocaleString();
  });

  saveStock(stock);
  return true;
}

/* 생산 등록 버튼 */
function onProduction() {
  const product = document.getElementById("prodProduct").value.trim();
  const qtyVal = document.getElementById("prodQty").value.trim();
  const qty = Number(qtyVal);

  if (!product || !qtyVal) {
    alert("모두 입력하세요.");
    return;
  }

  const ok = runProduction(product, qtyVal);
  if (!ok) return;

  // 생산 기록 저장
  let list = getProduction();
  list.push({
    date: new Date().toLocaleDateString(),
    product,
    qty,
    updated: new Date().toLocaleString(),
  });
  saveProduction(list);

  alert("생산 등록 완료!");
  loadPage("production");
}

/* Production 렌더 */
function renderProductionPage() {
  const tbody = document.getElementById("prodTableBody");
  if (!tbody) return;

  const list = getProduction();
  tbody.innerHTML = "";
  list.forEach((p, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.date}</td>
        <td>${p.product}</td>
        <td>${p.qty}</td>
        <td>${p.updated}</td>
        <td><button class="btn-mini" onclick="editProduction(${idx})">수정</button></td>
      </tr>
    `;
  });
}

/* 생산 기록 수정 (차액만큼 BOM 기반 재조정) */
function editProduction(index) {
  let list = getProduction();
  let p = list[index];
  if (!p) return;

  const newQtyStr = prompt("새 생산 수량:", p.qty);
  if (newQtyStr === null) return;
  const n = Number(newQtyStr);
  if (isNaN(n) || n <= 0) {
    alert("수량이 올바르지 않습니다.");
    return;
  }

  const diff = n - p.qty; // +면 추가 생산, -면 감소(되돌리기)
  const bomList = getBomForProduct(p.product);
  if (bomList.length === 0) {
    alert("BOM이 없어 수정 불가.");
    return;
  }

  let stock = getStock();
  if (diff > 0) {
    // 추가 생산 → 원자재 추가 차감 필요
    let errors = [];
    bomList.forEach((b) => {
      const need = b.qty * diff;
      const mat = stock.find((s) => s.code === b.matCode);
      if (!mat || mat.qty < need) {
        errors.push(
          `${b.matCode} (${b.matName}) 부족: 필요 ${need}, 현재 ${mat ? mat.qty : 0}`
        );
      }
    });
    if (errors.length > 0) {
      alert("생산 수정 불가 (재고 부족):\n" + errors.join("\n"));
      return;
    }
    bomList.forEach((b) => {
      const need = b.qty * diff;
      const mat = stock.find((s) => s.code === b.matCode);
      mat.qty -= need;
      mat.lastUpdate = new Date().toLocaleString();
    });
  } else if (diff < 0) {
    // 생산량 감소 → 사용했던 원자재 일부 복원
    bomList.forEach((b) => {
      const back = b.qty * (-diff);
      let mat = stock.find((s) => s.code === b.matCode);
      if (!mat) {
        mat = {
          code: b.matCode,
          name: b.matName,
          qty: 0,
          minQty: 0,
          unit: "SET",
        };
        stock.push(mat);
      }
      mat.qty += back;
      mat.lastUpdate = new Date().toLocaleString();
    });
  }

  saveStock(stock);

  p.qty = n;
  p.updated = new Date().toLocaleString();
  saveProduction(list);

  alert("생산 수정 완료!");
  loadPage("production");
}

/*************************************************
 * VENDOR MODULE
 *************************************************/

function getVendors() {
  return JSON.parse(localStorage.getItem("vendors") || "[]");
}
function saveVendors(list) {
  localStorage.setItem("vendors", JSON.stringify(list));
}
function initVendors() {
  let v = getVendors();
  if (v.length === 0) {
    v = ["Vendor A", "Vendor B", "Vendor C"];
    saveVendors(v);
  }
}
initVendors();

/*************************************************
 * OUTSOURCING MODULE (Out Code → In Code)
 *************************************************/

function getOutsourcing() {
  return JSON.parse(localStorage.getItem("outsourcing") || "[]");
}
function saveOutsourcingData(list) {
  localStorage.setItem("outsourcing", JSON.stringify(list));
}

function onOutsourcing() {
  const outCode = document.getElementById("outCode").value.trim();
  const outName = document.getElementById("outName").value.trim();
  const outQty = Number(document.getElementById("outQty").value.trim());

  const inCode = document.getElementById("inCode").value.trim();
  const inName = document.getElementById("inName").value.trim();
  const inQty = Number(document.getElementById("inQty").value.trim());

  const vendor = document.getElementById("outVendor").value.trim();

  if (
    !outCode ||
    !outName ||
    !outQty ||
    !inCode ||
    !inName ||
    !inQty ||
    !vendor
  ) {
    alert("모든 값을 입력하세요.");
    return;
  }
  if (inQty > outQty) {
    alert("입고 수량이 출고 수량보다 많을 수 없습니다.");
    return;
  }

  // OUT
  let stock = getStock();
  let outItem = stock.find((i) => i.code === outCode);
  if (!outItem) {
    alert("OUT 코드가 재고에 없습니다.");
    return;
  }
  if (outItem.qty < outQty) {
    alert("출고 수량이 재고보다 많습니다.");
    return;
  }
  outItem.qty -= outQty;
  outItem.lastUpdate = new Date().toLocaleString();

  // IN (코드 변경 입고)
  let inItem = stock.find((i) => i.code === inCode);
  if (!inItem) {
    stock.push({
      code: inCode,
      name: inName,
      qty: inQty,
      minQty: 0,
      unit: "SET",
      lastUpdate: new Date().toLocaleString(),
    });
  } else {
    inItem.qty += inQty;
    inItem.lastUpdate = new Date().toLocaleString();
  }

  saveStock(stock);

  const defect = outQty - inQty;
  const now = new Date().toLocaleString();

  const list = getOutsourcing();
  list.push({
    date: now.split(" ")[0],
    outCode,
    outName,
    outQty,
    inCode,
    inName,
    inQty,
    defect,
    vendor,
    updated: now,
  });
  saveOutsourcingData(list);

  alert("외주 등록 완료! (코드 변경 입고 + 불량 계산)");
  loadPage("outsourcing");
}

function renderOutsourcingPage() {
  const tbody = document.getElementById("outsourcingTableBody");
  if (!tbody) return;

  const list = getOutsourcing();
  tbody.innerHTML = "";
  list.forEach((r) => {
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
