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
  kod:'',
  dun: '',
  umur: '',
  jantina: '',
  bangsa: '',
  bangsalain:'',
  pengaruhmediasemasa:'',
  persepsi:'',
  persepsilain:'',
  pengaruhberita:'',
  faktorlain:'',
  pendapatperibadi:'',
  partiataucalon:'',
  cenderunguntukundi:'',
  pilihanpartinasional:'',
  pilihanpartitempatan:'',
  pemimpinsabah:'',
  pemimpinsabahlain:'',
  isiboranglagi:''
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

let pengesahan = {isiboranglagi: ''};

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

function nextBtn(){
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
    console.log("Jantina:"+ ques);
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

function backBtn(){
  closeModal();
  ques = ques-1
  console.log(ques);

  if (!userData.dun) {
    ques++
    console.log(ques);
    
    // If dun is not yet provided, ask for dun
    displayMessage(`Tuan Awang: Sila pilih DUN anda`, true);
    closeModal('dun-options-modal');
	
  } 

  else if (ques == 1) {
    ques++
    console.log("Jantina:"+ ques);
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

function submitKod (field){
  const kodInput = document.getElementById('kod-input').value;
  
  console.log("userID: " + kodInput);

  // Store the value in localStorage
  localStorage.setItem('userKod', kodInput);
  //push to array
  userData[field] = localStorage.getItem('userKod');

  closeModal();
  openModal('parlimen-options-modal');
  
}

function startSurvey(){
  closeModalStart('starting-modal');
  // openModal('parlimen-options-modal');
  const kod = localStorage.getItem('userKod');
 
  //push to array
  
  if(kod == null){
    // if kod exist
    openModal('kod-modal');
    ques++
  }
  else{
    userData['kod'] = localStorage.getItem('userKod');
    openModal('parlimen-options-modal');
    ques++
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

function getCurrentDate() {
  const currentDate = new Date();
  
  // Extract day, month, and year
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = currentDate.getFullYear();
  
  // Format the date as dd/mm/yyyy
  const formattedDate = `${day}/${month}/${year}`;
  
  // Update userData with the current date
  userData.tarikh = formattedDate;
}

//SHOW/HIDE TABLE
document.addEventListener("DOMContentLoaded", function() {
  const toggleTableBtn = document.getElementById("toggle-table-btn");
  const userInfoTable = document.getElementById("user-info-table");

  // Set the initial state and button text
  userInfoTable.style.display = "none";
  toggleTableBtn.textContent = "Show Table";

  // Add event listener to the button
  toggleTableBtn.addEventListener("click", function() {
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
    <td>${userData.dun}</td>
    <td style="display: none;" >${userData.kod}</td>
    <td>${userData.umur}</td>
    <td>${userData.jantina}</td>
    <td>${userData.bangsa}</td>

	<td style="display: none;">${userData.bangsalain}</td>
	<td style="display: none;">${userData.pengaruhmediasemasa}</td>
	<td style="display: none;">${userData.persepsi}</td>
	<td style="display: none;">${userData.persepsilain}</td>
	<td style="display: none;">${userData.pengaruhberita}</td>
	<td style="display: none;">${userData.faktorlain}</td>
	<td style="display: none;">${userData.pendapatperibadi}</td>
	<td style="display: none;">${userData.partiataucalon}</td>
	<td style="display: none;">${userData.cenderunguntukundi}</td>
	<td style="display: none;">${userData.pilihanpartinasional}</td>
	<td style="display: none;">${userData.pilihanpartitempatan}</td>
	<td style="display: none;">${userData.pemimpinsabah}</td>
	<td style="display: none;">${userData.pemimpinsabahlain}</td>`;


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
  deleteButton.addEventListener('click', function() {
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
  sendMessage(); // Call the function to process the input
});

// FUNCTION TO PROCESS AND DISPLAY MESSAGE
function sendMessage() {
  const message = userInput.value.trim();
  if (message !== '') { // Ensure empty messages are not sent
    displayMessage(`Anda: ${message}`);
    processInput(message);
    userInput.value = ''; // Clear the input field after sending
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
	
  } else if (!userData.jantina) {
    userData.jantina = message;
    hideInput();
	displayMessage(`Tuan Awang: Sila pilih agama anda`, true); //ASK RELIGION
    setTimeout(function () {
      openModal('agama-options-modal'); //OPEN POP UP BOX
    }, 800); // Delay of 0.5 second
    closeModal(); // Add this line to close the gender selection modal

  } 
  
  
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
  
  else if (!userData.bangsa) {  
	userData.bangsa = message;
	console.log('Bangsa:', userData.bangsa);
	hideInput();
  } else if (userData.bangsa && !userData.persepsi) {
    userData.bangsalain = message;
    console.log('Bangsa (Lain-lain):', userData.bangsalain);
	displayMessage(`Tuan Awang: Adakah Media Semasa akan mempengaruhi pilihan pengundian anda?`, true);
    hideInput();
    setTimeout(function () {
      openModal('mediasemasa-options-modal'); //OPEN POP UP BOX
    }, 500);
    closeModal();
    
	
  } 

  else if (!userData.persepsi) {  
    userData.persepsi = message;
    console.log('Persepsi:', userData.persepsi);
    hideInput();
    } else if (userData.persepsi && !userData.pengaruhberita) {
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

function selectParlimen(parlimen) {
  // console.log(parlimen);
  
  switch (parlimen) {
    case "P168":
      closeModal('parlimen-options-modal')
      openModal('p168-modal')
      break;

    case "P169":
      closeModal('parlimen-options-modal')
      openModal('p169-modal')
      break;

      case "P171":
        closeModal('parlimen-options-modal')
        openModal('p171-modal')
        break;

      case "P173":
        closeModal('parlimen-options-modal')
        openModal('p173-modal')
        break

    case "P176":
        closeModal('parlimen-options-modal')
        openModal('p176-modal')
        break;

    case "P177":
        closeModal('parlimen-options-modal')
        openModal('p177-modal')
        break;
  
    case "P178":
          closeModal('parlimen-options-modal')
          openModal('p178-modal')
          break;

    case "P181":
        closeModal('parlimen-options-modal')
        openModal('p181-modal')
        break;
        
    case "P182":
        closeModal('parlimen-options-modal')
        openModal('p182-modal')
        break;
    
    case "P183":
        closeModal('parlimen-options-modal')
        openModal('p183-modal')
        break;

    case "P187":
        closeModal('parlimen-options-modal')
        openModal('p187-modal')
        break;

    case "P188":
        closeModal('parlimen-options-modal')
        openModal('p188-modal')
        break;
    
    case "P191":
        closeModal('parlimen-options-modal')
        openModal('p191-modal')
        break;
        
    default:
      console.log("no parlimen selected");
      
  }

  
}

//BOT QUESTIONS AFTER RECEIVING INPUT FROM USER - HANDLING USER OPTION SELECTION ~^-^~ \\starterfirst
function selectOption(selectedOption, field) {
  userData[field] = selectedOption;
  console.log(`${field}:`, userData[field]);
  // console.log(userData);
  
  displayMessage(`Anda: ${selectedOption}`);
  /*console.log('b:', b);
  console.log('c:', c);
  console.log('d:', d);
  console.log('g:', g);
  console.log('i:', i);
  console.log('l:', l);
  console.log('m:', m);*/
 
//-------->SECTION 1  
  if (!userData.dun) {
    ques++
    console.log(ques);
    
    // If dun is not yet provided, ask for dun
    displayMessage(`Tuan Awang: Sila pilih DUN anda`, true);
    closeModal('dun-options-modal');
	
  } 

  else if (!userData.jantina) {
    ques++
    console.log("Jantina:"+ ques);
    closeModal();
      // If gender is not yet provided, ask for gender
      displayMessage(`Tuan Awang: Sila pilih jantina anda`, true);
      openModal('jantina-options-modal');
    
    } 
  
  else if (!userData.umur && ques==2) {
	closeModal();
    // If age is not yet provided, ask for age
	// displayMessage(`Tuan Awang: Saya pasti banyak tempat yang menarik di ${userData.dun}`, true);
    displayMessage(`Tuan Awang: Sila pilih umur anda`, true);
	b = '';
	c = '';
	d = '';
	g = '';
	i = '';
	l = 'na';
	m = '';
    openModal('umur-options-modal');
	
  } 
  
  //-------->SECTION 2
  else if (!userData.bangsa) {
    closeModal();
    ques++
    console.log(ques);
    // ask for bangsa
    displayMessage(`Tuan Awang: Sila pilih bangsa anda`, true);
    openModal('bangsa-options-modal');

  } else if (userData.bangsa.trim() === 'Lain-lain'  && !userData.pengaruhmediasemasa) {
    // If user choose lain-lain under bangsa
    console.log(userData);
    
    displayMessage(`Tuan Awang: Sila nyatakan bangsa anda`, true);
	closeModal();
	showInput();
  } 

  else if (!userData.pengaruhmediasemasa) {
    // ask for puasdgnpembangunansemasa
	closeModal();
    displayMessage(`Tuan Awang: Adakah Media Semasa akan mempengaruhi pilihan pengundian anda?`, true);
    openModal('mediasemasa-options-modal');

  } 

  else if (!userData.persepsi){
    closeModal();
    displayMessage(`Tuan Awang: Adakah perkara-perkara berikut mempengaruhi persepsi anda?`, true);
    displayMessage("Integriti, Isu-isu moral, Kepimpinan", true);

    openModal('persepsi-options-modal');

  } 
  
  else if (userData.persepsi.trim() === 'Lain-lain' && !userData.pengaruhberita) {
    // If user choose lain-lain under bangsa
    // console.log("here ni");
    
    displayMessage(`Tuan Awang: Sila nyatakan apa yang mempengaruhi persepsi anda:`, true);
	closeModal();
	showInput();
  } 

  else if (!userData.pengaruhberita){
    closeModal();
    displayMessage(`Tuan Awang: Bagaimanakah berita tersebut mempengaruhi pilihan anda?`, true);
    openModal('pengaruhberita-options-modal');

  } 

  else if (!userData.faktorlain){
    closeModal();
    displayMessage(`Tuan Awang: Selain daripada Media Semasa, apakah faktor lain yang mempengaruhi anda untuk mengundi?`, true);
    openModal('faktorlain-options-modal');

  } 

  else if (userData.faktorlain == 'Pendapat Peribadi' && !userData.pendapatperibadi){
    closeModal();
    displayMessage(`Tuan Awang: Selain daripada Media Semasa, apakah faktor lain yang mempengaruhi anda untuk mengundi?`, true);
    openModal('pendapatperibadi-options-modal');

  } 

  else if (!userData.partiataucalon){
    closeModal();
    displayMessage(`Tuan Awang: Adakah anda mengundi bedasarkan Parti atau Calon?`, true);
    openModal('partiataucalon-options-modal');

  } 

  else if (!userData.cenderunguntukundi){
    closeModal();
    displayMessage(`Tuan Awang: Merujuk kepada pilihan dinyatakan di bawah, yang manakah lebih cenderung untuk anda undi?`, true);
    displayMessage(`Tuan Awang: 1) Parti Nasional 2) Parti Tempatan 3) Tiada Kecenderungan`, true);
    openModal('cenderunguntukundi-options-modal');

  } 

  // check this

  else if (!userData.pilihanpartinasional && userData.cenderunguntukundi == 'Parti Nasional'){
    closeModal();
    displayMessage(`Tuan Awang: Parti Nasional pilihan anda?`, true);
    openModal('partinasional-options-modal');
    // console.log("siniii");
    
  } 

  else if (userData.pilihanpartinasional && userData.cenderunguntukundi == 'Parti Nasional' && !userData.pilihanpartitempatan){
    closeModal();
    displayMessage(`Tuan Awang: Parti tempatan pilihan anda?`, true);
    openModal('partitempatan-options-modal');
    // console.log("ani tang baru");
    
  } 

  else if (!userData.pilihanpartitempatan && userData.cenderunguntukundi == 'Parti Tempatan'){
    closeModal();
    displayMessage(`Tuan Awang: Parti tempatan pilihan anda?`, true);
    openModal('partitempatan-options-modal');
    console.log("Tempatan");
    
  } 

  else if (!userData.pemimpinsabah ){
    closeModal();
    displayMessage(`Tuan Awang: Akhir sekali, pada pendapat anda siapa yang layak untuk memimpin sabah?`, true);
    openModal('pemimpinsabah-options-modal');
    console.log('hereeee');
    
  } 

  else if (userData.pemimpinsabah.trim() === 'Lain-lain' && !userData.isiboranglagi) {
    // If user choose lain-lain under bangsa
    // console.log("here ni");
    
    displayMessage(`Tuan Awang: Sila nyatakan pilihan pemimpin sabah anda:`, true);
	closeModal();
	showInput();
  } 

  else if (!userData.isiboranglagi){
    closeModal();
      displayMessage(`Tuan Awang: Adakah anda ingin mengisi borang lagi sekali?`, true);
      openModal('isiboranglagi-options-modal');
    
    
    //isi borang lagi - ya
    } 
    
    else if (userData.isiboranglagi === 'Ya, isi lagi'){
      closeModal();
      console.log('Anda pilih ya.')
      console.log(userData);
      displayUserInfo(userData);
      initiateConversation();
  
    //isi borang lagi - tidak
    } else if (userData.isiboranglagi === 'Tidak'){
      console.log('Anda pilih tidak.')
      displayUserInfo(userData);
      console.log(userData);
      // remove user kod (end user session)
      localStorage.removeItem('userKod');
      closeModal();
      hideInput(); 
      displayMessage(`Tuan Awang: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah Maju Jaya!`, true);
      
    } else {
      // All information collected, finish conversation
      displayMessage(`Tuan Awang: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah Maju Jaya!`, true);
      displayUserInfo(userData);
      closeModal();
      initiateConversation();
    }  


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


function buttonhijau(){
  alert("Demo Purposes Only")
}

//api for saving to db
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
  const tableRows = userTable.querySelectorAll('tr');
  let csvContent = "data:text/csv;charset=utf-8,";
  // Define the headers
  const headers =
   ["tarikh" ,
    "kod",
    "dun", 
    "umur", 
    "jantina", 
    "bangsa", 
    "bangsalain",
    "pengaruhmediasemasa",
    "persepsi",
    "persepsilain",
    "pengaruhberita",
    "faktorlain",
    "pendapatperibadi",
    "partiataucalon",
    "cenderunguntukundi",
    "pilihanpartinasional",
    "pilihanpartitempatan",
    "pemimpinsabah",
    "pemimpinsabahlain"
  ];

  
  // const headers = ["tarikh" ,"dun", "umur", "jantina", "agama", "bangsa", "tahappendidikan", "pekerjaan", "pendapatanbulanan", "puasdgnpembangunansemasa",
  // "yapuasdgnpembangunansemasa", "tidakpuasdgnpembangunansemasa","keperluanasaspuashati", "infrastrukturpuashati", "kebajikanpuashati", "lainlainpuashati",
  // "keperluanasastidakpuashati", "infrastrukturtidakpuashati", "kebajikantidakpuashati", "lainlaintidakpuashati", "dunjalanidgnbaik", "dunmenyelesaikanmasalah", "undidun", 
  // "cadangancalonyb", "kmperubahanpositif", "penambahbaikanmasadepan", "tiadakesanpositif", "perbaikikeperluanasas", "perbaikiinfrastruktur", "perbaikiekonomi", 
  // "perbaikiperkhidmatanawam", "perbaikilainlain", "tiadapositifkeperluanasas", "tiadapositifinfrastruktur", "tiadapositifekonomi", "tiadapositifperkhidmatanawam", 
  // "tiadapositiflainlain", "kriteriapemimpinbaik", "pilihanpemimpinsabah", "pilihanpemimpinsabahlain"];
  
  csvContent += headers.join(",") + "\r\n";

  // Add data rows
  tableRows.forEach(row => {
    const columns = row.querySelectorAll('td');
    const rowData = Array.from(columns).map(column => column.textContent).join(',');
    csvContent += rowData + "\r\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "user_data.csv");
  document.body.appendChild(link);
  link.click();
}

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
  userData = {
    tarikh: '',
    kod:'',
    dun: '',
    umur: '',
    jantina: '',
    bangsa: '',
    bangsalain:'',
    pengaruhmediasemasa:'',
    persepsi:'',
    persepsilain:'',
    pengaruhberita:'',
    faktorlain:'',
    pendapatperibadi:'',
    partiataucalon:'',
    cenderunguntukundi:'',
    pilihanpartinasional:'',
    pilihanpartitempatan:'',
    pemimpinsabah:'',
    pemimpinsabahlain:'',
    isiboranglagi:''
  };
  messagesDiv.innerHTML = '';
  getCurrentDate();
  displayMessage(`Tuan Awang: Selamat datang ke kaji selidik bagi Pemantauan Dinamika Pembangunan Kerajaan Fasa 2 2024. Pandangan anda amat penting untuk membantu dan memahami sentimen isu-isu kepimpinan dan pembangunan negeri Sabah.
Mohon kerjasama tuan/puan untuk mengisi kaji selidik ini dengan jujur dan teliti.
`, true);
  displayMessage(`Tuan Awang: Hi! Memperkenalkan saya Tuan Awang, mari kita mula kan kaji selidik ini 😃 Sila pilih DUN anda:`, true, 300);
  setTimeout(function () {
      // openModal('dun-options-modal'); //OPEN POP UP BOX
      // openModal('parlimen-options-modal');
      openModal('starting-modal');

  }, 1000);
  hideInput();
}

//AS DEFAULT, THESE 2 FUNCTIONS ARE CALLED
loadFromLocalStorage(); //LOAD DATA FROM LOCAL STORAGE -> THAT IS AVAILABLE (THIS IS USEFUL WHEN USER EXIT THEIR BROWSER AND VISIT THE WEB BACK)
initiateConversation(); //START CONVERSATION FROM BEGINNING
