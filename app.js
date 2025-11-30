// app.js - HTORI ERP v2 (기본: Stock + Purchase + Outgoing)

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

// 전역으로 쓸 수 있도록
window.loadPage = loadPage;

// -------------------------
// 2. 페이지 라우팅
// -------------------------
function loadPage(page) {
  if (page === "dashboard") {
    renderDashboard();
  } else if (page === "stock") {
    renderStockPage();
  } else if (page === "purchase") {
    renderPurchasePage();
  } else if (page === "outgoing") {
    renderOutgoingPage();
  } else {
    renderDashboard();
  }
}

// 처음 로드 시
document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
});

// -------------------------
// 3. Dashboard
// -------------------------
function renderDashboard() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Dashboard</h2>
    <p>우선은 Stock / Purchase / Outgoing 기능부터 테스트해보세요.</p>
    <ul>
      <li>왼쪽 메뉴에서 <b>Purchase</b>로 들어가서 입고 데이터를 입력하면, Firebase에 저장되면서 <b>재고(Stock)</b>가 자동 증가합니다.</li>
      <li><b>Outgoing</b>에서는 재고를 차감할 수 있습니다.</li>
      <li><b>Stock</b>에서는 현재 재고 리스트를 볼 수 있고, MinQty보다 낮으면 경고 표시가 뜹니다.</li>
    </ul>
  `;
}

// -------------------------
// 4. Stock (materials)
// -------------------------
async function renderStockPage() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Stock</h2>
    <p>Firebase의 <code>materials</code> 데이터를 불러와서 보여줍니다.</p>
    <div id="stock-table-wrapper">Loading...</div>
  `;

  const matRef = ref(db, "materials");
  const snap   = await get(matRef);

  if (!snap.exists()) {
    document.getElementById("stock-table-wrapper").innerHTML = `
      <p>재고 데이터가 없습니다. Purchase에서 입고를 먼저 해보세요.</p>
    `;
    return;
  }

  const data = snap.val();
  let rows = "";

  Object.keys(data).forEach(code => {
    const m = data[code];
    const qty    = Number(m.qty || 0);
    const minQty = Number(m.minQty || 0);
    const low = minQty > 0 && qty < minQty;

    rows += `
      <tr>
        <td>${code}</td>
        <td>${m.name || ""}</td>
        <td style="text-align:right;">
          ${qty}
          ${low ? `<span class="badge-low">LOW</span>` : ""}
        </td>
        <td>${m.unit || ""}</td>
        <td>${minQty || ""}</td>
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

// -------------------------
// 5. Purchase → Stock 증가
// -------------------------
function renderPurchasePage() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Purchase (입고)</h2>
    <p>입고를 입력하면 materials 재고가 자동으로 증가합니다.</p>

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

  const form = document.getElementById("purchase-form");
  form.addEventListener("submit", async (e) => {
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

  // 1) PURCHASE 기록 남기기 (간단 버전)
  const poRef = ref(db, "purchases");
  const newPo = push(poRef);
  const now   = new Date().toISOString();

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

  // 2) materials 재고 증가 (이미 있으면 +, 없으면 신규)
  const matRef   = ref(db, "materials/" + code);
  const matSnap  = await get(matRef);
  let currentQty = 0;

  if (matSnap.exists()) {
    currentQty = Number(matSnap.val().qty || 0);
  }

  await set(matRef, {
    code,
    name: name || (matSnap.exists() ? matSnap.val().name : ""),
    qty: currentQty + qty,
    unit,
    minQty: min || (matSnap.exists() ? (matSnap.val().minQty || 0) : 0),
    location: loc || (matSnap.exists() ? (matSnap.val().location || "") : "")
  });

  alert("입고 및 재고 업데이트 완료!");
}

// -------------------------
// 6. Outgoing → Stock 감소
// -------------------------
function renderOutgoingPage() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Outgoing (출고)</h2>
    <p>재고에서 수량을 차감합니다. (예: 생산 투입, 폐기 등)</p>

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

  const form = document.getElementById("outgoing-form");
  form.addEventListener("submit", async (e) => {
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

  // 2) 간단 Outgoing 로그 남기기
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
// -------------------------
// 7. BOM 관리
// -------------------------
function loadPage(page) {
  if (page === "bom") return renderBOMPage();
  if (page === "production") return renderProductionPage();
  if (page === "finished") return renderFinishedGoods();
  ...
}

// 1) BOM 화면
function renderBOMPage() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>BOM (원자재 구성)</h2>
    <p>완제품 1개를 만들 때 필요한 원자재 사용량을 등록합니다.</p>

    <form id="bom-form">
      <div class="form-row">
        <label>Finished Code</label><input id="b-fcode" required />
      </div>
      <div class="form-row">
        <label>Material Code</label><input id="b-mcode" required />
      </div>
      <div class="form-row">
        <label>Usage per 1 unit</label><input type="number" id="b-usage" required />
      </div>
      <button class="btn btn-primary" type="submit">추가</button>
    </form>

    <h3>BOM 리스트</h3>
    <div id="bom-table">Loading…</div>
  `;

  document.getElementById("bom-form").addEventListener("submit", saveBOM);
  loadBOMTable();
}

// BOM 저장
async function saveBOM(e) {
  e.preventDefault();
  const fcode = document.getElementById("b-fcode").value.trim();
  const mcode = document.getElementById("b-mcode").value.trim();
  const usage = Number(document.getElementById("b-usage").value);

  await push(ref(db, "bom/" + fcode), {
    material: mcode,
    usage: usage
  });

  alert("BOM 추가됨");
  loadBOMTable();
}

// BOM 테이블 로드
async function loadBOMTable() {
  const box = document.getElementById("bom-table");
  const snap = await get(ref(db, "bom"));

  if (!snap.exists()) {
    box.innerHTML = "BOM 없음";
    return;
  }

  let html = "<table class='table'><tr><th>Finished</th><th>Material</th><th>Usage</th></tr>";

  const data = snap.val();
  Object.keys(data).forEach(fcode => {
    Object.values(data[fcode]).forEach(item => {
      html += `<tr>
        <td>${fcode}</td>
        <td>${item.material}</td>
        <td>${item.usage}</td>
      </tr>`;
    });
  });

  html += "</table>";
  box.innerHTML = html;
}
// ---------------------------
// 8. Production (생산)
// ---------------------------
function renderProductionPage() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Production</h2>
    <p>GoodQty 만큼 원자재가 차감되고 완제품이 증가합니다.</p>

    <form id="prod-form">
      <div class="form-row">
        <label>Finished Code</label><input id="pr-fcode" required />
      </div>
      <div class="form-row">
        <label>Good Qty</label><input type="number" id="pr-good" required />
      </div>
      <button class="btn btn-primary" type="submit">생산 처리</button>
    </form>
  `;

  document.getElementById("prod-form").addEventListener("submit", processProduction);
}

async function processProduction(e) {
  e.preventDefault();
  const fcode = document.getElementById("pr-fcode").value.trim();
  const good  = Number(document.getElementById("pr-good").value);

  // 1) BOM 불러오기
  const bomSnap = await get(ref(db, "bom/" + fcode));
  if (!bomSnap.exists()) return alert("이 FinishedCode의 BOM이 없습니다!");

  const bom = bomSnap.val();

  // 2) 원자재 차감
  for (let key in bom) {
    let item = bom[key];
    let need = item.usage * good;

    let matRef = ref(db, "materials/" + item.material);
    let matSnap = await get(matRef);

    if (!matSnap.exists()) return alert("Stock에 없음: " + item.material);

    let cur = matSnap.val().qty;
    if (cur < need) return alert(`재고 부족: ${item.material} 필요 ${need}, 현재 ${cur}`);

    await update(matRef, { qty: cur - need });
  }

  // 3) 완제품 증가
  let fgRef = ref(db, "finished_goods/" + fcode);
  let fgSnap = await get(fgRef);
  let current = fgSnap.exists() ? Number(fgSnap.val().qty) : 0;

  await set(fgRef, { qty: current + good });

  alert("생산 완료!");
}

