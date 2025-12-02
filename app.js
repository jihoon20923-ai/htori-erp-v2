/*************************************************
 * SUPPLIER MODULE (상세정보 + 통계 + AP 결제)
 *************************************************/

// 기본 구조: name, vendorName, contactPerson, email, address, phone,
// bankName, bankAccount, bankHolder
function getSuppliers() {
  let raw = JSON.parse(localStorage.getItem("suppliers") || "[]");

  // 옛날 버전 호환 (문자열 배열 또는 필드 부족한 객체)
  raw = raw.map(old => ({
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

  return raw;
}

function saveSuppliers(list) {
  localStorage.setItem("suppliers", JSON.stringify(list));
}

// 초기 더미 데이터
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
 * AP(미지급) 결제 기록
 * - purchase: 총 구매금액
 * - payments: 총 결제금액
 * - outstanding: purchase - payments
 *************************************************/
function getSupplierPayments() {
  return JSON.parse(localStorage.getItem("supplierPayments") || "[]");
}

function saveSupplierPayments(list) {
  localStorage.setItem("supplierPayments", JSON.stringify(list));
}

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
 * Supplier 통계 계산 (총 수량 / 총 금액 / 총 결제 / 미지급)
 *************************************************/
function getSupplierStats(name) {
  const purchase = JSON.parse(localStorage.getItem("purchase") || "[]");
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
 * Supplier 월별 통계 (그래프용)
 * - 최근 6개월 기준
 *************************************************/
function getSupplierMonthlyData(name, months = 6) {
  const purchase = JSON.parse(localStorage.getItem("purchase") || "[]");
  const labels = [];
  const qtyMap = {};
  const amountMap = {};

  const now = new Date();
  // 최근 N개월 라벨: YYYY-MM
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
    // p.date가 YYYY-MM-DD 형태라고 가정
    const d = new Date(p.date || p.updated || new Date());
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (qtyMap[key] != null) {
      const qty = Number(p.qty) || 0;
      const price = Number(p.price) || 0;
      qtyMap[key] += qty;
      amountMap[key] += qty * price;
    }
  });

  const qtyData = labels.map(k => qtyMap[k]);
  const amountData = labels.map(k => amountMap[k]);

  return { labels, qtyData, amountData };
}

/*************************************************
 * Supplier 테이블 렌더
 *************************************************/
let supplierChart = null;        // Supplier 전용 차트 객체
let selectedSupplierForChart = ""; // 현재 그래프용 선택 supplier

function renderSupplierPage() {
  const tbody = document.getElementById("supplierTableBody");
  if (!tbody) return;

  const list = getSuppliers();
  tbody.innerHTML = "";

  list.forEach(s => {
    const stat = getSupplierStats(s.name);

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
        <td>${stat.totalQty}</td>
        <td>${stat.totalAmount.toLocaleString()}</td>
        <td>${stat.totalPaid.toLocaleString()}</td>
        <td>${stat.outstanding.toLocaleString()}</td>
        <td>
          <button class="btn-mini" onclick="openSupplierModal('${s.name}')">수정</button>
          <button class="btn-mini" onclick="setSupplierChart('${s.name}')">그래프</button>
        </td>
      </tr>
    `;
  });

  // 기본 선택: 첫 번째 supplier
  if (!selectedSupplierForChart && list.length > 0) {
    selectedSupplierForChart = list[0].name;
  }
  if (selectedSupplierForChart) {
    renderSupplierChart(selectedSupplierForChart);
  }
}

/*************************************************
 * Supplier 추가
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

  if (!name) return alert("공급업체명을 입력하세요.");

  const list = getSuppliers();
  if (list.some(s => s.name === name)) {
    return alert("이미 존재하는 공급업체입니다.");
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
 * Supplier 삭제
 *************************************************/
function deleteSupplier(nameOverride) {
  const name = nameOverride || document.getElementById("newSupplier").value.trim();
  if (!name) return alert("삭제할 공급업체명을 입력하거나 테이블의 삭제 버튼을 사용하세요.");

  let list = getSuppliers();
  if (!list.some(s => s.name === name)) return alert("해당 공급업체가 없습니다.");

  list = list.filter(s => s.name !== name);
  saveSuppliers(list);
  writeLog("SUPPLIER DELETE", name);

  if (selectedSupplierForChart === name) {
    selectedSupplierForChart = "";
  }

  renderSupplierPage();
}

/*************************************************
 * Supplier 수정 팝업
 *************************************************/
function openSupplierModal(name) {
  const list = getSuppliers();
  const s = list.find(x => x.name === name);
  if (!s) return;

  document.getElementById("editSupplierName").value = s.name;
  document.getElementById("editVendorName").value = s.vendorName || "";
  document.getElementById("editContactPerson").value = s.contactPerson || "";
  document.getElementById("editEmail").value = s.email || "";
  document.getElementById("editAddress").value = s.address || "";
  document.getElementById("editPhone").value = s.phone || "";
  document.getElementById("editBankName").value = s.bankName || "";
  document.getElementById("editBankAccount").value = s.bankAccount || "";
  document.getElementById("editBankHolder").value = s.bankHolder || "";

  const modal = document.getElementById("supplierModal");
  modal.style.display = "block";
}

function closeSupplierModal() {
  const modal = document.getElementById("supplierModal");
  modal.style.display = "none";
}

function saveSupplierEdit() {
  const name = document.getElementById("editSupplierName").value.trim();
  const vendorName = document.getElementById("editVendorName").value.trim();
  const contactPerson = document.getElementById("editContactPerson").value.trim();
  const email = document.getElementById("editEmail").value.trim();
  const address = document.getElementById("editAddress").value.trim();
  const phone = document.getElementById("editPhone").value.trim();
  const bankName = document.getElementById("editBankName").value.trim();
  const bankAccount = document.getElementById("editBankAccount").value.trim();
  const bankHolder = document.getElementById("editBankHolder").value.trim();

  let list = getSuppliers();
  const s = list.find(x => x.name === name);
  if (!s) return alert("Supplier not found.");

  s.vendorName = vendorName;
  s.contactPerson = contactPerson;
  s.email = email;
  s.address = address;
  s.phone = phone;
  s.bankName = bankName;
  s.bankAccount = bankAccount;
  s.bankHolder = bankHolder;

  saveSuppliers(list);
  writeLog("SUPPLIER EDIT", name);

  closeSupplierModal();
  renderSupplierPage();
}

/*************************************************
 * AP 결제 처리
 *************************************************/
function payAP() {
  const name = document.getElementById("editSupplierName").value.trim();
  const amountStr = document.getElementById("apPayAmount").value.trim();
  const amount = Number(amountStr);
  if (!name) return alert("Supplier 없음.");
  if (!amountStr || isNaN(amount) || amount <= 0) return alert("올바른 결제 금액을 입력하세요.");

  addSupplierPayment(name, amount);
  writeLog("SUPPLIER PAYMENT", `${name} pay ${amount}`);

  document.getElementById("apPayAmount").value = "";
  renderSupplierPage();
}

/*************************************************
 * Supplier 월별 그래프 (Chart.js)
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

  if (supplierChart) {
    supplierChart.destroy();
  }

  supplierChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Qty",
          data: qtyData,
          yAxisID: "yQty",
        },
        {
          label: "Amount",
          data: amountData,
          yAxisID: "yAmount",
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Monthly Purchase - ${name}`
        }
      },
      scales: {
        yQty: {
          type: "linear",
          position: "left",
          beginAtZero: true,
        },
        yAmount: {
          type: "linear",
          position: "right",
          beginAtZero: true,
          grid: { drawOnChartArea: false }
        }
      }
    }
  });
}

/*************************************************
 * Supplier PDF Export
 *************************************************/
async function exportSuppliersPDF() {
  const tableWrapper = document.getElementById("supplierSection");
  if (!tableWrapper) {
    alert("Supplier 영역을 찾을 수 없습니다.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("l", "mm", "a4");

  const canvas = await html2canvas(tableWrapper, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth - 20;
  const imgHeight = canvas.height * imgWidth / canvas.width;

  pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
  pdf.save("suppliers.pdf");
  writeLog("SUPPLIER PDF", "Export suppliers.pdf");
}
