// questions.js

//FUNCTIONS
const messagesDiv = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');


const userTable = document.getElementById('user-info');
const exportBtn = document.getElementById('export-btn');
const clearBtn = document.getElementById('clear-btn');
const overlay = document.querySelector('.overlay');

//INITIALIZE VARIABLES
let userData = {
  tarikh: '',
  kod: '',
  dun: '',
  umur: '',
  jantina: '',
  bangsa: '',
  bangsalain: '',
  pengaruhmediasemasa: '',
  persepsi: '',
  persepsilain: '',
  pengaruhberita: '',
  faktorlain: '',
  pendapatperibadi: '',
  //partiataucalon: '',
  mengundiAdun: '',
  mengundiAdunLain: '',
  //tidakundi: '',
  cenderunguntukundi: '',
  pilihanpartinasional: '',
  pilihanpartitempatan: '',
  pemimpinsabah: '',
  pemimpinsabahlain: '',
  // isiboranglagi: '',
  responseid:'',
  starttime:'',
  endtime:''
  // agama: '',
  // tahappendidikan: '',
  // pekerjaan: '',
  // pendapatanbulanan: '',
  // puasdgnpembangunansemasa: '',
  // yapuasdgnpembangunansemasa: '',
  // tidakpuasdgnpembangunansemasa: '',
  // keperluanasaspuashati: '',  
  // infrastrukturpuashati: '', 
  // kebajikanpuashati: '',  
  // lainlainpuashati: '',
  // keperluanasastidakpuashati: '', 
  // infrastrukturtidakpuashati: '', 
  // kebajikantidakpuashati: '',
  // lainlaintidakpuashati: '',  
  // dunjalanidgnbaik: '',         
  // dunmenyelesaikanmasalah: '',  
  // undidun: '',
  // cadangancalonyb: '',  
  // kmperubahanpositif: '', 
  // penambahbaikanmasadepan: '', 
  // tiadakesanpositif: '',    
  // perbaikikeperluanasas: '',    
  // perbaikiinfrastruktur: '',   
  // perbaikiekonomi: '',         
  // perbaikiperkhidmatanawam: '',
  // perbaikilainlain: '',
  // tiadapositifkeperluanasas: '',
  // tiadapositifinfrastruktur: '', 
  // tiadapositifekonomi: '',            
  // tiadapositifperkhidmatanawam: '',  
  // tiadapositiflainlain: '',
  // kriteriapemimpinbaik: '',  
  // pilihanpemimpinsabah: '',
  // pilihanpemimpinsabahlain: ''
};

let pengesahan = { isiboranglagi: '' };

//DATE
//function getCurrentDate() {
//const currentDate = new Date();
// Format the date as desired
//const formattedDate = currentDate.toLocaleDateString();

// Update userData with the current date
//userData.tarikh = formattedDate;
//}


// new functions

var ques = 0;

function nextBtn() {
  closeModal();
  ques = ques++

  if (!userData.dun) {
    ques++
    console.log(ques);

    // If dun is not yet provided, ask for dun
    displayMessage(`Tuan Awang: Sila pilih DUN anda`, true);
    closeModal('dun-options-modal');

  }

  else if (ques == 1) {
    ques++
    console.log("Jantina:" + ques);
    closeModal();
    // If gender is not yet provided, ask for gender
    openModal('jantina-options-modal');

  }

  else if (!userData.umur && ques == 2) {
    closeModal();
    // If age is not yet provided, ask for age
    // displayMessage(`Tuan Awang: Saya pasti banyak tempat yang menarik di ${userData.dun}`, true);
    // displayMessage(`Tuan Awang: Sila pilih umur anda`, true);
    b = '';
    c = '';
    d = '';
    g = '';
    i = '';
    l = 'na';
    m = '';
    openModal('umur-options-modal');

  }
}

function backBtn() {
  closeModal();
  ques = ques - 1
  console.log(ques);

  if (userData.bangsa.trim() === 'Lain-lain' && ques == 5) {
    userData.bangsa = '';
    userData.bangsalain = '';
    // console.log("clearing bangsa")
    // console.log(userData.bangsa);
    
  }

  if (userData.mengundiAdun.trim() === 'Tidak Pasti'  && ques == 6){
    userData.mengundiAdun = '';
    userData.mengundiAdunLain = '';
  }
  
  
  if (userData.persepsi.trim() === 'Lain-lain'  && ques == 7){
    userData.persepsi = '';
    userData.persepsilain = '';
  }

  // if (userData.mengundiAdun.trim() === 'Tidak'){
  //   console.log("ADUN KOSONG");
    
  //   userData.mengundiAdun = '';
  //   userData.tidakundi = '';
  // }
  // else{
  //   console.log("disini salkah");
    
  //   renderModal();
  // }
  renderModal();

  

  // if (!userData.dun) {
  //   ques++
  //   console.log(ques);

  //   // If dun is not yet provided, ask for dun
  //   displayMessage(`Tuan Awang: Sila pilih DUN anda`, true);
  //   closeModal('dun-options-modal');

  // } 

  // else if (ques == 1) {
  //   // ques++
  //   console.log("Jantina:"+ ques);
  //   closeModal();
  //     // If gender is not yet provided, ask for gender
  //     openModal('jantina-options-modal');

  //   } 

  // else if (ques == 2) {
  //   // ques++
  // closeModal();
  //   // If age is not yet provided, ask for age
  // // displayMessage(`Tuan Awang: Saya pasti banyak tempat yang menarik di ${userData.dun}`, true);
  //   // displayMessage(`Tuan Awang: Sila pilih umur anda`, true);
  // // b = '';
  // // c = '';
  // // d = '';
  // // g = '';
  // // i = '';
  // // l = 'na';
  // // m = '';
  //   openModal('umur-options-modal');

  // } 
  // else if (ques == 3) {
  //   closeModal();
  //   // ques++
  //   console.log(ques);
  //   // ask for bangsa
  //   displayMessage(`Tuan Awang: Sila pilih bangsa anda`, true);
  //   openModal('bangsa-options-modal');

  // } else if (userData.bangsa.trim() === 'Lain-lain'  && !userData.pengaruhmediasemasa  && ques == 3) {
  //   // If user choose lain-lain under bangsa
  //   // ques++
  //   console.log(userData);

  //   displayMessage(`Tuan Awang: Sila nyatakan bangsa anda`, true);
  // closeModal();
  // showInput();
  // } 

  // else if (ques == 4) {
  //   // ask for puasdgnpembangunansemasa
  //   // ques++
  // closeModal();
  //   displayMessage(`Tuan Awang: Adakah Media Semasa akan mempengaruhi pilihan pengundian anda?`, true);
  //   openModal('mediasemasa-options-modal');

  // } 

  // else if (ques == 5){
  //   // ques++
  //   closeModal();
  //   displayMessage(`Tuan Awang: Adakah perkara-perkara berikut mempengaruhi persepsi anda?`, true);
  //   displayMessage("Integriti, Isu-isu moral, Kepimpinan", true);

  //   openModal('persepsi-options-modal');

  // } 

  // else if (userData.persepsi.trim() === 'Lain-lain' && !userData.pengaruhberita  && ques == 5) {
  //   // If user choose lain-lain under bangsa
  //   // console.log("here ni");
  //   // ques++
  //   displayMessage(`Tuan Awang: Sila nyatakan apa yang mempengaruhi persepsi anda:`, true);
  // closeModal();
  // showInput();
  // } 

  // else if (!userData.pengaruhberita && ques == 6){
  //   // ques++
  //   closeModal();
  //   displayMessage(`Tuan Awang: Bagaimanakah berita tersebut mempengaruhi pilihan anda?`, true);
  //   openModal('pengaruhberita-options-modal');

  // } 

  // else if (!userData.faktorlain){
  //   closeModal();
  //   displayMessage(`Tuan Awang: Selain daripada Media Semasa, apakah faktor lain yang mempengaruhi anda untuk mengundi?`, true);
  //   openModal('faktorlain-options-modal');

  // } 

  // else if (userData.faktorlain == 'Pendapat Peribadi' && !userData.pendapatperibadi){
  //   closeModal();
  //   displayMessage(`Tuan Awang: Selain daripada Media Semasa, apakah faktor lain yang mempengaruhi anda untuk mengundi?`, true);
  //   openModal('pendapatperibadi-options-modal');

  // } 

  // else if (!userData.partiataucalon){
  //   closeModal();
  //   displayMessage(`Tuan Awang: Adakah anda mengundi bedasarkan Parti atau Calon?`, true);
  //   openModal('partiataucalon-options-modal');

  // } 

  // else if (!userData.cenderunguntukundi){
  //   closeModal();
  //   displayMessage(`Tuan Awang: Merujuk kepada pilihan dinyatakan di bawah, yang manakah lebih cenderung untuk anda undi?`, true);
  //   displayMessage(`Tuan Awang: 1) Parti Nasional 2) Parti Tempatan 3) Tiada Kecenderungan`, true);
  //   openModal('cenderunguntukundi-options-modal');

  // } 

  // // check this

  // else if (!userData.pilihanpartinasional && userData.cenderunguntukundi == 'Parti Nasional'){
  //   closeModal();
  //   displayMessage(`Tuan Awang: Parti Nasional pilihan anda?`, true);
  //   openModal('partinasional-options-modal');
  //   // console.log("siniii");

  // } 

  // else if (userData.pilihanpartinasional && userData.cenderunguntukundi == 'Parti Nasional' && !userData.pilihanpartitempatan){
  //   closeModal();
  //   displayMessage(`Tuan Awang: Parti tempatan pilihan anda?`, true);
  //   openModal('partitempatan-options-modal');
  //   // console.log("ani tang baru");

  // } 

  // else if (!userData.pilihanpartitempatan && userData.cenderunguntukundi == 'Parti Tempatan'){
  //   closeModal();
  //   displayMessage(`Tuan Awang: Parti tempatan pilihan anda?`, true);
  //   openModal('partitempatan-options-modal');
  //   console.log("Tempatan");

  // } 

  // else if (!userData.pemimpinsabah ){
  //   closeModal();
  //   displayMessage(`Tuan Awang: Akhir sekali, pada pendapat anda siapa yang layak untuk memimpin sabah?`, true);
  //   openModal('pemimpinsabah-options-modal');
  //   console.log('hereeee');

  // } 

  // else if (userData.pemimpinsabah.trim() === 'Lain-lain' && !userData.isiboranglagi) {
  //   // If user choose lain-lain under bangsa
  //   // console.log("here ni");

  //   displayMessage(`Tuan Awang: Sila nyatakan pilihan pemimpin sabah anda:`, true);
  // closeModal();
  // showInput();
  // } 

  // else if (!userData.isiboranglagi){
  //   closeModal();
  //     displayMessage(`Tuan Awang: Adakah anda ingin mengisi borang lagi sekali?`, true);
  //     openModal('isiboranglagi-options-modal');


  //   //isi borang lagi - ya
  //   } 

  //   else if (userData.isiboranglagi === 'Ya, isi lagi'){
  //     closeModal();
  //     console.log('Anda pilih ya.')
  //     console.log(userData);
  //     displayUserInfo(userData);
  //     initiateConversation();

  //   //isi borang lagi - tidak
  //   } else if (userData.isiboranglagi === 'Tidak'){
  //     console.log('Anda pilih tidak.')
  //     displayUserInfo(userData);
  //     console.log(userData);
  //     // remove user kod (end user session)
  //     localStorage.removeItem('enumerator');
  //     closeModal();
  //     hideInput(); 
  //     displayMessage(`Tuan Awang: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah Maju Jaya!`, true);

  //   } else {
  //     // All information collected, finish conversation
  //     displayMessage(`Tuan Awang: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah Maju Jaya!`, true);
  //     displayUserInfo(userData);
  //     closeModal();
  //     initiateConversation();
  //   }  

}

function backBtnBangsa(){
  userData.bangsa = '';
  userData.bangsalain = '';
  closeModal();
  ques = ques - 1
  console.log(ques);
  openModal('bangsa-options-modal')
}

// function submitKod(field) {
//   const kodInput = document.getElementById('kod-input').value;

//   console.log("userID: " + kodInput);

//   if (kodInput == '') {
//     alert("Sila isi kod anda")
    
//   }

//   else{
//  // Store the value in localStorage
//   localStorage.setItem('enumerator', kodInput);
//   //push to array
//   userData[field] = localStorage.getItem('enumerator');

//   // clear input
//   // kodInput = '';
//   closeModal();
//   renderModal();
//   }

 
//   // openModal('parlimen-options-modal');

// }
// import users from './users.js';
// import{ users } from './enumerator.js';

function submitKod(field) {
  const kodInput = document.getElementById('kod-input').value;

  console.log("userID: " + kodInput);


  // users
  const users = [
    { userID: 'IM00', name: 'User1' },
    { userID: 'IM01', name: 'User2' },
    { userID: 'IM02', name: 'User3' },
    { userID: 'IM03', name: 'User4' },
    { userID: 'IM04', name: 'User5' },
    { userID: 'IM05', name: 'User6' },
    { userID: 'IM06', name: 'User7' },
    { userID: 'IM07', name: 'User8' },
    { userID: 'IM08', name: 'User9' },
    { userID: 'IM09', name: 'User10' },
    { userID: 'IM10', name: 'User11' },
    
    { userID: 'LC00', name: 'User12' },
    { userID: 'LC01', name: 'User13' },
    { userID: 'LC02', name: 'User14' },
    { userID: 'LC03', name: 'User15' },
    { userID: 'LC04', name: 'User16' },
    { userID: 'LC05', name: 'User17' },
    { userID: 'LC06', name: 'User18' },
    { userID: 'LC07', name: 'User19' },
    { userID: 'LC08', name: 'User20' },
    { userID: 'LC09', name: 'User21' },
    { userID: 'LC10', name: 'User22' },

    { userID: 'SH00', name: 'User23' },
    { userID: 'SH01', name: 'User24' },
    { userID: 'SH02', name: 'User25' },
    { userID: 'SH03', name: 'User26' },
    { userID: 'SH04', name: 'User27' },
    { userID: 'SH05', name: 'User28' },
    { userID: 'SH06', name: 'User29' },
    { userID: 'SH07', name: 'User30' },
    { userID: 'SH08', name: 'User31' },
    { userID: 'SH09', name: 'User32' },
    { userID: 'SH10', name: 'User33' },

    { userID: 'RM00', name: 'User34' },
    { userID: 'RM01', name: 'User35' },
    { userID: 'RM02', name: 'User36' },
    { userID: 'RM03', name: 'User37' },
    { userID: 'RM04', name: 'User38' },
    { userID: 'RM05', name: 'User39' },
    { userID: 'RM06', name: 'User40' },
    { userID: 'RM07', name: 'User41' },
    { userID: 'RM08', name: 'User42' },
    { userID: 'RM09', name: 'User43' },
    { userID: 'RM10', name: 'User44' },

    { userID: 'AL00', name: 'User45' },
    { userID: 'AL01', name: 'User46' },
    { userID: 'AL02', name: 'User47' },
    { userID: 'AL03', name: 'User48' },
    { userID: 'AL04', name: 'User49' },
    { userID: 'AL05', name: 'User50' },
    { userID: 'AL06', name: 'User51' },
    { userID: 'AL07', name: 'User52' },
    { userID: 'AL08', name: 'User53' },
    { userID: 'AL09', name: 'User54' },
    { userID: 'AL10', name: 'User55' },

    { userID: 'AH00', name: 'User56' },
    { userID: 'AH01', name: 'User57' },
    { userID: 'AH02', name: 'User58' },
    { userID: 'AH03', name: 'User59' },
    { userID: 'AH04', name: 'User60' },
    { userID: 'AH05', name: 'User61' },
    { userID: 'AH06', name: 'User62' },
    { userID: 'AH07', name: 'User63' },
    { userID: 'AH08', name: 'User64' },
    { userID: 'AH09', name: 'User65' },
    { userID: 'AH10', name: 'User66' },

    { userID: 'RZ00', name: 'User67' },
    { userID: 'RZ01', name: 'User68' },
    { userID: 'RZ02', name: 'User69' },
    { userID: 'RZ03', name: 'User70' },
    { userID: 'RZ04', name: 'User71' },
    { userID: 'RZ05', name: 'User72' },
    { userID: 'RZ06', name: 'User73' },
    { userID: 'RZ07', name: 'User74' },
    { userID: 'RZ08', name: 'User75' },
    { userID: 'RZ09', name: 'User76' },
    { userID: 'RZ10', name: 'User77' },

    { userID: 'KA00', name: 'User78' },
    { userID: 'KA01', name: 'User79' },
    { userID: 'KA02', name: 'User80' },
    { userID: 'KA03', name: 'User81' },
    { userID: 'KA04', name: 'User82' },
    { userID: 'KA05', name: 'User83' },
    { userID: 'KA06', name: 'User84' },
    { userID: 'KA07', name: 'User85' },
    { userID: 'KA08', name: 'User86' },
    { userID: 'KA09', name: 'User87' },
    { userID: 'KA10', name: 'User88' },

    { userID: 'PC00', name: 'User89' },
    { userID: 'PC01', name: 'User90' },
    { userID: 'PC02', name: 'User91' },
    { userID: 'PC03', name: 'User92' },
    { userID: 'PC04', name: 'User93' },
    { userID: 'PC05', name: 'User94' },
    { userID: 'PC06', name: 'User95' },
    { userID: 'PC07', name: 'User96' },
    { userID: 'PC08', name: 'User97' },
    { userID: 'PC09', name: 'User98' },
    { userID: 'PC10', name: 'User99' },

    { userID: 'FI00', name: 'User100' },
    { userID: 'FI01', name: 'User101' },
    { userID: 'FI02', name: 'User102' },
    { userID: 'FI03', name: 'User103' },
    { userID: 'FI04', name: 'User104' },
    { userID: 'FI05', name: 'User105' },
    { userID: 'FI06', name: 'User106' },
    { userID: 'FI07', name: 'User107' },
    { userID: 'FI08', name: 'User108' },
    { userID: 'FI09', name: 'User109' },
    { userID: 'FI10', name: 'User110' },

    { userID: 'MM00', name: 'User100' },
    { userID: 'MM01', name: 'User101' },
    { userID: 'MM02', name: 'User102' },
    { userID: 'MM03', name: 'User103' },
    { userID: 'MM04', name: 'User104' },
    { userID: 'MM05', name: 'User105' },
    { userID: 'MM06', name: 'User106' },
    { userID: 'MM07', name: 'User107' },
    { userID: 'MM08', name: 'User108' },
    { userID: 'MM09', name: 'User109' },
    { userID: 'MM10', name: 'User110' },

    { userID: 'ZZ00', name: 'User100' },
    { userID: 'ZZ01', name: 'User101' },
    { userID: 'ZZ02', name: 'User102' },
    { userID: 'ZZ03', name: 'User103' },
    { userID: 'ZZ04', name: 'User104' },
    { userID: 'ZZ05', name: 'User105' },
    { userID: 'ZZ06', name: 'User106' },
    { userID: 'ZZ07', name: 'User107' },
    { userID: 'ZZ08', name: 'User108' },
    { userID: 'ZZ09', name: 'User109' },
    { userID: 'ZZ10', name: 'User110' },

    { userID: 'WC00', name: 'User100' },
    { userID: 'WC01', name: 'User101' },
    { userID: 'WC02', name: 'User102' },
    { userID: 'WC03', name: 'User103' },
    { userID: 'WC04', name: 'User104' },
    { userID: 'WC05', name: 'User105' },
    { userID: 'WC06', name: 'User106' },
    { userID: 'WC07', name: 'User107' },
    { userID: 'WC08', name: 'User108' },
    { userID: 'WC09', name: 'User109' },
    { userID: 'WC10', name: 'User110' },

    { userID: 'AC00', name: 'User100' },
    { userID: 'AC01', name: 'User101' },
    { userID: 'AC02', name: 'User102' },
    { userID: 'AC03', name: 'User103' },
    { userID: 'AC04', name: 'User104' },
    { userID: 'AC05', name: 'User105' },
    { userID: 'AC06', name: 'User106' },
    { userID: 'AC07', name: 'User107' },
    { userID: 'AC08', name: 'User108' },
    { userID: 'AC09', name: 'User109' },
    { userID: 'AC10', name: 'User110' },

    // test codes
    { userID: 'ST00', name: 'tester1' },
    { userID: 'ST01', name: 'tester2' },
    { userID: 'ST02', name: 'tester3' },
    { userID: 'ST03', name: 'tester4' },
    // { userID: 'ST01', name: 'tester2' },
    // { userID: 'ST02', name: 'tester3' },
    // { userID: 'XX00', name: 'tester4' },
    // { userID: 'XX01', name: 'tester5' }

  ];
  
  console.log(users);
  

  if (kodInput === '') {
    alert("Sila isi kod anda!");
    return;
  }

  // Check if the entered code exists in the users array
  const userExists = users.some(user => user.userID === kodInput);

  if (userExists) {
    // Store the value in localStorage
    localStorage.setItem('enumerator', kodInput);

    console.log("exists");
    
    // Push to array (assuming userData is an existing object/array)
    userData[field] = localStorage.getItem('enumerator');

    // Clear the input (if desired)
    document.getElementById('kod-input').value = ''; // clears input field

    // Close the modal and render the updated modal
    closeModal();
    // renderModal();
    openModal('starting-modal')
  } else {
    alert("Kod tidak dijumpai! Sila semak kembali.");
  }
}


function submitAge(field) {
  const umurInput = document.getElementById('umur-input').value;

  // Store the value in localStorage
  // localStorage.setItem('enumerator', kodInput);
  //push to array
  if (umurInput >= 18 && umurInput <= 100) {
    userData[field] = umurInput
    console.log(umurInput);
    ques++
    displayMessage(`Anda: ${umurInput} tahun`);
    
    // // clear input
    document.getElementById('umur-input').value = '';
    // umurInput = '';
    // closeModal();
    renderModal();
  } else {
    alert("Sila masukkan umur 18-100")
  }


  // openModal('bangsa-options-modal');

}


function startSurvey() {
  closeModalStart('starting-modal');
  // openModal('parlimen-options-modal');
  const kod = localStorage.getItem('enumerator');

  //push to array

  if (kod == null) {
    // if kod exist
    openModal('kod-modal');
    // ques++
  }
  else {
    userData['kod'] = localStorage.getItem('enumerator');
    // openModal('parlimen-options-modal');
    // ques++
    
    // capture start time
    getStartTime();

    renderModal()
  }

}

function closeModalStart() {
  const modals = document.querySelectorAll('.fixed-modal');
  modals.forEach(modal => {
    modal.style.display = 'none';
  });
  overlay.style.display = 'none';
}

// new functions

// function getCurrentDate() {
//   const currentDate = new Date();

//   // Extract day, month, and year
//   const day = String(currentDate.getDate()).padStart(2, '0');
//   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//   const year = currentDate.getFullYear();

//   // Format the date as dd/mm/yyyy
//   const formattedDate = `${day}/${month}/${year}`;

//   // Update userData with the current date
//   userData.tarikh = formattedDate;
// }

function getCurrentDate() {
  const currentDate = new Date();

  // Extract day, month, year, hours, minutes, seconds
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  // Determine AM or PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? String(hours).padStart(2, '0') : '12'; // Adjust 0 to 12 for 12 AM

  // Format the date as yyyy-mm-dd hh
  const formattedDateTime = `${year}-${month}-${day}`;

  // Update userData with the current date and time
  // start
  userData.tarikh = formattedDateTime;
}

function getStartTime(){

// Capture start time and store it as ISO string
let startSurveyTime = new Date();  // Capture the current date and time
localStorage.setItem("SST", startSurveyTime.toISOString());  // Store it as an ISO string

// Retrieve the ISO string from localStorage
let starttime = localStorage.getItem("SST");

// Convert the ISO string to a Date object
let startTimeDate = new Date(starttime);

// Get the time part only
userData.starttime = startTimeDate.toLocaleTimeString();

// console.log(userData.starttime);  // This will log the time only, e.g., "14:30:00"

}

function getEndTime(){

// Capture start time and store it as ISO string
let endSurveyTime = new Date();  // Capture the current date and time
localStorage.setItem("SET", endSurveyTime.toISOString());  // Store it as an ISO string

// Retrieve the ISO string from localStorage
let endtime = localStorage.getItem("SET");

// Convert the ISO string to a Date object
let endTimeDate = new Date(endtime);

// Get the time part only
userData.endtime = endTimeDate.toLocaleTimeString();

  
 }

//SHOW/HIDE TABLE
document.addEventListener("DOMContentLoaded", function () {
  const toggleTableBtn = document.getElementById("toggle-table-btn");
  const userInfoTable = document.getElementById("user-info-table");

  // Set the initial state and button text
  userInfoTable.style.display = "none";
  toggleTableBtn.textContent = "Show Table";

  // Add event listener to the button
  toggleTableBtn.addEventListener("click", function () {
    // Toggle the visibility of the table section
    if (userInfoTable.style.display === "none") {
      userInfoTable.style.display = "table"; // Show the table
      toggleTableBtn.textContent = "Hide Table";
    } else {
      userInfoTable.style.display = "none"; // Hide the table
      toggleTableBtn.textContent = "Show Table";
    }
  });
});

function scrollToBottom() {
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

//MESSAGE DISPLAY BUBBLE CHAT
function displayMessage(message, isBot = false, delay = 0) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  // Add bubble class for styling
  messageDiv.classList.add('message-bubble');
  if (isBot) {
    messageDiv.classList.add('bot-message');
    setTimeout(function () {
      messageDiv.classList.add('visible');
      scrollToBottom(); // Scroll to bottom after displaying the message
    }, delay);
  } else {
    // Ensure user messages are immediately visible
    setTimeout(function () {
      messageDiv.classList.add('visible');
      scrollToBottom(); // Scroll to bottom after displaying the message
    }, delay);
  }
  messagesDiv.appendChild(messageDiv);
}


//TABLE - DISPLAY INPUT DATA
function displayUserInfo(userData) {
  const row = document.createElement('tr');
  row.innerHTML = `
	<td>${userData.tarikh}</td>
  <td>${userData.kod}</td>
    <td>${userData.dun}</td>
    <td>${userData.umur}</td>
    <td>${userData.jantina}</td>
    <td style="display: none;">${userData.bangsa}</td>

	<td style="display: none;">${userData.bangsalain}</td>
	<td style="display: none;">${userData.pengaruhmediasemasa}</td>
	<td style="display: none;">${userData.persepsi}</td>
	<td style="display: none;">${userData.persepsilain}</td>
	<td style="display: none;">${userData.pengaruhberita}</td>
	<td style="display: none;">${userData.faktorlain}</td>
  
	<td style="display: none;">${userData.pendapatperibadi}</td>
	<td style="display: none;">${userData.partiataucalon}</td>
  <td style="display: none;">${userData.mengundiAdun}</td>
  <td style="display: none;">${userData.mengundiAdunLain}</td>
  <td style="display: none;">${userData.tidakundi}</td>
	<td style="display: none;">${userData.cenderunguntukundi}</td>
	<td style="display: none;">${userData.pilihanpartinasional}</td>
	<td style="display: none;">${userData.pilihanpartitempatan}</td>
	<td style="display: none;">${userData.pemimpinsabah}</td>
	<td style="display: none;">${userData.pemimpinsabahlain}</td>
  <td style="display: none;">${userData.responseid}</td>`;


  // <td style="display: none;">${userData.kebajikantidakpuashati}</td>
  // <td style="display: none;">${userData.lainlaintidakpuashati}</td>	
  // <td style="display: none;">${userData.dunjalanidgnbaik}</td>
  // <td style="display: none;">${userData.dunmenyelesaikanmasalah}</td>
  // <td style="display: none;">${userData.undidun}</td>  
  // <td style="display: none;">${userData.cadangancalonyb}</td>  
  // <td style="display: none;">${userData.kmperubahanpositif}</td>
  // <td style="display: none;">${userData.penambahbaikanmasadepan}</td>
  // <td style="display: none;">${userData.tiadakesanpositif}</td>
  // <td style="display: none;">${userData.perbaikikeperluanasas}</td>
  // <td style="display: none;">${userData.perbaikiinfrastruktur}</td>
  // <td style="display: none;">${userData.perbaikiekonomi}</td>
  // <td style="display: none;">${userData.perbaikiperkhidmatanawam}</td>    
  // <td style="display: none;">${userData.perbaikilainlain}</td>
  // <td style="display: none;">${userData.tiadapositifkeperluanasas}</td>
  // <td style="display: none;">${userData.tiadapositifinfrastruktur}</td>
  // <td style="display: none;">${userData.tiadapositifekonomi}</td>
  // <td style="display: none;">${userData.tiadapositifperkhidmatanawam}</td>
  // <td style="display: none;">${userData.tiadapositiflainlain}</td>
  // <td style="display: none;">${userData.kriteriapemimpinbaik}</td>
  // <td style="display: none;">${userData.pilihanpemimpinsabah}</td>
  // <td style="display: none;">${userData.pilihanpemimpinsabahlain}</td>
  // `;

  //TABLE - DELETE SPECIFIC ROW DATA
  // Add delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button'); // Add the CSS class
  deleteButton.addEventListener('click', function () {
    deleteUserRow(row, userData); //call func
  });
  row.appendChild(deleteButton); //call func

  //TABLE - INSERT DATA  
  userTable.appendChild(row);

  //INPUT DATA - SAVE LOCALLY (TEMPORARY) - CALL FUNC
  // Save user data to local storage
  saveToLocalStorage(userData);
}

//CONT.. TABLE - DELETE SPECIFIC ROW DATA
function deleteUserRow(row, userData) {
  // Remove row from table
  row.remove();

  //REMOVE DELETED SELECTED ROW DATA FROM LOCAL STORAGE - CALL FUNC
  // Remove user data from local storage
  removeFromLocalStorage(userData);
}



//SAVE USER INPUT TO LOCAL STORAGE
function saveToLocalStorage(userData) {
  if (typeof Storage !== "undefined") {
    let savedUserData = JSON.parse(localStorage.getItem("userData")) || [];
    if (!Array.isArray(savedUserData)) {
      savedUserData = []; // Reset to an empty array if not an array
    }

    // Check if userData already exists in savedUserData - to avoid duplication
    const index = savedUserData.findIndex(data =>

      data.tarikh === userData.tarikh &&
      data.kod === userData.kod &&
      data.dun === userData.dun &&
      data.umur === userData.umur &&
      data.jantina === userData.jantina &&
      data.agama === userData.agama &&
      data.bangsa === userData.bangsa &&
      data.bangsalain === userData.bangsalain &&
      data.pengaruhmediasemasa === userData.pengaruhmediasemasa &&
      data.persepsi === userData.persepsi &&
      data.persepsilain === userData.persepsilain &&
      data.pengaruhberita === userData.pengaruhberita &&
      data.faktorlain === userData.faktorlain &&
      data.pendapatperibadi === userData.pendapatperibadi &&
      data.partiataucalon === userData.partiataucalon &&
      data.mengundiAdun === userData.mengundiAdun &&
      data.mengundiAdunLain === userData.mengundiAdunLain &&
      data.cenderunguntukundi === userData.cenderunguntukundi &&
      data.pilihanpartinasional === userData.pilihanpartinasional &&
      data.pilihanpartitempatan === userData.pilihanpartitempatan &&
      data.pemimpinsabah === userData.pemimpinsabah &&
      data.pemimpinsabahlain === userData.pemimpinsabahlain
      // data.tahappendidikan === userData.tahappendidikan &&
      // data.pekerjaan === userData.pekerjaan &&
      // data.pendapatanbulanan === userData.pendapatanbulanan &&
      // data.puasdgnpembangunansemasa === userData.pengaruhmediasemasa &&
      // data.yapuasdgnpembangunansemasa === userData.yapuasdgnpembangunansemasa && 
      // data.tidakpuasdgnpembangunansemasa === userData.tidakpuasdgnpembangunansemasa && 
      // data.keperluanasaspuashati === userData.keperluanasaspuashati && 
      // data.infrastrukturpuashati === userData.infrastrukturpuashati && 
      // data.kebajikanpuashati === userData.kebajikanpuashati && 
      // data.lainlainpuashati === userData.lainlainpuashati &&
      // data.keperluanasastidakpuashati === userData.keperluanasastidakpuashati &&
      // data.infrastrukturtidakpuashati === userData.infrastrukturtidakpuashati && 
      // data.kebajikantidakpuashati === userData.kebajikantidakpuashati &&
      // data.lainlaintidakpuashati === userData.lainlaintidakpuashati &&
      // data.dunjalanidgnbaik === userData.dunjalanidgnbaik &&  
      // data.dunmenyelesaikanmasalah === userData.dunmenyelesaikanmasalah &&  
      // data.undidun === userData.undidun &&  
      // data.cadangancalonyb === userData.cadangancalonyb &&
      // data.kmperubahanpositif === userData.kmperubahanpositif && 
      // data.penambahbaikanmasadepan === userData.penambahbaikanmasadepan && 
      // data.tiadakesanpositif === userData.tiadakesanpositif && 
      // data.perbaikikeperluanasas === userData.perbaikikeperluanasas && 
      // data.perbaikiinfrastruktur === userData.perbaikiinfrastruktur &&  
      // data.perbaikiekonomi === userData.perbaikiekonomi &&  
      // data.perbaikiperkhidmatanawam === userData.perbaikiperkhidmatanawam &&
      // data.perbaikilainlain === userData.perbaikilainlain &&
      // data.tiadapositifkeperluanasas === userData.tiadapositifkeperluanasas &&
      // data.tiadapositifinfrastruktur === userData.tiadapositifinfrastruktur && 
      // data.tiadapositifekonomi === userData.tiadapositifekonomi &&  
      // data.tiadapositifperkhidmatanawam === userData.tiadapositifperkhidmatanawam &&  
      // data.tiadapositiflainlain === userData.tiadapositiflainlain &&
      // data.kriteriapemimpinbaik === userData.kriteriapemimpinbaik && 
      // data.pilihanpemimpinsabah === userData.pilihanpemimpinsabah &&
      // data.pilihanpemimpinsabahlain === userData.pilihanpemimpinsabahlain
    );

    if (index === -1) {
      // If userData does not exist, push it to savedUserData
      savedUserData.push(userData);
      // console.log(savedUserData);

      localStorage.setItem("userData", JSON.stringify(savedUserData));
    }
  } else {
    console.error("Local storage is not supported in this browser.");
  }
}

//REMOVE USER INPUT FROM LOCAL STORAGE
function removeFromLocalStorage(userData) {
  if (typeof Storage !== "undefined") {
    let savedUserData = JSON.parse(localStorage.getItem("userData")) || [];
    savedUserData = savedUserData.filter(data =>
      data.tarikh !== userData.tarikh ||
      data.kod !== userData.kod ||
      data.dun !== userData.dun ||
      data.umur !== userData.umur ||
      data.jantina !== userData.jantina ||
      // data.agama !== userData.agama ||
      data.bangsa !== userData.bangsa ||
      data.bangsalain !== userData.bangsalain ||
      data.pengaruhmediasemasa !== userData.pengaruhmediasemasa ||
      data.persepsi !== userData.persepsi ||
      data.persepsilain !== userData.persepsilain ||
      data.pengaruhberita !== userData.pengaruhberita ||
      data.faktorlain !== userData.faktorlain ||
      data.pendapatperibadi !== userData.pendapatperibadi ||
      data.partiataucalon !== userData.partiataucalon ||
      data.mengundiAdun !== userData.mengundiAdun ||
      data.mengundiAdunLain !== userData.mengundiAdunLain||
      data.cenderunguntukundi !== userData.cenderunguntukundi ||
      data.pilihanpartinasional !== userData.pilihanpartinasional ||
      data.pilihanpartitempatan !== userData.pilihanpartitempatan ||
      data.pemimpinsabah !== userData.pemimpinsabah ||
      data.pemimpinsabahlain !== userData.pemimpinsabahlain

      // data.tahappendidikan !== userData.tahappendidikan ||
      // data.pekerjaan !== userData.pekerjaan ||
      // data.pendapatanbulanan !== userData.pendapatanbulanan ||
      // data.puasdgnpembangunansemasa !== userData.pengaruhmediasemasa ||
      // data.yapuasdgnpembangunansemasa !== userData.yapuasdgnpembangunansemasa ||
      // data.tidakpuasdgnpembangunansemasa !== userData.tidakpuasdgnpembangunansemasa || 
      // data.keperluanasaspuashati !== userData.keperluanasaspuashati || 
      // data.infrastrukturpuashati !== userData.infrastrukturpuashati ||
      // data.kebajikanpuashati !== userData.kebajikanpuashati ||
      // data.lainlainpuashati !== userData.lainlainpuashati || 
      // data.keperluanasastidakpuashati !== userData.keperluanasastidakpuashati ||
      // data.infrastrukturtidakpuashati !== userData.infrastrukturtidakpuashati ||
      // data.kebajikantidakpuashati !== userData.kebajikantidakpuashati || 
      // data.lainlaintidakpuashati !== userData.lainlaintidakpuashati ||
      // data.dunjalanidgnbaik !== userData.dunjalanidgnbaik ||
      // data.dunmenyelesaikanmasalah !== userData.dunmenyelesaikanmasalah || 
      // data.undidun !== userData.undidun || 
      // data.cadangancalonyb !== userData.cadangancalonyb ||
      // data.kmperubahanpositif !== userData.kmperubahanpositif || 
      // data.penambahbaikanmasadepan !== userData.penambahbaikanmasadepan ||
      // data.tiadakesanpositif !== userData.tiadakesanpositif ||
      // data.perbaikikeperluanasas !== userData.perbaikikeperluanasas || 
      // data.perbaikiinfrastruktur !== userData.perbaikiinfrastruktur || 
      // data.perbaikiekonomi !== userData.perbaikiekonomi ||
      // data.perbaikiperkhidmatanawam !== userData.perbaikiperkhidmatanawam ||
      // data.perbaikilainlain !== userData.perbaikilainlain ||
      // data.tiadapositifkeperluanasas !== userData.tiadapositifkeperluanasas ||
      // data.tiadapositifinfrastruktur !== userData.tiadapositifinfrastruktur || 
      // data.tiadapositifekonomi !== userData.tiadapositifekonomi || 
      // data.tiadapositifperkhidmatanawam !== userData.tiadapositifperkhidmatanawam || 
      // data.tiadapositiflainlain !== userData.tiadapositiflainlain ||
      // data.kriteriapemimpinbaik !== userData.kriteriapemimpinbaik || 
      // data.pilihanpemimpinsabah !== userData.pilihanpemimpinsabah ||
      // data.pilihanpemimpinsabahlain !== userData.pilihanpemimpinsabahlain 
    );
    localStorage.setItem("userData", JSON.stringify(savedUserData));
  } else {
    console.error("Local storage is not supported in this browser.");
  }
}

//LOADING/TAKING USER INPUT FROM LOCAL STORAGE
function loadFromLocalStorage() {
  if (typeof Storage !== "undefined") {
    const savedUserData = JSON.parse(localStorage.getItem("userData"));
    if (Array.isArray(savedUserData)) {
      // Clear existing table rows
      userTable.innerHTML = '';

      savedUserData.forEach(data => {
        displayUserInfo(data);
      });
    } else {
      console.error("Data retrieved from local storage is not an array.");
    }
  } else {
    console.error("Local storage is not supported in this browser.");
  }
}

//RECEIVE USER INPUT VIA KEYPRESS (OR ENTER IN MOBILE)
userInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    const message = userInput.value;
    displayMessage(`Anda: ${message}`);
    processInput(message);
    userInput.value = '';
  }
});

// ADD EVENT LISTENER FOR SEND BUTTON
sendButton.addEventListener('click', function () {
  console.log("sending here");

  const inputValue = userInput.value.trim();
  if (!inputValue) {
    alert("Sila isi bangsa anda terlebih dahulu.");
    return;
  }

  // ✅ Handle Lain-lain bangsa
  if (ques === 5 && userData.bangsa === 'Lain-lain') {
    userData.bangsalain = inputValue;      // Save user input
    userInput.value = '';
    hideInput();
    ques++;                                 // Move to next question
    askAdunQuestion();                      // Show ADUN question
    return;
  }
  sendMessage(); // Call the function to process the input

    // ✅ Handle Lain-lain adun
  if (ques === 6 && userData.mengundiAdun === 'Tidak Pasti') {
    userData.mengundiAdunLain = inputValue;      // Save user input
    userInput.value = '';
    hideInput();
    ques++;                                 // Move to next question
    return;
  }
  sendMessage(); // Call the function to process the input
});

// FUNCTION TO PROCESS AND DISPLAY MESSAGE
function sendMessage() {
  const message = userInput.value.trim();
  if (message !== '') { // Ensure empty messages are not sent
    displayMessage(`Anda: ${message}`);
    processInput(message);
    // ques++
    console.log("questionsss: " + ques);
    userInput.value = ''; // Clear the input field after sending
    // renderModal()
  }
}

//BOT QUESTIONS AFTER RECEIVING INPUT FROM USER - HANDLING RAW INPUT TEXT ~^-^~ //second
function processInput(message) {
  if (!userData.dun) {
    userData.dun = message;
    console.log('Dun:', userData.dun);
    closeModal();
    displayMessage(`Tuan Awang: Bagaimana pula umur anda?`, true, 500); //ASK AGE

  } else if (!userData.umur) {
    userData.umur = message;
    console.log('Umur:', userData.umur);
    hideInput();

  }

  // else if (!userData.jantina) {
  //   userData.jantina = message;
  //   hideInput();
  // displayMessage(`Tuan Awang: Sila pilih agama anda`, true); //ASK RELIGION
  //   setTimeout(function () {
  //     openModal('agama-options-modal'); //OPEN POP UP BOX
  //   }, 800); // Delay of 0.5 second
  //   closeModal(); // Add this line to close the gender selection modal

  // } 


  // else if (!userData.agama) {  
  // userData.agama = message;
  // hideInput();

  // } 

  // else if (userData.agama && !userData.bangsa) {
  //   userData.agama = message;
  //   console.log('Agama (Lain-lain):', userData.agama);
  // displayMessage(`Tuan Awang: Sila pilih bangsa anda`, true);
  //   hideInput();
  // setTimeout(function () {
  //   openModal('bangsa-options-modal'); //OPEN POP UP BOX FOR NEXT QUESTION IF ANY
  // }, 500);
  // closeModal();

  // } 

  else if (!userData.bangsa && ques == 5) {
    userData.bangsa = message;
    console.log('Bangsa:', userData.bangsa);
    hideInput();
  } 
  
  else if (userData.bangsa && !userData.mengundiAdun && ques==6 || userData.bangsa.trim() === 'Lain-lain' && ques==6) {
    userData.bangsalain = message;
    // ques++
    console.log('Bangsa (Lain-lain):', userData.bangsalain);

  const dun = userData.dun?.trim();
  const adun = dunToAdun[dun];

  // 🧾 Construct dynamic message
  let displayText;
  if (adun) {
    displayText = `Tuan Awang: Adakah anda akan mengundi ADUN ${adun.name} (${adun.party})?`;
  } else {
    displayText = `Tuan Awang: Adakah anda akan mengundi ADUN Semasa?`;
  }
     displayMessage(displayText, true);
    hideInput();
    setTimeout(function () {
      openModal('mengundiadun-options-modal'); //OPEN POP UP BOX
    }, 500);
    closeModal();
    askAdunQuestion();
  }


  else if (!userData.mengundiAdun && ques == 6) {
    userData.mengundiAdun = message;
    console.log('Bangsa:', userData.mengundiAdun);
    hideInput();
  }
  

  else if (userData.mengundiAdun && !userData.cenderunguntukundi && ques==7 || userData.mengundiAdun.trim() === 'Tidak Pasti' && ques==7) {
    userData.mengundiAdunLain = message;
    // ques++
    console.log('Adun (Lain-lain):', userData.mengundiAdunLain);
    displayMessage(`Tuan Awang: Kategori parti manakah yang cenderung untuk anda undi?`, true);
    hideInput();
    setTimeout(function () {
      openModal('cenderunguntukundi-options-modal'); //OPEN POP UP BOX
    }, 500);
    closeModal();
  }


//   else if (ques == 6) {
//   closeModal();

//   const dun = userData.dun?.trim(); // Get the selected DUN
//   const adun = dunToAdun[dun]; // Lookup in your mapping

//   let message;
//   if (adun) {
//     message = `Tuan Awang: Adakah anda akan mengundi ADUN ${adun.name} (${adun.party})?`;
//   } else {
//     message = `Tuan Awang: Adakah anda akan mengundi ADUN Semasa?`;
//   }

//   displayMessage(message, true);

//   const adunQuestionText = document.getElementById('adun-question-text');
//   if (adunQuestionText) {
//     adunQuestionText.textContent = message.replace('Tuan Awang: ', ''); // remove speaker prefix for modal
//   }

//   openModal('mengundiadun-options-modal');
// }

  else if (!userData.persepsi && ques == 7) {
    userData.persepsi = message;
    console.log('Persepsi:', userData.persepsi);
    hideInput();
  } else if (userData.persepsi && !userData.pengaruhberita && ques==8 || userData.persepsi.trim() === 'Lain-lain' && ques==8) {
    userData.persepsilain = message;
    console.log('Persepsi (Lain-lain):', userData.persepsilain);
    console.log(userData)
    displayMessage(`Tuan Awang: Bagaimanakah berita tersebut mempengaruhi pilihan anda?`, true);
    hideInput();
    setTimeout(function () {
      openModal('pengaruhberita-options-modal'); //OPEN POP UP BOX
    }, 500);
    closeModal();


  }
  //UNDI ADUN SEMASA 
  else if (!userData.mengundiAdun) {
    userData.mengundiAdun = message;
    // console.log('Persepsi:', userData.persepsi);
    hideInput();
  } else if (userData.mengundiAdun && !userData.cenderunguntukundi && ques==12 || userData.mengundiAdun.trim() === 'Tidak' && ques==12) {
    userData.tidakundi = message;
    // console.log('Persepsi (Lain-lain):', userData.persepsilain);
    // console.log(userData)
    displayMessage(`Tuan Awang: Kategori parti manakah yang cenderung untuk anda undi?`, true);
    hideInput();
    setTimeout(function () {
      openModal('cenderunguntukundi-options-modal'); //OPEN POP UP BOX
    }, 500);
    closeModal();

  }

  else if (!userData.pemimpinsabah) {
    userData.pemimpinsabah = message;
    console.log('Pemimpin sabah:', userData.pemimpinsabah);
    hideInput();
  } else if (userData.pemimpinsabah && !userData.isiboranglagi) {
    userData.pemimpinsabahlain = message;
    console.log('Pemimpin sabah:', userData.pemimpinsabahlain);
    console.log(userData)
    displayMessage(`Tuan Awang: Adakah anda ingin mengisi borang lagi sekali?`, true);
    hideInput();

    //capture end time
    getEndTime();

    setTimeout(function () {
      openModal('isiboranglagi-options-modal'); //OPEN POP UP BOX
    }, 500);
    closeModal();


  }

  //       else if (l === 'false' && userData.pilihanpemimpinsabah) {
  //         userData.pilihanpemimpinsabahlain = message;
  //         console.log('Yang Layak Memimpin Sabah:', userData.pilihanpemimpinsabahlain);
  //         hideInput();
  //       //displayMessage(`Tuan Awang: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah Maju Jaya!`, true);
  //         //displayUserInfo(userData);
  //       openModal('isiboranglagi-options-modal');
  //       //userData.isiboranglagi = message;
  //         //closeModal();
  //       //userData.isiboranglagi = message;
  //       //pengesahanEnd();
  //         //initiateConversation(); 020824	  

  //       } 



  //   else if (!userData.tahappendidikan) {
  //     userData.tahappendidikan = message;
  //     console.log('Tahap Pendidikan:', userData.tahappendidikan);
  //     hideInput();	

  //   } else if (!userData.pekerjaan) {
  //     userData.pekerjaan = message;
  //     console.log('Jenis Pekerjaan:', userData.pekerjaan);
  //     hideInput();	

  //   } else if (userData.pekerjaan && !userData.pendapatanbulanan && b === 'true') {
  // 	b = 'false';
  //     userData.pendapatanbulanan = message;
  //     console.log('Pendapatan Bulanan:', userData.pendapatanbulanan);
  //     hideInput();
  //     setTimeout(function () {
  //       openModal('mediasemasa-options-modal'); //OPEN POP UP BOX
  //     }, 500);
  //     closeModal();
  //   } else if (!userData.pengaruhmediasemasa) {
  //     userData.pengaruhmediasemasa = message;
  //     console.log('Puas Dgn Pembangunan Semasa:', userData.pengaruhmediasemasa);
  //     hideInput();

  //   } else if (!userData.yapuasdgnpembangunansemasa && d === 'true') {
  // 	d = 'false';
  //     userData.yapuasdgnpembangunansemasa = message;
  //     console.log('Ya, Puas Dgn Pembangunan Semasa:', userData.yapuasdgnpembangunansemasa);
  //     hideInput();

  //   } else if (!userData.tidakpuasdgnpembangunansemasa && c === 'true') {
  // 	c = 'false';
  //     userData.tidakpuasdgnpembangunansemasa = message;
  //     console.log('Tidak Puas Dgn Pembangunan Semasa:', userData.tidakpuasdgnpembangunansemasa);
  //     hideInput();

  // //Puas Hati & Tidak Puas Hati - Lain-lain-------------------------------------------------------------------------------------------->
  //   } else if (g === 'true' && !userData.lainlainpuashati || g === 'true' && !userData.lainlaintidakpuashati){
  // 		if(userData.pengaruhmediasemasa.trim() === 'Ya'){
  // 			userData.lainlainpuashati = message;
  // 			hideInput();
  // 			setTimeout(function () {
  // 			  openModal('dunjalanidgnbaik-options-modal'); //OPEN POP UP BOX
  // 			}, 500);
  // 			closeModal();
  // 		}
  // 		else {
  // 			userData.lainlaintidakpuashati = message;
  // 			hideInput();
  // 			setTimeout(function () {
  // 			  openModal('dunmenyelesaikanmasalah-options-modal'); //OPEN POP UP BOX
  // 			}, 500);
  // 			closeModal();
  // 		}
  // 	g = 'false';
  //     console.log('Berpuas Hati Dgn Lain-lain:', userData.lainlainpuashati);
  // 	console.log('Tidak Berpuas Hati Dgn Lain-lain:', userData.lainlaintidakpuashati);

  // //Perbaiki & Tiasa Positif - Lain-lain-------------------------------------------------------------------------------------------->
  //   } else if (i === 'true' && !userData.perbaikilainlain || i === 'true' && !userData.tiadapositiflainlain){
  // 		if(userData.penambahbaikanmasadepan.trim() === 'Lain-lain'){
  // 			userData.perbaikilainlain = message;
  // 			hideInput();
  // 			setTimeout(function () {
  // 			  openModal('kriteriapemimpinbaik-options-modal'); //OPEN POP UP BOX
  // 			}, 500);
  // 			closeModal();
  // 		}
  // 		else {
  // 			userData.tiadapositiflainlain = message;
  // 			hideInput();
  // 			setTimeout(function () {
  // 			  openModal('kriteriapemimpinbaik-options-modal'); //OPEN POP UP BOX
  // 			}, 500);
  // 			closeModal();
  // 		}
  //     console.log('Perbaiki Masa Depan Pada Lain-lain:', userData.perbaikilainlain);
  // 	console.log('Tiada Kesan Positif Pada Lain-lain:', userData.tiadapositiflainlain);

  //    //siapa layak mempimpin sabah - lain-lain-------------------------------------------------------------------------------------------->
  //   } 

  // else if (l === 'false' && userData.pilihanpemimpinsabah) {
  //   userData.pilihanpemimpinsabahlain = message;
  //   console.log('Yang Layak Memimpin Sabah:', userData.pilihanpemimpinsabahlain);
  //   hideInput();
  // //displayMessage(`Tuan Awang: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah Maju Jaya!`, true);
  //   //displayUserInfo(userData);
  // openModal('isiboranglagi-options-modal');
  // //userData.isiboranglagi = message;
  //   //closeModal();
  // //userData.isiboranglagi = message;
  // //pengesahanEnd();
  //   //initiateConversation(); 020824	  

  // } 


  //   else if (m === 'false' && userData.undidun.trim() === 'Tidak') {
  //     userData.cadangancalonyb  = message;
  //     console.log('Cadangan calon yb:', userData.cadangancalonyb);
  //     hideInput();
  // 	openModal('kmperubahanpositif-options-modal');  

  //   } else if (!userData.isiboranglagi) {
  //     userData.isiboranglagi = message;
  //     console.log('Isi borang lagi:', userData.isiboranglagi);
  //     hideInput();	

  // //Puas Hati - keperluanasas
  //   } else if (!userData.keperluanasaspuashati) {
  //     userData.keperluanasaspuashati = message;
  //     console.log('Berpuas Hati Dgn Keperluan Asas:', userData.keperluanasaspuashati);
  //     hideInput();

  // //Puas Hati - Infrastruktur
  //   } else if (!userData.infrastrukturpuashati) {
  //     userData.infrastrukturpuashati = message;
  //     console.log('Berpuas Hati Dgn Infrastruktur:', userData.infrastrukturpuashati);
  //     hideInput();

  // //Puas Hati - Kebajikan
  //   } else if (!userData.kebajikanpuashati) {
  //     userData.kebajikanpuashati = message;
  //     console.log('Berpuas Hati Dgn Kebajikan:', userData.kebajikanpuashati);
  //     hideInput();

  // //Puas Hati - dunjalanidgnbaik
  //   } else if (!userData.dunjalanidgnbaik) {
  //     userData.dunjalanidgnbaik  = message;
  //     console.log('DUN Menjalankan Tugas Dgn Baik:', userData.dunjalanidgnbaik);
  //     hideInput();


  // //Tidak Puas Hati - keperluanasas
  //   } else if (!userData.keperluanasastidakpuashati) {
  //     userData.keperluanasastidakpuashati = message;
  //     console.log('Tidak Berpuas Hati Dgn Keperluan Asas:', userData.keperluanasastidakpuashati);
  //     hideInput();

  // //Tidak Puas Hati - Infrastruktur
  //   } else if (!userData.infrastrukturtidakpuashati) {
  //     userData.infrastrukturtidakpuashati = message;
  //     console.log('Tidak Berpuas Hati Dgn Infrastruktur:', userData.infrastrukturtidakpuashati);
  //     hideInput();

  // //Tidak Puas Hati - Kebajikan
  //   } else if (!userData.kebajikantidakpuashati) {
  //     userData.kebajikantidakpuashati  = message;
  //     console.log('Tidak Berpuas Hati Dgn Kebajikan:', userData.kebajikantidakpuashati);
  //     hideInput();

  // //Tidak Puas Hati - dunmenyelesaikanmasalah 
  //   } else if (!userData.dunmenyelesaikanmasalah) {
  //     userData.dunmenyelesaikanmasalah  = message;
  //     console.log('DUN Menyelesaikan Masalah:', userData.dunmenyelesaikanmasalah);
  //     hideInput();

  //   } else if (!userData.undidun) {
  //     userData.undidun  = message;
  //     console.log('Undi YB ADUN lagi:', userData.undidun);
  //     hideInput();


  //   } else if (!userData.kmperubahanpositif) {
  //     userData.kmperubahanpositif  = message;
  //     console.log('KM Sabah Membawa Perubahan Positif:', userData.kmperubahanpositif);
  //     hideInput();

  //   } else if (!userData.penambahbaikanmasadepan) {
  //     userData.penambahbaikanmasadepan  = message;
  //     console.log('Penambahbaikan Masa Depan:', userData.penambahbaikanmasadepan);
  //     hideInput();  

  //    } else if (!userData.tiadakesanpositif) {
  //     userData.tiadakesanpositif = message;
  //     console.log('Tiada Kesan Positif Pada:', userData.tiadakesanpositif);
  //     hideInput();

  //    //ya membawa positif - penambaikan keperluan asas
  //   } else if (!userData.perbaikikeperluanasas) {
  //     userData.perbaikikeperluanasas = message;
  //     console.log('Perbaiki Keperluan Asas:', userData.perbaikikeperluanasas);
  //     hideInput();

  //    //ya membawa positif - penambaikan infrastruktur
  //   } else if (!userData.perbaikiinfrastruktur) {
  //     userData.perbaikiinfrastruktur = message;
  //     console.log('Perbaiki Infrastruktur:', userData.perbaikiinfrastruktur);
  //     hideInput();

  //    //ya membawa positif - penambaikan ekonomi
  //   } else if (!userData.perbaikiekonomi) {
  //     userData.perbaikiekonomi = message;
  //     console.log('Perbaiki Ekonomi:', userData.perbaikiekonomi);
  //     hideInput();

  //    //ya membawa positif - penambaikan perkhidmatan awam
  //   } else if (!userData.perbaikiperkhidmatanawam) {
  //     userData.perbaikiperkhidmatanawam = message;
  //     console.log('Perbaiki Perkhidmatan Awam:', userData.perbaikiperkhidmatanawam);
  //     hideInput();

  //    //siapa layak mempimpin sabah
  //   } else if (!userData.pilihanpemimpinsabah) {
  //     userData.pilihanpemimpinsabah = message;
  //     console.log('Yang Layak Memimpin Sabah:', userData.pilihanpemimpinsabah);
  //     hideInput();	

  //   }
}

//JIKA BEKERJA
var b = '';
//JIKA TIDAK PUAS DENGAN PEMBANGUNAN SEMASA
var c = '';
//PUAS DENGAN PEMBANGUNAN SEMASA
var d = '';

//FOR LAIN-LAIN 
var g = '';

//FOR LAIN-LAIN
var i = '';

//FOR ISI BORANG LAGI AFTER PICKED LAIN-LAIN MEMIMPIN
var l = 'na';

var m = '';

function selectZone(zone) {

  switch (zone) {
    case "Pantai Barat":
      ques++
      closeModal('zone-options-modal')
      openModal('parlimen-modal')
      populateBubbleOptionsP(["P169 Kota Belud","P170 Tuaran",  "P171 Sepanggar","P172 Kota Kinabalu", "P173 Putatan", "P174 Penampang", "P175 Papar", "P179 Ranau"]);
      break;

    case "Pedalaman":
      ques++
      closeModal('zone-options-modal')
      openModal('parlimen-modal')
      populateBubbleOptionsP(["P176 Kimanis", "P177 Beaufort","P178 Sipitang", "P180 Keningau", "P181 Tenom", "P182 Pensiangan"])
      break;

    case "Kudat":
      ques++
      closeModal('zone-options-modal')
      openModal('parlimen-modal')
      populateBubbleOptionsP(["P167 Kudat", "P168 Kota Marudu"])
      break;

    case "Sandakan":
      ques++
      closeModal('zone-options-modal')
      openModal('parlimen-modal')
      populateBubbleOptionsP(["P183 Beluran","P184 Libaran", "P185 Batu Sapi", "P186 Sandakan", "P187 Kinabatangan"])
      break;

    case "Tawau":
      ques++
      closeModal('zone-options-modal')
      openModal('parlimen-modal')
      populateBubbleOptionsP(["P188 Lahad Datu", "P189 Semporna", "P190 Tawau", "P191 Kalabakan"])
      break;
  }
}

function selectParlimen(parlimen) {

  switch (parlimen) {
    case "P167 Kudat":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N1 Banggi", "N2 Bengkoka", "N3 Pitas", "N4 Tanjong Kapor"]);
      break;

    case "P168 Kota Marudu":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N5 Matunggong", "N6 Bandau", "N7 Tandek"]);
      break;

    case "P169 Kota Belud":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N8 Pintasan", "N9 Tempasuk", "N10 Usukan", "N11 Kadamaian"]);
      break;

    case "P170 Tuaran":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N12 Sulaman", "N13 Pantai Dalit", "N14 Tamparuli", "N15 Kiulu"]);
      break;

    case "P171 Sepanggar":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N16 Karambunai", "N17 Darau", "N18 Inanam"]);
      break;

    case "P172 Kota Kinabalu":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N19 Likas", "N20 Api-Api", "N21 Luyang"]);
      break;

    case "P173 Putatan":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')

      populateBubbleOptions(["N22 Tanjong Aru", "N23 Petagas", "N24 Tanjung Keramat"]);
      break;

    case "P174 Penampang":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N25 Kapayan", "N26 Moyog"]);
      break;

    case "P175 Papar":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N27 Limbahau", "N28 Kawang", "N29 Pantai Manis"]);
      break;

    case "P176 Kimanis":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')

      populateBubbleOptions(["N30 Bongawan", "N31 Membakut"]);

      break;

    case "P177 Beaufort":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')

      populateBubbleOptions(["N32 Klias", "N33 Kuala Penyu"]);
      break;

    case "P178 Sipitang":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')

      populateBubbleOptions(["N34 Lumadan", "N35 Sindumin"]);

      break;


    case "P179 Ranau":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N36 Kundasang", "N37 Karanaan", "N38 Paginatan"]);
      break;

    case "P180 Keningau":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N39 Tambunan", "N40 Bingkor", "N41 Liawan"]);
      break;

    case "P181 Tenom":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')

      populateBubbleOptions(["N42 Melalap", "N43 Kemabong"]);

      break;

    case "P182 Pensiangan":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')

      populateBubbleOptions(["N44 Tulid", "N45 Sook", "N46 Nabawan"]);
      break;

    case "P183 Beluran":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')

      populateBubbleOptions(["N47 Telupid", "N48 Sugut", "N49 Labuk"]);
      break;



    case "P184 Libaran":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N50 Gum-Gum", "N51 Sungai Manila", "N52 Sungai Sibuga"]);
      break;

    case "P185 Batu Sapi":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N53 Sekong", "N54 Karamunting"]);
      break;

    case "P186 Sandakan":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N55 Elopura", "N56 Tanjong Papat"]);
      break;


    case "P187 Kinabatangan":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')

      populateBubbleOptions(["N57 Kuamut", "N58 Lamag", "N59 Sukau"]);
      break;

    case "P188 Lahad Datu":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')

      populateBubbleOptions(["N60 Tungku", "N61 Segama", "N62 Silam", "N63 Kunak"]);
      break;


    case "P189 Semporna":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N64 Sulabayan", "N65 Senallang", "N66 Bugaya"]);
      break;

    case "P190 Tawau":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')
      populateBubbleOptions(["N67 Balung", "N68 Apas", "N69 Sri Tanjong"]);
      break;

    case "P191 Kalabakan":
      ques++
      closeModal('parlimen-options-modal')
      openModal('dun-modal')

      populateBubbleOptions(["N70 Kukusan", "N71 Tanjung Batu", "N72 Merotai", "N73 Sebatik"]);

      break;

    default:
      console.log("no parlimen selected");

  }
  

  console.log(parlimen);

  // switch (parlimen) {
  //   case "P167":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N1 Banggi", "N2 Bengkoka", "N3 Pitas", "N4 Tanjong Kapor"]);
  //     break;

  //   case "P168":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N5 Matunggong", "N6 Bandau", "N7 Tandek"]);
  //     break;

  //   case "P169":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N8 Pintasan", "N9 Tempasuk", "N10 Usukan", "N11 Kadamaian"]);
  //     break;

  //   case "P170":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N12 Sulaman", "N13 Pantai Dalit", "N14 Tamparuli", "N15 Kiulu"]);
  //     break;

  //   case "P171":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N16 Karambunai", "N17 Darau", "N18 Inanam"]);
  //     break;

  //   case "P172":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N19 Likas", "N20 Api-Api", "N21 Luyang"]);
  //     break;

  //   case "P173":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')

  //     populateBubbleOptions(["N22 Tanjong Aru", "N23 Petagas", "N24 Tanjung Keramat"]);
  //     break;

  //   case "P174":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N25 Kapayan", "N26 Moyog"]);
  //     break;

  //   case "P175":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N27 Limbahau", "N28 Kawang", "N29 Pantai Manis"]);
  //     break;

  //   case "P176":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')

  //     populateBubbleOptions(["N30 Bongawan", "N31 Membakut"]);

  //     break;

  //   case "P177":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')

  //     populateBubbleOptions(["N32 Klias", "N33 Kuala Penyu"]);
  //     break;

  //   case "P178":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')

  //     populateBubbleOptions(["N34 Lumadan", "N35 Sindumin"]);

  //     break;


  //   case "P179":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N36 Kundasang", "N37 Karanan", "N38 Paginatan"]);
  //     break;

  //   case "P180":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N39 Tambunan", "N40 Bingkor", "N41 Liawan"]);
  //     break;

  //   case "P181":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')

  //     populateBubbleOptions(["N42 Melalap", "N43 Kemabong"]);

  //     break;

  //   case "P182":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')

  //     populateBubbleOptions(["N44 Tulid", "N45 Sook", "N46 Nabawan"]);
  //     break;

  //   case "P183":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')

  //     populateBubbleOptions(["N47 Telupid", "N48 Sugut", "N49 Labuk"]);
  //     break;



  //   case "P184":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N50 Gum-Gum", "N51 Sungai Manila", "N52 Sungai Sibuga"]);
  //     break;

  //   case "P185":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N53 Sekong", "N54 Karamunting"]);
  //     break;

  //   case "P186":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N55 Elopura", "N56 Tanjong Papat"]);
  //     break;


  //   case "P187":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')

  //     populateBubbleOptions(["N57 Kuamut", "N58 Lamag", "N59 Sukau"]);
  //     break;

  //   case "P188":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')

  //     populateBubbleOptions(["N60 Tungku", "N61 Segama", "N62 Silam", "N63 Kunak"]);
  //     break;


  //   case "P189":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N64 Sulabayan", "N65 Senallang", "N66 Bugaya"]);
  //     break;

  //   case "P190":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')
  //     populateBubbleOptions(["N67 Balung", "N68 Apas", "N69 Sri Tanjong"]);
  //     break;

  //   case "P191":
  //     ques++
  //     closeModal('parlimen-options-modal')
  //     openModal('dun-modal')

  //     populateBubbleOptions(["N70 Kukusan", "N71 Tanjung Batu", "N72 Merotai", "N73 Sebatik"]);

  //     break;

  //   default:
  //     console.log("no parlimen selected");

  // }
}

// Function to populate the bubble options dynamically
function populateBubbleOptions(options) {
  const container = document.getElementById('bubble-options-container');
  container.innerHTML = ''; // Clear any previous options

  // Loop through each option and create a bubble
  options.forEach(option => {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble-option');
    bubble.textContent = option;

    // Dynamically assign the onclick handler for each bubble
    bubble.onclick = function () {
      selectOption(option, 'dun');  // Call selectOption with dynamic parameters
    };

    container.appendChild(bubble);
  });
}

// Function to populate the bubble options dynamically
function populateBubbleOptionsP(options) {
  const container = document.getElementById('bubble-options-containerp');
  container.innerHTML = ''; // Clear any previous options

  // Loop through each option and create a bubble
  options.forEach(option => {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble-option');
    bubble.textContent = option;

    // Dynamically assign the onclick handler for each bubble
    bubble.onclick = function () {
      selectParlimen(option)  // Call selectOption with dynamic parameters
      console.log("click:" + option);
      
    };

    container.appendChild(bubble);
  });
}

//FUNCTION WHERE SURVEYORS CANNOT TAKE THE SURVEY WITHIN THE WORKING HOURS
// function checkWorkingHours() {
//   const now = new Date();
//   const currentHour = now.getHours();    // 0–23
//   const currentMinutes = now.getMinutes(); // 0–59

//   // Convert current time to minutes since midnight
//   const currentTimeInMinutes = currentHour * 60 + currentMinutes;

//   // Define start and end time in minutes
//   const startTime = 6 * 60;  // 6:00 AM 
//   //const endTime = 5 * 60 + 30 ;   // 8:30 PM (For Testing Purpose)
//   const endTime = 20 * 60;   // 8:00 PM (For Testing Purpose)
  

//   const surveyContainer = document.getElementById('chat-container');
//   const message = document.getElementById('off-hours-message');

//   if (currentTimeInMinutes >= startTime && currentTimeInMinutes < endTime) {
//     surveyContainer.style.display = 'block';
//     message.style.display = 'none';
//   } else {
//     surveyContainer.style.display = 'none';
//     message.style.display = 'block';
//   }
// }

//  window.addEventListener('DOMContentLoaded', checkWorkingHours);


//BOT QUESTIONS AFTER RECEIVING INPUT FROM USER - HANDLING USER OPTION SELECTION ~^-^~ \\starterfirst
function selectOption(selectedOption, field) {
  userData[field] = selectedOption;
  console.log(`${field}:`, userData[field]);
  // console.log(userData);

  displayMessage(`Anda: ${selectedOption}`);
  ques++;
  console.log("current: " + ques);
  
  renderModal();
  /*console.log('b:', b);
  console.log('c:', c);
  console.log('d:', d);
  console.log('g:', g);
  console.log('i:', i);
  console.log('l:', l);
  console.log('m:', m);*/

  // //-------->SECTION 1  
  //   if (!userData.dun) {
  //     ques++
  //     console.log(ques);

  //     // If dun is not yet provided, ask for dun
  //     displayMessage(`Tuan Awang: Sila pilih DUN anda`, true);
  //     closeModal('dun-options-modal');

  //   } 

  //   else if (!userData.jantina) {
  //     ques++
  //     console.log("Jantina:"+ ques);
  //     closeModal();
  //       // If gender is not yet provided, ask for gender
  //       displayMessage(`Tuan Awang: Sila pilih jantina anda`, true);
  //       openModal('jantina-options-modal');

  //     } 

  //   else if (!userData.umur) {
  //     ques++
  // 	closeModal();
  //     // If age is not yet provided, ask for age
  // 	// displayMessage(`Tuan Awang: Saya pasti banyak tempat yang menarik di ${userData.dun}`, true);
  //     displayMessage(`Tuan Awang: Sila pilih umur anda`, true);
  // 	b = '';
  // 	c = '';
  // 	d = '';
  // 	g = '';
  // 	i = '';
  // 	l = 'na';
  // 	m = '';
  //     openModal('umur-options-modal');

  //   } 

  //   //-------->SECTION 2
  //   else if (!userData.bangsa) {
  //     closeModal();
  //     ques++
  //     console.log(ques);
  //     // ask for bangsa
  //     displayMessage(`Tuan Awang: Sila pilih bangsa anda`, true);
  //     openModal('bangsa-options-modal');

  //   } else if (userData.bangsa.trim() === 'Lain-lain'  && !userData.pengaruhmediasemasa) {
  //     ques++
  //     // If user choose lain-lain under bangsa
  //     console.log(userData);

  //     displayMessage(`Tuan Awang: Sila nyatakan bangsa anda`, true);
  // 	closeModal();
  // 	showInput();
  //   } 

  //   else if (!userData.pengaruhmediasemasa) {
  //     ques++
  //     // ask for puasdgnpembangunansemasa
  // 	closeModal();
  //     displayMessage(`Tuan Awang: Adakah Media Semasa akan mempengaruhi pilihan pengundian anda?`, true);
  //     openModal('mediasemasa-options-modal');

  //   } 

  //   else if (!userData.persepsi){
  //     ques++
  //     closeModal();
  //     displayMessage(`Tuan Awang: Adakah perkara-perkara berikut mempengaruhi persepsi anda?`, true);
  //     displayMessage("Integriti, Isu-isu moral, Kepimpinan", true);

  //     openModal('persepsi-options-modal');

  //   } 

  //   else if (userData.persepsi.trim() === 'Lain-lain' && !userData.pengaruhberita) {
  //     // If user choose lain-lain under bangsa
  //     // console.log("here ni");
  //     ques++
  //     displayMessage(`Tuan Awang: Sila nyatakan apa yang mempengaruhi persepsi anda:`, true);
  // 	closeModal();
  // 	showInput();
  //   } 

  //   else if (!userData.pengaruhberita){
  //     ques++
  //     closeModal();
  //     displayMessage(`Tuan Awang: Bagaimanakah berita tersebut mempengaruhi pilihan anda?`, true);
  //     openModal('pengaruhberita-options-modal');

  //   } 

  //   else if (!userData.faktorlain){
  //     ques++
  //     closeModal();
  //     displayMessage(`Tuan Awang: Selain daripada Media Semasa, apakah faktor lain yang mempengaruhi anda untuk mengundi?`, true);
  //     openModal('faktorlain-options-modal');

  //   } 

  //   else if (userData.faktorlain == 'Pendapat Peribadi' && !userData.pendapatperibadi){
  //     ques++
  //     closeModal();
  //     displayMessage(`Tuan Awang: Selain daripada Media Semasa, apakah faktor lain yang mempengaruhi anda untuk mengundi?`, true);
  //     openModal('pendapatperibadi-options-modal');

  //   } 

  //   else if (!userData.partiataucalon){
  //     closeModal();
  //     displayMessage(`Tuan Awang: Adakah anda mengundi bedasarkan Parti atau Calon?`, true);
  //     openModal('partiataucalon-options-modal');

  //   } 

  //   else if (!userData.cenderunguntukundi){
  //     closeModal();
  //     displayMessage(`Tuan Awang: Merujuk kepada pilihan dinyatakan di bawah, yang manakah lebih cenderung untuk anda undi?`, true);
  //     displayMessage(`Tuan Awang: 1) Parti Nasional 2) Parti Tempatan 3) Tiada Kecenderungan`, true);
  //     openModal('cenderunguntukundi-options-modal');

  //   } 

  //   // check this

  //   else if (!userData.pilihanpartinasional && userData.cenderunguntukundi == 'Parti Nasional'){
  //     closeModal();
  //     displayMessage(`Tuan Awang: Parti Nasional pilihan anda?`, true);
  //     openModal('partinasional-options-modal');
  //     // console.log("siniii");

  //   } 

  //   else if (userData.pilihanpartinasional && userData.cenderunguntukundi == 'Parti Nasional' && !userData.pilihanpartitempatan){
  //     closeModal();
  //     displayMessage(`Tuan Awang: Parti tempatan pilihan anda?`, true);
  //     openModal('partitempatan-options-modal');
  //     // console.log("ani tang baru");

  //   } 

  //   else if (!userData.pilihanpartitempatan && userData.cenderunguntukundi == 'Parti Tempatan'){
  //     closeModal();
  //     displayMessage(`Tuan Awang: Parti tempatan pilihan anda?`, true);
  //     openModal('partitempatan-options-modal');
  //     console.log("Tempatan");

  //   } 

  //   else if (!userData.pemimpinsabah ){
  //     closeModal();
  //     displayMessage(`Tuan Awang: Akhir sekali, pada pendapat anda siapa yang layak untuk memimpin sabah?`, true);
  //     openModal('pemimpinsabah-options-modal');
  //     console.log('hereeee');

  //   } 

  //   else if (userData.pemimpinsabah.trim() === 'Lain-lain' && !userData.isiboranglagi) {
  //     // If user choose lain-lain under bangsa
  //     // console.log("here ni");

  //     displayMessage(`Tuan Awang: Sila nyatakan pilihan pemimpin sabah anda:`, true);
  // 	closeModal();
  // 	showInput();
  //   } 

  //   else if (!userData.isiboranglagi){
  //     closeModal();
  //       displayMessage(`Tuan Awang: Adakah anda ingin mengisi borang lagi sekali?`, true);
  //       openModal('isiboranglagi-options-modal');


  //     //isi borang lagi - ya
  //     } 

  //     else if (userData.isiboranglagi === 'Ya, isi lagi'){
  //       closeModal();
  //       console.log('Anda pilih ya.')
  //       console.log(userData);
  //       displayUserInfo(userData);
  //       initiateConversation();

  //     //isi borang lagi - tidak
  //     } else if (userData.isiboranglagi === 'Tidak'){
  //       console.log('Anda pilih tidak.')
  //       displayUserInfo(userData);
  //       console.log(userData);
  //       // remove user kod (end user session)
  //       localStorage.removeItem('enumerator');
  //       closeModal();
  //       hideInput(); 
  //       displayMessage(`Tuan Awang: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah Maju Jaya!`, true);

  //     } else {
  //       // All information collected, finish conversation
  //       displayMessage(`Tuan Awang: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah Maju Jaya!`, true);
  //       displayUserInfo(userData);
  //       closeModal();
  //       initiateConversation();
  //     }  


  // else if (!userData.agama) {
  //   // If religion is not yet provided, ask for religion
  //   displayMessage(`Tuan Awang: Sila pilih agama anda`, true);
  // openModal('agama-options-modal');

  // } 

  // else if (!userData.bangsa && userData.agama.trim() === 'Lain-lain') {
  //   // If user choose lain-lain under agama
  //   displayMessage(`Tuan Awang: Sila nyatakan agama anda`, true);
  // closeModal();
  // showInput();

  // } 

  // else if (!userData.tahappendidikan) {
  //   // ask for tahap pendidikan
  //   displayMessage(`Tuan Awang: Sila pilih tahap pendidikan anda`, true);
  //   openModal('tahappendidikan-options-modal');

  // } else if (!userData.pekerjaan) {
  //   // ask for jenis pekerjaan
  // closeModal();
  //   displayMessage(`Tuan Awang: Apakah status pekerjaan anda?`, true);
  //   openModal('pekerjaan-options-modal');

  // } else if (!userData.pendapatanbulanan && userData.pekerjaan.trim() === 'Bekerja') {
  //   // If user choose Bekerja under pekerjaan
  // b = 'true';
  // closeModal();
  //   displayMessage(`Tuan Awang: Sila pilih jumlah pendapatan bulanan anda`, true);
  // openModal('pendapatanbulanan-options-modal');


  // } 


  // else if (!userData.pilihanpartinasional){
  //   closeModal();
  //   displayMessage(`En. Akhir sekali, pada pendapat anda siapa yang layak untuk memimpin sabah?`, true);
  //   openModal('pemimpinsabah-options-modal');
  //   console.log("Tempatan");

  // } 


  // else if (userData.cenderunguntukundi == 'Parti Nasional'){
  //   closeModal();
  //   displayMessage(`En. pilih parti nasional`, true);
  //   openModal('partinasional-options-modal');

  // } 

  // else if (!userData.pilihanpartitempatan){
  //   closeModal();
  //   displayMessage(`En. pilih parti nasional`, true);
  //   openModal('partinasional-options-modal');

  // } 

  // else if (userData.cenderunguntukundi == 'Parti Tempatan'){
  //   closeModal();
  //   displayMessage(`En. pilih parti tempatan`, true);
  //   openModal('partitempatan-options-modal');

  // } 
  // else if (!userData.yapuasdgnpembangunansemasa && userData.pengaruhmediasemasa.trim() === 'Ya'){
  //   // ask for yapuasdgnpembangunansemasa
  // d = 'true';
  // closeModal();
  //   displayMessage(`Tuan Awang: Apakah yang membuatkan anda berpuas hati?`, true);
  //   openModal('yapuasdgnpembangunansemasa-options-modal');

  // } else if (!userData.tidakpuasdgnpembangunansemasa && userData.pengaruhmediasemasa.trim() === 'Tidak'){
  //   // ask for tidakpuasdgnpembangunansemasa
  // c = 'true';
  // closeModal();
  //   displayMessage(`Tuan Awang: Apakah yang membuatkan anda tidak berpuas hati?`, true);
  //   openModal('tidakpuasdgnpembangunansemasa-options-modal');
  // } 
  //jika puas hati; keperluan asas


  //   else if (!userData.keperluanasaspuashati && userData.yapuasdgnpembangunansemasa.trim() === 'Air/Letrik/Internet'){
  // 	closeModal();
  //     displayMessage(`Tuan Awang: Bolehkah kami tahu bahagian mana yang anda berpuas hati?`, true);
  //     openModal('keperluanasaspuashati-options-modal');

  // //jika puas hati; infrastruktur
  //   } else if (!userData.infrastrukturpuashati && userData.yapuasdgnpembangunansemasa.trim() === 'Jalan/Parit/Pengangkutan'){
  // 	closeModal();
  //     displayMessage(`Tuan Awang: Bolehkah kami tahu bahagian mana yang anda berpuas hati?`, true);
  //     openModal('infrastrukturpuashati-options-modal');

  // //jika puas hati; kebajikan
  //   } else if (!userData.kebajikanpuashati && userData.yapuasdgnpembangunansemasa.trim() === 'Kebajikan'){
  // 	closeModal();
  //     displayMessage(`Tuan Awang: Bolehkah kami tahu bahagian mana yang anda berpuas hati?`, true);
  //     openModal('kebajikanpuashati-options-modal');

  // //jika puas hati; lain-lain
  //   } else if (!userData.lainlainpuashati && userData.yapuasdgnpembangunansemasa.trim() === 'Lain-lain') {
  // 	//e = 'true';
  // 	b = 'false';
  // 	c = 'false';
  // 	d = 'false';
  // 	g = 'true'; //
  //     displayMessage(`Tuan Awang: Anda pilih lain-lain, sila nyatakan apakah yang membuatkan anda berpuas hati?`, true);
  // 	closeModal();
  // 	showInput();
  //   } 
  //jika puas hati; dunjalanidgnbaik 



  //   else if (!userData.dunjalanidgnbaik && userData.pengaruhmediasemasa === 'Ya'){
  // 	closeModal();
  //     displayMessage(`Tuan Awang: Adakah YB ADUN anda menjalankan tanggungjawab dengan baik?`, true);
  //     openModal('dunjalanidgnbaik-options-modal');


  // //jika tidak puas hati; keperluan asas
  //   } else if (!userData.keperluanasastidakpuashati && userData.tidakpuasdgnpembangunansemasa.trim() === 'Air/Letrik/Internet'){
  // 	closeModal();
  //     displayMessage(`Tuan Awang: Bolehkah kami tahu bahagian mana yang anda tidak berpuas hati?`, true);
  //     openModal('keperluanasastidakpuashati-options-modal');

  // //jika tidak puas hati; infrastruktur
  //   } else if (!userData.infrastrukturtidakpuashati && userData.tidakpuasdgnpembangunansemasa.trim() === 'Jalan/Parit/Pengangkutan'){
  // 	closeModal();
  //     displayMessage(`Tuan Awang: Bolehkah kami tahu bahagian mana yang anda tidak berpuas hati?`, true);
  //     openModal('infrastrukturtidakpuashati-options-modal');

  // //jika tidak puas hati; kebajikan
  //   } else if (!userData.kebajikantidakpuashati && userData.tidakpuasdgnpembangunansemasa.trim() === 'Kebajikan'){
  // 	closeModal();
  //     displayMessage(`Tuan Awang: Bolehkah kami tahu bahagian mana yang anda tidak berpuas hati?`, true);
  //     openModal('kebajikantidakpuashati-options-modal');

  // //jika tidak puas hati; lain-lain
  //   } else if (!userData.lainlaintidakpuashati && userData.tidakpuasdgnpembangunansemasa.trim() === 'Lain-lain') {
  // 	//f = 'true';
  // 	b = 'false';
  // 	c = 'false';
  // 	d = 'false';
  //     g = 'true'; 
  //     displayMessage(`Tuan Awang: Anda pilih lain-lain, sila nyatakan apakah yang membuatkan anda tidak berpuas hati?`, true);
  // 	closeModal();
  // 	showInput();

  // //jika tidak puas hati; dunmenyelesaikanmasalah 
  //   } else if (!userData.dunmenyelesaikanmasalah && userData.pengaruhmediasemasa === 'Tidak'){
  // 	closeModal();
  //     displayMessage(`Tuan Awang: Adakah YB ADUN anda berusaha untuk menyelesaikan masalah yang dihadapi?`, true);
  //     openModal('dunmenyelesaikanmasalah-options-modal'); 

  //  //mengundi yb dun anda lagi
  //   } else if (!userData.undidun){
  // 	closeModal();
  //     displayMessage(`Tuan Awang: Adakah anda akan mengundi YB ADUN anda untuk pilihan raya negeri yang akan datang?`, true);
  //     openModal('undidun-options-modal');  

  //  //mengundi yb dun anda lagi - tidak
  //   } else if (!userData.cadangancalonyb && userData.undidun === 'Tidak'){
  // 	m = 'false';
  // 	closeModal();
  //     displayMessage(`Tuan Awang: Siapakah cadangan calon YB yang boleh mewakili kawasan anda pada PRU akan datang?`, true);
  // 	closeModal();
  // 	showInput();


  //-------->SECTION 3  
  //ketua menteri sabah membawa perubahan positif
  // } else if (!userData.kmperubahanpositif){
  //   m = 'true';
  // closeModal();
  //   displayMessage(`Tuan Awang: Adakah anda berpuas hati dengan kepimpinan Ketua Menteri Sabah sekarang?`, true);
  //   openModal('kmperubahanpositif-options-modal');   

  // //ya membawa positif - penambaikan
  // } else if (!userData.penambahbaikanmasadepan && userData.kmperubahanpositif.trim() === 'Ya'){ 
  // closeModal();
  //   displayMessage(`Tuan Awang: Apakah perkara utama yang anda harapkan dapat diperbaiki di masa yang akan datang?`, true);
  //   openModal('penambahbaikanmasadepan-options-modal'); 

  // //tidak pasti membawa positif - penambaikan
  // } else if (!userData.penambahbaikanmasadepan && userData.kmperubahanpositif.trim() === 'Tidak Pasti'){ 
  // closeModal();
  //   displayMessage(`Tuan Awang: Apakah perkara utama yang anda harapkan dapat diperbaiki di masa yang akan datang?`, true);
  //   openModal('penambahbaikanmasadepan-options-modal'); 

  // //tidak membawa positif - tiada kesan positif
  // } else if (!userData.tiadakesanpositif && userData.kmperubahanpositif.trim() === 'Tidak'){ 
  // closeModal();
  //   displayMessage(`Tuan Awang: Dari sudut manakah yang tidak memberi sebarang kesan yang positif?`, true);
  //   openModal('tiadakesanpositif-options-modal'); 

  //  //ya membawa positif - penambaikan keperluan asas
  // } else if (!userData.perbaikikeperluanasas && userData.penambahbaikanmasadepan.trim() === 'Air/Letrik/Internet'){
  // closeModal();
  //   displayMessage(`Tuan Awang: Bahagian manakah yang perlu ditambahbaik, mengikut pilihan anda di masa akan datang?`, true);
  //   openModal('perbaikikeperluanasas-options-modal');

  //  //ya membawa positif - penambaikan infrastruktur
  // } else if (!userData.perbaikiinfrastruktur && userData.penambahbaikanmasadepan.trim() === 'Jalan/Parit/Pengangkutan'){
  // closeModal();
  //   displayMessage(`Tuan Awang: Bahagian manakah yang perlu ditambahbaik, mengikut pilihan anda di masa akan datang?`, true);
  //   openModal('perbaikiinfrastruktur-options-modal');

  //  //ya membawa positif - penambaikan ekonomi
  // } else if (!userData.perbaikiekonomi && userData.penambahbaikanmasadepan.trim() === 'Ekonomi'){
  // closeModal();
  //   displayMessage(`Tuan Awang: Bahagian manakah yang perlu ditambahbaik, mengikut pilihan anda di masa akan datang?`, true);
  //   openModal('perbaikiekonomi-options-modal');

  //  //ya membawa positif - penambaikan perkhidmatan awam
  // } else if (!userData.perbaikiperkhidmatanawam && userData.penambahbaikanmasadepan.trim() === 'Perkhidmatan Awam'){
  // closeModal();
  //   displayMessage(`Tuan Awang: Bahagian manakah yang perlu ditambahbaik, mengikut pilihan anda di masa akan datang?`, true);
  //   openModal('perbaikiperkhidmatanawam-options-modal');

  //  //ya membawa positif - penambaikan lain-lain
  // } else if (!userData.perbaikilainlain && userData.penambahbaikanmasadepan.trim() === 'Lain-lain'){
  // g = 'false';
  // b = 'false';
  // c = 'false';
  // d = 'false';
  // i = 'true';
  // closeModal();
  //   displayMessage(`Tuan Awang: Sila nyatakan apakah yang dapat diperbaiki di masa akan datang?`, true);
  // closeModal();
  // showInput();

  //  //tiada kesan positif - keperluan asas
  // } else if (!userData.tiadapositifkeperluanasas && userData.tiadakesanpositif.trim() === 'Air/Letrik/Internet'){
  // closeModal();
  //   displayMessage(`Tuan Awang: Sila pilih yang mana tidak memberi sebarang kesan yang positif?`, true);
  //   openModal('tiadapositifkeperluanasas-options-modal');

  //  //tiada kesan positif - infrastruktur
  // } else if (!userData.tiadapositifinfrastruktur && userData.tiadakesanpositif.trim() === 'Jalan/Parit/Pengangkutan'){
  // closeModal();
  //   displayMessage(`Tuan Awang: Sila pilih yang mana tidak memberi sebarang kesan yang positif?`, true);
  //   openModal('tiadapositifinfrastruktur-options-modal');

  //  //tiada kesan positif - ekonomi
  // } else if (!userData.tiadapositifekonomi && userData.tiadakesanpositif.trim() === 'Ekonomi'){
  // closeModal();
  //   displayMessage(`Tuan Awang: Sila pilih yang mana tidak memberi sebarang kesan yang positif?`, true);
  //   openModal('tiadapositifekonomi-options-modal');

  //  //tiada kesan positif positif - perkhidmatan awam
  // } else if (!userData.tiadapositifperkhidmatanawam && userData.tiadakesanpositif.trim() === 'Perkhidmatan Awam'){
  // closeModal();
  //   displayMessage(`Tuan Awang: Sila pilih yang mana tidak memberi sebarang kesan yang positif?`, true);
  //   openModal('tiadapositifperkhidmatanawam-options-modal');

  //  //tiada kesan positif positif - lain-lain
  // } else if (!userData.tiadapositiflainlain && userData.tiadakesanpositif.trim() === 'Lain-lain'){
  // g = 'false';
  // b = 'false';
  // c = 'false';
  // d = 'false';
  //   i = 'true';
  // closeModal();
  //   displayMessage(`Tuan Awang: Sila nyatakan apakah yang tidak memberikan sebarang kesan yang positif?`, true);
  // closeModal();
  // showInput();

  // //kriteria KM yang baik
  // } else if (!userData.kriteriapemimpinbaik){
  // closeModal();
  //   displayMessage(`Tuan Awang: Apakah ciri-ciri ketua menteri yang baik mengikut pendapat anda?`, true);
  //   openModal('kriteriapemimpinbaik-options-modal');

  // //siapa layak memimpin sabah
  // } else if (!userData.pilihanpemimpinsabah){
  // l = 'true';
  // closeModal();
  //   displayMessage(`Tuan Awang: Akhir sekali, pada pendapat anda siapa yang layak untuk memimpin Sabah? 🤔`, true);
  //   openModal('pilihanpemimpinsabah-options-modal');

  //  //siapa layak mempimpin sabah - lain-lain
  //  } else if (l === 'true' && userData.pilihanpemimpinsabah.trim() === 'Lain-lain'){
  // g = 'false';
  // b = 'false';
  // c = 'false';
  // d = 'false';
  // i = 'false';
  // l = 'false';
  // closeModal();
  //   displayMessage(`Tuan Awang: Sila nyatakan siapakah yang layak untuk memimpin Sabah?`, true);
  // //closeModal();
  // showInput(); 

  // //isi borang lagi/*
  // } 

}


// function populateBubbleOptions(options) {
//   const container = document.getElementById('dun-options-container');
//   container.innerHTML = ''; // clear existing

//   options.forEach(dun => {
//     const btn = document.createElement('button');
//     btn.textContent = dun;
//     btn.onclick = () => selectDun(dun);
//     container.appendChild(btn);
//   });
// }

let selectedDun = '';

function selectDun(dun) {
  selectedDun = dun; // this line sets the global variable
  userData.dun = dun;
  console.log("DUN selected:", selectedDun);
  ques++;             // move to next question
  closeModal('dun-modal');
  handleQuestion();   // move to next step
}


 //Aduns with their respective dunToAduns

 const dunToAdun = {
  "N1 Banggi": { name: "Mohammad Mohamarin", party: "GRS", photo: "adun_pictures/N1 BANGGI-MOHAMMAD MOHAMARIN.jpg" },
  "N2 Bengkoka": { name: "Harun Durabi", party: "BN", photo: "adun_pictures/N2 BENGKOKA - HARUN DURABI.jpg" },
  "N3 Pitas": { name: "Ruddy Awah", party: "GRS", photo: "adun_pictures/N3 PITAS - RUDDY AWAH.jpg" },
  "N4 Tanjong Kapor": { name: "Ben Chong Chen Bin", party: "GRS", photo: "adun_pictures/N4 TANJONG KAPOR - BEN CHONG CHEN BIN.jpg" },
  "N5 Matunggong": { name: "Julita Mojungki", party: "GRS", photo: "adun_pictures/N5 MATUNGGONG - JULITA MOJUNGKI.jpg" },
  "N6 Bandau": { name: "Wetrom @ Mohd Fikri Bahanda", party: "KDM", photo: "adun_pictures/N6 BANDAU - WETROM @ MOHD FIKRI BAHANDA.jpg" },
  "N7 Tandek": { name: "Hendrus Anding", party: "GRS", photo: "adun_pictures/N7 TANDEK - HENDRUS ANDING.jpg" },
  "N8 Pintasan": { name: "Fairuz Renddan", party: "GRS", photo: "adun_pictures/N8 PINTASAN - FAIRUZ RENDDAN.jpg" },
  "N9 Tempasuk": { name: "Mohd Arsad Bistari", party: "GRS", photo: "adun_pictures/N9 TEMPASUK - MOHD ARSAD BISTARI.jpg" },
  "N10 Usukan": { name: "Salleh Said Keruak", party: "BN", photo: "adun_pictures/N10 USUKAN - SALLEH SAID KERUAK.jpg" },
  "N11 Kadamaian": { name: "Ewon Benedick", party: "PH", photo: "adun_pictures/N11 KADAMAIAN - EWON BENEDICK.jpg" },
  "N12 Sulaman": { name: "Hajiji Noor", party: "GRS", photo: "adun_pictures/N12 SULAMAN - HAJIJI NOOR.jpg" },
  "N13 Pantai Dalit": { name: "Jasnih Daya", party: "GRS", photo: "adun_pictures/N13 PANTAI DALIT - JASNIH DAYA.jpg" },
  "N14 Tamparuli": { name: "Jahid Jahim", party: "GRS", photo: "adun_pictures/N14 TAMPARULI - JAHID JAHIM.jpg" },
  "N15 Kiulu": { name: "Joniston Bangkuai", party: "GRS", photo: "adun_pictures/N15 KIULU - JONISTON BANGKUAI.jpg" },
  "N16 Karambunai": { name: "Yakubah Khan", party: "BN", photo: "adun_pictures/N16 KARAMBUNAI - YAKUBAH KHAN.jpg" },
  "N17 Darau": { name: "Azhar Matussin", party: "WARISAN", photo: "adun_pictures/N17 DARAU - AZHAR MATUSSIN.jpg" },
  "N18 Inanam": { name: "Peto Galim", party: "PH", photo: "adun_pictures/N18 INANAM - PETO GALIM.jpg" },
  "N19 Likas": { name: "Tan Lee Fatt", party: "PH", photo: "adun_pictures/N19 LIKAS - TAN LEE FATT.jpg" },
  "N20 Api-Api": { name: "Christina Liew Chin Jin", party: "PH", photo: "adun_pictures/N20 API-API - CHRISTINA LIEW CHIN JIN.jpg" },
  "N21 Luyang": { name: "Phoong Jin Zhe", party: "PH", photo: "adun_pictures/N21 LUYANG - PHOONG JIN ZHE.jpg" },
  "N22 Tanjong Aru": { name: "Junz Wong Hong Jun", party: "WARISAN", photo: "adun_pictures/N22 TANJONG ARU - JUNZ WONG HONG JUN.jpg" },
  "N23 Petagas": { name: "Awang Ahmad Sah Awang Sahari", party: "GRS", photo: "adun_pictures/N23 PETAGAS - AWANG AHMAD SAH AWANG SAHARI.jpg" },
  "N24 Tanjung Keramat": { name: "Shahelmey Yahya", party: "BN", photo: "adun_pictures/N24 TANJUNG KERAMAT - SHAHELMEY YAHYA.jpg" },
  "N25 Kapayan": { name: "Jannie Lasimbang", party: "PH", photo: "adun_pictures/N25 KAPAYAN - JANNIE LASIMBANG.jpg" },
  "N26 Moyog": { name: "Darell Leiking", party: "WARISAN", photo: "adun_pictures/N26 MOYOG - DARELL LEIKING.jpg" },
  "N27 Limbahau": { name: "Juil Nuatim", party: "GRS", photo: "adun_pictures/N27 LIMBAHAU - JUIL NUATIM.jpg" },
  "N28 Kawang": { name: "Ghulamhaidar @ Yusof Khan Bahadar", party: "GRS", photo: "adun_pictures/N28 KAWANG - GHULAMHAIDAR @ YUSOF KHAN BAHADAR.jpg" },
  "N29 Pantai Manis": { name: "Mohd Tamin Zainal", party: "BN", photo: "adun_pictures/N29 PANTAI MANIS - MOHD TAMIN ZAINAL.jpg" },
  "N30 Bongawan": { name: "Daud Yusof", party: "WARISAN", photo: "adun_pictures/N30 BONGAWAN - DAUD YUSOF.jpg" },
  "N31 Membakut": { name: "Mohd Arifin Mohd Arif", party: "GRS", photo: "adun_pictures/N31 MEMBAKUT - MOHD ARIFIN MOHD ARIF.jpg" },
  "N32 Klias": { name: "Isnin Aliasnih", party: "GRS", photo: "adun_pictures/N32 KLIAS - ISNIN ALIASNIH.jpg" },
  "N33 Kuala Penyu": { name: "Limus Jury", party: "GRS", photo: "adun_pictures/N33 KUALA PENYU - LIMUS JURY.jpg" },
  "N34 Lumadan": { name: "Ruslan Muharam", party: "GRS", photo: "adun_pictures/N34 LUMADAN - RUSLAN MUHARAM.jpg" },
  "N35 Sindumin": { name: "Yusof Yacob", party: "GRS", photo: "adun_pictures/N35 SINDUMIN - YUSOF YACOB.jpg" },
  "N36 Kundasang": { name: "Joachim Gunsalam", party: "GRS", photo: "adun_pictures/N36 KUNDASANG - JOACHIM GUNSALAM.jpg" },
  "N37 Karanaan": { name: "Masidi Manjun", party: "GRS", photo: "adun_pictures/N37 KARANAAN - MASIDI MANJUN.jpg" },
  "N38 Paginatan": { name: "Abidin Madingkir", party: "GRS", photo: "adun_pictures/N38 PAGINATAN - ABIDIN MADINGKIR.jpg" },
  "N39 Tambunan": { name: "Jeffrey Kitingan", party: "GRS", photo: "adun_pictures/N39 TAMBUNAN - JEFFREY KITINGAN.jpg" },
  "N40 Bingkor": { name: "Robert Tawik @ Nordin", party: "GRS", photo: "adun_pictures/N40 BINGKOR - ROBERT TAWIK @ NORDIN.jpg" },
  "N41 Liawan": { name: "Annuar Ayub", party: "GRS", photo: "adun_pictures/N41 LIAWAN - ANNUAR AYUB.jpg" },
  "N42 Melalap": { name: "Peter Anthony", party: "KDM", photo: "adun_pictures/N42 MELALAP - PETER ANTHONY.jpg" },
  "N43 Kemabong": { name: "Rubin Balang", party: "GRS", photo: "adun_pictures/N43 KEMABONG - RUBIN BALANG.jpg" },
  "N44 Tulid": { name: "Flovia Ng", party: "GRS", photo: "adun_pictures/N44 TULID - FLOVIA NG.jpg" },
  "N45 Sook": { name: "Ellron Alfred Angin", party: "GRS", photo: "adun_pictures/N45 SOOK - ELLRON ALFRED ANGIN.jpg" },
  "N46 Nabawan": { name: "Abdul Ghani Mohamed Yassin", party: "GRS", photo: "adun_pictures/N46 NABAWAN - ABDUL GHANI MOHAMED YASSIN.jpg" },
  "N47 Telupid": { name: "Jonnybone Kurum", party: "GRS", photo: "adun_pictures/N47 TELUPID - JONNYBONE KURUM.jpg" },
  "N48 Sugut": { name: "James Ratib", party: "GRS", photo: "adun_pictures/N48 SUGUT - JAMES RATIB.jpg" },
  "N49 Labuk": { name: "Samad Jambri", party: "GRS", photo: "adun_pictures/N49 LABUK - SAMAD JAMBRI.jpg" },
  "N50 Gum-Gum": { name: "Arunarnsin Taib", party: "WARISAN", photo: "adun_pictures/N50 GUM-GUM - ARUNARNSIN TAIB.jpg" },
  "N51 Sungai Manila": { name: "Mokran Ingkat", party: "BN", photo: "adun_pictures/N51 SUNGAI MANILA - MOKRAN INGKAT.jpg" },
  "N52 Sungai Sibuga": { name: "Mohamad Hamsan", party: "BN", photo: "adun_pictures/N52 SUNGAI SIBUGA - MOHAMAD HAMSAN.jpg" },
  "N53 Sekong": { name: "Alias Sani", party: "WARISAN", photo: "adun_pictures/N53 SEKONG - ALIAS SANI.jpg" },
  "N54 Karamunting": { name: "George Hiew Vun Zin", party: "GRS", photo: "adun_pictures/N54 KARAMUNTING - GEORGE HIEW VUN ZIN.jpg" },
  "N55 Elopura": { name: "Calvin Chong Ket Kiun", party: "WARISAN", photo: "adun_pictures/N55 ELOPURA - CALVIN CHONG KET KIUN.jpg" },
  "N56 Tanjong Papat": { name: "Poon Ming Fun", party: "PH", photo: "adun_pictures/N56 TANJONG PAPAT - POON MING FUN.jpg" },
  "N57 Kuamut": { name: "Masiung Banah", party: "GRS", photo: "adun_pictures/N57 KUAMUT - MASIUNG BANAH.jpg" },
  "N58 Lamag": { name: "Bung Moktar Radin", party: "BN", photo: "adun_pictures/N58 LAMAG - BUNG MOKTAR RADIN.jpg" },
  "N59 Sukau": { name: "Jafry Ariffin", party: "BN", photo: "adun_pictures/N59 SUKAU - JAFRY ARIFFIN.jpg" },
  "N60 Tungku": { name: "Assaffal P. Alian", party: "WARISAN", photo: "adun_pictures/N60 TUNGKU - ASSAFFAL P. ALIAN.jpg" },
  "N61 Segama": { name: "Mohamaddin Ketapi", party: "PBM", photo: "adun_pictures/N61 SEGAMA - MOHAMADDIN KETAPI.jpg" },
  "N62 Silam": { name: "Dumi Masdal", party: "WARISAN", photo: "adun_pictures/N62 SILAM - DUMI MASDAL.jpg" },
  "N63 Kunak": { name: "Norazlinah Arif", party: "GRS", photo: "adun_pictures/N63 KUNAK - NORAZLINAH ARIF.jpg" },
  "N64 Sulabayan": { name: "Jaujan Sambakong", party: "WARISAN", photo: "adun_pictures/N64 SULABAYAN - JAUJAN SAMBAKONG.jpg" },
  "N65 Senallang": { name: "Shafie Apdal", party: "WARISAN", photo: "adun_pictures/N65 SENALLANG - SHAFIE APDAL.jpg" },
  "N66 Bugaya": { name: "Jamil Hamzah", party: "WARISAN", photo: "adun_pictures/N66 BUGAYA - JAMIL HAMZAH.jpg" },
  "N67 Balung": { name: "Hamild @ Hamid Awang", party: "GRS", photo: "adun_pictures/N67 BALUNG - HAMILD @ HAMID AWANG.jpg" },
  "N68 Apas": { name: "Nizam Abu Bakar Titingan", party: "GRS", photo: "adun_pictures/N68 APAS - NIZAM ABU BAKAR TITINGAN.jpg" },
  "N69 Sri Tanjong": { name: "Justin Wong Yung Bin", party: "WARISAN", photo: "adun_pictures/N69 SRI TANJONG - JUSTIN WONG YUNG BIN.jpg" },
  "N70 Kukusan": { name: "Rina Jainal", party: "GRS", photo: "adun_pictures/N70 KUKUSAN-RINA JAINAL.jpg" },
  "N71 Tanjung Batu": { name: "Andi Muhammad Suryady Bandy", party: "BN", photo: "adun_pictures/N71 TANJUNG BATU - ANDI MUHAMMAD SURYADY BANDY.jpg" },
  "N72 Merotai": { name: "Sarifuddin Hata", party: "WARISAN", photo: "adun_pictures/N72 MEROTAI - SARIFUDDIN HATA.jpg" },
  "N73 Sebatik": { name: "Hassan A Gani Pg Amir", party: "GRS", photo: "adun_pictures/N73 SEBATIK - HASSAN A GANI PG AMIR.jpg" }
};

//   const dunToAdun = {
//   "N1 Banggi": { name: "Mohammad Mohamarin", party: "GRS", photo: '/adun_pictures/N1 BANGGI - MOHAMMAD MOHAMARIN.jpg' },
//   "N2 Bengkoka": { name: "Harun Durabi", party: "BN" },
//   "N3 Pitas": { name: "Ruddy Awah", party: "GRS" },
//   "N4 Tanjong Kapor": { name: "Ben Chong Chen Bin", party: "GRS" },
//   "N5 Matunggong": { name: "Julita Mojungki", party: "GRS" },
//   "N6 Bandau": { name: "Wetrom @ Mohd Fikri Bahanda", party: "KDM" },
//   "N7 Tandek": { name: "Hendrus Anding", party: "GRS" },
//   "N8 Pintasan": { name: "Fairuz Renddan", party: "GRS" },
//   "N9 Tempasuk": { name: "Mohd Arsad Bistari", party: "GRS" },
//   "N10 Usukan": { name: "Salleh Said Keruak", party: "BN" },
//   "N11 Kadamaian": { name: "Ewon Benedick", party: "PH" },
//   "N12 Sulaman": { name: "Hajiji Noor", party: "GRS" },
//   "N13 Pantai Dalit": { name: "Jasnih Daya", party: "GRS" },
//   "N14 Tamparuli": { name: "Jahid Jahim", party: "GRS" },
//   "N15 Kiulu": { name: "Joniston Bangkuai", party: "GRS" },
//   "N16 Karambunai": { name: "Yakubah Khan", party: "BN" },
//   "N17 Darau": { name: "Azhar Matussin", party: "WARISAN" },
//   "N18 Inanam": { name: "Peto Galim", party: "PH" },
//   "N19 Likas": { name: "Tan Lee Fatt", party: "PH" },
//   "N20 Api-Api": { name: "Christina Liew Chin Jin", party: "PH" },
//   "N21 Luyang": { name: "Phoong Jin Zhe", party: "PH" },
//   "N22 Tanjong Aru": { name: "Junz Wong Hong Jun", party: "WARISAN" },
//   "N23 Petagas": { name: "Awang Ahmad Sah Awang Sahari", party: "GRS" },
//   "N24 Tanjung Keramat": { name: "Shahelmey Yahya", party: "BN" },
//   "N25 Kapayan": { name: "Jannie Lasimbang", party: "PH" },
//   "N26 Moyog": { name: "Darell Leiking", party: "WARISAN" },
//   "N27 Limbahau": { name: "Juil Nuatim", party: "GRS" },
//   "N28 Kawang": { name: "Ghulamhaidar @ Yusof Khan Bahadar", party: "GRS" },
//   "N29 Pantai Manis": { name: "Mohd Tamin Zainal", party: "BN" },
//   "N30 Bongawan": { name: "Daud Yusof", party: "WARISAN" },
//   "N31 Membakut": { name: "Mohd Arifin Mohd Arif", party: "GRS" },
//   "N32 Klias": { name: "Isnin Aliasnih", party: "GRS" },
//   "N33 Kuala Penyu": { name: "Limus Jury", party: "GRS" },
//   "N34 Lumadan": { name: "Ruslan Muharam", party: "GRS" },
//   "N35 Sindumin": { name: "Yusof Yacob", party: "GRS" },
//   "N36 Kundasang": { name: "Joachim Gunsalam", party: "GRS" },
//   "N37 Karanaan": { name: "Masidi Manjun", party: "GRS" },
//   "N38 Paginatan": { name: "Abidin Madingkir", party: "GRS" },
//   "N39 Tambunan": { name: "Jeffrey Kitingan", party: "GRS" },
//   "N40 Bingkor": { name: "Robert Tawik @ Nordin", party: "GRS" },
//   "N41 Liawan": { name: "Annuar Ayub", party: "GRS" },
//   "N42 Melalap": { name: "Peter Anthony", party: "KDM" },
//   "N43 Kemabong": { name: "Rubin Balang", party: "GRS" },
//   "N44 Tulid": { name: "Flovia Ng", party: "GRS" },
//   "N45 Sook": { name: "Ellron Alfred Angin", party: "GRS" },
//   "N46 Nabawan": { name: "Abdul Ghani Mohamed Yassin", party: "GRS" },
//   "N47 Telupid": { name: "Jonnybone Kurum", party: "GRS" },
//   "N48 Sugut": { name: "James Ratib", party: "GRS" },
//   "N49 Labuk": { name: "Samad Jambri", party: "GRS" },
//   "N50 Gum-Gum": { name: "Arunarnsin Taib", party: "WARISAN" },
//   "N51 Sungai Manila": { name: "Mokran Ingkat", party: "BN" },
//   "N52 Sungai Sibuga": { name: "Mohamad Hamsan", party: "BN" },
//   "N53 Sekong": { name: "Alias Sani", party: "WARISAN" },
//   "N54 Karamunting": { name: "George Hiew Vun Zin", party: "GRS" },
//   "N55 Elopura": { name: "Calvin Chong Ket Kiun", party: "WARISAN" },
//   "N56 Tanjong Papat": { name: "Poon Ming Fun", party: "PH" },
//   "N57 Kuamut": { name: "Masiung Banah", party: "GRS" },
//   "N58 Lamag": { name: "Bung Moktar Radin", party: "BN" },
//   "N59 Sukau": { name: "Jafry Ariffin", party: "BN" },
//   "N60 Tungku": { name: "Assaffal P. Alian", party: "WARISAN" },
//   "N61 Segama": { name: "Mohamaddin Ketapi", party: "PBM" },
//   "N62 Silam": { name: "Dumi Masdal", party: "WARISAN" },
//   "N63 Kunak": { name: "Norazlinah Arif", party: "GRS" },
//   "N64 Sulabayan": { name: "Jaujan Sambakong", party: "WARISAN" },
//   "N65 Senallang": { name: "Shafie Apdal", party: "WARISAN" },
//   "N66 Bugaya": { name: "Jamil Hamzah", party: "WARISAN" },
//   "N67 Balung": { name: "Hamild @ Hamid Awang", party: "GRS" },
//   "N68 Apas": { name: "Nizam Abu Bakar Titingan", party: "GRS" },
//   "N69 Sri Tanjong": { name: "Justin Wong Yung Bin", party: "WARISAN" },
//   "N70 Kukusan": { name: "Rina Jainal", party: "GRS" },
//   "N71 Tanjung Batu": { name: "Andi Muhammad Suryady Bandy", party: "BN" },
//   "N72 Merotai": { name: "Sarifuddin Hata", party: "WARISAN" },
//   "N73 Sebatik": { name: "Hassan A Gani Pg Amir", party: "GRS" }
// };


//GO GO TO 1112 LINE TO FIND THE INPUT FIELD ONCE THEY ANSWER THE QUESTION
function askAdunQuestion() {


  userData.mengundiAdun = '';
  userData.mengundiAdunLain = '';
  console.log("🔔 askAdunQuestion triggered — userData.dun:", userData.dun);

  closeModal(); // Hide previous modal

  const dunKey = userData.dun?.trim();
  const adun = dunToAdun[dunKey];

let message;
if (adun) {
  message = `Adakah anda akan mengundi ADUN <strong>${adun.name}</strong> (<strong>${adun.party}</strong>)?`;
} else {
  message = `Adakah anda akan mengundi ADUN Semasa?`;
}

  // displayMessage(`Tuan Awang: ${message}`, true);

  // ✅ Update the existing modal content using existing elements
  const textEl = document.getElementById('adun-question-text');
  const photoEl = document.getElementById('adun-photo');

if (textEl) {
  textEl.innerHTML = message;
  console.log("✅ Updated adun-question-text:", textEl.innerHTML);
}

  if (photoEl) {
    if (adun?.photo) {
      photoEl.src = adun.photo;
      photoEl.style.display = 'block';
    } else {
      photoEl.style.display = 'none';
    }
  }

  // ✅ Finally, show the modal
  displayMessage(`Tuan Awang: Adakah anda akan mengundi ADUN ${adun.name} (${adun.party})?`, true)
  openModal('mengundiadun-options-modal');
}



// function askAdunQuestion() {
//   closeModal();

//   const dun = userData.dun?.trim();
//   const adun = dunToAdun[dun];

//   console.log("🟡 userData.dun:", userData.dun);
//   console.log("🟢 Trimmed DUN:", dun);
//   console.log("🔵 ADUN lookup result:", adun);

//   let message;
//   if (adun) {
//     message = `Tuan Awang: Adakah anda akan mengundi ADUN ${adun.name} (${adun.party})?`;
//   }
//   // } else {
//   //   message = `Tuan Awang: Adakah anda akan mengundi ADUN Semasa?`;
//   // }

//   displayMessage(message, true);

//   const adunQuestionText = document.getElementById('adun-question-text');
//   if (adunQuestionText) {
//     adunQuestionText.textContent = message.replace('Tuan Awang: ', '');
//   }

//   setTimeout(() => {
//     openModal('mengundiadun-options-modal');
//   }, 500);
// }


function renderModal() {
  if (ques == 0) {
    // ques++
    console.log(ques);

    // If dun is not yet provided, ask for dun
    // displayMessage(`Tuan Awang: Sila pilih DUN anda`, true);
    // openModal('parlimen-options-modal');
    openModal('zone-options-modal')

  }

  else if (ques == 1) {
    // ques++
    // console.log("Jantina:" + ques);
    closeModal();
    // If gender is not yet provided, ask for gender
    // displayMessage(`Tuan Awang: Sila pilih jantina anda`, true);
    openModal('parlimen-modal');

  }

  else if (ques == 2) {
    // ques++
    // console.log("Jantina:" + ques);
    closeModal();
    // If gender is not yet provided, ask for gender
    displayMessage(`Tuan Awang: Sila pilih DUN anda`, true);
    openModal('dun-modal');

  }

  else if (ques == 3) {
    // ques++
    console.log("Jantina:" + ques);
    closeModal();
    // If gender is not yet provided, ask for gender
    displayMessage(`Tuan Awang: Sila pilih jantina anda`, true);
    openModal('jantina-options-modal');

  }

  else if (ques == 4) {
    // ques++
    closeModal();
    // If age is not yet provided, ask for age
    // displayMessage(`Tuan Awang: Saya pasti banyak tempat yang menarik di ${userData.dun}`, true);
    displayMessage(`Tuan Awang: Bagaimana pula umur anda?`, true);
    b = '';
    c = '';
    d = '';
    g = '';
    i = '';
    l = 'na';
    m = '';
    openModal('umur-options-modal');

  }

  // -------->SECTION 2
  // -------->SECTION 2
// else if (ques === 5) {
//   userData.bangsa = '';
//   userData.bangsalain = '';
//   closeModal();

//   displayMessage(`Tuan Awang: Sila pilih bangsa anda`, true);
//   openModal('bangsa-options-modal');
// }

// // User selects "Lain-lain" for bangsa
// else if (userData.bangsa.trim() === 'Lain-lain' && !userData.bangsalain) {
//   displayMessage(`Tuan Awang: Sila nyatakan bangsa anda`, true);
//   closeModal();
//   showInput(); // Show input for custom bangsa
// }

// // User types custom bangsa and submits
// else if (ques === 5 && userInput.trim() !== '') {
//   userData.bangsa = userInput.trim();
//   userData.bangsalain = userInput.trim();
//   hideInput();

//   //ques++; // move to next question (e.g., 6)
//   askAdunQuestion(); // proceed with ADUN question using dun info
// }

// else if (ques === 5) {
//   userData.bangsa = '';
//   userData.bangsalain = '';
//   closeModal();

//   displayMessage(`Tuan Awang: Sila pilih bangsa anda`, true);
//   openModal('bangsa-options-modal');
// }

// // User selects "Lain-lain" for bangsa
// else if (userData.bangsa.trim() === 'Lain-lain' && !userData.bangsalain) {
//   displayMessage(`Tuan Awang: Sila nyatakan bangsa anda`, true);
//   closeModal();
//   showInput(); // Show input for custom bangsa
// }

// else if (ques === 5 && userInput.trim() !== '') {
//   userData.bangsa = userInput.trim();
//   userData.bangsalain = userInput.trim();
//   hideInput();

//   ques++; // move to question 6
//   askAdunQuestion(); // triggers regardless of selection
// }


//GO GO TO 1112 LINE TO FIND THE INPUT FIELD ONCE THEY ANSWER THE QUESTION
else if (ques == 5) {
  userData.bangsa = '';
  userData.bangsalain = '';
  closeModal();
  displayMessage(`Tuan Awang: Sila pilih bangsa anda`, true);
  openModal('bangsa-options-modal');
}
// // User selects "Lain-lain" for bangsa
else if (userData.bangsa.trim() === 'Lain-lain' && !userData.bangsalain ||ques == 5 ) {
  displayMessage(`Tuan Awang: Sila nyatakan bangsa anda`, true);
  closeModal();
  showInput();
}

//UNCOMMNET THIS IF ANY BAD HAPPENS
  // else if (ques == 5) {
  //   userData.bangsa = '';
  //   userData.bangsalain = '';
  //   closeModal();
  //   console.log(ques);
  //   // ask for bangsa
  //   displayMessage(`Tuan Awang: Sila pilih bangsa anda`, true);
  //   openModal('bangsa-options-modal');

  // } 
  
  // // else if (userData.bangsa.trim() === 'Lain-lain' && !userData.mengundiAdun || userData.bangsa.trim() === 'Lain-lain' && ques == 6) {
  // else if (userData.bangsa.trim() === 'Lain-lain') {

  //   // If user choose lain-lain under bangsa
  //   console.log(userData);

  //   displayMessage(`Tuan Awang: Sila nyatakan bangsa anda`, true);
  //   showInput();
  //   closeModal();
  // }

  
  // else if (userData.pemimpinsabah.trim() === 'Lain-lain' && !userData.isiboranglagi) {
  //   // If user choose lain-lain under bangsa
  //   console.log("here ni");

  //   displayMessage(`Tuan Awang: Sila nyatakan pilihan pemimpin Sabah anda:`, true);
  //   closeModal();
  //   showInput();
  // }

  


  // else if (ques == 6) {

    
  //   closeModal();
  //   displayMessage(`Dari mana sumber utama anda untuk mendapat berita terkini?`, true);
  //   openModal('mediasemasa-options-modal');

  // }

  // else if (ques == 7) {
  //   userData.persepsi = '';
  //   userData.persepsilain = '';
  //   closeModal();
  //   displayMessage(`Tuan Awang: Adakah perkara-perkara berikut mempengaruhi persepsi anda terhadap prestasi kerajaan?`, true);
  //   displayMessage("Isu Integriti & Moral, Hak-Hak Sabah (MA63), Pembangunan, Kepimpinan", true);

  //   openModal('persepsi-options-modal');

  // }

  // else if (userData.persepsi.trim() === 'Lain-lain' && !userData.pengaruhberita || userData.persepsi.trim() === 'Lain-lain' && ques==8) {
  //   // If user choose lain-lain under bangsa
  //   // console.log("here ni");

  //   displayMessage(`Tuan Awang: Sila nyatakan apa yang mempengaruhi persepsi anda:`, true);
  //   closeModal();
  //   showInput();
  // }

  // else if (ques == 8) {
  //   closeModal();
  //   displayMessage(`Tuan Awang: Bagaimanakah berita politik terkini mempengaruhi persepsi anda terhadap kerajaan?`, true);
  //   openModal('pengaruhberita-options-modal');

  // }

  // else if (ques ==9 ) {
  //   closeModal();
  //   displayMessage(`Tuan Awang: Apakah faktor lain yang mempengaruhi anda untuk mengundi?`, true);
  //   openModal('faktorlain-options-modal');

  // }

  // else if (userData.faktorlain == 'Pendapat Peribadi' && !userData.pendapatperibadi){
  //   closeModal();
  //   displayMessage(`Tuan Awang: Selain daripada Media Semasa, apakah faktor lain yang mempengaruhi anda untuk mengundi?`, true);
  //   openModal('pendapatperibadi-options-modal');

  // } 

  // else if (ques == 6) {
  //   closeModal();
  //   displayMessage(`Tuan Awang: Adakah anda mengundi bedasarkan Parti atau Calon?`, true);
  //   openModal('partiataucalon-options-modal');

  // }


  //new question

else if (ques == 6) {
  askAdunQuestion();
  // closeModal();

  // const dun = userData.dun?.trim(); // Get the selected DUN
  // const adun = dunToAdun[dun]; // Lookup in your mapping

  // let message;
  // if (adun) {
  //   message = `Tuan Awang: Adakah anda akan mengundi ADUN ${adun.name} (${adun.party})?`;
  // } else {
  //   message = `Tuan Awang: Adakah anda akan mengundi ADUN Semasa?`;
  // }

  // displayMessage(message, true);

  // const adunQuestionText = document.getElementById('adun-question-text');
  // if (adunQuestionText) {
  //   adunQuestionText.textContent = message.replace('Tuan Awang: ', ''); // remove speaker prefix for modal
  // }

  // openModal('mengundiadun-options-modal');
}

// // User selects "Lain-lain" for bangsa
else if (userData.mengundiAdun.trim() === 'Tidak Pasti' && !userData.mengundiAdunLain ||ques == 6 ) {
  displayMessage(`Tuan Awang: Siapakah calon pilihan anda untuk menjadi ADUN, dan dari parti manakah beliau?`, true);
  closeModal();
  showInput();
}

  //UNCOMMENT THIS IF ANYTHING GOES WRONG
  // else if (ques == 7) {
  //   // userData.mengundiAdun = '';
  //   // userData.tidakundi = '';
  //   closeModal();
  //   displayMessage(`Tuan Awang: Adakah anda akan mengundi ADUN Semasa?`, true);
  //   openModal('mengundiadun-options-modal');
  // }

  // else if (userData.mengundiAdun.trim() === 'Tidak' && !userData.cenderunguntukundi || userData.mengundiAdun.trim() === 'Tidak' && ques==12) {
  //   // If user choose lain-lain under bangsa
  //   // console.log("here ni");

  //   displayMessage(`Tuan Awang: Sila nyatakan kenapa:`, true);
  //   closeModal();
  //   showInput();
  // }

  // else if (ques == 7) {
  //   userData.pilihanpartinasional = '';
  //   userData.pilihanpartitempatan = '';
  //   closeModal();
  //   displayMessage(`Tuan Awang: Kategori parti manakah yang cenderung untuk anda undi?`, true);
  //   // displayMessage(`Tuan Awang: 1) Parti Nasional 2) Parti Tempatan 3) Tiada Kecenderungan`, true);
  //   openModal('cenderunguntukundi-options-modal');

  // }


    else if (ques == 7) {
    closeModal();
    displayMessage(`Tuan Awang: Parti manakah anda lebih cenderung untuk undi?`, true);
    // displayMessage(`Tuan Awang: 1) Parti Nasional 2) Parti Tempatan 3) Tiada Kecenderungan`, true);
    openModal('cenderunguntukundi-options-modal');

  }


  // check this

  //if user select parti nasional----------------
 //UNCOMMENT THIS IF ANYTHING HAPPENS
  // else if (ques == 8 && userData.cenderunguntukundi == 'Parti Nasional') {
  //   closeModal();
  //   displayMessage(`Tuan Awang: Parti Nasional manakah anda lebih cenderung untuk undi?`, true);
  //   openModal('partinasional-options-modal');
  //   // console.log("siniii");

  // }

  // else if (ques == 9 && userData.cenderunguntukundi == 'Parti Nasional') {
  //   closeModal();
  //   displayMessage(`Tuan Awang: Parti Nasional manakah anda lebih cenderung untuk undi?`, true);
  //   openModal('partitempatan-options-modal');
  //   // console.log("siniii");

  // }

  // else if (ques == 10 && userData.cenderunguntukundi == 'Parti Nasional') {
  //   closeModal();
  //   displayMessage(`Tuan Awang: Akhir sekali, pada pendapat anda siapa yang layak untuk memimpin Sabah sebagai ketua menteri?`, true);
  //   openModal('pemimpinsabah-options-modal');
  //   // console.log("siniii");

  // }

  // else if (ques == 11 && !userData.isiboranglagi && userData.cenderunguntukundi == 'Parti Nasional' && userData.pemimpinsabah != 'Lain-lain') {
  //   closeModal();
  //   //capture end time
  //   getEndTime();
  //   displayMessage(`Tuan Awang: Adakah anda ingin mengisi borang lagi sekali?`, true);
  //   openModal('isiboranglagi-options-modal');


  // }


  // ------------------------------------------

  // if user select parti tempatan -------------------------------

  // else if (ques == 8 && userData.cenderunguntukundi == 'Parti Tempatan') {
  //   closeModal();
  //   displayMessage(`Tuan Awang: Parti Tempatan manakah anda lebih cenderung untuk undi?`, true);
  //   openModal('partitempatan-options-modal');
  //   // console.log("siniii");

  // }

  // else if (ques == 9 && userData.cenderunguntukundi == 'Parti Tempatan') {
  //   closeModal();
  //   displayMessage(`Tuan Awang: Akhir sekali, pada pendapat anda siapa yang layak untuk memimpin Sabah sebagai ketua menteri?`, true);
  //   openModal('pemimpinsabah-options-modal');
  //   console.log('hereeee 14');

  // }

  // else if (ques == 10 && !userData.isiboranglagi && userData.pemimpinsabah != 'Lain-lain') {
  //   closeModal();

  //   //capture end time
  //   getEndTime();
    
  //   displayMessage(`Tuan Awang: Adakah anda ingin mengisi borang lagi sekali?`, true);
  //   openModal('isiboranglagi-options-modal');

  // }
  // ----------------------------------------------------


  // if user select tidak cenderung -----------------------------

  // else if (ques == 8 || userData.cenderunguntukundi == 'Tidak Pasti') {
  
  else if (ques == 8) {
    closeModal();
    displayMessage(`Tuan Awang: Akhir sekali, pada pendapat anda siapa yang layak untuk memimpin Sabah sebagai Ketua Menteri?`, true);
    openModal('pemimpinsabah-options-modal');
    // console.log("siniii");

  }

  // else if (ques == 9 || userData.cenderunguntukundi == 'Tidak Pasti' && !userData.isiboranglagi && userData.pemimpinsabah != 'Lain-lain') {
  else if (ques == 9 || !userData.isiboranglagi && userData.pemimpinsabah != 'Lain-lain') {
    closeModal();
    //capture end time
    getEndTime();
    displayMessage(`Tuan Awang: Adakah anda ingin mengisi borang lagi sekali?`, true);
    openModal('isiboranglagi-options-modal');
    console.log("sii");
    
  }

  // ------------------------------------------------------

  // else if (userData.pilihanpartinasional && userData.cenderunguntukundi == 'Parti Nasional' && !userData.pilihanpartitempatan) {
  //   closeModal();
  //   displayMessage(`Tuan Awang: Parti tempatan pilihan anda?`, true);
  //   openModal('partitempatan-options-modal');
  //   // console.log("ani tang baru");

  // }

  // else if (!userData.pilihanpartitempatan && userData.cenderunguntukundi == 'Parti Tempatan') {
  //   closeModal();
  //   displayMessage(`Tuan Awang: Parti tempatan pilihan anda?`, true);
  //   openModal('partitempatan-options-modal');
  //   console.log("Tempatan");

  // }

  

  else if (userData.pemimpinsabah.trim() === 'Lain-lain' && !userData.isiboranglagi) {
    // If user choose lain-lain under bangsa
    console.log("here ni");

    displayMessage(`Tuan Awang: Sila nyatakan pilihan layak memimpin Sabah sebagai ketua menteri:`, true);
    closeModal();
    showInput();
  }

 

  else if (userData.isiboranglagi === 'Ya, isi lagi') {
    closeModal();
    // //capture end time
    // getEndTime();

    console.log('Anda pilih ya.')
    console.log(userData);
    displayUserInfo(userData);

    initiateConversation();
    // ques = 0;
    // openModal('parlimen-options-modal')

    //isi borang lagi - tidak
  } else if (userData.isiboranglagi === 'Tidak') {
    ques = 0;
    // //capture end time
    // getEndTime();

    console.log('Anda pilih tidak.')
    displayUserInfo(userData);
    console.log(userData);
    
    
    // let enumerator = localStorage.getItem('enumerator');
    // enumerator.push(userData['kod'])


    // remove user kod (end user session)
    localStorage.removeItem('enumerator');
    closeModal();
    hideInput();
    displayMessage(`Tuan Awang: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah Maju Jaya!`, true);

  } else {
    // All information collected, finish conversation
    //capture end time
    getEndTime();
    displayMessage(`Tuan Awang: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah Maju Jaya!`, true);
    displayUserInfo(userData);
    closeModal();
    initiateConversation();
  }

}

//OPEN POP UP BOX FOR SELECTION CHOICE QUESTIONS
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

//CLODE POP UP BOX - THIS FUNC WILL BE CALLED AFTER RECEIVE INPUT FROM USER
function closeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.style.display = 'none';
  });
  overlay.style.display = 'none';
}



//HIDE CURRENT DATA INPUT
function hideInput() {
  userInput.style.display = 'none';
  sendButton.style.display = 'none';
}

//SHOW DATA INPUT
function showInput() {
  userInput.style.display = 'block';
  sendButton.style.display = 'block';
}


function buttonhijau() {

  const submitBtn = document.getElementById('export-btn');

 

  const data = JSON.parse(localStorage.getItem('userData'));
  
  console.log(data);
  
  
  // Make sure there's data in localStorage and it's an array
  if (data && Array.isArray(data) && data.length > 0) {

     // disables the button once
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Menghantar...';

      // remove isiboranglagi for userData
    data.forEach(item => {
      delete item.isiboranglagi;
    });
    // Send the entire data array to the backend in one request
    sendDataToBackend(data)  // Pass the whole array (not individual items) to the backend

      .then(() => {
        alert("Berjaya! Semua data telah disimpan.");
        localStorage.removeItem("userData"); // Clear userData after successful upload
        userTable.innerHTML = ''; // Assuming you have a userTable to clear
        console.log("item removed");
      })
      .catch(() => {
        alert("Error! Sebahagian data gagal disimpan.");
        console.error('Error sending data to one or more items');
      })
      .finally(() => {
        // Re-enable the button after the request finishes (successful or error)
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Simpan Data';
      });
  } else {
    alert("Tiada Data!");
    submitBtn.disabled = false; // Re-enable the button if no valid data is found
  }

   // this function disects the array and send the object one by one
  // const data = JSON.parse(localStorage.getItem('userData'));
  // // Make sure there's data in localStorage
  // if (data && Array.isArray(data) && data.length > 0) {
  //   // Use Promise.all to wait for all POST requests to finish
  //   const promises = data.map(dataItem => sendDataToBackend(dataItem));

  //   // Once all promises are resolved, handle success or failure
  //   Promise.all(promises)
  //     .then(() => {
  //       alert("Success! All data has been saved.");
  //       localStorage.removeItem("userData"); // Clear userData after successful upload
  //       userTable.innerHTML = '';
  //       console.log("item removed");
  //     })
  //     .catch(() => {
  //       alert("Error! Some data failed to save.");
  //       console.error('Error sending data to one or more items');
  //     });
  // } else {
  //   alert("No valid data found in localStorage");
  // }


  
}

//api for saving to db
async function sendDataToBackend(data) {
  // try {
  //     //change endpoint to .env to be safe
  //     // change this to https
  //     const response = await fetch('https://atiqahst-github-io.onrender.com/exportResponse', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data), // Send one object at a time
  //     });

  //     // Check if the response status is OK
  //     if (!response.ok) {
  //         // alert("error")
  //         throw new Error('Failed to send data');
  //     }

  //     const responseData = await response.json();
  //     // alert("success!")
  //     // localStorage.removeItem("userData");
  //     // console.log("item removed");
      
  //     console.log('Data successfully sent:', responseData);
  //     return responseData; 

  // } catch (error) {
  //     // alert("error bawah")
  //     console.error('Error sending data:', error);
  //     throw error; 
  // }

  try {
    // cycle2 table endpoint
    const response = await fetch('https://atiqahst-github-io.onrender.com/cycle3Demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send the entire array of objects
    });

    if (!response.ok) {
      throw new Error('Failed to send data');
    }

    const responseData = await response.json();
    console.log('Data successfully sent:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
}




//EXPORT TO DATABASE BUTTON - USEFUL WHEN NO NETWORK. TO BE DONE MANUALLY BY USER (CLICK)
// exportBtn.addEventListener('click', async function () {
//   const tableRows = userTable.querySelectorAll('tr');
//   const userDataArray = [];

//   tableRows.forEach(row => {
//     const columns = row.querySelectorAll('td');
//     const userData = {
// 	  tarikh: columns[0].textContent,
//       dun: columns[1].textContent,
//       umur: columns[2].textContent,
//       jantina: columns[3].textContent,
//       agama: columns[4].textContent,
// 	  bangsa: columns[5].textContent,
// 	  tahappendidikan: columns[6].textContent,
// 	  pekerjaan: columns[7].textContent,
// 	  pendapatanbulanan: columns[8].textContent,
// 	  puasdgnpembangunansemasa: columns[9].textContent,
// 	  yapuasdgnpembangunansemasa: columns[10].textContent,    
// 	  tidakpuasdgnpembangunansemasa: columns[11].textContent, 
// 	  keperluanasaspuashati: columns[12].textContent,  
// 	  infrastrukturpuashati: columns[13].textContent, 
// 	  kebajikanpuashati: columns[14].textContent, 
// 	  lainlainpuashati: columns[15].textContent,
// 	  keperluanasastidakpuashati: columns[16].textContent, 
// 	  infrastrukturtidakpuashati: columns[17].textContent, 
// 	  kebajikantidakpuashati: columns[18].textContent,
//       lainlaintidakpuashati: columns[19].textContent,	  
// 	  dunjalanidgnbaik: columns[20].textContent,         
// 	  dunmenyelesaikanmasalah: columns[21].textContent,  
// 	  undidun: columns[22].textContent,  
// 	  cadangancalonyb: columns[23].textContent,
// 	  kmperubahanpositif: columns[24].textContent, 
// 	  penambahbaikanmasadepan: columns[25].textContent,
// 	  tiadakesanpositif: columns[26].textContent,    
// 	  perbaikikeperluanasas: columns[27].textContent,    
// 	  perbaikiinfrastruktur: columns[28].textContent,	  
// 	  perbaikiekonomi: columns[29].textContent,         
// 	  perbaikiperkhidmatanawam: columns[30].textContent,
// 	  perbaikilainlain: columns[31].textContent,
// 	  tiadapositifkeperluanasas: columns[32].textContent,
// 	  tiadapositifinfrastruktur: columns[33].textContent, 
// 	  tiadapositifekonomi: columns[34].textContent,            
// 	  tiadapositifperkhidmatanawam: columns[35].textContent, 
//       tiadapositiflainlain: columns[36].textContent,
// 	  kriteriapemimpinbaik: columns[37].textContent,   
// 	  pilihanpemimpinsabah: columns[38].textContent,
// 	  pilihanpemimpinsabahlain: columns[39].textContent,
//     };
//     userDataArray.push(userData);
//   });

//   console.log('Data to export:', userDataArray);

// //AFTER CLICK EXPORT TO DATABASE, DATA WILL BE POST AND SEND TO DATABASE/EXPORT
//   try {
//     const response = await fetch('https://atiqahst-github-io.onrender.com/export', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userDataArray)
//     });
//     const data = await response.text();

// 	alert(data);
//     if (response.ok) {
//       userTable.innerHTML = '';
//       localStorage.removeItem("userData"); //REMOVE DATA FROM LOCAL STORAGE AFTER SUCCESSFULLY TRANSFERRED DATA IN DATABASE
//     }
//   } catch (err) {
//     console.error('Error exporting data', err);
//     alert('Error exporting data. Please try again later.');
//   }
// });

//CLEAR CONVERSATION BUTTON - TO CLEAR/RESET CURRENT CONVERSATION WITH BOT
clearBtn.addEventListener('click', function () {
  messagesDiv.innerHTML = '';
  initiateConversation(); //INITIATE THE CONVERSATION BACK TO THE BEGINNING
});

//EXPORT DATA (STORED IN LOCAL) TO CSV FORMAT

function exportToCSV() {
  const rawData = localStorage.getItem("userData");

  if (!rawData) {
    alert("No data found in localStorage!");
    return;
  }

  let data;
  try {
    data = JSON.parse(rawData);
    if (!Array.isArray(data)) throw new Error();
  } catch (e) {
    alert("Invalid data format in localStorage.");
    return;
  }

  // Define the actual keys from your data
  const keys = [
    "tarikh", "kod", "dun", "umur", "jantina", "bangsa", "bangsalain",
    "mengundiAdun", "cenderunguntukundi", "pemimpinsabah", "pemimpinsabahlain", "responseid"
  ];

  // Define custom headers for Excel readability
  const customHeaders = [
    "Tarikh", "Kod", "DUN", "Umur", "Jantina", "Bangsa", "Bangsa Lain", "Mengundi Adun", "Lebih Cenderung Untuk Undi",
    "Pemimpin Sabah", "Pemimpin Sabah Lain", "Response ID"
  ];

  const csvRows = [customHeaders];

  data.forEach(item => {
    const row = keys.map(key => {
      let value = item[key] ?? "";
      value = String(value);
      if (value.includes(",") || value.includes('"')) {
        value = `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvRows.push(row);
  });

  const csvString = csvRows.map(row => row.join(",")).join("\r\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", "user_data_readable.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// function exportToCSV() {
//   const tableRows = userTable.querySelectorAll('tr');
//   let csvContent = "data:text/csv;charset=utf-8,";
//   // Define the headers
//   const headers =
//     ["tarikh",
//       "kod",
//       "dun",
//       "umur",
//       "jantina",
//       "bangsa",
//       "bangsalain",
//       // "pengaruhmediasemasa",
//       // "persepsi",
//       // "persepsilain",
//       // "pengaruhberita",
//       // "faktorlain",
//       // "pendapatperibadi",
//       // "partiataucalon",
//       "mengundiAdun",
//       // "tidakundi",
//       "cenderunguntukundi",
//       // "pilihanpartinasional",
//       // "pilihanpartitempatan",
//       "pemimpinsabah",
//       "pemimpinsabahlain",
//       "responseid"
//     ];


//   // const headers = ["tarikh" ,"dun", "umur", "jantina", "agama", "bangsa", "tahappendidikan", "pekerjaan", "pendapatanbulanan", "puasdgnpembangunansemasa",
//   // "yapuasdgnpembangunansemasa", "tidakpuasdgnpembangunansemasa","keperluanasaspuashati", "infrastrukturpuashati", "kebajikanpuashati", "lainlainpuashati",
//   // "keperluanasastidakpuashati", "infrastrukturtidakpuashati", "kebajikantidakpuashati", "lainlaintidakpuashati", "dunjalanidgnbaik", "dunmenyelesaikanmasalah", "undidun", 
//   // "cadangancalonyb", "kmperubahanpositif", "penambahbaikanmasadepan", "tiadakesanpositif", "perbaikikeperluanasas", "perbaikiinfrastruktur", "perbaikiekonomi", 
//   // "perbaikiperkhidmatanawam", "perbaikilainlain", "tiadapositifkeperluanasas", "tiadapositifinfrastruktur", "tiadapositifekonomi", "tiadapositifperkhidmatanawam", 
//   // "tiadapositiflainlain", "kriteriapemimpinbaik", "pilihanpemimpinsabah", "pilihanpemimpinsabahlain"];

//   csvContent += headers.join(",") + "\r\n";

//   // Add data rows
//   tableRows.forEach(row => {
//     const columns = row.querySelectorAll('td');
//     const rowData = Array.from(columns).map(column => column.textContent).join(',');
//     csvContent += rowData + "\r\n";
//   });

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "user_data.csv");
//   document.body.appendChild(link);
//   link.click();
// }

// Bind the export CSV function to the button
const exportCSVBtn = document.getElementById('export-csv-btn');
exportCSVBtn.addEventListener('click', exportToCSV);

function pengesahanEnd() {
  displayMessage(`Tuan Awang: Adakah anda ingin mengisi borang lagi sekali?`, true, 300);
  setTimeout(function () {
    openModal('isiboranglagi-options-modal'); //OPEN POP UP BOX
  }, 1000);
  hideInput();
}

//FUNCTION TO INITIATE CONVERSATION TO BEGINNING
function initiateConversation() {
  ques = 0;
  userData = {
    tarikh: '',
    kod: '',
    dun: '',
    umur: '',
    jantina: '',
    bangsa: '',
    bangsalain: '',
    pengaruhmediasemasa: '',
    persepsi: '',
    persepsilain: '',
    pengaruhberita: '',
    faktorlain: '',
    pendapatperibadi: '',
    partiataucalon: '',
    mengundiAdun: '',
    tidakundi: '',
    cenderunguntukundi: '',
    pilihanpartinasional: '',
    pilihanpartitempatan: '',
    pemimpinsabah: '',
    pemimpinsabahlain: '',
    // isiboranglagi: '',
    responseid:'',
    starttime:'',
    endtime:''
  };
  messagesDiv.innerHTML = '';
  getCurrentDate();
  displayMessage(`Tuan Awang: Selamat datang ke kaji selidik IDS bagi Pemantauan Dinamika Pembangunan Kerajaan Fasa 3  bagi tahun 2025. Pandangan anda amat penting untuk membantu dan memahami sentimen isu-isu kepimpinan dan pembangunan Negeri Sabah.
Mohon kerjasama Tuan/Puan untuk mengisi kaji selidik ini dengan jujur dan teliti.
`, true);
  displayMessage(`Tuan Awang: Hi! Memperkenalkan saya Tuan Awang, mari kita mula kan kaji selidik ini 😃 Sila pilih DUN anda:`, true, 300);
  setTimeout(function () {
    // openModal('dun-options-modal'); //OPEN POP UP BOX
    // openModal('parlimen-options-modal');

    //response id unique
    const uniqueId = Math.floor(Math.random() * 9000000) + 1000000;
    userData['responseid'] = uniqueId;

    // checks if enumerator code is in localstorage (enumerator is logged in)
    if (localStorage.getItem('enumerator')) {
      userData['kod'] = localStorage.getItem('enumerator');
      // openModal('parlimen-options-modal');
      openModal('zone-options-modal');
      getStartTime()
    } else {
      // openModal('starting-modal')
      openModal('kod-modal')

    }


  }, 1000);
  hideInput();
}

//AS DEFAULT, THESE 2 FUNCTIONS ARE CALLED
loadFromLocalStorage(); //LOAD DATA FROM LOCAL STORAGE -> THAT IS AVAILABLE (THIS IS USEFUL WHEN USER EXIT THEIR BROWSER AND VISIT THE WEB BACK)
initiateConversation(); //START CONVERSATION FROM BEGINNING
