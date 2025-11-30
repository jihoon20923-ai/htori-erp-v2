// app.js — HTORI ERP v2 (Stock + Purchase + Outgoing + Production)

// -------------------------
// 1. Firebase 초기화
// -------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  update,
  push
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1O8MltMEonyhbOXxYt1qN_PqQ9BqpI4M",
  authDomain: "htori-erp.firebaseapp.com",
  databaseURL: "https://htori-erp-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "htori-erp",
  storageBucket: "htori-erp.firebasestorage.app",
  messagingSenderId: "548265375862",
  appId: "1:548265375862:web:01acd31b9c4c42cfc6c757"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// 메뉴에서 쓸 수 있게 window에 노출
window.loadPage = loadPage;

// 처음 로딩 시
document.addEventListener("DOMContentLoaded", () => {
  loadPage("dashboard");
});

// -------------------------
// 2. 메뉴 라우팅
// -------------------------
function loadPage(page) {
  if (page === "stock") return renderStockPage();
  if (page === "purchase") return renderPurchasePage();
  if (page === "outgoing") return renderOutgoingPage();
  if (page === "production") return renderProductionPage();

  // 기본
  renderDashboard();
}

// -------------------------
// 3. Dashboard
// -------------------------
function renderDashboard() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Dashboard</h2>
    <p>왼쪽 메뉴에서 기능을 선택하세요.</p>
    <ul>
      <li><b>Purchase</b> : 입고 → 재고 증가</li>
      <li><b>Outgoing</b> : 출고 → 재고 감소</li>
      <li><b>Stock</b> : 현재 재고 확인</li>
      <li><b>Production</b> : 원자재 차감 + 완제품 증가</li>
    </ul>
  `;
}

// =========================
// 4. STOCK 화면
// =========================
async function renderStockPage() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Stock</h2>
    <p>Firebase의 <code>materials</code> 데이터를 조회합니다.</p>
    <div id="stock-table-wrapper">Loading...</div>
  `;

  const snap = await get(ref(db, "materials"));
  if (!snap.exists()) {
    document.getElementById("stock-table-wrapper").innerHTML = `
      <p>재고 데이터가 없습니다. 먼저 Purchase에서 입고를 해보세요.</p>
    `;
    return;
  }

  const data = snap.val();
  let rows = "";

  Object.keys(data).forEach(code => {
    const m = data[code];
    const qty    = Number(m.qty || 0);
    const min    = Number(m.minQty || 0);
    const low    = min > 0 && qty < min;

    rows += `
      <tr>
        <td>${code}</td>
        <td>${m.name || ""}</td>
        <td style="text-align:right;">
          ${qty}
          ${low ? `<span class="badge-low">LOW</span>` : ""}
        </td>
        <td>${m.unit || ""}</td>
        <td>${min || ""}</td>
        <td>${m.location || ""}</td>
      </tr>
    `;
  });

  document.getElementById("stock-table-wrapper").innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>MaterialCode</th>
          <th>MaterialName</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>MinQty</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

// =========================
// 5. PURCHASE (입고)
// =========================
function renderPurchasePage() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Purchase (입고)</h2>
    <p>입고를 입력하면 materials 재고가 자동 증가합니다.</p>

    <form id="purchase-form">
      <div class="form-row">
        <label>Material Code</label>
        <input type="text" id="p-code" required />
      </div>
      <div class="form-row">
        <label>Material Name</label>
        <input type="text" id="p-name" />
      </div>
      <div class="form-row">
        <label>Quantity</label>
        <input type="number" id="p-qty" required />
      </div>
      <div class="form-row">
        <label>Unit</label>
        <input type="text" id="p-unit" value="pcs" />
      </div>
      <div class="form-row">
        <label>MinQty (optional)</label>
        <input type="number" id="p-min" />
      </div>
      <div class="form-row">
        <label>Location</label>
        <input type="text" id="p-loc" />
      </div>
      <div class="form-row">
        <button type="submit" class="btn btn-primary">입고 저장</button>
      </div>
    </form>
  `;

  document.getElementById("purchase-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    await handlePurchaseSubmit();
  });
}

async function handlePurchaseSubmit() {
  const code = document.getElementById("p-code").value.trim();
  const name = document.getElementById("p-name").value.trim();
  const qty  = Number(document.getElementById("p-qty").value);
  const unit = document.getElementById("p-unit").value.trim() || "pcs";
  const min  = Number(document.getElementById("p-min").value || 0);
  const loc  = document.getElementById("p-loc").value.trim();

  if (!code || !qty) {
    alert("Code와 Qty는 필수입니다.");
    return;
  }

  const now = new Date().toISOString();

  // 1) purchases 로그
  const poRef = ref(db, "purchases");
  const newPo = push(poRef);
  await set(newPo, {
    date: now,
    code,
    name,
    qty,
    unit,
    minQty: min,
    location: loc,
    status: "DONE"
  });

  // 2) materials 재고 증가
  const matRef  = ref(db, "materials/" + code);
  const matSnap = await get(matRef);
  let currentQty = 0;
  let prev = {};

  if (matSnap.exists()) {
    prev = matSnap.val();
    currentQty = Number(prev.qty || 0);
  }

  await set(matRef, {
    code,
    name: name || prev.name || "",
    qty: currentQty + qty,
    unit: unit || prev.unit || "pcs",
    minQty: min || prev.minQty || 0,
    location: loc || prev.location || ""
  });

  alert("입고 및 재고 업데이트 완료!");
}

// =========================
// 6. OUTGOING (출고)
// =========================
function renderOutgoingPage() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Outgoing (출고)</h2>
    <p>생산 투입, 샘플, 폐기 등으로 재고를 감소시킵니다.</p>

    <form id="outgoing-form">
      <div class="form-row">
        <label>Material Code</label>
        <input type="text" id="o-code" required />
      </div>
      <div class="form-row">
        <label>Quantity</label>
        <input type="number" id="o-qty" required />
      </div>
      <div class="form-row">
        <label>Reason</label>
        <input type="text" id="o-reason" placeholder="Production / Scrap / Sample 등" />
      </div>
      <div class="form-row">
        <button type="submit" class="btn btn-primary">출고 처리</button>
      </div>
    </form>
  `;

  document.getElementById("outgoing-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    await handleOutgoingSubmit();
  });
}

async function handleOutgoingSubmit() {
  const code   = document.getElementById("o-code").value.trim();
  const qty    = Number(document.getElementById("o-qty").value);
  const reason = document.getElementById("o-reason").value.trim();

  if (!code || !qty || qty <= 0) {
    alert("Code와 양수 Qty는 필수입니다.");
    return;
  }

  const matRef  = ref(db, "materials/" + code);
  const matSnap = await get(matRef);

  if (!matSnap.exists()) {
    alert("해당 코드의 재고가 없습니다: " + code);
    return;
  }

  const matData    = matSnap.val();
  const currentQty = Number(matData.qty || 0);

  if (currentQty < qty) {
    alert(`재고 부족: 현재 ${currentQty}, 출고 요청 ${qty}`);
    return;
  }

  // 1) 재고 차감
  await update(matRef, {
    qty: currentQty - qty
  });

  // 2) outgoing 로그
  const outRef = ref(db, "outgoing_logs");
  const newOut = push(outRef);
  const now    = new Date().toISOString();

  await set(newOut, {
    date: now,
    code,
    qty,
    reason
  });

  alert("출고 처리 완료!");
}

// =========================
// 7. PRODUCTION (생산)
// =========================
//
// 간단 버전:
// - 원자재 1종 사용 (rawCode)
// - 원자재 사용량 = goodQty * usagePerUnit
// - 원자재 차감 + FinishedGoods 증가
// =========================
function renderProductionPage() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Production (생산)</h2>
    <p>
      FinishedCode / GoodQty 와 사용 원자재 코드를 입력하면,<br/>
      원자재 재고를 차감하고 FinishedGoods 수량을 증가시킵니다.
    </p>

    <form id="prod-form">
      <div class="form-row">
        <label>Finished Code</label>
        <input type="text" id="pr-fcode" required />
      </div>
      <div class="form-row">
        <label>Finished Name</label>
        <input type="text" id="pr-fname" />
      </div>
      <div class="form-row">
        <label>Good Qty</label>
        <input type="number" id="pr-good" required />
      </div>
      <hr/>
      <div class="form-row">
        <label>Raw Material Code</label>
        <input type="text" id="pr-rawcode" required />
      </div>
      <div class="form-row">
        <label>Usage per 1 Finished</label>
        <input type="number" id="pr-usage" required />
      </div>
      <div class="form-row">
        <button type="submit" class="btn btn-primary">생산 처리</button>
      </div>
    </form>
  `;

  document.getElementById("prod-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    await handleProductionSubmit();
  });
}

async function handleProductionSubmit() {
  const fcode   = document.getElementById("pr-fcode").value.trim();
  const fname   = document.getElementById("pr-fname").value.trim();
  const goodQty = Number(document.getElementById("pr-good").value);
  const rawCode = document.getElementById("pr-rawcode").value.trim();
  const usage   = Number(document.getElementById("pr-usage").value);

  if (!fcode || !rawCode || goodQty <= 0 || usage <= 0) {
    alert("필수 값(FinishedCode, RawCode, GoodQty, Usage)을 확인하세요.");
    return;
  }

  const need = goodQty * usage;

  // 1) 원자재 재고 확인 및 차감
  const rawRef  = ref(db, "materials/" + rawCode);
  const rawSnap = await get(rawRef);

  if (!rawSnap.exists()) {
    alert("원자재 코드가 STOCK에 없습니다: " + rawCode);
    return;
  }

  const rawData = rawSnap.val();
  const currentRawQty = Number(rawData.qty || 0);

  if (currentRawQty < need) {
    alert(`원자재 재고 부족: 필요 ${need}, 현재 ${currentRawQty}`);
    return;
  }

  await update(rawRef, {
    qty: currentRawQty - need
  });

  // 2) FinishedGoods 증가
  const fgRef  = ref(db, "finished_goods/" + fcode);
  const fgSnap = await get(fgRef);
  let curFg = 0;
  let fgPrev = {};

  if (fgSnap.exists()) {
    fgPrev = fgSnap.val();
    curFg = Number(fgPrev.qty || 0);
  }

  await set(fgRef, {
    code: fcode,
    name: fname || fgPrev.name || "",
    qty: curFg + goodQty
  });

  // 3) production_logs 기록
  const prRef = ref(db, "productions");
  const now   = new Date().toISOString();
  const newPr = push(prRef);
  await set(newPr, {
    date: now,
    finishedCode: fcode,
    finishedName: fname,
    goodQty,
    rawCode,
    usagePerUnit: usage,
    totalRawUsed: need
  });

  alert("생산 처리 완료! (원자재 차감 + 완제품 증가)");
}
