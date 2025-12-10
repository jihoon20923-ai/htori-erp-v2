/***********************
 🔥 FIREBASE INIT
***********************/
var firebaseConfig = {
  apiKey: "AIzaSyDwiTlPtoXraEtA7TzTctdH6DJS6gdSEGQ",
  authDomain: "htori-erp-3c22b.firebaseapp.com",
  databaseURL: "https://htori-erp-3c22b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "htori-erp-3c22b",
  storageBucket: "htori-erp-3c22b.firebasestorage.app",
  messagingSenderId: "975336397666",
  appId: "1:975336397666:web:ae45a471e51bf71e9dea3b"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/***********************
 ✅ 최초 admin 1회 생성
***********************/
db.ref("employees").once("value").then(snap=>{
  if(!snap.exists()){
    db.ref("employees").push({
      id:"admin", pw:"1234", name:"Master", role:"master"
    });
  }
});

/***********************
 LOGIN
***********************/
let currentUser = null;

function login(){
  const id = loginId.value.trim();
  const pw = loginPw.value.trim();

  db.ref("employees").once("value").then(s=>{
    const list = s.val() || {};
    const found = Object.values(list).find(x=>x.id===id && x.pw===pw);
    if(!found) return alert("LOGIN FAIL");

    currentUser = found;
    loginBox.classList.add("hidden");
    erp.classList.remove("hidden");

    renderMenu();
    showPage("dashboard");
  });
}

/***********************
 MULTI LANGUAGE
***********************/
let lang = "EN";

const T = {
  EN:{ dashboard:"Dashboard", stock:"Stock", order:"Order", excel:"Excel Upload" },
  KR:{ dashboard:"대시보드", stock:"재고", order:"주문", excel:"엑셀 업로드" },
  ID:{ dashboard:"Dasbor", stock:"Stok", order:"Pesanan", excel:"Upload Excel" }
};

function setLanguage(l){
  lang = l;
  renderMenu();
  showPage("dashboard");
}

/***********************
 MENU
***********************/
function renderMenu(){
  sidebar.innerHTML="";

  ["dashboard","stock","order","excel"].forEach(p=>{
    const b = document.createElement("button");
    b.innerText = T[lang][p];
    b.onclick = ()=>showPage(p);
    sidebar.appendChild(b);
  });
}

/***********************
 PAGES
***********************/
function showPage(page){
  if(page==="dashboard"){
    content.innerHTML = `<h2>${T[lang].dashboard}</h2>`;
  }

  if(page==="stock"){
    content.innerHTML = `<h2>${T[lang].stock}</h2>`;
  }

  if(page==="order"){
    content.innerHTML = `<h2>${T[lang].order}</h2>`;
  }

  if(page==="excel"){
    content.innerHTML = `
      <h2>${T[lang].excel}</h2>
      <input type="file" id="excelFile">
      <button onclick="uploadExcel()">UPLOAD</button>
    `;
  }
}

/***********************
 ✅ EXCEL UPLOAD
***********************/
function uploadExcel(){
  const file = document.getElementById("excelFile").files[0];
  if(!file) return alert("파일 선택");

  const reader = new FileReader();
  reader.onload = function(e){
    const data = new Uint8Array(e.target.result);
    const wb = XLSX.read(data, { type:'array' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    rows.forEach(r=>{
      db.ref("excelUpload").push(r);
    });

    alert("✅ 업로드 완료");
  };
  reader.readAsArrayBuffer(file);
}
