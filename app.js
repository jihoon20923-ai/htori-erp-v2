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
      /* Dashboard */
      dashboardTitle: "Dashboard",
      dashboardDesc: "Key indicators of factory operation (example).",

      /* Stock */
      stockTitle: "Stock",
      stockDesc: "Raw / semi-finished material stock overview.",
      stockCodeHeader: "Code",
      stockNameHeader: "Name",
      stockQtyHeader: "Qty",
      stockMinHeader: "Min",
      stockUnitHeader: "Unit",
      stockUpdatedHeader: "Last Updated",

      /* Purchase */
      purchaseTitle: "Purchase",
      purchaseDesc: "Incoming materials from suppliers.",
      purchaseFormCodePlaceholder: "Material Code",
      purchaseFormNamePlaceholder: "Material Name",
      purchaseFormQtyPlaceholder: "Qty",
      purchaseFormButton: "Register Incoming",

      /* Outgoing */
      outgoingTitle: "Outgoing",
      outgoingDesc: "Manual material outgoing / adjustment.",
      outgoingFormCodePlaceholder: "Material Code",
      outgoingFormNamePlaceholder: "Material Name",
      outgoingFormQtyPlaceholder: "Qty",
      outgoingFormButton: "Register Outgoing",

      /* Production */
      productionTitle: "Production",
      productionDesc: "Daily production result and material usage.",
      prodProductPlaceholder: "Finished Product (same as BOM product)",
      prodQtyPlaceholder: "Production Qty",
      prodButton: "Register Production",
      prodNote:
        "Please input the same Product value as in BOM to deduct materials automatically.",

      /* BOM */
      bomTitle: "BOM (Bill of Materials)",
      bomDesc: "Link finished products with required raw materials.",
      bomProductPlaceholder: "Finished Product (e.g. VC100-SET)",
      bomMatCodePlaceholder: "Material Code",
      bomMatNamePlaceholder: "Material Name",
      bomQtyPlaceholder: "Qty per 1 product",
      bomSaveButton: "Save BOM",
      bomTableProduct: "Product",
      bomTableMatCode: "Material Code",
      bomTableMatName: "Material Name",
      bomTableQty: "Qty",
      bomTableUpdated: "Updated",

      /* Outsourcing */
      outsourcingTitle: "Outsourcing",
      outsourcingDesc:
        "Semi-process sent to external vendors. (Screen prototype only)",

      /* Finished Goods */
      finishedTitle: "Finished Goods",
      finishedDesc: "Finished products ready for shipment. (Screen prototype)",

      /* Employees */
      employeesTitle: "Employees",
      employeesDesc: "Employee master data. (Screen prototype)",

      /* Attendance */
      attendanceTitle: "Attendance",
      attendanceDesc: "Clock-in / clock-out records. (Screen prototype)",

      /* Payroll */
      payrollTitle: "Payroll",
      payrollDesc: "Monthly salary calculation overview. (Screen prototype)",

      /* Logs */
      logsTitle: "Logs",
      logsDesc: "System activity log (examples).",

      /* Settings */
      settingsTitle: "Settings",
      settingsDesc: "ERP basic settings.",
      settingsLangLabel: "Default Language",
      settingsTimezoneLabel: "Timezone",
      settingsVersionLabel: "Version",
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
      /* Dashboard */
      dashboardTitle: "대시보드",
      dashboardDesc: "공장 운영 핵심 지표 (예시 화면).",

      /* Stock */
      stockTitle: "재고 관리",
      stockDesc: "원자재 / 반제품 재고 현황.",
      stockCodeHeader: "코드",
      stockNameHeader: "품명",
      stockQtyHeader: "수량",
      stockMinHeader: "안전재고",
      stockUnitHeader: "단위",
      stockUpdatedHeader: "최종 수정",

      /* Purchase */
      purchaseTitle: "입고 관리",
      purchaseDesc: "공급처에서 들어온 자재 입고 내역.",
      purchaseFormCodePlaceholder: "자재 코드",
      purchaseFormNamePlaceholder: "자재 명",
      purchaseFormQtyPlaceholder: "입고 수량",
      purchaseFormButton: "입고 등록",

      /* Outgoing */
      outgoingTitle: "출고 관리",
      outgoingDesc: "자재 출고 / 조정 내역.",
      outgoingFormCodePlaceholder: "자재 코드",
      outgoingFormNamePlaceholder: "자재 명",
      outgoingFormQtyPlaceholder: "출고 수량",
      outgoingFormButton: "출고 등록",

      /* Production */
      productionTitle: "생산 관리",
      productionDesc: "일일 생산량 및 자재 사용 내역.",
      prodProductPlaceholder: "완제품 코드 (BOM Product와 동일)",
      prodQtyPlaceholder: "생산 수량",
      prodButton: "생산 등록",
      prodNote:
        "※ BOM에 등록된 product 값과 동일한 값을 입력해야 원자재 자동 차감이 됩니다.",

      /* BOM */
      bomTitle: "BOM (자재명세서)",
      bomDesc: "완제품과 필요 원자재를 연결합니다.",
      bomProductPlaceholder: "완제품 코드 (예: VC100-SET)",
      bomMatCodePlaceholder: "자재 코드",
      bomMatNamePlaceholder: "자재 명",
      bomQtyPlaceholder: "완제품 1개당 필요 수량",
      bomSaveButton: "BOM 저장",
      bomTableProduct: "제품",
      bomTableMatCode: "자재 코드",
      bomTableMatName: "자재 명",
      bomTableQty: "수량",
      bomTableUpdated: "수정일",

      /* Outsourcing */
      outsourcingTitle: "외주 관리",
      outsourcingDesc: "외주업체로 나갔다 들어온 반제품 관리 (예시 화면).",

      /* Finished Goods */
      finishedTitle: "완제품 재고",
      finishedDesc: "출고 가능한 완제품 재고 (예시 화면).",

      /* Employees */
      employeesTitle: "직원 관리",
      employeesDesc: "직원 기본 정보 (예시 화면).",

      /* Attendance */
      attendanceTitle: "근태 관리",
      attendanceDesc: "출근 / 퇴근 기록 (예시 화면).",

      /* Payroll */
      payrollTitle: "급여 관리",
      payrollDesc: "월별 급여 계산 현황 (예시 화면).",

      /* Logs */
      logsTitle: "로그",
      logsDesc: "시스템 작업 기록 (예시).",

      /* Settings */
      settingsTitle: "설정",
      settingsDesc: "ERP 기본 환경 설정.",
      settingsLangLabel: "기본 언어",
      settingsTimezoneLabel: "타임존",
      settingsVersionLabel: "버전",
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
      /* Dashboard */
      dashboardTitle: "Dashboard",
      dashboardDesc: "Indikator utama operasi pabrik (contoh).",

      /* Stock */
      stockTitle: "Stok",
      stockDesc: "Ringkasan stok bahan baku / semi jadi.",
      stockCodeHeader: "Kode",
      stockNameHeader: "Nama",
      stockQtyHeader: "Qty",
      stockMinHeader: "Min",
      stockUnitHeader: "Unit",
      stockUpdatedHeader: "Update Terakhir",

      /* Purchase */
      purchaseTitle: "Pembelian",
      purchaseDesc: "Data bahan masuk dari supplier.",
      purchaseFormCodePlaceholder: "Kode Bahan",
      purchaseFormNamePlaceholder: "Nama Bahan",
      purchaseFormQtyPlaceholder: "Qty",
      purchaseFormButton: "Input Pembelian",

      /* Outgoing */
      outgoingTitle: "Pengeluaran",
      outgoingDesc: "Bahan keluar / penyesuaian manual.",
      outgoingFormCodePlaceholder: "Kode Bahan",
      outgoingFormNamePlaceholder: "Nama Bahan",
      outgoingFormQtyPlaceholder: "Qty",
      outgoingFormButton: "Input Pengeluaran",

      /* Production */
      productionTitle: "Produksi",
      productionDesc: "Hasil produksi harian dan pemakaian bahan.",
      prodProductPlaceholder: "Produk Jadi (sama dengan Product di BOM)",
      prodQtyPlaceholder: "Qty Produksi",
      prodButton: "Input Produksi",
      prodNote:
        "Isi Product sama seperti di BOM agar pemakaian bahan otomatis dipotong.",

      /* BOM */
      bomTitle: "BOM (Bill of Materials)",
      bomDesc: "Hubungkan produk jadi dengan bahan baku.",
      bomProductPlaceholder: "Produk Jadi (mis: VC100-SET)",
      bomMatCodePlaceholder: "Kode Bahan",
      bomMatNamePlaceholder: "Nama Bahan",
      bomQtyPlaceholder: "Qty per 1 produk",
      bomSaveButton: "Simpan BOM",
      bomTableProduct: "Produk",
      bomTableMatCode: "Kode Bahan",
      bomTableMatName: "Nama Bahan",
      bomTableQty: "Qty",
      bomTableUpdated: "Update",

      /* Outsourcing */
      outsourcingTitle: "Outsourcing",
      outsourcingDesc:
        "Proses yang dikirim ke vendor luar (tampilan contoh).",

      /* Finished Goods */
      finishedTitle: "Barang Jadi",
      finishedDesc: "Barang jadi siap dikirim (tampilan contoh).",

      /* Employees */
      employeesTitle: "Karyawan",
      employeesDesc: "Data master karyawan (tampilan contoh).",

      /* Attendance */
      attendanceTitle: "Absensi",
      attendanceDesc: "Data clock-in / clock-out (tampilan contoh).",

      /* Payroll */
      payrollTitle: "Gaji",
      payrollDesc: "Ringkasan perhitungan gaji bulanan (tampilan contoh).",

      /* Logs */
      logsTitle: "Log",
      logsDesc: "Riwayat aktivitas sistem (contoh).",

      /* Settings */
      settingsTitle: "Pengaturan",
      settingsDesc: "Pengaturan dasar ERP.",
      settingsLangLabel: "Bahasa Default",
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
    return `
      <h2>${t.outsourcingTitle}</h2>
      <p>${t.outsourcingDesc}</p>
    `;
  },

  finished(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.finishedTitle}</h2>
      <p>${t.finishedDesc}</p>
    `;
  },

  employees(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.employeesTitle}</h2>
      <p>${t.employeesDesc}</p>
    `;
  },

  attendance(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.attendanceTitle}</h2>
      <p>${t.attendanceDesc}</p>
    `;
  },

  payroll(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.payrollTitle}</h2>
      <p>${t.payrollDesc}</p>
    `;
  },

  logs(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.logsTitle}</h2>
      <p>${t.logsDesc}</p>
    `;
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
          <input type="text" value="0.3 (Prototype)" disabled />
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

  // 페이지별 추가 렌더링 로직
  if (page === "stock") {
    renderStockPage();
  } else if (page === "bom") {
    loadBOM();
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
 * PAGE CHANGE / LANGUAGE CHANGE
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
 * STOCK MODULE (입고/출고)
 *************************************************/

function getStock() {
  return JSON.parse(localStorage.getItem("stock") || "[]");
}
function saveStock(stock) {
  localStorage.setItem("stock", JSON.stringify(stock));
}

/* 입고 */
function updateStock(code, name, qty) {
  let stock = getStock();
  qty = Number(qty);
  if (!qty || qty <= 0) {
    alert("수량을 확인하세요.");
    return;
  }

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
  alert("입고 완료!");
  loadPage("stock");
}

/* 출고 */
function outgoingStock(code, name, qty) {
  let stock = getStock();
  qty = Number(qty);
  if (!qty || qty <= 0) {
    alert("수량을 확인하세요.");
    return;
  }

  let item = stock.find((i) => i.code === code);
  if (!item) {
    alert("해당 코드의 재고가 없습니다.");
    return;
  }
  if (item.qty < qty) {
    alert("재고 부족! 현재 재고: " + item.qty);
    return;
  }

  item.qty -= qty;
  item.lastUpdate = new Date().toLocaleString();

  saveStock(stock);
  alert("출고 완료!");
  loadPage("stock");
}

/* PURCHASE → 버튼 */
function onPurchase() {
  const code = document.getElementById("pCode").value.trim();
  const name = document.getElementById("pName").value.trim();
  const qty = document.getElementById("pQty").value.trim();

  if (!code || !name || !qty) {
    alert("모든 값을 입력하세요.");
    return;
  }

  updateStock(code, name, qty);
}

/* OUTGOING → 버튼 */
function onOutgoing() {
  const code = document.getElementById("oCode").value.trim();
  const name = document.getElementById("oName").value.trim();
  const qty = document.getElementById("oQty").value.trim();

  if (!code || !name || !qty) {
    alert("모든 값을 입력하세요.");
    return;
  }

  outgoingStock(code, name, qty);
}

/* STOCK PAGE RENDER */
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
      </tr>
    `;
  });
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
    alert("BOM 정보를 정확히 입력해주세요.");
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
 * PRODUCTION MODULE (BOM 기반 자동 차감)
 *************************************************/

function getBomForProduct(productKey) {
  const bom = getBOM();
  return bom.filter((i) => i.product === productKey);
}

function runProduction(productKey, qtyVal) {
  const qty = Number(qtyVal);
  if (!productKey || !qtyVal || !qty || qty <= 0) {
    alert("제품과 수량을 정확히 입력하세요.");
    return;
  }

  const bomList = getBomForProduct(productKey);
  if (bomList.length === 0) {
    alert("BOM에 해당 제품 정보가 없습니다.");
    return;
  }

  let stock = getStock();
  let errors = [];

  // 1) 재고 부족 체크
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
    return;
  }

  // 2) 재고 차감 실행
  bomList.forEach((b) => {
    const need = b.qty * qty;
    const mat = stock.find((s) => s.code === b.matCode);
    mat.qty -= need;
    mat.lastUpdate = new Date().toLocaleString();
  });

  saveStock(stock);
  alert("생산 등록 완료! (BOM 기반 원자재 차감 완료)");
  loadPage("stock");
}

function onProduction() {
  const product = document.getElementById("prodProduct").value.trim();
  const qty = document.getElementById("prodQty").value.trim();
  runProduction(product, qty);
}
