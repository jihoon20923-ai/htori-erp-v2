/*************************************************
 * HTORI ERP – Full Single Page App
 * - Multi Language (간단 EN/KR/ID)
 * - Stock / Purchase / Outgoing / Production / BOM / Outsourcing
 * - Supplier + Unit Price + Currency
 * - Logs 자동 기록
 * - Dashboard: 입고/출고/생산 그래프 분리
 * - Supplier 관리 페이지
 * - Finished Goods 관리
 * - CSV(Excel) 다운로드
 *************************************************/

/*************************************************
 * GLOBAL STATE
 *************************************************/
const LANGS = ["EN", "KR", "ID"];

const state = {
  lang: localStorage.getItem("htori_lang") || "EN",
  page: localStorage.getItem("htori_page") || "dashboard",
};

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
    },
  },
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
  "employees",
  "attendance",
  "payroll",
  "logs",
  "suppliers",
  "settings",
];

/*************************************************
 * COMMON HELPERS
 *************************************************/
function writeLog(action, detail) {
  const logs = getLogs();
  logs.unshift({
    time: new Date().toLocaleString(),
    action,
    detail,
  });
  saveLogs(logs);
}

/* CSV 다운로드 (Excel로 열 수 있음) */
function downloadCSV(filename, headers, rows) {
  let csv = "";
  if (headers && headers.length) csv += headers.join(",") + "\n";
  rows.forEach(r => {
    csv += r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/*************************************************
 * LOGS MODULE
 *************************************************/
function getLogs() {
  return JSON.parse(localStorage.getItem("logs") || "[]");
}
function saveLogs(list) {
  localStorage.setItem("logs", JSON.stringify(list));
}
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
 * SUPPLIER MODULE
 *************************************************/
function getSuppliers() {
  return JSON.parse(localStorage.getItem("suppliers") || "[]");
}
function saveSuppliers(list) {
  localStorage.setItem("suppliers", JSON.stringify(list));
}
(function initSuppliers() {
  let s = getSuppliers();
  if (s.length === 0) {
    s = ["Supplier A", "Supplier B", "Supplier C"];
    saveSuppliers(s);
  }
})();

function renderSupplierPage() {
  const ul = document.getElementById("supplierList");
  if (!ul) return;
  const list = getSuppliers();
  ul.innerHTML = "";
  list.forEach(s => {
    ul.innerHTML += `<li>${s}</li>`;
  });
}

function addSupplier() {
  const input = document.getElementById("newSupplier");
  const name = input.value.trim();
  if (!name) return alert("공급업체명을 입력하세요.");
  const list = getSuppliers();
  if (list.includes(name)) return alert("이미 존재합니다.");
  list.push(name);
  saveSuppliers(list);
  writeLog("SUPPLIER ADD", name);
  input.value = "";
  renderSupplierPage();
}

function deleteSupplier() {
  const input = document.getElementById("newSupplier");
  const name = input.value.trim();
  if (!name) return alert("삭제할 공급업체명을 입력하세요.");
  let list = getSuppliers();
  if (!list.includes(name)) return alert("해당 공급업체가 없습니다.");
  list = list.filter(s => s !== name);
  saveSuppliers(list);
  writeLog("SUPPLIER DELETE", name);
  input.value = "";
  renderSupplierPage();
}

/*************************************************
 * STOCK MODULE
 *************************************************/
function getStock() {
  return JSON.parse(localStorage.getItem("stock") || "[]");
}
function saveStock(s) {
  localStorage.setItem("stock", JSON.stringify(s));
}

function updateStock(code, name, qty) {
  let s = getStock();
  qty = Number(qty);
  const now = new Date().toLocaleString();
  let item = s.find(i => i.code === code);
  if (item) {
    item.qty += qty;
    item.lastUpdate = now;
  } else {
    s.push({
      code,
      name,
      qty,
      minQty: 0,
      unit: "SET",
      lastUpdate: now,
    });
  }
  saveStock(s);
}

function editStockQty(code) {
  let s = getStock();
  let i = s.find(x => x.code === code);
  if (!i) return alert("재고 없음.");
  const newQtyStr = prompt("새 수량:", i.qty);
  if (newQtyStr === null) return;
  const n = Number(newQtyStr);
  if (isNaN(n) || n < 0) return alert("올바른 수량 아님.");
  i.qty = n;
  i.lastUpdate = new Date().toLocaleString();
  saveStock(s);
  writeLog("STOCK EDIT", `${code} → ${n}`);
  loadPage("stock");
}

function renderStockPage() {
  const tbody = document.getElementById("stockTableBody");
  if (!tbody) return;
  const stock = getStock();
  tbody.innerHTML = "";
  stock.forEach(i => {
    tbody.innerHTML += `
      <tr>
        <td>${i.code}</td>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>${i.minQty || 0}</td>
        <td>${i.unit || "SET"}</td>
        <td>${i.lastUpdate || ""}</td>
        <td><button class="btn-mini" onclick="editStockQty('${i.code}')">수정</button></td>
      </tr>
    `;
  });
}

/*************************************************
 * PURCHASE MODULE (기록 + 수정 + CSV)
 *************************************************/
function getPurchase() {
  return JSON.parse(localStorage.getItem("purchase") || "[]");
}
function savePurchase(list) {
  localStorage.setItem("purchase", JSON.stringify(list));
}

function onPurchase() {
  const code = document.getElementById("pCode").value.trim();
  const name = document.getElementById("pName").value.trim();
  const qtyStr = document.getElementById("pQty").value.trim();
  const priceStr = document.getElementById("pPrice").value.trim();
  const currency = document.getElementById("pCurrency").value.trim();
  const supplier = document.getElementById("pSupplier").value.trim();

  const qty = Number(qtyStr);
  const price = Number(priceStr);

  if (!code || !name || !qty || !price) return alert("모든 값을 입력하세요.");

  updateStock(code, name, qty);
  writeLog("PURCHASE", `${supplier} / ${code} ${qty} EA @ ${price} ${currency}`);

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
        <td><button class="btn-mini" onclick="editPurchase(${idx})">수정</button></td>
      </tr>
    `;
  });
}

function editPurchase(index) {
  let list = getPurchase();
  let p = list[index];
  const newQtyStr = prompt("새 수량:", p.qty);
  const newPriceStr = prompt("새 단가:", p.price);
  if (newQtyStr === null || newPriceStr === null) return;

  const newQty = Number(newQtyStr);
  const newPrice = Number(newPriceStr);
  if (isNaN(newQty) || newQty <= 0 || isNaN(newPrice) || newPrice <= 0) {
    return alert("올바른 숫자를 입력하세요.");
  }

  const diff = newQty - p.qty;
  let stock = getStock();
  let item = stock.find(i => i.code === p.code);
  if (!item && diff < 0) return alert("재고 부족.");
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

  writeLog("PURCHASE EDIT", `${p.code} qty->${newQty}, price->${newPrice}`);
  loadPage("purchase");
}

/* Purchase CSV 다운로드 */
function downloadPurchaseCSV() {
  const list = getPurchase();
  const headers = ["Date","Supplier","Code","Name","Qty","Price","Currency","Updated"];
  const rows = list.map(p => [p.date,p.supplier,p.code,p.name,p.qty,p.price,p.currency,p.updated]);
  downloadCSV("purchase.csv", headers, rows);
}

/*************************************************
 * OUTGOING MODULE (기록 + CSV)
 *************************************************/
function getOutgoing() {
  return JSON.parse(localStorage.getItem("outgoing") || "[]");
}
function saveOutgoing(list) {
  localStorage.setItem("outgoing", JSON.stringify(list));
}

function onOutgoing() {
  const code = document.getElementById("oCode").value.trim();
  const name = document.getElementById("oName").value.trim();
  const qtyStr = document.getElementById("oQty").value.trim();
  const qty = Number(qtyStr);
  if (!code || !name || !qty) return alert("모두 입력하세요.");
  let stock = getStock();
  let item = stock.find(i => i.code === code);
  if (!item) return alert("해당 재고 없음.");
  if (item.qty < qty) return alert("재고 부족.");

  item.qty -= qty;
  item.lastUpdate = new Date().toLocaleString();
  saveStock(stock);

  // outgoing 기록
  const out = getOutgoing();
  out.push({
    date: new Date().toLocaleDateString(),
    code,
    name,
    qty,
    updated: new Date().toLocaleString(),
  });
  saveOutgoing(out);

  writeLog("OUTGOING", `${code} ${qty} 출고`);
  alert("출고 완료!");
  loadPage("outgoing");
}

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

function downloadOutgoingCSV() {
  const list = getOutgoing();
  const headers = ["Date","Code","Name","Qty","Updated"];
  const rows = list.map(o => [o.date,o.code,o.name,o.qty,o.updated]);
  downloadCSV("outgoing.csv", headers, rows);
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
function saveBOMItem() {
  const product = document.getElementById("bomProduct").value.trim();
  const matCode = document.getElementById("bomMatCode").value.trim();
  const matName = document.getElementById("bomMatName").value.trim();
  const qtyStr = document.getElementById("bomQty").value.trim();
  const qty = Number(qtyStr);

  if (!product || !matCode || !matName || !qty) return alert("모두 입력.");

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
  loadPage("bom");
}
function getBomForProduct(product) {
  return getBOM().filter(b => b.product === product);
}
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
 * PRODUCTION MODULE (기록 + 수정 + CSV)
 *************************************************/
function getProduction() {
  return JSON.parse(localStorage.getItem("production") || "[]");
}
function saveProduction(list) {
  localStorage.setItem("production", JSON.stringify(list));
}

function runProduction(product, qty) {
  qty = Number(qty);
  if (!product || !qty) return false;
  const bomList = getBomForProduct(product);
  if (bomList.length === 0) {
    alert("BOM 없음.");
    return false;
  }
  let stock = getStock();
  // 재고 체크
  for (const b of bomList) {
    const need = b.qty * qty;
    const mat = stock.find(s => s.code === b.matCode);
    if (!mat || mat.qty < need) {
      alert(`재고 부족: ${b.matCode} / 필요:${need}, 현재:${mat ? mat.qty : 0}`);
      return false;
    }
  }
  // 자재 차감
  bomList.forEach(b => {
    const need = b.qty * qty;
    const mat = stock.find(s => s.code === b.matCode);
    mat.qty -= need;
    mat.lastUpdate = new Date().toLocaleString();
  });
  // 완제품 증가 (코드 = product)
  let fg = stock.find(s => s.code === product);
  if (!fg) {
    stock.push({
      code: product,
      name: product,
      qty,
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

function onProduction() {
  const product = document.getElementById("prodProduct").value.trim();
  const qtyStr = document.getElementById("prodQty").value.trim();
  const qty = Number(qtyStr);
  if (!product || !qty) return alert("모두 입력.");
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
  writeLog("PRODUCTION", `${product} ${qty} 생산`);
  alert("생산 등록 완료.");
  loadPage("production");
}

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

function editProduction(index) {
  let list = getProduction();
  let p = list[index];
  const newQtyStr = prompt("새 생산 수량:", p.qty);
  if (newQtyStr === null) return;
  const newQty = Number(newQtyStr);
  if (isNaN(newQty) || newQty <= 0) return alert("올바른 수량 아님.");
  const diff = newQty - p.qty;
  if (diff === 0) return;

  // diff > 0 추가 생산, diff < 0 생산 취소
  let stock = getStock();
  const bomList = getBomForProduct(p.product);
  if (bomList.length === 0) return alert("BOM 없음.");

  if (diff > 0) {
    // 추가 생산 → 추가 자재 필요
    for (const b of bomList) {
      const need = b.qty * diff;
      const mat = stock.find(s => s.code === b.matCode);
      if (!mat || mat.qty < need) {
        return alert(`재고 부족: ${b.matCode} 필요:${need}, 현재:${mat ? mat.qty : 0}`);
      }
    }
    bomList.forEach(b => {
      const need = b.qty * diff;
      const mat = stock.find(s => s.code === b.matCode);
      mat.qty -= need;
      mat.lastUpdate = new Date().toLocaleDateString();
    });
    let fg = stock.find(s => s.code === p.product);
    if (!fg) {
      stock.push({
        code: p.product,
        name: p.product,
        qty: diff,
        minQty: 0,
        unit: "SET",
        lastUpdate: new Date().toLocaleString(),
      });
    } else {
      fg.qty += diff;
      fg.lastUpdate = new Date().toLocaleString();
    }
  } else {
    // 생산 감소 → 자재 되돌려 넣기
    const backDiff = -diff;
    bomList.forEach(b => {
      const back = b.qty * backDiff;
      let mat = stock.find(s => s.code === b.matCode);
      if (!mat) {
        mat = {
          code: b.matCode,
          name: b.matName,
          qty: back,
          minQty: 0,
          unit: "SET",
          lastUpdate: new Date().toLocaleString(),
        };
        stock.push(mat);
      } else {
        mat.qty += back;
        mat.lastUpdate = new Date().toLocaleString();
      }
    });
    let fg = stock.find(s => s.code === p.product);
    if (fg) {
      fg.qty -= backDiff;
      if (fg.qty < 0) fg.qty = 0;
      fg.lastUpdate = new Date().toLocaleString();
    }
  }

  saveStock(stock);

  p.qty = newQty;
  p.updated = new Date().toLocaleString();
  saveProduction(list);
  writeLog("PRODUCTION EDIT", `${p.product} → ${newQty}`);
  alert("생산 수정 완료.");
  loadPage("production");
}

function downloadProductionCSV() {
  const list = getProduction();
  const headers = ["Date","Product","Qty","Updated"];
  const rows = list.map(p => [p.date,p.product,p.qty,p.updated]);
  downloadCSV("production.csv", headers, rows);
}

/*************************************************
 * OUTSOURCING MODULE
 *************************************************/
function getVendors() {
  return JSON.parse(localStorage.getItem("vendors") || "[]");
}
function saveVendors(list) {
  localStorage.setItem("vendors", JSON.stringify(list));
}
(function initVendors() {
  let v = getVendors();
  if (v.length === 0) {
    v = ["Vendor A", "Vendor B", "Vendor C"];
    saveVendors(v);
  }
})();

function getOutsourcing() {
  return JSON.parse(localStorage.getItem("outsourcing") || "[]");
}
function saveOutsourcing(list) {
  localStorage.setItem("outsourcing", JSON.stringify(list));
}

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
  if (inQty > outQty) return alert("입고 수량이 출고보다 많을 수 없음.");

  let stock = getStock();
  let outItem = stock.find(s => s.code === outCode);
  if (!outItem || outItem.qty < outQty) {
    return alert("OUT 재고 부족.");
  }

  outItem.qty -= outQty;
  outItem.lastUpdate = new Date().toLocaleString();

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

  const defect = outQty - inQty;
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

  writeLog("OUTSOURCING", `OUT:${outCode} → IN:${inCode}, 불량:${defect}, vendor:${vendor}`);
  alert("외주 등록 완료.");
  loadPage("outsourcing");
}

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
 * FINISHED GOODS VIEW (VC* 코드만)
 *************************************************/
function renderFGPage() {
  const tbody = document.getElementById("fgTableBody");
  if (!tbody) return;
  const stock = getStock().filter(i => i.code.startsWith("VC"));
  tbody.innerHTML = "";
  stock.forEach(i => {
    tbody.innerHTML += `
      <tr>
        <td>${i.code}</td>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td><button class="btn-mini" onclick="editStockQty('${i.code}')">수정</button></td>
      </tr>
    `;
  });
}

/*************************************************
 * DASHBOARD (통계 + 입고/출고/생산 그래프)
 *************************************************/
function getDashboardStats() {
  const stock = getStock();
  const prod = getProduction();
  const out = getOutsourcing();

  const totalRaw = stock
    .filter(i => !i.code.startsWith("VC"))
    .reduce((a, b) => a + (Number(b.qty) || 0), 0);
  const totalFinished = stock
    .filter(i => i.code.startsWith("VC"))
    .reduce((a, b) => a + (Number(b.qty) || 0), 0);
  const today = new Date().toLocaleDateString();
  const todayProd = prod
    .filter(p => p.date === today)
    .reduce((a,b)=>a + (Number(b.qty) || 0),0);

  const totalOutQty = out.reduce((a,b)=>a + (Number(b.outQty) || 0),0);
  const totalDefect = out.reduce((a,b)=>a + (Number(b.defect) || 0),0);
  const defectRate = totalOutQty === 0 ? 0 : Math.round((totalDefect / totalOutQty) * 100);

  return { totalRaw, totalFinished, todayProd, defectRate };
}

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

function aggregateDaily(list, days) {
  const labels = getLastNDaysLabels(days);
  const map = {};
  labels.forEach(l => (map[l] = 0));
  list.forEach(item => {
    if (map[item.date] != null) {
      map[item.date] += Number(item.qty) || 0;
    }
  });
  return labels.map(l => map[l]);
}

let dashboardCharts = [];

function destroyDashboardCharts() {
  dashboardCharts.forEach(c => c.destroy());
  dashboardCharts = [];
}

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

  // 그래프
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
    dashboardCharts.push(new Chart(ctxP, {
      type: "bar",
      data: {
        labels,
        datasets: [{ label: "Purchase Qty", data: pData }]
      }
    }));
  }
  if (ctxO) {
    dashboardCharts.push(new Chart(ctxO, {
      type: "bar",
      data: {
        labels,
        datasets: [{ label: "Outgoing Qty", data: oData }]
      }
    }));
  }
  if (ctxPr) {
    dashboardCharts.push(new Chart(ctxPr, {
      type: "bar",
      data: {
        labels,
        datasets: [{ label: "Production Qty", data: prData }]
      }
    }));
  }
}

/*************************************************
 * PAGE TEMPLATES
 *************************************************/
const PageTemplates = {
  dashboard(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.dashboardTitle}</h2>
      <p>${t.dashboardDesc}</p>

      <div class="cards">
        <div class="card">
          <div class="card-label">원자재 재고</div>
          <div class="card-value" id="dashRaw">0</div>
        </div>
        <div class="card">
          <div class="card-label">완제품 재고</div>
          <div class="card-value" id="dashFinished">0</div>
        </div>
        <div class="card">
          <div class="card-label">오늘 생산량</div>
          <div class="card-value" id="dashTodayProd">0</div>
        </div>
        <div class="card">
          <div class="card-label">외주 불량률</div>
          <div class="card-value" id="dashDefect">0%</div>
        </div>
      </div>

      <div class="chart-grid">
        <div>
          <h3>입고 (7일)</h3>
          <canvas id="chartPurchase"></canvas>
        </div>
        <div>
          <h3>출고 (7일)</h3>
          <canvas id="chartOutgoing"></canvas>
        </div>
        <div>
          <h3>생산 (7일)</h3>
          <canvas id="chartProduction"></canvas>
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
            <th>Code</th><th>Name</th><th>Qty</th><th>Min</th><th>Unit</th><th>Updated</th><th>Edit</th>
          </tr>
        </thead>
        <tbody id="stockTableBody"></tbody>
      </table>
    `;
  },

  purchase(lang) {
    const t = i18n[lang].pages;
    const suppliers = getSuppliers();
    return `
      <h2>${t.purchaseTitle}</h2>
      <p>${t.purchaseDesc}</p>

      <div class="form-row">
        <input id="pCode" placeholder="${t.purchaseFormCodePlaceholder}">
        <input id="pName" placeholder="${t.purchaseFormNamePlaceholder}">
        <input id="pQty" type="number" placeholder="${t.purchaseFormQtyPlaceholder}">
        <input id="pPrice" type="number" placeholder="Unit Price">
        <select id="pCurrency">
          <option value="USD">USD</option>
          <option value="IDR">IDR</option>
          <option value="KRW">KRW</option>
        </select>
        <select id="pSupplier">
          ${suppliers.map(s => `<option value="${s}">${s}</option>`).join("")}
        </select>
        <button onclick="onPurchase()" class="btn-primary">입고 등록</button>
        <button onclick="downloadPurchaseCSV()" class="btn-secondary">Excel 다운로드</button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>Date</th><th>Supplier</th><th>Code</th><th>Name</th>
            <th>Qty</th><th>Price</th><th>Cur</th><th>Updated</th><th>Edit</th>
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
        <button onclick="onOutgoing()" class="btn-secondary">출고</button>
        <button onclick="downloadOutgoingCSV()" class="btn-secondary">Excel 다운로드</button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr><th>Date</th><th>Code</th><th>Name</th><th>Qty</th><th>Updated</th></tr>
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
        <input id="prodProduct" placeholder="Product (완제품 코드)">
        <input id="prodQty" type="number" placeholder="Qty">
        <button onclick="onProduction()" class="btn-primary">생산 등록</button>
        <button onclick="downloadProductionCSV()" class="btn-secondary">Excel 다운로드</button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr><th>Date</th><th>Product</th><th>Qty</th><th>Updated</th><th>Edit</th></tr>
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
        <button onclick="saveBOMItem()" class="btn-primary">BOM 저장</button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr><th>Product</th><th>MatCode</th><th>MatName</th><th>Qty</th><th>Updated</th></tr>
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
        <input id="outOutCode" placeholder="Out Code">
        <input id="outOutName" placeholder="Out Name">
        <input id="outOutQty" type="number" placeholder="Qty Out">

        <h3>IN</h3>
        <input id="outInCode" placeholder="In Code">
        <input id="outInName" placeholder="In Name">
        <input id="outInQty" type="number" placeholder="Qty In">

        <h3>Vendor</h3>
        <select id="outVendor">
          ${vendors.map(v => `<option value="${v}">${v}</option>`).join("")}
        </select>

        <button onclick="onOutsourcing()" class="btn-primary" style="margin-top:10px;">외주 등록</button>
      </div>

      <table class="erp-table" style="margin-top:20px;">
        <thead>
          <tr>
            <th>Date</th><th>OutCode</th><th>OutName</th><th>QtyOut</th>
            <th>InCode</th><th>InName</th><th>QtyIn</th><th>Defect</th><th>Vendor</th><th>Updated</th>
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
          <tr><th>Code</th><th>Name</th><th>Qty</th><th>Edit</th></tr>
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
        <button onclick="addSupplier()" class="btn-primary">추가</button>
        <button onclick="deleteSupplier()" class="btn-secondary">삭제</button>
      </div>

      <ul id="supplierList" style="margin-top:10px;"></ul>
    `;
  },

  logs(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.logsTitle}</h2>
      <p>${t.logsDesc}</p>

      <table class="erp-table">
        <thead>
          <tr><th>Time</th><th>Action</th><th>Detail</th></tr>
        </thead>
        <tbody id="logsTableBody"></tbody>
      </table>
    `;
  },

  employees() {
    return "<h2>직원 (추후 구현)</h2>";
  },
  attendance() {
    return "<h2>근태 (추후 구현)</h2>";
  },
  payroll() {
    return "<h2>급여 (추후 구현)</h2>";
  },
  settings(lang) {
    const t = i18n[lang].pages;
    return `
      <h2>${t.settingsTitle}</h2>
      <p>${t.settingsDesc}</p>
      <p>언어 변경은 상단 버튼 사용.</p>
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

  // 페이지별 후처리
  if (page === "stock") renderStockPage();
  else if (page === "purchase") renderPurchasePage();
  else if (page === "outgoing") renderOutgoingPage();
  else if (page === "production") renderProductionPage();
  else if (page === "bom") renderBOMPage();
  else if (page === "outsourcing") renderOutsourcingPage();
  else if (page === "finished") renderFGPage();
  else if (page === "logs") renderLogsPage();
  else if (page === "suppliers") renderSupplierPage();
  else if (page === "dashboard") renderDashboardPage();
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
  if (logoEl) logoEl.textContent = i18n[state.lang].appTitle;
}

function rerenderAll() {
  renderHeader();
  renderSidebar();
  renderContent();
}

/*************************************************
 * NAV / LANGUAGE
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

// 전역 함수 노출
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
