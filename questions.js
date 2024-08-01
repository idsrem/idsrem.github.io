// questions.js

//FUNCTIONS
const messagesDiv = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const userTable = document.getElementById('user-info');
const exportBtn = document.getElementById('export-btn');
const clearBtn = document.getElementById('clear-btn');
const overlay = document.querySelector('.overlay');

//INITIALIZE VARIABLES
let userData = {
  tarikh: '',
  dun: '',
  umur: '',
  jantina: '',
  agama: '',
  bangsa: '',
  tahappendidikan: '',
  pekerjaan: '',
  pendapatanbulanan: '',
  puasdgnpembangunansemasa: '',
  yapuasdgnpembangunansemasa: '',
  tidakpuasdgnpembangunansemasa: '',
  keperluanasaspuashati: '',  
  infrastrukturpuashati: '', 
  kebajikanpuashati: '',  
  lainlainpuashati: '',
  keperluanasastidakpuashati: '', 
  infrastrukturtidakpuashati: '', 
  kebajikantidakpuashati: '',
  lainlaintidakpuashati: '',  
  dunjalanidgnbaik: '',         
  dunmenyelesaikanmasalah: '',  
  undidun: '',  
  kmperubahanpositif: '', 
  penambahbaikanmasadepan: '', 
  tiadakesanpositif: '',    
  perbaikikeperluanasas: '',    
  perbaikiinfrastruktur: '',   
  perbaikiekonomi: '',         
  perbaikiperkhidmatanawam: '',
  perbaikilainlain: '',
  tiadapositifkeperluanasas: '',
  tiadapositifinfrastruktur: '', 
  tiadapositifekonomi: '',            
  tiadapositifperkhidmatanawam: '',  
  tiadapositiflainlain: '',
  kriteriapemimpinbaik: '',  
  pilihanpemimpinsabah: '',
  pilihanpemimpinsabahlain: ''
};

let pengesahan = {isiboranglagi: ''};

//DATE
function getCurrentDate() {
  const currentDate = new Date();
  // Format the date as desired
  const formattedDate = currentDate.toLocaleDateString();
  
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
	<td style="display: none;">${userData.tarikh}</td>
    <td>${userData.dun}</td>
    <td>${userData.umur}</td>
    <td>${userData.jantina}</td>
    <td>${userData.agama}</td>
	<td style="display: none;">${userData.bangsa}</td>
	<td style="display: none;">${userData.tahappendidikan}</td>
	<td style="display: none;">${userData.pekerjaan}</td>
	<td style="display: none;">${userData.pendapatanbulanan}</td>
	<td style="display: none;">${userData.puasdgnpembangunansemasa}</td>
	<td style="display: none;">${userData.yapuasdgnpembangunansemasa}</td>
	<td style="display: none;">${userData.tidakpuasdgnpembangunansemasa}</td>
	<td style="display: none;">${userData.keperluanasaspuashati}</td>
	<td style="display: none;">${userData.infrastrukturpuashati}</td>
	<td style="display: none;">${userData.kebajikanpuashati}</td>
	<td style="display: none;">${userData.lainlainpuashati}</td>
	<td style="display: none;">${userData.keperluanasastidakpuashati}</td>
	<td style="display: none;">${userData.infrastrukturtidakpuashati}</td>
	<td style="display: none;">${userData.kebajikantidakpuashati}</td>
	<td style="display: none;">${userData.lainlaintidakpuashati}</td>	
	<td style="display: none;">${userData.dunjalanidgnbaik}</td>
	<td style="display: none;">${userData.dunmenyelesaikanmasalah}</td>
	<td style="display: none;">${userData.undidun}</td>
	<td style="display: none;">${userData.kmperubahanpositif}</td>
	<td style="display: none;">${userData.penambahbaikanmasadepan}</td>
	<td style="display: none;">${userData.tiadakesanpositif}</td>
	<td style="display: none;">${userData.perbaikikeperluanasas}</td>
	<td style="display: none;">${userData.perbaikiinfrastruktur}</td>
	<td style="display: none;">${userData.perbaikiekonomi}</td>
	<td style="display: none;">${userData.perbaikiperkhidmatanawam}</td>    
	<td style="display: none;">${userData.perbaikilainlain}</td>
	<td style="display: none;">${userData.tiadapositifkeperluanasas}</td>
	<td style="display: none;">${userData.tiadapositifinfrastruktur}</td>
	<td style="display: none;">${userData.tiadapositifekonomi}</td>
	<td style="display: none;">${userData.tiadapositifperkhidmatanawam}</td>
	<td style="display: none;">${userData.tiadapositiflainlain}</td>
	<td style="display: none;">${userData.kriteriapemimpinbaik}</td>
	<td style="display: none;">${userData.pilihanpemimpinsabah}</td>
	<td style="display: none;">${userData.pilihanpemimpinsabahlain}</td>
  `;

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
      data.dun === userData.dun &&
      data.umur === userData.umur &&
      data.jantina === userData.jantina &&
      data.agama === userData.agama &&
	  data.bangsa === userData.bangsa &&
	  data.tahappendidikan === userData.tahappendidikan &&
	  data.pekerjaan === userData.pekerjaan &&
	  data.pendapatanbulanan === userData.pendapatanbulanan &&
	  data.puasdgnpembangunansemasa === userData.puasdgnpembangunansemasa &&
	  data.yapuasdgnpembangunansemasa === userData.yapuasdgnpembangunansemasa && 
	  data.tidakpuasdgnpembangunansemasa === userData.tidakpuasdgnpembangunansemasa && 
	  data.keperluanasaspuashati === userData.keperluanasaspuashati && 
	  data.infrastrukturpuashati === userData.infrastrukturpuashati && 
	  data.kebajikanpuashati === userData.kebajikanpuashati && 
	  data.lainlainpuashati === userData.lainlainpuashati &&
	  data.keperluanasastidakpuashati === userData.keperluanasastidakpuashati &&
	  data.infrastrukturtidakpuashati === userData.infrastrukturtidakpuashati && 
	  data.kebajikantidakpuashati === userData.kebajikantidakpuashati &&
	  data.lainlaintidakpuashati === userData.lainlaintidakpuashati &&
	  data.dunjalanidgnbaik === userData.dunjalanidgnbaik &&  
	  data.dunmenyelesaikanmasalah === userData.dunmenyelesaikanmasalah &&  
	  data.undidun === userData.undidun &&  
	  data.kmperubahanpositif === userData.kmperubahanpositif && 
	  data.penambahbaikanmasadepan === userData.penambahbaikanmasadepan && 
	  data.tiadakesanpositif === userData.tiadakesanpositif && 
	  data.perbaikikeperluanasas === userData.perbaikikeperluanasas && 
	  data.perbaikiinfrastruktur === userData.perbaikiinfrastruktur &&  
	  data.perbaikiekonomi === userData.perbaikiekonomi &&  
	  data.perbaikiperkhidmatanawam === userData.perbaikiperkhidmatanawam &&
	  data.perbaikilainlain === userData.perbaikilainlain &&
	  data.tiadapositifkeperluanasas === userData.tiadapositifkeperluanasas &&
	  data.tiadapositifinfrastruktur === userData.tiadapositifinfrastruktur && 
	  data.tiadapositifekonomi === userData.tiadapositifekonomi &&  
	  data.tiadapositifperkhidmatanawam === userData.tiadapositifperkhidmatanawam &&  
	  data.tiadapositiflainlain === userData.tiadapositiflainlain &&
	  data.kriteriapemimpinbaik === userData.kriteriapemimpinbaik && 
	  data.pilihanpemimpinsabah === userData.pilihanpemimpinsabah &&
	  data.pilihanpemimpinsabahlain === userData.pilihanpemimpinsabahlain
    );

    if (index === -1) {
      // If userData does not exist, push it to savedUserData
      savedUserData.push(userData);
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
      data.dun !== userData.dun ||
      data.umur !== userData.umur ||
      data.jantina !== userData.jantina ||
      data.agama !== userData.agama ||
	  data.bangsa !== userData.bangsa ||
	  data.tahappendidikan !== userData.tahappendidikan ||
	  data.pekerjaan !== userData.pekerjaan ||
	  data.pendapatanbulanan !== userData.pendapatanbulanan ||
	  data.puasdgnpembangunansemasa !== userData.puasdgnpembangunansemasa ||
	  data.yapuasdgnpembangunansemasa !== userData.yapuasdgnpembangunansemasa ||
	  data.tidakpuasdgnpembangunansemasa !== userData.tidakpuasdgnpembangunansemasa || 
	  data.keperluanasaspuashati !== userData.keperluanasaspuashati || 
	  data.infrastrukturpuashati !== userData.infrastrukturpuashati ||
	  data.kebajikanpuashati !== userData.kebajikanpuashati ||
	  data.lainlainpuashati !== userData.lainlainpuashati || 
	  data.keperluanasastidakpuashati !== userData.keperluanasastidakpuashati ||
	  data.infrastrukturtidakpuashati !== userData.infrastrukturtidakpuashati ||
	  data.kebajikantidakpuashati !== userData.kebajikantidakpuashati || 
	  data.lainlaintidakpuashati !== userData.lainlaintidakpuashati ||
	  data.dunjalanidgnbaik !== userData.dunjalanidgnbaik ||
	  data.dunmenyelesaikanmasalah !== userData.dunmenyelesaikanmasalah || 
	  data.undidun !== userData.undidun || 
	  data.kmperubahanpositif !== userData.kmperubahanpositif || 
	  data.penambahbaikanmasadepan !== userData.penambahbaikanmasadepan ||
	  data.tiadakesanpositif !== userData.tiadakesanpositif ||
	  data.perbaikikeperluanasas !== userData.perbaikikeperluanasas || 
	  data.perbaikiinfrastruktur !== userData.perbaikiinfrastruktur || 
	  data.perbaikiekonomi !== userData.perbaikiekonomi ||
	  data.perbaikiperkhidmatanawam !== userData.perbaikiperkhidmatanawam ||
	  data.perbaikilainlain !== userData.perbaikilainlain ||
	  data.tiadapositifkeperluanasas !== userData.tiadapositifkeperluanasas ||
	  data.tiadapositifinfrastruktur !== userData.tiadapositifinfrastruktur || 
	  data.tiadapositifekonomi !== userData.tiadapositifekonomi || 
	  data.tiadapositifperkhidmatanawam !== userData.tiadapositifperkhidmatanawam || 
	  data.tiadapositiflainlain !== userData.tiadapositiflainlain ||
	  data.kriteriapemimpinbaik !== userData.kriteriapemimpinbaik || 
	  data.pilihanpemimpinsabah !== userData.pilihanpemimpinsabah ||
	  data.pilihanpemimpinsabahlain !== userData.pilihanpemimpinsabahlain 
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

//BOT QUESTIONS AFTER RECEIVING INPUT FROM USER - HANDLING RAW INPUT TEXT ~^-^~ //second
function processInput(message) {
  if (!userData.dun) {
	userData.dun = message;
    console.log('Dun:', userData.dun);
	closeModal();
    displayMessage(`En. Rem: Bagaimana pula umur anda?`, true, 500); //ASK AGE
  /*} else if (!userData.umur) {
    if (!isNaN(message) && message > 17 && message < 200 ) { //IF NUMERIC / NOT STRING AND AGE IS BETWEEN 6-179
      userData.umur = message;
      console.log('Umur:', userData.umur);
      hideInput();
	  displayMessage(`En. Rem: Bagaimana pula jantina anda`, true); //ASK GENDER
      setTimeout(function () {
        openModal('jantina-options-modal'); //OPEN POP UP BOX
      }, 800); // Delay of 0.5 second
    } else {
      displayMessage(`En. Rem: Sila nyatakan umur yang betul`, true, 500); //ASK AGE
    }*/
  } else if (!userData.umur) {
    userData.umur = message;
    console.log('Umur:', userData.umur);
    hideInput();
	
  } else if (!userData.jantina) {
    userData.jantina = message;
    hideInput();
	displayMessage(`En. Rem: Sila pilih agama anda`, true); //ASK RELIGION
    setTimeout(function () {
      openModal('agama-options-modal'); //OPEN POP UP BOX
    }, 800); // Delay of 0.5 second
    closeModal(); // Add this line to close the gender selection modal

  } else if (!userData.agama) {  
	userData.agama = message;
	console.log('Agama1:', userData.agama);
	hideInput();
	
  } else if (userData.agama && !userData.bangsa) {
    userData.agama = message;
    console.log('Agama (Lain-lain):', userData.agama);
    hideInput();
	setTimeout(function () {
	  openModal('bangsa-options-modal'); //OPEN POP UP BOX FOR NEXT QUESTION IF ANY
	}, 500);
	closeModal();

  } else if (!userData.bangsa) {  
	userData.bangsa = message;
	console.log('Bangsa:', userData.bangsa);
	hideInput();
  } else if (userData.bangsa && !userData.tahappendidikan) {
    userData.bangsa = message;
    console.log('Bangsa (Lain-lain):', userData.bangsa);
    hideInput();
    setTimeout(function () {
      openModal('tahappendidikan-options-modal'); //OPEN POP UP BOX
    }, 500);
    closeModal();
	
  } else if (!userData.tahappendidikan) {
    userData.tahappendidikan = message;
    console.log('Tahap Pendidikan:', userData.tahappendidikan);
    hideInput();	
	
  } else if (!userData.pekerjaan) {
    userData.pekerjaan = message;
    console.log('Jenis Pekerjaan:', userData.pekerjaan);
    hideInput();	
	
  } else if (userData.pekerjaan && !userData.pendapatanbulanan && b === 'true') {
	b = 'false';
    userData.pendapatanbulanan = message;
    console.log('Pendapatan Bulanan:', userData.pendapatanbulanan);
    hideInput();
    setTimeout(function () {
      openModal('puasdgnpembangunansemasa-options-modal'); //OPEN POP UP BOX
    }, 500);
    closeModal();
  } else if (!userData.puasdgnpembangunansemasa) {
    userData.puasdgnpembangunansemasa = message;
    console.log('Puas Dgn Pembangunan Semasa:', userData.puasdgnpembangunansemasa);
    hideInput();

  } else if (!userData.yapuasdgnpembangunansemasa && d === 'true') {
	d = 'false';
    userData.yapuasdgnpembangunansemasa = message;
    console.log('Ya, Puas Dgn Pembangunan Semasa:', userData.yapuasdgnpembangunansemasa);
    hideInput();
	
  } else if (!userData.tidakpuasdgnpembangunansemasa && c === 'true') {
	c = 'false';
    userData.tidakpuasdgnpembangunansemasa = message;
    console.log('Tidak Puas Dgn Pembangunan Semasa:', userData.tidakpuasdgnpembangunansemasa);
    hideInput();
	
//Puas Hati & Tidak Puas Hati - Lain-lain-------------------------------------------------------------------------------------------->
  } else if (g === 'true' && !userData.lainlainpuashati || g === 'true' && !userData.lainlaintidakpuashati){
		if(userData.puasdgnpembangunansemasa.trim() === 'Ya'){
			userData.lainlainpuashati = message;
			hideInput();
			setTimeout(function () {
			  openModal('dunjalanidgnbaik-options-modal'); //OPEN POP UP BOX
			}, 500);
			closeModal();
		}
		else {
			userData.lainlaintidakpuashati = message;
			hideInput();
			setTimeout(function () {
			  openModal('dunmenyelesaikanmasalah-options-modal'); //OPEN POP UP BOX
			}, 500);
			closeModal();
		}
	g = 'false';
    console.log('Berpuas Hati Dgn Lain-lain:', userData.lainlainpuashati);
	console.log('Tidak Berpuas Hati Dgn Lain-lain:', userData.lainlaintidakpuashati);

//Perbaiki & Tiasa Positif - Lain-lain-------------------------------------------------------------------------------------------->
  } else if (i === 'true' && !userData.perbaikilainlain || i === 'true' && !userData.tiadapositiflainlain){
		if(userData.penambahbaikanmasadepan.trim() === 'Lain-lain'){
			userData.perbaikilainlain = message;
			hideInput();
			setTimeout(function () {
			  openModal('kriteriapemimpinbaik-options-modal'); //OPEN POP UP BOX
			}, 500);
			closeModal();
		}
		else {
			userData.tiadapositiflainlain = message;
			hideInput();
			setTimeout(function () {
			  openModal('kriteriapemimpinbaik-options-modal'); //OPEN POP UP BOX
			}, 500);
			closeModal();
		}
    console.log('Perbaiki Masa Depan Pada Lain-lain:', userData.perbaikilainlain);
	console.log('Tiada Kesan Positif Pada Lain-lain:', userData.tiadapositiflainlain);

   //siapa layak mempimpin sabah - lain-lain-------------------------------------------------------------------------------------------->
  } else if (userData.pilihanpemimpinsabah) {
    userData.pilihanpemimpinsabahlain = message;
    console.log('Yang Layak Memimpin Sabah:', userData.pilihanpemimpinsabahlain);
    hideInput();
	displayMessage(`En. Rem: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah maju jaya!`, true);
    displayUserInfo(userData);
    closeModal();
    initiateConversation();
	
//Puas Hati - keperluanasas
  } else if (!userData.keperluanasaspuashati) {
    userData.keperluanasaspuashati = message;
    console.log('Berpuas Hati Dgn Keperluan Asas:', userData.keperluanasaspuashati);
    hideInput();
 
//Puas Hati - Infrastruktur
  } else if (!userData.infrastrukturpuashati) {
    userData.infrastrukturpuashati = message;
    console.log('Berpuas Hati Dgn Infrastruktur:', userData.infrastrukturpuashati);
    hideInput();

//Puas Hati - Kebajikan
  } else if (!userData.kebajikanpuashati) {
    userData.kebajikanpuashati = message;
    console.log('Berpuas Hati Dgn Kebajikan:', userData.kebajikanpuashati);
    hideInput();

//Puas Hati - dunjalanidgnbaik
  } else if (!userData.dunjalanidgnbaik) {
    userData.dunjalanidgnbaik  = message;
    console.log('DUN Menjalankan Tugas Dgn Baik:', userData.dunjalanidgnbaik);
    hideInput();
  
	
//Tidak Puas Hati - keperluanasas
  } else if (!userData.keperluanasastidakpuashati) {
    userData.keperluanasastidakpuashati = message;
    console.log('Tidak Berpuas Hati Dgn Keperluan Asas:', userData.keperluanasastidakpuashati);
    hideInput();
 
//Tidak Puas Hati - Infrastruktur
  } else if (!userData.infrastrukturtidakpuashati) {
    userData.infrastrukturtidakpuashati = message;
    console.log('Tidak Berpuas Hati Dgn Infrastruktur:', userData.infrastrukturtidakpuashati);
    hideInput();
	
//Tidak Puas Hati - Kebajikan
  } else if (!userData.kebajikantidakpuashati) {
    userData.kebajikantidakpuashati  = message;
    console.log('Tidak Berpuas Hati Dgn Kebajikan:', userData.kebajikantidakpuashati);
    hideInput();

//Tidak Puas Hati - dunmenyelesaikanmasalah 
  } else if (!userData.dunmenyelesaikanmasalah) {
    userData.dunmenyelesaikanmasalah  = message;
    console.log('DUN Menyelesaikan Masalah:', userData.dunmenyelesaikanmasalah);
    hideInput();

  } else if (!userData.undidun) {
    userData.undidun  = message;
    console.log('Undi YB DUN lagi:', userData.undidun);
    hideInput();

  } else if (!userData.kmperubahanpositif) {
    userData.kmperubahanpositif  = message;
    console.log('KM Sabah Membawa Perubahan Positif:', userData.kmperubahanpositif);
    hideInput();
	
  } else if (!userData.penambahbaikanmasadepan) {
    userData.penambahbaikanmasadepan  = message;
    console.log('Penambahbaikan Masa Depan:', userData.penambahbaikanmasadepan);
    hideInput();  
  
   } else if (!userData.tiadakesanpositif) {
    userData.tiadakesanpositif = message;
    console.log('Tiada Kesan Positif Pada:', userData.tiadakesanpositif);
    hideInput();

   //ya membawa positif - penambaikan keperluan asas
  } else if (!userData.perbaikikeperluanasas) {
    userData.perbaikikeperluanasas = message;
    console.log('Perbaiki Keperluan Asas:', userData.perbaikikeperluanasas);
    hideInput();
	
   //ya membawa positif - penambaikan infrastruktur
  } else if (!userData.perbaikiinfrastruktur) {
    userData.perbaikiinfrastruktur = message;
    console.log('Perbaiki Infrastruktur:', userData.perbaikiinfrastruktur);
    hideInput();
	
   //ya membawa positif - penambaikan ekonomi
  } else if (!userData.perbaikiekonomi) {
    userData.perbaikiekonomi = message;
    console.log('Perbaiki Ekonomi:', userData.perbaikiekonomi);
    hideInput();
	
   //ya membawa positif - penambaikan perkhidmatan awam
  } else if (!userData.perbaikiperkhidmatanawam) {
    userData.perbaikiperkhidmatanawam = message;
    console.log('Perbaiki Perkhidmatan Awam:', userData.perbaikiperkhidmatanawam);
    hideInput();
	
   //siapa layak mempimpin sabah
  } else if (!userData.pilihanpemimpinsabah) {
    userData.pilihanpemimpinsabah = message;
    console.log('Yang Layak Memimpin Sabah:', userData.pilihanpemimpinsabah);
    hideInput();	
	
  }
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

//BOT QUESTIONS AFTER RECEIVING INPUT FROM USER - HANDLING USER OPTION SELECTION ~^-^~ \\starterfirst
function selectOption(selectedOption, field) {
  userData[field] = selectedOption;
  console.log(`${field}:`, userData[field]);
  displayMessage(`Anda: ${selectedOption}`);
 
//-------->SECTION 1  
  if (!userData.dun) {
    // If dun is not yet provided, ask for dun
    displayMessage(`En. Rem: Sila pilih DUN anda`, true);
    closeModal('dun-options-modal');
	
  } else if (!userData.umur) {
	closeModal();
    // If age is not yet provided, ask for age
	displayMessage(`En. Rem: Saya pasti banyak tempat yang menarik di ${userData.dun}`, true);
    displayMessage(`En. Rem: Sila pilih umur anda`, true);
    openModal('umur-options-modal');
	
  } else if (!userData.jantina) {
	closeModal();
    // If gender is not yet provided, ask for gender
    displayMessage(`En. Rem: Sila pilih jantina anda`, true);
    openModal('jantina-options-modal');
  
  } else if (!userData.agama) {
    // If religion is not yet provided, ask for religion
    displayMessage(`En. Rem: Sila pilih agama anda`, true);
	openModal('agama-options-modal');

  } else if (!userData.bangsa && userData.agama.trim() === 'Lain-lain') {
    // If user choose lain-lain under agama
    displayMessage(`En. Rem: Sila nyatakan agama anda`, true);
	closeModal();
	showInput();
	
  } else if (!userData.bangsa) {
    // ask for bangsa
    displayMessage(`En. Rem: Sila pilih bangsa anda`, true);
    openModal('bangsa-options-modal');

  } else if (!userData.tahappendidikan && userData.bangsa.trim() === 'Lain-lain') {
    // If user choose lain-lain under bangsa
    displayMessage(`En. Rem: Sila nyatakan bangsa anda`, true);
	closeModal();
	showInput();
	
  } else if (!userData.tahappendidikan) {
    // ask for tahap pendidikan
    displayMessage(`En. Rem: Sila pilih tahap pendidikan anda`, true);
    openModal('tahappendidikan-options-modal');

  } else if (!userData.pekerjaan) {
    // ask for jenis pekerjaan
	closeModal();
    displayMessage(`En. Rem: Apakah status pekerjaan anda?`, true);
    openModal('pekerjaan-options-modal');
	
  } else if (!userData.pendapatanbulanan && userData.pekerjaan.trim() === 'Bekerja') {
    // If user choose Bekerja under pekerjaan
	b = 'true';
	closeModal();
    displayMessage(`En. Rem: Sila pilih jumlah pendapatan bulanan anda`, true);
	openModal('pendapatanbulanan-options-modal');
	
//-------->SECTION 2
  } else if (!userData.puasdgnpembangunansemasa) {
    // ask for puasdgnpembangunansemasa
	closeModal();
    displayMessage(`En. Rem: Adakah anda berpuas hati dengan pembangunan semasa di kawasan anda?`, true);
    openModal('puasdgnpembangunansemasa-options-modal');

  } else if (!userData.yapuasdgnpembangunansemasa && userData.puasdgnpembangunansemasa.trim() === 'Ya'){
    // ask for yapuasdgnpembangunansemasa
	d = 'true';
	closeModal();
    displayMessage(`En. Rem: Apakah yang membuatkan anda berpuas hati?`, true);
    openModal('yapuasdgnpembangunansemasa-options-modal');
	
  } else if (!userData.tidakpuasdgnpembangunansemasa && userData.puasdgnpembangunansemasa.trim() === 'Tidak'){
    // ask for tidakpuasdgnpembangunansemasa
	c = 'true';
	closeModal();
    displayMessage(`En. Rem: Apakah yang membuatkan anda tidak berpuas hati?`, true);
    openModal('tidakpuasdgnpembangunansemasa-options-modal');

//jika puas hati; keperluan asas
  } else if (!userData.keperluanasaspuashati && userData.yapuasdgnpembangunansemasa.trim() === 'Keperluan Asas'){
	closeModal();
    displayMessage(`En. Rem: Bolehkah kami tahu bahagian mana yang anda berpuas hati?`, true);
    openModal('keperluanasaspuashati-options-modal');
	
//jika puas hati; infrastruktur
  } else if (!userData.infrastrukturpuashati && userData.yapuasdgnpembangunansemasa.trim() === 'Infrastruktur'){
	closeModal();
    displayMessage(`En. Rem: Bolehkah kami tahu bahagian mana yang anda berpuas hati?`, true);
    openModal('infrastrukturpuashati-options-modal');
	
//jika puas hati; kebajikan
  } else if (!userData.kebajikanpuashati && userData.yapuasdgnpembangunansemasa.trim() === 'Kebajikan'){
	closeModal();
    displayMessage(`En. Rem: Bolehkah kami tahu bahagian mana yang anda berpuas hati?`, true);
    openModal('kebajikanpuashati-options-modal');

//jika puas hati; lain-lain
  } else if (!userData.lainlainpuashati && userData.yapuasdgnpembangunansemasa.trim() === 'Lain-lain') {
	//e = 'true';
	b = 'false';
	c = 'false';
	d = 'false';
	g = 'true'; //
    displayMessage(`En. Rem: Anda pilih lain-lain, sila nyatakan apakah yang membuatkan anda berpuas hati?`, true);
	closeModal();
	showInput();
	
//jika puas hati; dunjalanidgnbaik 
  } else if (!userData.dunjalanidgnbaik && userData.puasdgnpembangunansemasa === 'Ya'){
	closeModal();
    displayMessage(`En. Rem: Adakah YB DUN anda menjalankan tanggungjawab dengan baik?`, true);
    openModal('dunjalanidgnbaik-options-modal');
  
  
//jika tidak puas hati; keperluan asas
  } else if (!userData.keperluanasastidakpuashati && userData.tidakpuasdgnpembangunansemasa.trim() === 'Keperluan Asas'){
	closeModal();
    displayMessage(`En. Rem: Bolehkah kami tahu bahagian mana yang anda tidak berpuas hati?`, true);
    openModal('keperluanasastidakpuashati-options-modal');
	
//jika tidak puas hati; infrastruktur
  } else if (!userData.infrastrukturtidakpuashati && userData.tidakpuasdgnpembangunansemasa.trim() === 'Infrastruktur'){
	closeModal();
    displayMessage(`En. Rem: Bolehkah kami tahu bahagian mana yang anda tidak berpuas hati?`, true);
    openModal('infrastrukturtidakpuashati-options-modal');
	
//jika tidak puas hati; kebajikan
  } else if (!userData.kebajikantidakpuashati && userData.tidakpuasdgnpembangunansemasa.trim() === 'Kebajikan'){
	closeModal();
    displayMessage(`En. Rem: Bolehkah kami tahu bahagian mana yang anda tidak berpuas hati?`, true);
    openModal('kebajikantidakpuashati-options-modal');

//jika tidak puas hati; lain-lain
  } else if (!userData.lainlaintidakpuashati && userData.tidakpuasdgnpembangunansemasa.trim() === 'Lain-lain') {
	//f = 'true';
	b = 'false';
	c = 'false';
	d = 'false';
    g = 'true'; 
    displayMessage(`En. Rem: Anda pilih lain-lain, sila nyatakan apakah yang membuatkan anda tidak berpuas hati?`, true);
	closeModal();
	showInput();  
 
//jika tidak puas hati; dunmenyelesaikanmasalah 
  } else if (!userData.dunmenyelesaikanmasalah && userData.puasdgnpembangunansemasa === 'Tidak'){
	closeModal();
    displayMessage(`En. Rem: Adakah YB DUN anda berusaha untuk menyelesaikan masalah yang dihadapi?`, true);
    openModal('dunmenyelesaikanmasalah-options-modal'); 
  
 //mengundi yb dun anda lagi
  } else if (!userData.undidun){
	closeModal();
    displayMessage(`En. Rem: Adakah anda akan mengundi YB DUN anda untuk pilihan raya negeri yang akan datang?`, true);
    openModal('undidun-options-modal');  
  
//-------->SECTION 3  
  //ketua menteri sabah membawa perubahan positif
  } else if (!userData.kmperubahanpositif){
	closeModal();
    displayMessage(`En. Rem: Adakah ketua menteri sabah membawa perubahan positif kepada negeri sabah sejak tahun 2020?`, true);
    openModal('kmperubahanpositif-options-modal');   
  
  //ya membawa positif - penambaikan
  } else if (!userData.penambahbaikanmasadepan && userData.kmperubahanpositif.trim() === 'Ya'){ 
	closeModal();
    displayMessage(`En. Rem: Apakah perkara utama yang anda harapkan dapat diperbaiki di masa yang akan datang?`, true);
    openModal('penambahbaikanmasadepan-options-modal'); 
 
  //tidak pasti membawa positif - penambaikan
  } else if (!userData.penambahbaikanmasadepan && userData.kmperubahanpositif.trim() === 'Tidak Pasti'){ 
	closeModal();
    displayMessage(`En. Rem: Apakah perkara utama yang anda harapkan dapat diperbaiki di masa yang akan datang?`, true);
    openModal('penambahbaikanmasadepan-options-modal'); 
	
  //tidak membawa positif - tiada kesan positif
  } else if (!userData.tiadakesanpositif && userData.kmperubahanpositif.trim() === 'Tidak'){ 
	closeModal();
    displayMessage(`En. Rem: Dari sudut manakah yang tidak memberi sebarang kesan yang positif?`, true);
    openModal('tiadakesanpositif-options-modal'); 
  
   //ya membawa positif - penambaikan keperluan asas
  } else if (!userData.perbaikikeperluanasas && userData.penambahbaikanmasadepan.trim() === 'Keperluan Asas'){
	closeModal();
    displayMessage(`En. Rem: Bahagian manakah yang perlu ditambahbaik, mengikut pilihan anda di masa akan datang?`, true);
    openModal('perbaikikeperluanasas-options-modal');
	
   //ya membawa positif - penambaikan infrastruktur
  } else if (!userData.perbaikiinfrastruktur && userData.penambahbaikanmasadepan.trim() === 'Infrastruktur'){
	closeModal();
    displayMessage(`En. Rem: Bahagian manakah yang perlu ditambahbaik, mengikut pilihan anda di masa akan datang?`, true);
    openModal('perbaikiinfrastruktur-options-modal');
	
   //ya membawa positif - penambaikan ekonomi
  } else if (!userData.perbaikiekonomi && userData.penambahbaikanmasadepan.trim() === 'Ekonomi'){
	closeModal();
    displayMessage(`En. Rem: Bahagian manakah yang perlu ditambahbaik, mengikut pilihan anda di masa akan datang?`, true);
    openModal('perbaikiekonomi-options-modal');
	
   //ya membawa positif - penambaikan perkhidmatan awam
  } else if (!userData.perbaikiperkhidmatanawam && userData.penambahbaikanmasadepan.trim() === 'Perkhidmatan Awam'){
	closeModal();
    displayMessage(`En. Rem: Bahagian manakah yang perlu ditambahbaik, mengikut pilihan anda di masa akan datang?`, true);
    openModal('perbaikiperkhidmatanawam-options-modal');
	
   //ya membawa positif - penambaikan lain-lain
  } else if (!userData.perbaikilainlain && userData.penambahbaikanmasadepan.trim() === 'Lain-lain'){
	g = 'false';
	b = 'false';
	c = 'false';
	d = 'false';
	i = 'true';
	closeModal();
    displayMessage(`En. Rem: Sila nyatakan apakah yang dapat diperbaiki di masa akan datang?`, true);
	closeModal();
	showInput();  

   //tiada kesan positif - keperluan asas
  } else if (!userData.tiadapositifkeperluanasas && userData.tiadakesanpositif.trim() === 'Keperluan Asas'){
	closeModal();
    displayMessage(`En. Rem: Sila pilih yang mana tidak memberi sebarang kesan yang positif?`, true);
    openModal('tiadapositifkeperluanasas-options-modal');
	
   //tiada kesan positif - infrastruktur
  } else if (!userData.tiadapositifinfrastruktur && userData.tiadakesanpositif.trim() === 'Infrastruktur'){
	closeModal();
    displayMessage(`En. Rem: Sila pilih yang mana tidak memberi sebarang kesan yang positif?`, true);
    openModal('tiadapositifinfrastruktur-options-modal');
	
   //tiada kesan positif - ekonomi
  } else if (!userData.tiadapositifekonomi && userData.tiadakesanpositif.trim() === 'Ekonomi'){
	closeModal();
    displayMessage(`En. Rem: Sila pilih yang mana tidak memberi sebarang kesan yang positif?`, true);
    openModal('tiadapositifekonomi-options-modal');
	
   //tiada kesan positif positif - perkhidmatan awam
  } else if (!userData.tiadapositifperkhidmatanawam && userData.tiadakesanpositif.trim() === 'Perkhidmatan Awam'){
	closeModal();
    displayMessage(`En. Rem: Sila pilih yang mana tidak memberi sebarang kesan yang positif?`, true);
    openModal('tiadapositifperkhidmatanawam-options-modal');
   
   //tiada kesan positif positif - lain-lain
  } else if (!userData.tiadapositiflainlain && userData.tiadakesanpositif.trim() === 'Lain-lain'){
	g = 'false';
	b = 'false';
	c = 'false';
	d = 'false';
    i = 'true';
	closeModal();
    displayMessage(`En. Rem: Sila nyatakan apakah yang tidak memberikan sebarang kesan yang positif?`, true);
	closeModal();
	showInput();

  //kriteria KM yang baik
  } else if (!userData.kriteriapemimpinbaik){
	closeModal();
    displayMessage(`En. Rem: Apakah ciri-ciri ketua menteri yang baik mengikut pendapat anda?`, true);
    openModal('kriteriapemimpinbaik-options-modal');

  //siapa layak memimpin sabah
  } else if (!userData.pilihanpemimpinsabah){
	closeModal();
    displayMessage(`En. Rem: Akhir sekali, pada pendapat anda siapa yang layak untuk memimpin sabah? 🤔`, true);
    openModal('pilihanpemimpinsabah-options-modal');

   //siapa layak mempimpin sabah - lain-lain
   } else if (userData.pilihanpemimpinsabah.trim() === 'Lain-lain'){
	g = 'false';
	b = 'false';
	c = 'false';
	d = 'false';
	i = 'false';
	closeModal();
    displayMessage(`En. Rem: Sila nyatakan siapakah yang layak untuk memimpin Sabah?`, true);
	//closeModal();
	showInput();   
	
  } else {
    // All information collected, finish conversation
    displayMessage(`En. Rem: Terima kasih di atas kerjasama anda dalam menyertai kaji selidik ini. Setiap butiran yang diberikan diambil maklum untuk analisa kami. Sekian dan terima kasih. Sabah maju jaya!`, true);
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
}

//SHOW DATA INPUT
function showInput() {
  userInput.style.display = 'block';
}

//EXPORT TO DATABASE BUTTON - USEFUL WHEN NO NETWORK. TO BE DONE MANUALLY BY USER (CLICK)
exportBtn.addEventListener('click', async function () {
  const tableRows = userTable.querySelectorAll('tr');
  const userDataArray = [];

  tableRows.forEach(row => {
    const columns = row.querySelectorAll('td');
    const userData = {
	  tarikh: columns[0].textContent,
      dun: columns[1].textContent,
      umur: columns[2].textContent,
      jantina: columns[3].textContent,
      agama: columns[4].textContent,
	  bangsa: columns[5].textContent,
	  tahappendidikan: columns[6].textContent,
	  pekerjaan: columns[7].textContent,
	  pendapatanbulanan: columns[8].textContent,
	  puasdgnpembangunansemasa: columns[9].textContent,
	  yapuasdgnpembangunansemasa: columns[10].textContent,    
	  tidakpuasdgnpembangunansemasa: columns[11].textContent, 
	  keperluanasaspuashati: columns[12].textContent,  
	  infrastrukturpuashati: columns[13].textContent, 
	  kebajikanpuashati: columns[14].textContent, 
	  lainlainpuashati: columns[15].textContent,
	  keperluanasastidakpuashati: columns[16].textContent, 
	  infrastrukturtidakpuashati: columns[17].textContent, 
	  kebajikantidakpuashati: columns[18].textContent,
      lainlaintidakpuashati: columns[19].textContent,	  
	  dunjalanidgnbaik: columns[20].textContent,         
	  dunmenyelesaikanmasalah: columns[21].textContent,  
	  undidun: columns[22].textContent,  
	  kmperubahanpositif: columns[23].textContent, 
	  penambahbaikanmasadepan: columns[24].textContent,
	  tiadakesanpositif: columns[25].textContent,    
	  perbaikikeperluanasas: columns[26].textContent,    
	  perbaikiinfrastruktur: columns[27].textContent,	  
	  perbaikiekonomi: columns[28].textContent,         
	  perbaikiperkhidmatanawam: columns[29].textContent,
	  perbaikilainlain: columns[30].textContent,
	  tiadapositifkeperluanasas: columns[31].textContent,
	  tiadapositifinfrastruktur: columns[32].textContent, 
	  tiadapositifekonomi: columns[33].textContent,            
	  tiadapositifperkhidmatanawam: columns[34].textContent, 
      tiadapositiflainlain: columns[35].textContent,
	  kriteriapemimpinbaik: columns[36].textContent,   
	  pilihanpemimpinsabah: columns[37].textContent,
	  pilihanpemimpinsabahlain: columns[38].textContent,
    };
    userDataArray.push(userData);
  });

  console.log('Data to export:', userDataArray);

//AFTER CLICK EXPORT TO DATABASE, DATA WILL BE POST AND SEND TO DATABASE/EXPORT//https://atiqahst-github-io.onrender.com/export
//https://dpg-cqc93d56l47c73cvsot0-a.singapore-postgres.render.com/export
  try {
    const response = await fetch('https://atiqahst-github-io.onrender.com/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDataArray)
    });
    const data = await response.text();
    
	alert(data);
    if (response.ok) {
      userTable.innerHTML = '';
      localStorage.removeItem("userData"); //REMOVE DATA FROM LOCAL STORAGE AFTER SUCCESSFULLY TRANSFERRED DATA IN DATABASE
    }
  } catch (err) {
    console.error('Error exporting data', err);
    alert('Error exporting data. Please try again later.');
  }
});

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
  const headers = ["tarikh" ,"dun", "umur", "jantina", "agama", "bangsa", "tahappendidikan", "pekerjaan", "pendapatanbulanan", "puasdgnpembangunansemasa",
  "yapuasdgnpembangunansemasa", "tidakpuasdgnpembangunansemasa","keperluanasaspuashati", "infrastrukturpuashati", "kebajikanpuashati", "lainlainpuashati",
  "keperluanasastidakpuashati", "infrastrukturtidakpuashati", "kebajikantidakpuashati", "lainlaintidakpuashati", "dunjalanidgnbaik", "dunmenyelesaikanmasalah", "undidun",
  "kmperubahanpositif", "penambahbaikanmasadepan", "tiadakesanpositif", "perbaikikeperluanasas", "perbaikiinfrastruktur", "perbaikiekonomi", 
  "perbaikiperkhidmatanawam", "perbaikilainlain", "tiadapositifkeperluanasas", "tiadapositifinfrastruktur", "tiadapositifekonomi", "tiadapositifperkhidmatanawam", 
  "tiadapositiflainlain", "kriteriapemimpinbaik", "pilihanpemimpinsabah", "pilihanpemimpinsabahlain"];
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

//FUNCTION TO INITIATE CONVERSATION TO BEGINNING
function initiateConversation() {
  userData = {
	tarikh: '',
    dun: '',
    umur: '',
    jantina: '',
    agama: '',
	bangsa: '',
	tahappendidikan: '',
	pekerjaan: '',
	pendapatanbulanan: '',
	puasdgnpembangunansemasa: '',
	yapuasdgnpembangunansemasa: '',
	tidakpuasdgnpembangunansemasa: '',
	keperluanasaspuashati: '',  
	infrastrukturpuashati: '', 
	kebajikanpuashati: '',      
	lainlainpuashati: '',
	keperluanasastidakpuashati: '', 
	infrastrukturtidakpuashati: '',
	kebajikantidakpuashati: '',
    lainlaintidakpuashati: '',    
	dunjalanidgnbaik: '',         
	dunmenyelesaikanmasalah: '',  
	undidun: '',  
	kmperubahanpositif: '', 
	penambahbaikanmasadepan: '', 
	tiadakesanpositif: '',    
	perbaikikeperluanasas: '',    
	perbaikiinfrastruktur: '',   
	perbaikiekonomi: '',         
	perbaikiperkhidmatanawam: '',
	perbaikilainlain: '',
	tiadapositifkeperluanasas: '',
	tiadapositifinfrastruktur: '', 
	tiadapositifekonomi: '',            
	tiadapositifperkhidmatanawam: '', 
    tiadapositiflainlain : '',
	kriteriapemimpinbaik: '',  
	pilihanpemimpinsabah: '',
    pilihanpemimpinsabahlain: ''	
  };
  messagesDiv.innerHTML = '';
  getCurrentDate();
  displayMessage(`En. Rem: Hi saya En. Rem, saya ingin mendapatkan sedikit maklum balas berkaitan kawasan DUN anda.`, true);
  displayMessage(`En. Rem: Jom kita mulakan dengan DUN pilihan anda. Sila pilih DUN anda:`, true, 300);
  setTimeout(function () {
      openModal('dun-options-modal'); //OPEN POP UP BOX
  }, 1000);
  showInput();
}

//AS DEFAULT, THESE 2 FUNCTIONS ARE CALLED
loadFromLocalStorage(); //LOAD DATA FROM LOCAL STORAGE -> THAT IS AVAILABLE (THIS IS USEFUL WHEN USER EXIT THEIR BROWSER AND VISIT THE WEB BACK)
initiateConversation(); //START CONVERSATION FROM BEGINNING