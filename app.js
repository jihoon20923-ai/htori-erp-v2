/*************************************************
 * PART 1 — GLOBAL + I18N + MENU
 *************************************************/

const LANGS = ["EN", "KR", "ID"];

const state = {
  lang: localStorage.getItem("htori_lang") || "EN",
  page: localStorage.getItem("htori_page") || "dashboard",
};

/*************************************************
 * FULL I18N (EN / KR / ID)
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
      suppliers: "Suppliers",
      employees: "Employees",
      attendance: "Attendance",
      payroll: "Payroll",
      logs: "Logs",
      settings: "Settings"
    },

    pages: {
      dashboardTitle: "Dashboard",
      dashboardDesc: "Factory indicators and analytics.",

      stockTitle: "Stock Management",
      stockDesc: "Raw / Semi / Finished stock list.",

      purchaseTitle: "Purchase",
      purchaseDesc: "Material incoming records.",

      outgoingTitle: "Outgoing",
      outgoingDesc: "Material outgoing records.",

      productionTitle: "Production",
      productionDesc: "Production & material usage.",

      bomTitle: "BOM",
      bomDesc: "Bill of Materials per product.",

      outsourcingTitle: "Outsourcing",
      outsourcingDesc: "Out → In with vendor and defect rate.",

      finishedTitle: "Finished Goods",
      finishedDesc: "VC-code finished product list.",

      suppliersTitle: "Supplier Management",
      suppliersDesc: "Supplier add/edit/delete.",

      logsTitle: "Logs",
      logsDesc: "System activity logs.",

      employeesTitle: "Employees",
      employeesDesc: "Employee master data.",

      attendanceTitle: "Attendance",
      attendanceDesc: "Check-in / Check-out records.",

      payrollTitle: "Payroll",
      payrollDesc: "Monthly payroll calculation.",

      settingsTitle: "Settings",
      settingsDesc: "System basic settings.",

      dashRawLabel: "Raw Material Stock",
      dashFinishedLabel: "Finished Goods Stock",
      dashTodayProdLabel: "Today Production",
      dashDefectLabel: "Outsourcing Defect Rate",
      dashPurchase7Title: "Purchase (7 days)",
      dashOutgoing7Title: "Outgoing (7 days)",
      dashProduction7Title: "Production (7 days)"
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
      productCode: "Product Code",
      code: "Code",
      name: "Name",
      qty: "Qty",
      minimum: "Min",
      unit: "Unit",
      updated: "Updated"
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
      suppliers: "공급업체",
      employees: "직원",
      attendance: "근태",
      payroll: "급여",
      logs: "로그",
      settings: "설정"
    },

    pages: {
      dashboardTitle: "대시보드",
      dashboardDesc: "공장 지표 및 분석.",

      stockTitle: "재고 관리",
      stockDesc: "원자재 / 반제품 / 완제품 재고.",

      purchaseTitle: "입고 관리",
      purchaseDesc: "자재 입고 기록.",

      outgoingTitle: "출고 관리",
      outgoingDesc: "자재 출고 기록.",

      productionTitle: "생산 관리",
      productionDesc: "생산 및 자재 사용.",

      bomTitle: "BOM 관리",
      bomDesc: "제품별 필요 자재 구성.",

      outsourcingTitle: "외주 관리",
      outsourcingDesc: "외주 출고/입고 + 불량 기록.",

      finishedTitle: "완제품 재고",
      finishedDesc: "VC 코드 완제품 현황.",

      suppliersTitle: "공급업체 관리",
      suppliersDesc: "등록/수정/삭제.",

      logsTitle: "로그",
      logsDesc: "시스템 활동 기록.",

      employeesTitle: "직원 관리",
      employeesDesc: "직원 정보.",

      attendanceTitle: "근태 관리",
      attendanceDesc: "출근/퇴근 기록.",

      payrollTitle: "급여 관리",
      payrollDesc: "월급 계산.",

      settingsTitle: "설정",
      settingsDesc: "기본 설정.",

      dashRawLabel: "원자재 재고",
      dashFinishedLabel: "완제품 재고",
      dashTodayProdLabel: "오늘 생산량",
      dashDefectLabel: "외주 불량률",
      dashPurchase7Title: "입고 (7일)",
      dashOutgoing7Title: "출고 (7일)",
      dashProduction7Title: "생산 (7일)"
    },

    common: {
      add: "추가",
      edit: "수정",
      delete: "삭제",
      save: "저장",
      close: "닫기",
      register: "등록",
      pdfExport: "PDF 다운로드",
      excelDownload: "엑셀 다운로드",
      productCode: "완제품 코드",
      code: "코드",
      name: "이름",
      qty: "수량",
      minimum: "최소",
      unit: "단위",
      updated: "수정일"
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
      suppliers: "Pemasok",
      employees: "Karyawan",
      attendance: "Absensi",
      payroll: "Gaji",
      logs: "Log",
      settings: "Pengaturan"
    },

    pages: {
      dashboardTitle: "Dashboard",
      dashboardDesc: "Indikator & analitik pabrik.",

      stockTitle: "Manajemen Stok",
      stockDesc: "Stok bahan baku / semi / jadi.",

      purchaseTitle: "Pembelian",
      purchaseDesc: "Data barang masuk.",

      outgoingTitle: "Pengeluaran",
      outgoingDesc: "Data barang keluar.",

      productionTitle: "Produksi",
      productionDesc: "Produksi & penggunaan bahan.",

      bomTitle: "BOM",
      bomDesc: "Bill of Materials produk.",

      outsourcingTitle: "Outsourcing",
      outsourcingDesc: "Out → In + vendor + cacat.",

      finishedTitle: "Barang Jadi",
      finishedDesc: "Daftar stok VC.",

      suppliersTitle: "Manajemen Pemasok",
      suppliersDesc: "Tambah/Edit/Hapus pemasok.",

      logsTitle: "Log",
      logsDesc: "Riwayat aktivitas.",

      employeesTitle: "Karyawan",
      employeesDesc: "Data karyawan.",

      attendanceTitle: "Absensi",
      attendanceDesc: "Data masuk/pulang.",

      payrollTitle: "Gaji",
      payrollDesc: "Ringkasan gaji bulanan.",

      settingsTitle: "Pengaturan",
      settingsDesc: "Pengaturan dasar.",

      dashRawLabel: "Stok Bahan Baku",
      dashFinishedLabel: "Stok Barang Jadi",
      dashTodayProdLabel: "Produksi Hari Ini",
      dashDefectLabel: "Tingkat Cacat",
      dashPurchase7Title: "Pembelian (7 hari)",
      dashOutgoing7Title: "Pengeluaran (7 hari)",
      dashProduction7Title: "Produksi (7 hari)"
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
      code: "Kode",
      name: "Nama",
      qty: "Qty",
      minimum: "Min",
      unit: "Unit",
      updated: "Diperbarui"
    }
  }
};

/*************************************************
 * MENU ORDER
 *************************************************/
const MENU_ORDER = [
  "dashboard",
  "stock",
  "purchase",
  "outgoing",
  "production",
  "bom",
  "outsourcing",
  "finished",
  "suppliers",
  "employees",
  "attendance",
  "payroll",
  "logs",
  "settings"
];
/*************************************************
 * PART 2 — COMMON HELPERS / LOG SYSTEM / CSV EXPORT
 *************************************************/

/*************************************************
 * COMMON HELPER: SAVE TO LOCALSTORAGE
 *************************************************/
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadData(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

/*************************************************
 * LOG SYSTEM
 *************************************************/
function writeLog(action, detail = "") {
  const logs = loadData("logs");

  logs.unshift({
    time: new Date().toLocaleString(),
    action,
    detail,
  });

  saveData("logs", logs);
}

/*************************************************
 * CSV EXPORT
 *************************************************/
function exportCSV(filename, rows) {
  if (!rows || rows.length === 0) return alert("No data");

  let csv = "";

  rows.forEach(row => {
    csv += row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  writeLog("CSV Export", filename);
}

/*************************************************
 * DATE RANGE UTIL FOR GRAPHS
 *************************************************/
function getLast7Days() {
  const days = [];
  let d = new Date();

  for (let i = 0; i < 7; i++) {
    days.push(new Date(d).toISOString().slice(0, 10));
    d.setDate(d.getDate() - 1);
  }

  return days.reverse();
}
/*************************************************
 * PART 3 — LOGS MODULE (VIEW + RENDER)
 *************************************************/

/* Load logs */
function getLogs() {
  return loadData("logs");
}

/* Save logs */
function saveLogs(list) {
  saveData("logs", list);
}

/*************************************************
 * RENDER LOGS TABLE
 *************************************************/
function renderLogsPage() {
  const tbody = document.getElementById("logsTableBody");
  if (!tbody) return;

  const logs = getLogs();
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

/*************************************************
 * CLEAR ALL LOGS (OPTIONAL)
 *************************************************/
function clearLogs() {
  if (!confirm("모든 로그를 삭제할까요?")) return;

  saveLogs([]);
  renderLogsPage();
  writeLog("LOG CLEAR", "All logs removed");
}
/*************************************************
 * PART 4 — SUPPLIER MODULE
 * - Supplier CRUD
 * - AP Payments
 * - Supplier Stats
 * - Supplier Monthly Chart
 * - Supplier PDF Export
 *************************************************/

/* Load suppliers (with backward compatibility) */
function getSuppliers() {
  let raw = loadData("suppliers") || [];

  return raw.map(old => ({
    name: typeof old === "string" ? old : (old.name || ""),
    vendorName: old.vendorName || "",
    contactPerson: old.contactPerson || "",
    email: old.email || "",
    address: old.address || "",
    phone: old.phone || "",
    bankName: old.bankName || "",
    bankAccount: old.bankAccount || "",
    bankHolder: old.bankHolder || "",
  }));
}

/* Save suppliers */
function saveSuppliers(list) {
  saveData("suppliers", list);
}

/* 초기 공급업체 2개 세팅 */
(function initSuppliers() {
  let s = getSuppliers();
  if (s.length === 0) {
    s = [
      { name: "Supplier A", vendorName: "", contactPerson: "", email: "", address: "", phone: "", bankName: "", bankAccount: "", bankHolder: "" },
      { name: "Supplier B", vendorName: "", contactPerson: "", email: "", address: "", phone: "", bankName: "", bankAccount: "", bankHolder: "" },
    ];
    saveSuppliers(s);
  }
})();

/*************************************************
 * AP PAYMENTS
 *************************************************/
function getSupplierPayments() {
  return loadData("supplierPayments") || [];
}
function saveSupplierPayments(list) {
  saveData("supplierPayments", list);
}

/* Add payment */
function addSupplierPayment(supplierName, amount) {
  const list = getSupplierPayments();
  list.push({
    supplier: supplierName,
    amount: Number(amount) || 0,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleString(),
  });
  saveSupplierPayments(list);
}

/*************************************************
 * Supplier Statistics (Total Qty / Amount / Paid / Outstanding)
 *************************************************/
function getSupplierStats(name) {
  const purchase = loadData("purchase") || [];
  const payments = getSupplierPayments();

  let totalQty = 0;
  let totalAmount = 0;
  let totalPaid = 0;

  purchase.forEach(p => {
    if (p.supplier === name) {
      const qty = Number(p.qty) || 0;
      const price = Number(p.price) || 0;
      totalQty += qty;
      totalAmount += qty * price;
    }
  });

  payments.forEach(pay => {
    if (pay.supplier === name) {
      totalPaid += Number(pay.amount) || 0;
    }
  });

  const outstanding = totalAmount - totalPaid;
  return { totalQty, totalAmount, totalPaid, outstanding };
}

/*************************************************
 * Supplier Monthly Graph Data (Recent 6 Months)
 *************************************************/
function getSupplierMonthlyData(name, months = 6) {
  const purchase = loadData("purchase") || [];
  const labels = [];
  const qtyMap = {};
  const amountMap = {};

  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    labels.push(key);
    qtyMap[key] = 0;
    amountMap[key] = 0;
  }

  purchase.forEach(p => {
    if (p.supplier !== name) return;
    const d = new Date(p.date || p.updated || new Date());
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}`;
    if (qtyMap[key] != null) {
      const qty = Number(p.qty) || 0;
      const price = Number(p.price) || 0;
      qtyMap[key] += qty;
      amountMap[key] += qty * price;
    }
  });

  return {
    labels,
    qtyData: labels.map(k => qtyMap[k]),
    amountData: labels.map(k => amountMap[k]),
  };
}

/*************************************************
 * RENDER SUPPLIER TABLE
 *************************************************/

let supplierChart = null;
let selectedSupplierForChart = "";

function renderSupplierPage() {
  const tbody = document.getElementById("supplierTableBody");
  if (!tbody) return;

  const list = getSuppliers();
  tbody.innerHTML = "";

  list.forEach(s => {
    const st = getSupplierStats(s.name);

    tbody.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.vendorName}</td>
        <td>${s.contactPerson}</td>
        <td>${s.email}</td>
        <td>${s.address}</td>
        <td>${s.phone}</td>
        <td>
          ${s.bankName}<br>
          ${s.bankAccount}<br>
          ${s.bankHolder}
        </td>
        <td>${st.totalQty}</td>
        <td>${st.totalAmount.toLocaleString()}</td>
        <td>${st.totalPaid.toLocaleString()}</td>
        <td>${st.outstanding.toLocaleString()}</td>
        <td>
          <button class="btn-mini" onclick="openSupplierModal('${s.name}')">Edit</button>
          <button class="btn-mini" onclick="setSupplierChart('${s.name}')">Chart</button>
        </td>
      </tr>
    `;
  });

  if (!selectedSupplierForChart && list.length > 0) {
    selectedSupplierForChart = list[0].name;
  }
  if (selectedSupplierForChart) {
    renderSupplierChart(selectedSupplierForChart);
  }
}

/*************************************************
 * SUPPLIER ADD
 *************************************************/
function addSupplier() {
  const name = document.getElementById("newSupplier").value.trim();
  const vendorName = document.getElementById("supplierVendorName").value.trim();
  const contactPerson = document.getElementById("supplierContact").value.trim();
  const email = document.getElementById("supplierEmail").value.trim();
  const address = document.getElementById("supplierAddress").value.trim();
  const phone = document.getElementById("supplierPhone").value.trim();
  const bankName = document.getElementById("supplierBankName").value.trim();
  const bankAccount = document.getElementById("supplierBankAccount").value.trim();
  const bankHolder = document.getElementById("supplierBankHolder").value.trim();

  if (!name) return alert("Supplier name required");

  const list = getSuppliers();
  if (list.some(s => s.name === name)) {
    return alert("Already exists.");
  }

  list.push({
    name,
    vendorName,
    contactPerson,
    email,
    address,
    phone,
    bankName,
    bankAccount,
    bankHolder,
  });

  saveSuppliers(list);
  writeLog("SUPPLIER ADD", name);

  [
    "newSupplier","supplierVendorName","supplierContact","supplierEmail",
    "supplierAddress","supplierPhone","supplierBankName","supplierBankAccount","supplierBankHolder"
  ].forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });

  renderSupplierPage();
}

/*************************************************
 * EDIT SUPPLIER MODAL
 *************************************************/
function openSupplierModal(name) {
  const s = getSuppliers().find(x => x.name === name);
  if (!s) return;

  document.getElementById("editSupplierName").value = s.name;
  document.getElementById("editVendorName").value = s.vendorName;
  document.getElementById("editContactPerson").value = s.contactPerson;
  document.getElementById("editEmail").value = s.email;
  document.getElementById("editAddress").value = s.address;
  document.getElementById("editPhone").value = s.phone;
  document.getElementById("editBankName").value = s.bankName;
  document.getElementById("editBankAccount").value = s.bankAccount;
  document.getElementById("editBankHolder").value = s.bankHolder;

  document.getElementById("supplierModal").style.display = "block";
}

function closeSupplierModal() {
  document.getElementById("supplierModal").style.display = "none";
}

/*************************************************
 * SAVE SUPPLIER EDIT
 *************************************************/
function saveSupplierEdit() {
  const name = document.getElementById("editSupplierName").value.trim();

  let list = getSuppliers();
  let s = list.find(x => x.name === name);
  if (!s) return alert("Supplier not found");

  s.vendorName = document.getElementById("editVendorName").value.trim();
  s.contactPerson = document.getElementById("editContactPerson").value.trim();
  s.email = document.getElementById("editEmail").value.trim();
  s.address = document.getElementById("editAddress").value.trim();
  s.phone = document.getElementById("editPhone").value.trim();
  s.bankName = document.getElementById("editBankName").value.trim();
  s.bankAccount = document.getElementById("editBankAccount").value.trim();
  s.bankHolder = document.getElementById("editBankHolder").value.trim();

  saveSuppliers(list);
  writeLog("SUPPLIER EDIT", name);

  closeSupplierModal();
  renderSupplierPage();
}

/*************************************************
 * PAY OUTSTANDING (AP)
 *************************************************/
function payAP() {
  const name = document.getElementById("editSupplierName").value.trim();
  const amountStr = document.getElementById("apPayAmount").value.trim();
  const amount = Number(amountStr);

  if (!name) return alert("Supplier missing");
  if (!amountStr || isNaN(amount) || amount <= 0) return alert("Invalid amount");

  addSupplierPayment(name, amount);
  writeLog("SUPPLIER PAYMENT", `${name} pay ${amount}`);

  document.getElementById("apPayAmount").value = "";
  renderSupplierPage();
}

/*************************************************
 * SUPPLIER MONTHLY CHART
 *************************************************/
function setSupplierChart(name) {
  selectedSupplierForChart = name;
  renderSupplierChart(name);
}

function renderSupplierChart(name) {
  const canvas = document.getElementById("supplierChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const { labels, qtyData, amountData } = getSupplierMonthlyData(name, 6);

  if (supplierChart) supplierChart.destroy();

  supplierChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Qty", data: qtyData, yAxisID: "yQty" },
        { label: "Amount", data: amountData, yAxisID: "yAmount" }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: `Monthly Purchase - ${name}` }
      },
      scales: {
        yQty: { type: "linear", position: "left", beginAtZero: true },
        yAmount: { type: "linear", position: "right", beginAtZero: true, grid: { drawOnChartArea: false } }
      }
    }
  });
}

/*************************************************
 * SUPPLIER PDF EXPORT
 *************************************************/
async function exportSuppliersPDF() {
  const section = document.getElementById("supplierSection");
  if (!section) return alert("Supplier 영역 없음");

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("l", "mm", "a4");

  const canvas = await html2canvas(section, { scale: 2 });
  const img = canvas.toDataURL("image/png");

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgW = pageW - 20;
  const imgH = canvas.height * imgW / canvas.width;

  pdf.addImage(img, "PNG", 10, 10, imgW, imgH);
  pdf.save("suppliers.pdf");

  writeLog("SUPPLIER PDF", "Exported suppliers.pdf");
}
/*************************************************
 * PART 5 — STOCK MODULE
 * - Load stock
 * - Save stock
 * - Update stock (입고)
 * - Edit stock (수정)
 * - Render stock table
 *************************************************/

/* Load stock */
function getStock() {
  return loadData("stock") || [];
}

/* Save stock */
function saveStock(list) {
  saveData("stock", list);
}

/*************************************************
 * UPDATE STOCK (입고 / 생산 / 외주 등에서 호출)
 *************************************************/
function updateStock(code, name, qty) {
  let stock = getStock();
  qty = Number(qty);
  const now = new Date().toLocaleString();

  let item = stock.find(i => i.code === code);

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

/*************************************************
 * EDIT STOCK (재고 수정)
 *************************************************/
function editStockQty(code) {
  let stock = getStock();
  let item = stock.find(i => i.code === code);

  if (!item) return alert("재고 없음.");

  const newQtyStr = prompt("새 수량을 입력하세요:", item.qty);
  if (newQtyStr === null) return;

  const newQty = Number(newQtyStr);
  if (isNaN(newQty) || newQty < 0) {
    return alert("올바른 수량을 입력하세요.");
  }

  item.qty = newQty;
  item.lastUpdate = new Date().toLocaleString();

  saveStock(stock);
  writeLog("STOCK EDIT", `${code} → ${newQty}`);

  loadPage("stock");
}

/*************************************************
 * RENDER STOCK PAGE TABLE
 *************************************************/
function renderStockPage() {
  const tbody = document.getElementById("stockTableBody");
  if (!tbody) return;

  const stock = getStock();
  tbody.innerHTML = "";

  stock.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.code}</td>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.minQty || 0}</td>
        <td>${item.unit || "SET"}</td>
        <td>${item.lastUpdate || ""}</td>
        <td>
          <button class="btn-mini" onclick="editStockQty('${item.code}')">
            Edit
          </button>
        </td>
      </tr>
    `;
  });
}
/*************************************************
 * PART 6 — PURCHASE MODULE (입고)
 * - Load purchase
 * - Save purchase
 * - Register purchase
 * - Edit purchase
 * - Render purchase page
 * - CSV export
 *************************************************/

/* Load purchase list */
function getPurchase() {
  return loadData("purchase") || [];
}

/* Save purchase list */
function savePurchase(list) {
  saveData("purchase", list);
}

/*************************************************
 * REGISTER PURCHASE (입고)
 *************************************************/
function onPurchase() {
  const code = document.getElementById("pCode").value.trim();
  const name = document.getElementById("pName").value.trim();
  const qtyStr = document.getElementById("pQty").value.trim();
  const priceStr = document.getElementById("pPrice").value.trim();
  const currency = document.getElementById("pCurrency").value.trim();
  const supplier = document.getElementById("pSupplier").value.trim();

  const qty = Number(qtyStr);
  const price = Number(priceStr);

  if (!code || !name || !qty || !price) {
    return alert("모든 값을 입력하세요.");
  }

  /* 1) 재고 증가 */
  updateStock(code, name, qty);

  /* 2) 로그 기록 */
  writeLog(
    "PURCHASE",
    `${supplier} / ${code} ${qty} EA @ ${price} ${currency}`
  );

  /* 3) purchase 리스트에 저장 */
  const list = getPurchase();
  list.push({
    date: new Date().toLocaleDateString(),
    supplier,
    code,
    name,
    qty,
    price,
    currency,
    updated: new Date().toLocaleString(),
  });
  savePurchase(list);

  alert("입고 완료!");
  loadPage("purchase");
}

/*************************************************
 * EDIT PURCHASE (입고 수정)
 *************************************************/
function editPurchase(index) {
  let list = getPurchase();
  let p = list[index];

  const newQtyStr = prompt("새로운 수량:", p.qty);
  const newPriceStr = prompt("새로운 단가:", p.price);

  if (newQtyStr === null || newPriceStr === null) return;

  const newQty = Number(newQtyStr);
  const newPrice = Number(newPriceStr);

  if (isNaN(newQty) || newQty <= 0 || isNaN(newPrice) || newPrice <= 0) {
    return alert("올바른 숫자를 입력하세요.");
  }

  /* 재고 차이 계산 */
  const diff = newQty - p.qty;

  let stock = getStock();
  let item = stock.find(i => i.code === p.code);

  if (!item && diff < 0) return alert("재고 부족.");

  /* 수정된 수량만큼 재고 업데이트 */
  if (!item) {
    updateStock(p.code, p.name, diff);
  } else {
    item.qty += diff;
    item.lastUpdate = new Date().toLocaleString();
    saveStock(stock);
  }

  p.qty = newQty;
  p.price = newPrice;
  p.updated = new Date().toLocaleString();

  savePurchase(list);

  writeLog("PURCHASE EDIT", `${p.code} qty→${newQty}, price→${newPrice}`);

  loadPage("purchase");
}

/*************************************************
 * RENDER PURCHASE PAGE
 *************************************************/
function renderPurchasePage() {
  const tbody = document.getElementById("purchaseTableBody");
  if (!tbody) return;

  const list = getPurchase();
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
        <td>
          <button class="btn-mini" onclick="editPurchase(${idx})">
            Edit
          </button>
        </td>
      </tr>
    `;
  });
}

/*************************************************
 * CSV EXPORT — PURCHASE LIST
 *************************************************/
function downloadPurchaseCSV() {
  const list = getPurchase();

  const headers = [
    "Date",
    "Supplier",
    "Code",
    "Name",
    "Qty",
    "Price",
    "Currency",
    "Updated",
  ];

  const rows = list.map(p => [
    p.date,
    p.supplier,
    p.code,
    p.name,
    p.qty,
    p.price,
    p.currency,
    p.updated,
  ]);

  downloadCSV("purchase.csv", headers, rows);
}
/*************************************************
 * PART 7 — OUTGOING MODULE (출고)
 * - Load outgoing
 * - Save outgoing
 * - Register outgoing
 * - Render outgoing page
 * - CSV export
 *************************************************/

/* Load outgoing list */
function getOutgoing() {
  return loadData("outgoing") || [];
}

/* Save outgoing list */
function saveOutgoing(list) {
  saveData("outgoing", list);
}

/*************************************************
 * REGISTER OUTGOING (출고)
 *************************************************/
function onOutgoing() {
  const code = document.getElementById("oCode").value.trim();
  const name = document.getElementById("oName").value.trim();
  const qtyStr = document.getElementById("oQty").value.trim();
  const qty = Number(qtyStr);

  if (!code || !name || !qty) {
    return alert("모든 값을 입력하세요.");
  }

  /* 재고 체크 */
  let stock = getStock();
  let item = stock.find(i => i.code === code);
  if (!item) return alert("해당 코드가 재고에 없습니다.");
  if (item.qty < qty) return alert("재고 부족합니다.");

  /* 재고 감소 */
  item.qty -= qty;
  item.lastUpdate = new Date().toLocaleString();
  saveStock(stock);

  /* 출고 기록 저장 */
  const list = getOutgoing();
  list.push({
    date: new Date().toLocaleDateString(),
    code,
    name,
    qty,
    updated: new Date().toLocaleString(),
  });
  saveOutgoing(list);

  writeLog("OUTGOING", `${code} ${qty} 출고`);

  alert("출고 완료!");
  loadPage("outgoing");
}

/*************************************************
 * RENDER OUTGOING PAGE
 *************************************************/
function renderOutgoingPage() {
  const tbody = document.getElementById("outgoingTableBody");
  if (!tbody) return;

  const list = getOutgoing();
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

/*************************************************
 * OUTGOING CSV EXPORT
 *************************************************/
function downloadOutgoingCSV() {
  const list = getOutgoing();

  const headers = ["Date", "Code", "Name", "Qty", "Updated"];

  const rows = list.map(o => [
    o.date,
    o.code,
    o.name,
    o.qty,
    o.updated,
  ]);

  downloadCSV("outgoing.csv", headers, rows);
}
/*************************************************
 * PART 8 — BOM MODULE
 * - BOM 저장
 * - BOM 조회
 * - BOM 테이블 렌더링
 *************************************************/

/* BOM 리스트 가져오기 */
function getBOM() {
  return loadData("bom") || [];
}

/* BOM 저장 (전체 리스트) */
function saveBOMData(bom) {
  saveData("bom", bom);
}

/* BOM 항목 추가 (저장 버튼) */
function saveBOMItem() {
  const product  = document.getElementById("bomProduct").value.trim();
  const matCode  = document.getElementById("bomMatCode").value.trim();
  const matName  = document.getElementById("bomMatName").value.trim();
  const qtyStr   = document.getElementById("bomQty").value.trim();
  const qty      = Number(qtyStr);

  if (!product || !matCode || !matName || !qty) {
    return alert("모든 값을 입력하세요.");
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

  writeLog("BOM ADD", `${product} / ${matCode} x ${qty}`);
  alert("BOM 저장 완료.");

  // 입력창 초기화
  ["bomProduct", "bomMatCode", "bomMatName", "bomQty"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  loadPage("bom");
}

/* 특정 완제품에 대한 BOM 가져오기 */
function getBomForProduct(product) {
  return getBOM().filter(b => b.product === product);
}

/* BOM 페이지 렌더링 */
function renderBOMPage() {
  const tbody = document.getElementById("bomTableBody");
  if (!tbody) return;

  const bom = getBOM();
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
/*************************************************
 * PART 9 — PRODUCTION MODULE
 * - 생산 등록
 * - BOM 기반 자재 차감
 * - 생산 수정
 * - CSV 다운로드
 *************************************************/

/* 생산 데이터 가져오기 */
function getProduction() {
  return loadData("production") || [];
}

/* 생산 데이터 저장 */
function saveProduction(list) {
  saveData("production", list);
}

/*************************************************
 * 생산 실행 (BOM 기반 자재 차감 + 완제품 증가)
 *************************************************/
function runProduction(product, qty) {
  qty = Number(qty);
  if (!product || !qty) return false;

  const bomList = getBomForProduct(product);

  if (bomList.length === 0) {
    alert("BOM이 없습니다.");
    return false;
  }

  let stock = getStock();

  // 1) 자재 부족 체크
  for (const b of bomList) {
    const need = b.qty * qty;
    const mat = stock.find(s => s.code === b.matCode);

    if (!mat || mat.qty < need) {
      alert(`자재 부족: ${b.matCode} / 필요 ${need}, 현재 ${mat ? mat.qty : 0}`);
      return false;
    }
  }

  // 2) 자재 차감
  bomList.forEach(b => {
    const need = b.qty * qty;
    const mat = stock.find(s => s.code === b.matCode);

    mat.qty -= need;
    mat.lastUpdate = new Date().toLocaleString();
  });

  // 3) 완제품 증가
  let fg = stock.find(s => s.code === product);

  if (!fg) {
    stock.push({
      code: product,
      name: product,
      qty: qty,
      minQty: 0,
      unit: "SET",
      lastUpdate: new Date().toLocaleString(),
    });
  } else {
    fg.qty += qty;
    fg.lastUpdate = new Date().toLocaleString();
  }

  saveStock(stock);
  return true;
}

/*************************************************
 * 생산 입력 처리
 *************************************************/
function onProduction() {
  const product = document.getElementById("prodProduct").value.trim();
  const qtyStr = document.getElementById("prodQty").value.trim();
  const qty = Number(qtyStr);

  if (!product || !qty) {
    return alert("상품 코드와 수량을 입력하세요.");
  }

  const ok = runProduction(product, qty);
  if (!ok) return;

  const list = getProduction();
  list.push({
    date: new Date().toLocaleDateString(),
    product,
    qty,
    updated: new Date().toLocaleString(),
  });

  saveProduction(list);
  writeLog("PRODUCTION", `${product} 생산 ${qty}`);

  alert("생산 등록 완료!");
  loadPage("production");
}

/*************************************************
 * 생산 페이지 렌더링
 *************************************************/
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

/*************************************************
 * 생산 수정 기능
 *************************************************/
function editProduction(index) {
  let list = getProduction();
  let p = list[index];

  const newQtyStr = prompt("새로운 생산 수량:", p.qty);
  if (newQtyStr === null) return;

  const newQty = Number(newQtyStr);
  if (isNaN(newQty) || newQty <= 0) {
    return alert("잘못된 수량입니다.");
  }

  const diff = newQty - p.qty;
  if (diff === 0) return;

  let stock = getStock();
  const bomList = getBomForProduct(p.product);

  if (bomList.length === 0) {
    return alert("BOM이 없습니다.");
  }

  if (diff > 0) {
    // 추가 생산 → 자재 추가 차감 필요
    for (const b of bomList) {
      const need = b.qty * diff;
      const mat = stock.find(s => s.code === b.matCode);

      if (!mat || mat.qty < need) {
        return alert(`자재 부족: ${b.matCode} / 필요 ${need}, 현재 ${mat ? mat.qty : 0}`);
      }
    }

    bomList.forEach(b => {
      const need = b.qty * diff;
      const mat = stock.find(s => s.code === b.matCode);

      mat.qty -= need;
      mat.lastUpdate = new Date().toLocaleString();
    });

    let fg = stock.find(s => s.code === p.product);
    fg.qty += diff;
    fg.lastUpdate = new Date().toLocaleString();

  } else {
    // 생산 감소 → 자재 되돌림
    const backQty = -diff;

    bomList.forEach(b => {
      const ret = b.qty * backQty;
      let mat = stock.find(s => s.code === b.matCode);

      if (!mat) {
        stock.push({
          code: b.matCode,
          name: b.matName,
          qty: ret,
          minQty: 0,
          unit: "SET",
          lastUpdate: new Date().toLocaleString(),
        });
      } else {
        mat.qty += ret;
        mat.lastUpdate = new Date().toLocaleString();
      }
    });

    let fg = stock.find(s => s.code === p.product);
    fg.qty -= backQty;
    if (fg.qty < 0) fg.qty = 0;
    fg.lastUpdate = new Date().toLocaleString();
  }

  saveStock(stock);

  // 생산 내역 업데이트
  p.qty = newQty;
  p.updated = new Date().toLocaleString();
  saveProduction(list);

  writeLog("PRODUCTION EDIT", `${p.product} → ${newQty}`);
  alert("생산 수정 완료!");

  loadPage("production");
}

/*************************************************
 * CSV 다운로드
 *************************************************/
function downloadProductionCSV() {
  const list = getProduction();
  const headers = ["Date", "Product", "Qty", "Updated"];

  const rows = list.map(p => [
    p.date, p.product, p.qty, p.updated
  ]);

  downloadCSV("production.csv", headers, rows);
}
/*************************************************
 * PART 10 — OUTSOURCING MODULE
 * - OUT → 원자재 출고
 * - IN → 외주된 작업 입고
 * - 불량 자동 계산
 * - Vendor 선택 기능
 * - Outsourcing 기록 저장
 * - Outsourcing 테이블 렌더링
 * - CSV 다운로드
 *************************************************/

/* -----------------------------
   Vendor 리스트 불러오기
------------------------------ */
function getVendors() {
  return loadData("vendors") || [];
}

function saveVendors(list) {
  saveData("vendors", list);
}

/* Vendor 초기값 (처음 한 번만 생성) */
(function initVendors() {
  let v = getVendors();
  if (v.length === 0) {
    v = ["Vendor A", "Vendor B", "Vendor C"];
    saveVendors(v);
  }
})();

/* -----------------------------
   Outsourcing 불러오기/저장
------------------------------ */
function getOutsourcing() {
  return loadData("outsourcing") || [];
}

function saveOutsourcing(list) {
  saveData("outsourcing", list);
}

/*************************************************
 * OUTSOURCING 등록 처리
 *************************************************/
function onOutsourcing() {
  const outCode = document.getElementById("outOutCode").value.trim();
  const outName = document.getElementById("outOutName").value.trim();
  const outQtyStr = document.getElementById("outOutQty").value.trim();

  const inCode = document.getElementById("outInCode").value.trim();
  const inName = document.getElementById("outInName").value.trim();
  const inQtyStr = document.getElementById("outInQty").value.trim();

  const vendor = document.getElementById("outVendor").value.trim();

  const outQty = Number(outQtyStr);
  const inQty = Number(inQtyStr);

  if (!outCode || !inCode || !vendor || !outQty || !inQty) {
    return alert("모든 값을 입력하세요.");
  }

  if (inQty > outQty) {
    return alert("입고 수량(IN)은 출고 수량(OUT)보다 많을 수 없습니다.");
  }

  /* ---------- 1) OUT 재고 차감 ---------- */
  let stock = getStock();
  let outItem = stock.find(s => s.code === outCode);

  if (!outItem || outItem.qty < outQty) {
    return alert(`OUT 재고 부족: ${outCode}`);
  }

  outItem.qty -= outQty;
  outItem.lastUpdate = new Date().toLocaleString();

  /* ---------- 2) IN 재고 추가 ---------- */
  let inItem = stock.find(s => s.code === inCode);
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

  /* ---------- 3) 불량 계산 ---------- */
  const defect = outQty - inQty;

  /* ---------- 4) 기록 저장 ---------- */
  const now = new Date().toLocaleString();
  const list = getOutsourcing();

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
    updated: now,
  });

  saveOutsourcing(list);

  writeLog("OUTSOURCING", `OUT:${outCode} → IN:${inCode} / 불량:${defect} / vendor:${vendor}`);

  alert("외주 등록 완료!");
  loadPage("outsourcing");
}

/*************************************************
 * Outsourcing 테이블 렌더링
 *************************************************/
function renderOutsourcingPage() {
  const tbody = document.getElementById("outsourcingTableBody");
  if (!tbody) return;

  const list = getOutsourcing();
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

/*************************************************
 * Outsourcing CSV 다운로드
 *************************************************/
function downloadOutsourcingCSV() {
  const list = getOutsourcing();

  const headers = [
    "Date",
    "OutCode",
    "OutName",
    "QtyOut",
    "InCode",
    "InName",
    "QtyIn",
    "Defect",
    "Vendor",
    "Updated"
  ];

  const rows = list.map(r => [
    r.date, r.outCode, r.outName, r.outQty,
    r.inCode, r.inName, r.inQty, r.defect,
    r.vendor, r.updated
  ]);

  downloadCSV("outsourcing.csv", headers, rows);
}
/*************************************************
 * PART 11 — DASHBOARD MODULE
 * - 원자재 / 완제품 재고 합계
 * - 오늘 생산량
 * - 외주 불량률 (%)
 * - 최근 7일 입고 / 출고 / 생산 그래프
 *************************************************/

/* -----------------------------
   대시보드용 통계 계산
------------------------------ */
function getDashboardStats() {
  const stock = getStock();
  const prod = getProduction();
  const out = getOutsourcing();

  // VC* 가 아니면 원자재/반제품, VC* 이면 완제품으로 가정
  const totalRaw = stock
    .filter(i => !String(i.code || "").startsWith("VC"))
    .reduce((a, b) => a + (Number(b.qty) || 0), 0);

  const totalFinished = stock
    .filter(i => String(i.code || "").startsWith("VC"))
    .reduce((a, b) => a + (Number(b.qty) || 0), 0);

  const today = new Date().toLocaleDateString();

  const todayProd = prod
    .filter(p => p.date === today)
    .reduce((a, b) => a + (Number(b.qty) || 0), 0);

  const totalOutQty = out.reduce((a, b) => a + (Number(b.outQty) || 0), 0);
  const totalDefect = out.reduce((a, b) => a + (Number(b.defect) || 0), 0);
  const defectRate = totalOutQty === 0
    ? 0
    : Math.round((totalDefect / totalOutQty) * 100);

  return { totalRaw, totalFinished, todayProd, defectRate };
}

/* -----------------------------
   최근 N일 라벨 (예: 7일)
------------------------------ */
function getLastNDaysLabels(n) {
  const labels = [];
  const base = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString());
  }
  return labels;
}

/* -----------------------------
   일자별 합계 집계
   - list: purchase / outgoing / production 배열
   - days: 몇 일치 (예: 7)
------------------------------ */
function aggregateDaily(list, days) {
  const labels = getLastNDaysLabels(days);
  const map = {};
  labels.forEach(l => (map[l] = 0));

  list.forEach(item => {
    const d = item.date;
    if (map[d] != null) {
      map[d] += Number(item.qty) || 0;
    }
  });

  return labels.map(l => map[l]);
}

/* -----------------------------
   Chart.js 객체 보관/파괴
------------------------------ */
let dashboardCharts = [];

function destroyDashboardCharts() {
  dashboardCharts.forEach(c => c.destroy());
  dashboardCharts = [];
}

/*************************************************
 * 대시보드 렌더링
 *************************************************/
function renderDashboardPage() {
  const stat = getDashboardStats();

  const sRaw = document.getElementById("dashRaw");
  const sFin = document.getElementById("dashFinished");
  const sToday = document.getElementById("dashTodayProd");
  const sDef = document.getElementById("dashDefect");

  if (sRaw) sRaw.textContent = stat.totalRaw;
  if (sFin) sFin.textContent = stat.totalFinished;
  if (sToday) sToday.textContent = stat.todayProd;
  if (sDef) sDef.textContent = stat.defectRate + "%";

  // 그래프 다시 그리기 전에 모두 제거
  destroyDashboardCharts();

  const purchases = getPurchase();
  const outgoings = getOutgoing();
  const productions = getProduction();

  const labels = getLastNDaysLabels(7);
  const pData = aggregateDaily(purchases, 7);
  const oData = aggregateDaily(outgoings, 7);
  const prData = aggregateDaily(productions, 7);

  const ctxP = document.getElementById("chartPurchase");
  const ctxO = document.getElementById("chartOutgoing");
  const ctxPr = document.getElementById("chartProduction");

  if (ctxP) {
    dashboardCharts.push(
      new Chart(ctxP, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Purchase Qty",
              data: pData,
            },
          ],
        },
        options: {
          responsive: true,
        },
      })
    );
  }

  if (ctxO) {
    dashboardCharts.push(
      new Chart(ctxO, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Outgoing Qty",
              data: oData,
            },
          ],
        },
        options: {
          responsive: true,
        },
      })
    );
  }

  if (ctxPr) {
    dashboardCharts.push(
      new Chart(ctxPr, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Production Qty",
              data: prData,
            },
          ],
        },
        options: {
          responsive: true,
        },
      })
    );
  }
}
/*************************************************
 * PART 12 — RENDERING + NAVIGATION + INITIALIZE
 *************************************************/

/* -----------------------------
   메인 콘텐츠 렌더링
------------------------------ */
function renderContent() {
  const lang = state.lang;
  const page = state.page || "dashboard";
  const contentEl = document.getElementById("content");

  const tmpl = PageTemplates[page] || PageTemplates.dashboard;
  contentEl.innerHTML = tmpl(lang);

  // 페이지별 후처리
  if (page === "stock")       renderStockPage();
  else if (page === "purchase")   renderPurchasePage();
  else if (page === "outgoing")   renderOutgoingPage();
  else if (page === "production") renderProductionPage();
  else if (page === "bom")        renderBOMPage();
  else if (page === "outsourcing")renderOutsourcingPage();
  else if (page === "finished")   renderFGPage();
  else if (page === "logs")       renderLogsPage();
  else if (page === "suppliers")  renderSupplierPage();
  else if (page === "dashboard")  renderDashboardPage();
}

/* -----------------------------
   사이드바 렌더링 (언어에 따라 메뉴 텍스트 변경)
------------------------------ */
function renderSidebar() {
  const lang = state.lang;
  const t = i18n[lang].sidebar;
  const items = document.querySelectorAll(".sidebar li");

  items.forEach((li, idx) => {
    const pageId = MENU_ORDER[idx];
    li.dataset.page = pageId;
    // i18n에 없는 키 보호
    if (t && t[pageId]) {
      li.textContent = t[pageId];
    } else {
      li.textContent = pageId;
    }
    li.classList.toggle("active", pageId === state.page);
  });
}

/* -----------------------------
   헤더 로고 언어 반영
------------------------------ */
function renderHeader() {
  const logoEl = document.querySelector(".logo");
  if (logoEl && i18n[state.lang]) {
    logoEl.textContent = i18n[state.lang].appTitle;
  }
}

/* -----------------------------
   전체 리렌더
------------------------------ */
function rerenderAll() {
  renderHeader();
  renderSidebar();
  renderContent();
}

/*************************************************
 * NAV / LANGUAGE
 *************************************************/

/* -----------------------------
   언어 변경
------------------------------ */
function setLanguage(lang) {
  if (!LANGS.includes(lang)) return;
  state.lang = lang;
  localStorage.setItem("htori_lang", lang);
  rerenderAll();
}

/* -----------------------------
   페이지 변경
------------------------------ */
function loadPage(pageId) {
  if (!PageTemplates[pageId]) pageId = "dashboard";
  state.page = pageId;
  localStorage.setItem("htori_page", pageId);
  rerenderAll();
}

/*************************************************
 * INITIAL + WINDOW EXPORTS
 *************************************************/

/* -----------------------------
   DOMContentLoaded 시 초기 렌더
------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  rerenderAll();
});

/* -----------------------------
   전역 함수로 노출 (HTML onclick 에서 사용)
------------------------------ */
window.setLanguage = setLanguage;
window.loadPage = loadPage;

// 메인 기능들
window.onPurchase = onPurchase;
window.onOutgoing = onOutgoing;
window.onProduction = onProduction;
window.onOutsourcing = onOutsourcing;

window.saveBOMItem = saveBOMItem;
window.editStockQty = editStockQty;
window.editPurchase = editPurchase;
window.editProduction = editProduction;

window.downloadPurchaseCSV = downloadPurchaseCSV;
window.downloadOutgoingCSV = downloadOutgoingCSV;
window.downloadProductionCSV = downloadProductionCSV;

window.addSupplier = addSupplier;
window.deleteSupplier = deleteSupplier;
window.openSupplierModal = openSupplierModal;
window.closeSupplierModal = closeSupplierModal;
window.saveSupplierEdit = saveSupplierEdit;
window.payAP = payAP;
window.setSupplierChart = setSupplierChart;
window.exportSuppliersPDF = exportSuppliersPDF;

// 백업/복원
window.backupData = backupData;
window.restoreDataOpen = restoreDataOpen;

/*************************************************
 * (선택) 해시 기반 라우팅 지원
 *  - URL을 /#!/purchase 이런 식으로 써도 동작하게
 *************************************************/
window.addEventListener("hashchange", () => {
  const path = location.hash.replace("#!", "");
  if (path && path.length > 1) {
    loadPage(path.replace("/", ""));
  }
});

// 첫 로드시 hash 있으면 반영
window.addEventListener("load", () => {
  const path = location.hash.replace("#!", "");
  if (path && path.length > 1) {
    loadPage(path.replace("/", ""));
  }
});
