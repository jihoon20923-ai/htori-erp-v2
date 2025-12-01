/*************************************************
 * HTORI ERP – Frontend Single Page App
 * - 메뉴 클릭 시 content 영역에 페이지 렌더링
 * - EN / KR / ID 다국어 지원
 *************************************************/

/** 사용 가능한 언어 */
const LANGS = ["EN", "KR", "ID"];

/** 현재 상태 */
const state = {
  lang: localStorage.getItem("htori_lang") || "EN",
  page: localStorage.getItem("htori_page") || "dashboard",
};

/** 번역 사전 */
const i18n = {
  EN: {
    appTitle: "HTORI ERP",
    welcomeTitle: "Welcome to HTORI ERP",
    welcomeDesc: "Select a menu from the left.",
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
      dashboardDesc: "Key indicators of factory operation (example).",

      stockTitle: "Stock",
      stockDesc: "Raw / semi-finished material stock overview.",
      purchaseTitle: "Purchase",
      purchaseDesc: "Incoming materials from suppliers.",
      outgoingTitle: "Outgoing",
      outgoingDesc: "Manual material outgoing / adjustment.",
      productionTitle: "Production",
      productionDesc: "Daily production result and material usage.",
      outsourcingTitle: "Outsourcing",
      outsourcingDesc: "Semi-process sent to external vendors.",
      finishedTitle: "Finished Goods",
      finishedDesc: "Finished products ready for shipment.",
      employeesTitle: "Employees",
      employeesDesc: "Employee master data.",
      attendanceTitle: "Attendance",
      attendanceDesc: "Clock-in / clock-out records.",
      payrollTitle: "Payroll",
      payrollDesc: "Monthly salary calculation overview.",
      logsTitle: "Logs",
      logsDesc: "System activity log (examples).",
      settingsTitle: "Settings",
      settingsDesc: "ERP basic settings.",
    },
  },

  KR: {
    appTitle: "HTORI ERP",
    welcomeTitle: "HTORI ERP 에 오신 것을 환영합니다",
    welcomeDesc: "왼쪽 메뉴를 선택하세요.",
    sidebar: {
      dashboard: "대시보드",
      stock: "재고",
      purchase: "입고(Purchase)",
      outgoing: "출고(Outgoing)",
      production: "생산(Production)",
      bom: "BOM (자재명세)",
      outsourcing: "외주(Outsourcing)",
      finished: "완제품",
      employees: "직원",
      attendance: "근태",
      payroll: "급여",
      logs: "로그",
      settings: "설정",
    },
    pages: {
      dashboardTitle: "대시보드",
      dashboardDesc: "공장 운영 핵심 지표 (예시 화면).",

      stockTitle: "재고 관리",
      stockDesc: "원자재 / 반제품 재고 현황.",
      purchaseTitle: "입고 관리",
      purchaseDesc: "공급처에서 들어온 자재 입고 내역.",
      outgoingTitle: "출고 관리",
      outgoingDesc: "자재 출고 / 조정 내역.",
      productionTitle: "생산 관리",
      productionDesc: "일일 생산량 및 자재 사용 내역.",
      outsourcingTitle: "외주 관리",
      outsourcingDesc: "외주업체로 나갔다 들어온 반제품 관리.",
      finishedTitle: "완제품 재고",
      finishedDesc: "출고 가능한 완제품 재고.",
      employeesTitle: "직원 관리",
      employeesDesc: "직원 기본 정보.",
      attendanceTitle: "근태 관리",
      attendanceDesc: "출근 / 퇴근 기록.",
      payrollTitle: "급여 관리",
      payrollDesc: "월별 급여 계산 현황.",
      logsTitle: "로그",
      logsDesc: "시스템 작업 기록 (예시).",
      settingsTitle: "설정",
      settingsDesc: "ERP 기본 환경 설정.",
    },
  },

  ID: {
    appTitle: "HTORI ERP",
    welcomeTitle: "Selamat datang di HTORI ERP",
    welcomeDesc: "Silakan pilih menu di sebelah kiri.",
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
      dashboardDesc: "Indikator utama operasi pabrik (contoh).",

      stockTitle: "Stok",
      stockDesc: "Ringkasan stok bahan baku / semi jadi.",
      purchaseTitle: "Pembelian",
      purchaseDesc: "Data bahan masuk dari supplier.",
      outgoingTitle: "Pengeluaran",
      outgoingDesc: "Bahan keluar / penyesuaian manual.",
      productionTitle: "Produksi",
      productionDesc: "Hasil produksi harian dan pemakaian bahan.",
      outsourcingTitle: "Outsourcing",
      outsourcingDesc: "Proses yang dikirim ke vendor luar.",
      finishedTitle: "Barang Jadi",
      finishedDesc: "Barang jadi siap dikirim.",
      employeesTitle: "Karyawan",
      employeesDesc: "Data master karyawan.",
      attendanceTitle: "Absensi",
      attendanceDesc: "Data clock-in / clock-out.",
      payrollTitle: "Gaji",
      payrollDesc: "Ringkasan perhitungan gaji bulanan.",
      logsTitle: "Log",
      logsDesc: "Riwayat aktivitas sistem (contoh).",
      settingsTitle: "Pengaturan",
      settingsDesc: "Pengaturan dasar ERP.",
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

  /* STOCK PAGE – 동적 재고 테이블 */
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
            <th>Min</th>
            <th>Unit</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody id="stockTableBody"></tbody>
      </table>

      <script>renderStockPage()</script>
    `;
  },

  /* PURCHASE PAGE – 입고 입력 */
  purchase(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.purchaseTitle}</h2>
      <p>${t.purchaseDesc}</p>

      <div class="purchase-form">
        <input id="pCode" placeholder="Code">
        <input id="pName" placeholder="Name">
        <input id="pQty" type="number" placeholder="Qty">
        <button onclick="onPurchase()" class="btn-primary">입고 등록</button>
      </div>
    `;
  },
production(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.productionTitle}</h2>
      <p>${t.productionDesc}</p>

      <div class="production-form">
        <input type="text" id="prodProduct" placeholder="Finished Product (BOM Product)">
        <input type="number" id="prodQty" placeholder="Production Qty">
        <button class="btn-primary" onclick="onProduction()">생산 등록</button>
      </div>

      <p style="font-size: 12px; opacity: 0.7; margin-top: 8px;">
        ※ BOM에 등록된 <b>product</b> 값과 동일한 값을 입력해야 원자재 자동 차감이 됩니다.
      </p>
    `;
},

  /* OUTGOING PAGE – 출고 입력 */
  outgoing(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.outgoingTitle}</h2>
      <p>${t.outgoingDesc}</p>

      <div class="purchase-form">
        <input id="oCode" placeholder="Code">
        <input id="oName" placeholder="Name">
        <input id="oQty" type="number" placeholder="Qty">
        <button onclick="onOutgoing()" class="btn-secondary">출고 등록</button>
      </div>
    `;
  },

  /*************************************************
 * BOM MODULE
 *************************************************/

function getBOM() {
  return JSON.parse(localStorage.getItem("bom") || "[]");
}
function saveBOMData(b) {
  localStorage.setItem("bom", JSON.stringify(b));
}

function saveBOM() {
  const product = document.getElementById("bomProduct").value;
  const code = document.getElementById("bomMatCode").value;
  const name = document.getElementById("bomMatName").value;
  const qty = Number(document.getElementById("bomQty").value);

  if (!product || !code || !name || !qty) return alert("모두 입력!");

  const b = getBOM();
  b.push({
    product,
    matCode: code,
    matName: name,
    qty,
    updated: new Date().toLocaleString()
  });

  saveBOMData(b);
  alert("BOM 저장됨");
  loadPage("bom");
}

function loadBOM() {
  const tbody = document.getElementById("bomTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";
  getBOM().forEach(i => {
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
 * RENDERING
 *************************************************/

function renderContent() {
  const lang = state.lang;
  const page = state.page;
  const contentEl = document.getElementById("content");

  const tmpl = PageTemplates[page];
  contentEl.innerHTML = tmpl(lang);
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
  document.querySelector(".logo").textContent = i18n[state.lang].appTitle;
}

function rerenderAll() {
  renderHeader();
  renderSidebar();
  renderContent();
}

/*************************************************
 * PAGE CHANGE / LANGUAGE CHANGE
 *************************************************/

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("htori_lang", lang);
  rerenderAll();
}

function loadPage(pageId) {
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
 * STOCK MODULE (입고/출고)
 *************************************************/

function getStock() {
  return JSON.parse(localStorage.getItem("stock") || "[]");
}
function saveStock(s) {
  localStorage.setItem("stock", JSON.stringify(s));
}

/* 입고 */
function updateStock(code, name, qty) {
  let s = getStock();
  qty = Number(qty);

  let item = s.find(i => i.code === code);

  if (item) {
    item.qty += qty;
  } else {
    s.push({
      code,
      name,
      qty,
      minQty: 0,
      unit: "SET",
      lastUpdate: new Date().toLocaleString(),
    });
  }

  item.lastUpdate = new Date().toLocaleString();

  saveStock(s);
  alert("입고 완료!");
  loadPage("stock");
}

/* 출고 */
function outgoingStock(code, name, qty) {
  let s = getStock();
  qty = Number(qty);

  let item = s.find(i => i.code === code);
  if (!item) return alert("해당 코드 없음.");

  if (item.qty < qty) return alert("재고 부족!");

  item.qty -= qty;
  item.lastUpdate = new Date().toLocaleString();

  saveStock(s);
  alert("출고 완료!");
  loadPage("stock");
}

/* PURCHASE → 버튼 */
function onPurchase() {
  const code = document.getElementById("pCode").value;
  const name = document.getElementById("pName").value;
  const qty = document.getElementById("pQty").value;

  if (!code || !name || !qty) return alert("모두 입력.");

  updateStock(code, name, qty);
}

/* OUTGOING → 버튼 */
function onOutgoing() {
  const code = document.getElementById("oCode").value;
  const name = document.getElementById("oName").value;
  const qty = document.getElementById("oQty").value;

  if (!code || !name || !qty) return alert("모두 입력.");

  outgoingStock(code, name, qty);
}

/* STOCK PAGE RENDER */
function renderStockPage() {
  const tbody = document.getElementById("stockTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";
  getStock().forEach((i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i.code}</td>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>${i.minQty}</td>
        <td>${i.unit}</td>
        <td>${i.lastUpdate}</td>
      </tr>
    `;
  });
}
/*************************************************
 * PRODUCTION MODULE (BOM 기반 자동 차감)
 *************************************************/

function getBomForProduct(productKey) {
  const bom = getBOM();
  return bom.filter(i => i.product === productKey);
}

function runProduction(productKey, qty) {
  qty = Number(qty);
  if (!productKey || !qty) return alert("모두 입력!");

  const bomList = getBomForProduct(productKey);

  if (bomList.length === 0) {
    return alert("BOM에 해당 제품이 없습니다.");
  }

  let stock = getStock();
  let errors = [];

  // 1) 재고 부족 여부 검사
  bomList.forEach(b => {
    const need = b.qty * qty;
    const mat = stock.find(s => s.code === b.matCode);

    if (!mat) {
      errors.push(`${b.matCode} 없음`);
    } else if (mat.qty < need) {
      errors.push(`${b.matCode} 재고 부족: 필요 ${need}, 현재 ${mat.qty}`);
    }
  });

  if (errors.length > 0) {
    return alert("생산 불가:\n" + errors.join("\n"));
  }

  // 2) 재고 차감 실행
  bomList.forEach(b => {
    const need = b.qty * qty;
    const mat = stock.find(s => s.code === b.matCode);
    mat.qty -= need;
    mat.lastUpdate = new Date().toLocaleString();
  });

  saveStock(stock);
  alert("생산 완료! (BOM 기반 재고 차감 완료)");
  loadPage("stock");
}

function onProduction() {
  const product = document.getElementById("prodProduct").value;
  const qty = document.getElementById("prodQty").value;

  runProduction(product, qty);
}
