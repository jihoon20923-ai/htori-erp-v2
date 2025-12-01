/*************************************************
 * HTORI ERP – Frontend Single Page App
 * - 메뉴 클릭 시 content 영역에 페이지 렌더링
 * - EN / KR / ID 다국어 지원 (텍스트만 변경)
 * - 현재는 화면 구조만, 실제 데이터/DB 연동은 X
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

/** 사이드바 메뉴 순서 (HTML과 동일해야 함) */
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
 * 페이지 템플릿
 *************************************************/

const PageTemplates = {
  dashboard(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.dashboardTitle}</h2>
      <p>${t.dashboardDesc}</p>
      <div class="cards">
        <div class="card">
          <div class="card-label">Total Stock Items</div>
          <div class="card-value">0</div>
        </div>
        <div class="card">
          <div class="card-label">Today Production Qty</div>
          <div class="card-value">0</div>
        </div>
        <div class="card">
          <div class="card-label">Finished Goods Qty</div>
          <div class="card-value">0</div>
        </div>
      </div>
    `;
  },

  stock(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.stockTitle}</h2>
      <p>${t.stockDesc}</p>
      <div class="table-toolbar">
        <button class="btn-primary">+ Add Material (dummy)</button>
      </div>
      <table class="erp-table">
        <thead>
          <tr>
            <th>Material Code</th>
            <th>Material Name</th>
            <th>Quantity</th>
            <th>Min Qty</th>
            <th>Unit</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>H-CP01-12</td>
            <td>SEMI PRODUCTS 12mm</td>
            <td>3,200</td>
            <td>1,000</td>
            <td>SET</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    `;
  },

  purchase(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.purchaseTitle}</h2>
      <p>${t.purchaseDesc}</p>
      <div class="table-toolbar">
        <button class="btn-primary">+ New Purchase (dummy)</button>
      </div>
      <table class="erp-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Supplier</th>
            <th>Material Code</th>
            <th>Material Name</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Unit Price</th>
            <th>Currency</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-11-13</td>
            <td>SUPPLIER-A</td>
            <td>H-CP01-12</td>
            <td>SEMI PRODUCTS 12mm</td>
            <td>1,000</td>
            <td>SET</td>
            <td>0.020</td>
            <td>USD</td>
            <td>Sample row</td>
          </tr>
        </tbody>
      </table>
    `;
  },

  outgoing(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.outgoingTitle}</h2>
      <p>${t.outgoingDesc}</p>
      <div class="table-toolbar">
        <button class="btn-primary">+ New Outgoing (dummy)</button>
      </div>
      <table class="erp-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Material Code</th>
            <th>Material Name</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-11-13</td>
            <td>H-CP01-12</td>
            <td>SEMI PRODUCTS 12mm</td>
            <td>100</td>
            <td>SET</td>
            <td>Production use</td>
          </tr>
        </tbody>
      </table>
    `;
  },

  production(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.productionTitle}</h2>
      <p>${t.productionDesc}</p>
      <div class="table-toolbar">
        <button class="btn-primary">+ New Production (dummy)</button>
      </div>
      <table class="erp-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Finished Code</th>
            <th>Finished Name</th>
            <th>Total Qty</th>
            <th>Defect Qty</th>
            <th>Good Qty</th>
            <th>Worker</th>
            <th>Lot No</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-11-13</td>
            <td>VC100-SET</td>
            <td>VC100 LASH SET</td>
            <td>1,800</td>
            <td>50</td>
            <td>1,750</td>
            <td>TEAM A</td>
            <td>LOT-20251113-01</td>
          </tr>
        </tbody>
      </table>
    `;
  },

    bom(lang) {
    return `
      <h2>BOM (Bill of Materials)</h2>
      <p>Define raw materials needed for each finished product.</p>

      <div class="table-toolbar">
        <button class="btn-primary">+ Add BOM Item (dummy)</button>
      </div>

      <table class="erp-table">
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Product Name</th>
            <th>Material Code</th>
            <th>Material Name</th>
            <th>Qty Required</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>VC100-SET</td>
            <td>VC100 Lash Set</td>
            <td>H-CP01-12</td>
            <td>Semi 12mm</td>
            <td>5</td>
            <td>EA</td>
          </tr>
        </tbody>
      </table>
    `;
  },

  outsourcing(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.outsourcingTitle}</h2>
      <p>${t.outsourcingDesc}</p>
      <div class="table-toolbar">
        <button class="btn-primary">+ New Outsourcing (dummy)</button>
      </div>
      <table class="erp-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>From Code</th>
            <th>From Name</th>
            <th>Qty Out</th>
            <th>To Code</th>
            <th>To Name</th>
            <th>Qty In</th>
            <th>Defect</th>
            <th>Vendor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-11-13</td>
            <td>H-CP01-12</td>
            <td>Semi Products 12mm</td>
            <td>1,000</td>
            <td>H-CP01-12-FIN</td>
            <td>Semi Products 12mm (Finished)</td>
            <td>980</td>
            <td>20</td>
            <td>OUT-VENDOR-1</td>
          </tr>
        </tbody>
      </table>
    `;
  },

  finished(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.finishedTitle}</h2>
      <p>${t.finishedDesc}</p>
      <div class="table-toolbar">
        <button class="btn-primary">+ New Finished Item (dummy)</button>
      </div>
      <table class="erp-table">
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>VC100-BLACK</td>
            <td>VC100 12mm Black</td>
            <td>10,000</td>
            <td>SET</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    `;
  },

  employees(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.employeesTitle}</h2>
      <p>${t.employeesDesc}</p>
      <div class="table-toolbar">
        <button class="btn-primary">+ Add Employee (dummy)</button>
      </div>
      <table class="erp-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EMP-0001</td>
            <td>KIM JIHOON</td>
            <td>Director</td>
            <td>Management</td>
            <td>-</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
    `;
  },

  attendance(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.attendanceTitle}</h2>
      <p>${t.attendanceDesc}</p>
      <div class="table-toolbar">
        <button class="btn-primary">Clock In (dummy)</button>
        <button class="btn-secondary">Clock Out (dummy)</button>
      </div>
      <table class="erp-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Working Hours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-11-13</td>
            <td>EMP-0001</td>
            <td>KIM JIHOON</td>
            <td>09:00</td>
            <td>17:00</td>
            <td>8.0</td>
          </tr>
        </tbody>
      </table>
    `;
  },

  payroll(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.payrollTitle}</h2>
      <p>${t.payrollDesc}</p>
      <div class="table-toolbar">
        <button class="btn-primary">+ Generate Payroll (dummy)</button>
      </div>
      <table class="erp-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Month</th>
            <th>Hours</th>
            <th>Base Salary</th>
            <th>Allowance</th>
            <th>Deduction</th>
            <th>Total Pay</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EMP-0001</td>
            <td>KIM JIHOON</td>
            <td>2025-11</td>
            <td>173</td>
            <td>4,000</td>
            <td>0</td>
            <td>0</td>
            <td>4,000</td>
          </tr>
        </tbody>
      </table>
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
            <th>User</th>
            <th>Action</th>
            <th>Target</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-11-13 10:00</td>
            <td>SYSTEM</td>
            <td>INIT</td>
            <td>HTORI ERP</td>
            <td>Sample log</td>
          </tr>
        </tbody>
      </table>
    `;
  },

  settings(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.settingsTitle}</h2>
      <p>${t.settingsDesc}</p>
      <div class="settings-grid">
        <div class="settings-item">
          <label>Default Language</label>
          <select disabled>
            <option>EN</option>
            <option>KR</option>
            <option>ID</option>
          </select>
          <small>Language is controlled by the buttons at the top.</small>
        </div>
        <div class="settings-item">
          <label>Timezone</label>
          <input type="text" value="Asia/Jakarta" disabled />
        </div>
        <div class="settings-item">
          <label>Version</label>
          <input type="text" value="0.2 (UI Prototype)" disabled />
        </div>
      </div>
    `;
  },
};

/*************************************************
 * 렌더링 / 언어 변경 / 메뉴 처리
 *************************************************/

/** content 영역 렌더링 */
function renderContent() {
  const lang = state.lang;
  const page = state.page || "dashboard";
  const contentEl = document.getElementById("content");

  const tmpl = PageTemplates[page] || PageTemplates.dashboard;
  contentEl.innerHTML = tmpl(lang);
}

/** 사이드바 텍스트 + active 표시 갱신 */
function renderSidebar() {
  const lang = state.lang;
  const tSidebar = i18n[lang].sidebar;

  const items = document.querySelectorAll(".sidebar li");

  items.forEach((li, idx) => {
    const pageId = MENU_ORDER[idx];
    li.dataset.page = pageId; // 나중에 사용할 수 있도록 저장
    li.textContent = tSidebar[pageId] || pageId;

    if (pageId === state.page) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
}

/** 헤더 텍스트 (로고) 갱신 */
function renderHeader() {
  const lang = state.lang;
  const appTitle = i18n[lang].appTitle;
  const logo = document.querySelector(".header .logo");
  if (logo) logo.textContent = appTitle;
}

/** 현재 언어로 전체 UI 다시 그리기 */
function rerenderAll() {
  renderHeader();
  renderSidebar();
  renderContent();
}

/** 언어 변경 (버튼에서 호출) */
function setLanguage(lang) {
  if (!LANGS.includes(lang)) return;
  state.lang = lang;
  localStorage.setItem("htori_lang", lang);
  rerenderAll();
}

/** 페이지 변경 (사이드바에서 onclick으로 호출) */
function loadPage(pageId) {
  if (!PageTemplates[pageId]) pageId = "dashboard";
  state.page = pageId;
  localStorage.setItem("htori_page", pageId);
  renderSidebar();
  renderContent();
}

/*************************************************
 * 초기화
 *************************************************/

document.addEventListener("DOMContentLoaded", () => {
  // 처음 로드 시 한 번 전체 렌더
  rerenderAll();
});

// 전역으로 노출 (HTML onclick 에서 사용)
window.setLanguage = setLanguage;
window.loadPage = loadPage;

/* ============================
      BOM MODULE
============================ */
function loadBOM() {
    const bomData = JSON.parse(localStorage.getItem("bom") || "[]");
    const table = document.getElementById("bomTable");
    if (!table) return;

    table.innerHTML = "";

    bomData.forEach(item => {
        table.innerHTML += `
        <tr>
            <td>${item.bomCode}</td>
            <td>${item.product}</td>
            <td>${item.matCode}</td>
            <td>${item.matName}</td>
            <td>${item.qty}</td>
            <td>${item.unit}</td>
            <td>${item.updated}</td>
        </tr>
        `;
    });
}

function showAddBOM() {
    document.getElementById("bomForm").style.display = "block";
}

function saveBOM() {
    const bomData = JSON.parse(localStorage.getItem("bom") || "[]");

    const newItem = {
        bomCode: "BOM-" + String(Date.now()).slice(-5),
        product: document.getElementById("bomProduct").value,
        matCode: document.getElementById("bomMatCode").value,
        matName: document.getElementById("bomMatName").value,
        qty: document.getElementById("bomQty").value,
        unit: document.getElementById("bomUnit").value,
        updated: new Date().toLocaleString()
    };

    bomData.push(newItem);
    localStorage.setItem("bom", JSON.stringify(bomData));

    alert("BOM Saved!");
    loadBOM();
}
