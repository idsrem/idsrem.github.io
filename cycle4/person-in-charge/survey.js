//importing the listOfQuestions.js file from here to reference all of the questions provided
import { surveyQuestions } from "./listOfQuestions.js";
import { enumerator } from "./enumerator.js";

document.addEventListener("DOMContentLoaded", function () {
    const surveyContainer = document.getElementById("survey-container");
    //const sound = document.getElementById("clickSound");
    let currentQuestionIndex = 0;
    let currentUserId =  ""; // Get ID if stored
    let userResponses = {};



    surveyContainer.style.width = "65%";
    surveyContainer.style.marginTop = "-10px";


    updateTodayRespondentsDisplay();

function updateClockAndSurvey() {
    const now = new Date();

    // Format time
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const timeString =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);

    document.getElementById('clock-time').textContent = timeString;
    document.getElementById('clock-date').textContent = dateString;

    //!-- REMEMEBER TO UNCOMMENT WHEN THE TIME COMES
    // Working hours logic: 8:30 AM to 5:30 PM
    const currentMinutes = hours * 60 + minutes;
    const startMinutes = 6 * 60;
    const endMinutes = 20 * 60;

    const isWithinAllowedTime = currentMinutes >= startMinutes && currentMinutes <= endMinutes;

    const surveyContainer = document.getElementById("survey-container");
    const surveyCloseModal = document.getElementById("surveyCloseModal");
    const containerView = document.querySelector(".container-view");

    if (isWithinAllowedTime) {
        //Show everything
        surveyContainer.style.display = "block";
        containerView.style.display = "flex";
        surveyCloseModal.style.display = "none";
    } else {
        // Hide entire app UI, show only pop-up
        surveyContainer.style.display = "none";
        containerView.style.display = "none";
        surveyCloseModal.style.display = "block";
    }
}

// Initial check
updateClockAndSurvey();

// Update every second
setInterval(updateClockAndSurvey, 1000);


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
  "N32 Kilas": { name: "Isnin Aliasnih", party: "GRS", photo: "adun_pictures/N32 KLIAS - ISNIN ALIASNIH.jpg" },
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

//Clock function
function updateClock() {
    const now = new Date();

    // Format time as HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Format date as DD-MM-YYYY
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    // Set content if elements exist
    const timeEl = document.getElementById('clock-time');
    const dateEl = document.getElementById('clock-date');

    if (timeEl && dateEl) {
        timeEl.textContent = formattedTime;
        dateEl.textContent = formattedDate;
    }
}

setInterval(updateClock, 1000);
updateClock();


function showIdInput() {
    const surveyContainer = document.getElementById('survey-container');
    surveyContainer.innerHTML = ""; // Clear the survey container

    const messageView = document.getElementById("message-view"); // Ensure message view is referenced

    if (!messageView) {
        console.error("message-view element not found!");
        return;
    }

    surveyContainer.style.display = "block";
    surveyContainer.innerHTML = ""; // Clear the survey container

    // Get current date
    const currentDate = new Date().toLocaleDateString('ms-MY', { // 'ms-MY' is the language/locale for Malaysia
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Create date bubble element
    const dateBubble = document.createElement("div");
    dateBubble.classList.add("system-bubble");
    dateBubble.textContent = `${currentDate}`; // Display current date
    messageView.appendChild(dateBubble);
    dateBubble.style.width = "200px";
    dateBubble.style.padding = "10px";
    dateBubble.style.borderRadius = "40px";
    dateBubble.style.fontSize = "15px";
    dateBubble.style.fontWeight = "900";
    dateBubble.style.backgroundColor = "#ffffffe1";
    dateBubble.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
    dateBubble.style.color = "#000000";
    

    // const questionText = "Sila masukkan kod anda untuk memulakan kaji selidik";
    const questionText = "Klik butang seterusnya untuk memulakan tinjauan dan menjawab soalan-soalan yang disediakan.";

    // Create question bubble element
    const questionBubble = document.createElement("div");
    questionBubble.classList.add("message-bubble", "question-bubble");
    questionBubble.textContent = questionText;
    messageView.appendChild(questionBubble);

    const questionTitle = document.createElement("p");
    questionTitle.textContent = "Klik butang seterusnya untuk memulakan tinjauan dan menjawab soalan-soalan yang disediakan.";
    questionTitle.style.textAlign = "center";
    questionTitle.style.marginTop = "35px";
    questionTitle.style.marginBottom = "10px";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.style.width = "50%";
    inputField.style.borderRadius = "10px";
    inputField.style.padding = "10px";
    inputField.style.marginBottom = "10px";
    inputField.placeholder = "Masukkan ID anda...";
    inputField.classList.add("custom-input");


    // Load userData from sessionStorage
    const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
    const autoId = userData.enumerator_code || "";  // Or fallback to userData.id or userData.name if needed

    if (autoId) {
        inputField.value = autoId;
        inputField.readOnly = true; // Prevent user from editing the input
        inputField.style.backgroundColor = "#f0f0f0";  // Light gray
        inputField.style.cursor = "not-allowed"; 
        inputField.style.display = "none";
        currentUserId = autoId;
        localStorage.setItem("currentUserId", currentUserId);
    }

    //if (currentUserId) inputField.value = currentUserId; // Auto-fill if ID exists
    if (currentUserId) {
    inputField.value = currentUserId;
    updateTodayRespondentsDisplay();
}

    const nextButton = document.createElement("button");
    nextButton.textContent = "Seterusnya";
    nextButton.classList.add("submit-button");

    nextButton.addEventListener("click", () => {
        const kodInput = inputField.value.trim();

        if (kodInput === '') {
            ///alert("Sila isi kod anda!");
            showToast("Sila isi kod anda!", "error");
            return; // If no input, alert and return
        }

        // Check if the entered code exists in the enumerator array
        //const userExists = enumerator.some(user => user.userID === kodInput);

        // if (!userExists) {
        //     // alert("ID yang dimasukkan tidak wujud. Sila semak semula.");
        //     showToast("Kod tidak dijumpai! Sila semak kembali.", "error");
        //     return; // If user doesn't exist, show an alert and return
        // }

        // If user exists, store ID and proceed
        currentUserId = kodInput;
        localStorage.setItem("currentUserId", currentUserId); // Store the ID in local storage
        // updateTodayRespondentsDisplay();
        

        if (autoId) {
        const userMessage = document.createElement("div");
        userMessage.classList.add("message-bubble", "answer-bubble");
        userMessage.innerHTML = `Anda: ${autoId}`;
        messageView.appendChild(userMessage);

        startSurvey();

        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 100);

        return; // Exit the function to skip the manual input step
    }


        // Show user input in message view
        const userMessage = document.createElement("div");
        userMessage.classList.add("message-bubble", "answer-bubble");
        userMessage.innerHTML = `Anda: ${kodInput}`; // Display the typed answer
        messageView.appendChild(userMessage);

        // Start the survey after the validation
        startSurvey();

            // Scroll to the bottom of the window after a small delay
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 100);
    });

    surveyContainer.append(questionTitle, inputField, nextButton);
}
    //When execute the web - app survey it will go to the first question.
    function startSurvey() {
        currentQuestionIndex = 0;
        showQuestion(currentQuestionIndex);
    
        // Capture start time and store it as ISO string
        let startTime = new Date();  // Capture the current date and time
        localStorage.setItem("surveyStartTime", startTime.toISOString());  // Store it as an ISO string
        document.getElementById("main-buttons-wrapper")?.remove();
        document.getElementById("green-buttons-wrapper")?.remove();
        document.getElementById("table-container")?.remove();

    }

    function showQuestion(index) { 
        const messageView = document.getElementById("message-view");
    
        // Ensure surveyContainer is reset before displaying a new question
        const surveyContainer = document.getElementById("survey-container");
        surveyContainer.innerHTML = "";
    
        // Check if the index exceeds the length of surveyQuestions (end of survey)
        if (index >= surveyQuestions.length) {
            surveyContainer.innerHTML = "<h3>Terima kasih kerana menjawab kaji selidik ini!</h3>";
            saveSurveyResponses();
            displayAllSurveyResponses(false); // Ensure the table appears
            return;
        }
    
        const question = surveyQuestions[index];
        //surveyContainer.innerHTML = ""; // Clear previous content

        if (question.text && question.text.trim() !== "") {
        const questionBubble = document.createElement("div");
        questionBubble.classList.add("message-bubble", "question-bubble");
        questionBubble.innerHTML = `<strong>Tuan Awang:</strong> ${question.text}`;
        messageView.appendChild(questionBubble);
        scrollToBottom();
    }

    
        // const questionBubble = document.createElement("div");
        // questionBubble.classList.add("message-bubble", "question-bubble");
        // questionBubble.innerHTML = `<strong>Tuan Awang:</strong> &nbsp; ${question.text}`;
        // messageView.appendChild(questionBubble);
    
        // Create answer options
        const answerContainer = document.createElement("div");
        question.options.forEach(option => {
            const label = document.createElement("label");
            label.classList.add("answer-option");
    
            const input = document.createElement("input");
            input.value = option.name;
    
            // Move to next question **only after user selects an option**
            input.addEventListener("change", () => {
                handleOptionClick(question, option, index);
            });
    
            label.appendChild(input);
            label.appendChild(document.createTextNode(option.name));
            answerContainer.appendChild(label);
            scrollToBottom();
        });
    
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("survey-question");
    
        // // Display the question image if it exists
        // if (question.picture?.trim()) {
        //     const img = document.createElement("img");
        //     Object.assign(img, {
        //         src: question.picture,
        //         alt: "IDS Logo",
        //         style: "width:30%;display:block;margin:auto;margin-bottom:10px;margin-top:-40px;"
        //     });
        //     questionDiv.appendChild(img);
        // }
    
        const textElement = document.createElement("p");
        textElement.textContent = question.text;
        questionDiv.appendChild(textElement);

        // const dunToRelevantParties = {
        //     "N22 Tanjong Aru": ["WARISAN", "PN", "PH(DAP, PKR)", "STAR", "UPKO", "ANAK NEGERI", "BEBAS", "PKDM", "PIS", "Tidak Pasti", "Lain - Lain"]
        // };
    
        // Create the Previous Button if it's not the first question
        if (index > 1) {
            const backButton = document.createElement("button");
            backButton.innerHTML = `<i class="fas fa-arrow-left" style="color: black; margin-right: 5px;"></i> Kembali`;
            backButton.classList.add("previous-button"); // Apply custom class
            backButton.addEventListener("click", () => {
                // Show a bubble message before going back
                const backBubble = document.createElement("div");
                backBubble.classList.add("previousQuestion-bubble");
                backBubble.innerHTML = ` ----- Kembali ke soalan sebelumnya. -----`;
                messageView.appendChild(backBubble);
    
                setTimeout(() => {
                    if (question.id === "jantina") {
                        showQuestion(1); // Go to the 2nd question if it's 'jantina'
                    } else if (question.id === "pemimpinSabah") {
                        showQuestion(index - 1); // Jump to appropriate question
                    } else {
                        showQuestion(index - 1); // Show the previous question
                    }
                }, 1000);
                surveyContainer.appendChild(backButton);

            });
            surveyContainer.appendChild(backButton);
        }


const dunToRelevantParties = {
  "N22 Tanjong Aru": ["WARISAN", "STAR", "PBK", "PIS", "UPKO", "BEBAS - Mohamed Zaim Ansawi", "BEBAS - Ritchie Jay Cheng", "PN", "PH - DAP", "Tidak Pasti"],
  "N56 Tanjong Papat": ["WARISAN", "PH - DAP", "PKS", "KDM", "PIS", "SAPP", "PN", "PR", "Tidak Pasti"],
  "N69 Sri Tanjong": ["WARISAN", "PH - DAP", "STAR", "PIS", "KDM", "BEBAS - Wong Su Vui", "Tidak Pasti"],
  "N21 Luyang": ["WARISAN", "PH - DAP", "SAPP", "PN", "PIS", "Tidak Pasti"],
  "N39 Tambunan": ["WARISAN", "KDM", "STAR", "GRS", "ANAK NEGERI", "PIS", "SPP", "Tidak Pasti"],
  "N52 Sungai Sibuga": ["WARISAN", "PIS", "PN", "GRS", "BN", "Tidak Pasti"],
  "N44 Tulid": ["WARISAN", "PH - PKR", "BEBAS - Edwin Laimin", "BEBAS - Clarence Carter Maraat", "PKS", "KDM", "STAR", "BEBAS - Suman @ Susunah Yasambun", "BEBAS - Jordan Jude Ellron", "RUMPUN", "PIS", "BEBAS - Engah Sintan @ Dahlan Abdullah", "UPKO", "BEBAS - Lautis @ Laulis Anggang", "Tidak Pasti"],
  "N20 Api-Api": ["WARISAN", "PH - PKR", "PBK", "PIS", "STAR", "Tidak Pasti"],
  "N19 Likas": ["WARISAN", "PIS", "PBK", "PH - DAP", "SAPP", "PKS", "Tidak Pasti"],
  "N72 Merotai": ["WARISAN", "PH - PKR", "PIS", "PN", "Tidak Pasti"],
  "N34 Lumadan": ["WARISAN", "KDM", "STAR", "GRS", "BN", "PIS", "Tidak Pasti"],
  "N23 Petagas": ["WARISAN", "ANAK NEGERI", "PN", "UPKO", "BEBAS - Patrick @ Peter Manius", "PH - PKR", "BEBAS - Awang Ahmad Sah", "KDM", "STAR", "PIS", "Tidak Pasti"],
  "N48 Sugut": ["WARISAN", "PN", "BEBAS - Roger Langgau", "PIS", "PPRS", "BN", "GRS", "Tidak Pasti"],
  "N49 Labuk": ["WARISAN", "PN", "ANAK NEGERI", "PIS", "GRS", "UPKO", "BN", "KDM", "Tidak Pasti"],
  "N14 Tamparuli": ["WARISAN", "STAR", "ANAK NEGERI", "BEBAS - Andrew Mali", "BEBAS - Vun Yun Fook", "BEBAS - Johan Jahid", "BEBAS - Samson S.koroh @ Razali Suffian", "BEBAS - Raymond Alfred @ Jenry","UPKO", "PIS", "RUMPUN", "KDM", "GRS", "Tidak Pasti"],
  "N61 Segama": ["WARISAN", "PIS", "BEBAS - Alif Afiandy Ali", "BEBAS - Datuk Mohamaddin Ketapi", "BEBAS - Norman Kasimin", "PH - PKR", "SAPP", "Tidak Pasti"],
  "N40 Bingkor": ["WARISAN", "GAS", "UPKO", "GRS", "PKS", "PIS", "KDM", "BEBAS - Ahamin Salim", "STAR", "SPP", "Tidak Pasti"],
  "N32 Klias": ["WARISAN", "PKS", "BEBAS - Edwin Louis", "PN", "PPRS", "KDM", "PIS", "GRS", "BN", "Tidak Pasti"],
  "N4 Tanjong Kapor": ["WARISAN", "BN", "BEBAS - Abdul Rahim Madtaip", "BEBAS - Datuk Verdon Bahanda", "ANAK NEGERI", "PBK", "PIS", "SPP", "GRS", "PN", "STAR", "Tidak Pasti"],
  "N2 Bengkoka": ["WARISAN", "GRS", "STAR", "PIS", "BEBAS - KPD Oding", "BN", "UPKO", "PN", "KDM", "PBK", "BEBAS - Jomin @ Munir Mogompit @ Magempit", "Tidak Pasti"],
  "N3 Pitas": ["WARISAN", "BEBAS - Mohammad Noor Nazri Santong", "PIS", "GRS", "KDM", "BN", "Tidak Pasti"],
  "N5 Matunggong": ["WARISAN", "PKS", "BEBAS - Ainin Ekon", "KDM", "PIS", "GRS", "Tidak Pasti"],
  "N33 Kuala Penyu": ["WARISAN", "PIS", "BN", "STAR", "GRS", "PKS", "Tidak Pasti"],
  "N15 Kiulu": ["WARISAN", "KDM", "PKS", "ANAK NEGERI", "GRS", "UPKO", "PIS", "STAR", "Tidak Pasti"],

  "N26 Moyog": ["WARISAN", "PH - PKR", "STAR", "KDM", "GRS", "PBK", "BEBAS - Ricky Chang Onn Pin @ Ricky Richard", "PKS", "PN", "UPKO", "PIS", "BEBAS - Peter Maurice Lidadun", "Tidak Pasti"],
  "N25 Kapayan": ["WARISAN", "ANAK NEGERI", "PH - DAP", "PIS", "KDM", "ASPIRASI", "BEBAS - Sabaria @ Sabariah Aziz", "PBK", "STAR", "UPKO", "BEBAS - Len Lip Fong @ Land Lip Fong", "BEBAS - Cyril Gerald Liew @ Cyril Gerald Austin", "Tidak Pasti"],
  "N70 Kukusan": ["WARISAN", "BEBAS - Rina Jainal", "BEBAS - Hairul Amin Arif", "PN", "PIS", "PPRS", "ANAK NEGERI", "BN", "GRS", "STAR", "Tidak Pasti"],
  "N71 Tanjung Batu": ["WARISAN", "PN", "BN", "PIS", "GRS", "Tidak Pasti"],
  "N73 Sebatik": ["WARISAN", "ANAK NEGERI", "BEBAS - Husni Frans", "GRS", "PN", "BN", "STAR", "PIS", "RUMPUN", "PPRS", "Tidak Pasti"],
  "N51 Sungai Manila": ["WARISAN", "PIS", "PN", "BN", "PPRS", "GRS", "Tidak Pasti"],
  "N11 Kadamaian": ["WARISAN", "UPKO", "PBM", "PIS", "GRS", "STAR", "KDM", "ANAK NEGERI", "Tidak Pasti"],
  "N13 Pantai Dalit": ["WARISAN", "PN","GRS", "STAR", "KDM", "PIS", "BN", "Tidak Pasti"],
  "N43 Kemabong": ["WARISAN", "PH - DAP", "PPRS", "PIS", "BEBAS - Petrus Yahya", "STAR", "KDM", "GRS", "BN", "Tidak Pasti"],
  "N42 Melalap": ["WARISAN", "KDM", "PH - PKR", "STAR", "BEBAS - Gabriel George Tulas", "UPKO", "PIS", "BEBAS - Fatimah Ibrahim","Tidak Pasti"],
  "N16 Karambunai": ["WARISAN", "BN", "PBK", "PKS", "GAS", "GRS", "SPP", "PN", "STAR", "PERPADUAN", "PIS","Tidak Pasti"],
  "N63 Kunak": ["WARISAN", "BN", "PPRS", "PIS", "PN", "GRS", "Tidak Pasti"],
  "N18 Inanam": ["WARISAN", "RUMPUN", "PBK", "BEBAS - Shone Elric Jr. Majimbun", "KDM", "STAR", "UPKO", "GAS", "PH", "PR", "BEBAS - Roland Chia Ming Shen", "PIS", "ANAK NEGERI", "Tidak Pasti"],
  "N6 Bandau": ["WARISAN", "GRS", "UPKO", "BEBAS - Datuk Dr. Maijol Mahap", "BN", "PKS", "PIS", "KDM", "ASPIRASI", "STAR", "PBK", "PH", "BEBAS - Jolius Majawai", "Tidak Pasti"],
}


if (question.id === "cenderungUntukUndi") {
    const currentSurvey = JSON.parse(localStorage.getItem("currentSurvey")) || { answers: {} };
    const selectedDun = currentSurvey.answers?.dun?.trim();

    console.log("Selected DUN =", selectedDun);

    // Remove **all existing** "cenderungUntukUndi" questions
    document.querySelectorAll('.survey-question[data-qid="cenderungUntukUndi"]').forEach(el => el.remove());

    const relevantParties = dunToRelevantParties[selectedDun];

    if (relevantParties && relevantParties.length > 0) {
        // Render filtered question
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("survey-question");
        questionDiv.setAttribute("data-qid", "cenderungUntukUndi");

        const questionText = document.createElement("p");
        questionText.textContent = question.text;
        questionDiv.appendChild(questionText);

        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("survey-options");

        const questionIndex = surveyQuestions.findIndex(q => q.id === question.id);

        relevantParties.forEach(optionName => {
            const btn = document.createElement("button");
            btn.textContent = optionName;
            btn.style.backgroundColor = "#2B6290";
            btn.style.fontWeight = "800";
            btn.style.borderRadius = "30px";
            btn.setAttribute("data-value", optionName);
            btn.addEventListener("click", () => handleOptionClick(question, { name: optionName }, questionIndex));
            optionsContainer.appendChild(btn);

            if (optionName === "Tidak Pasti") {
            btn.style.backgroundColor = "#A9A9A9"; // light gray            // black text // optional
        }
        });

        questionDiv.appendChild(optionsContainer);
        surveyContainer.appendChild(questionDiv);

        return; 
    }
}



// function normalizeKey(s) {
//   return (s || "")
//     .toString()
//     .trim()
//     .toLowerCase()
//     .replace(/[\(\)\-]/g, "")     // remove () and -
//     .replace(/\s+/g, " ")         // collapse multiple spaces
//     .replace(/[^a-z0-9 ]/g, "");  // remove non-alphanumerics except space
// }

// function buildDunLookup(map) {
//   const lookup = {};
//   Object.keys(map).forEach(rawKey => {
//     const val = map[rawKey];
//     const fullKey = normalizeKey(rawKey);

//     // exact name
//     lookup[fullKey] = val;

//     // code only (N22)
//     const codeMatch = rawKey.match(/^(n\d+)/i);
//     if (codeMatch && codeMatch[1]) {
//       lookup[normalizeKey(codeMatch[1])] = val;
//     }

//     // name only (Tanjong Aru)
//     const nameOnly = fullKey.replace(/^n\d+\s*/, "");
//     lookup[nameOnly] = val;
//   });

//   return lookup;
// }


// const dunLookup = buildDunLookup(dunToRelevantParties);
// console.log("DEBUG: dunLookup keys:", Object.keys(dunLookup));

// if (question.id === "cenderungUntukUndi") {
//   // Safe parse
//   let currentSurvey = { answers: {} };
//   try { currentSurvey = JSON.parse(localStorage.getItem("currentSurvey")) || { answers: {} }; }
//   catch (e) { console.warn("Failed parse currentSurvey:", e); }

//   const selectedDunRaw = currentSurvey.answers?.dun || "";
//   console.log("DEBUG: selectedDunRaw (from localStorage) =", selectedDunRaw);

//   const candidates = [];
//   if (selectedDunRaw) {
//     candidates.push(normalizeKey(selectedDunRaw)); // e.g. "n22 tanjong aru"
//     const codeMatch = selectedDunRaw.match(/^(n\d+)/i);
//     if (codeMatch && codeMatch[1]) candidates.push(normalizeKey(codeMatch[1])); // e.g. "n22"
//   }
//   console.log("DEBUG: candidates for lookup =", candidates);

//   let relevantPartyNames = null;
//   for (const c of candidates) {
//     if (dunLookup[c]) {
//       relevantPartyNames = dunLookup[c];
//       console.log("DEBUG: matched lookup key:", c, "->", relevantPartyNames);
//       break;
//     }
//   }

//   // Normalize default question.options into {name:...}
//   const defaultOptions = Array.isArray(question.options)
//     ? question.options.map(opt => (typeof opt === "string" ? { name: opt } : opt))
//     : [];

//   const optionsToUse = (Array.isArray(relevantPartyNames) && relevantPartyNames.length)
//     ? relevantPartyNames.map(p => ({ name: p }))
//     : defaultOptions;

//   // Remove any previously rendered question with same id to avoid duplicates
//   const prev = document.querySelector(`.survey-question[data-qid="${question.id}"]`);
//   if (prev) {
//     console.log("DEBUG: removing previously rendered question node for", question.id);
//     prev.remove();
//   }

//   // Render question wrapper with data-qid so next time we can find it
//   const questionDiv = document.createElement("div");
//   questionDiv.classList.add("survey-question");
//   questionDiv.setAttribute("data-qid", question.id);

//   const questionText = document.createElement("p");
//   questionText.textContent = question.text || "Parti mana anda akan undi (DUN)?";
//   questionDiv.appendChild(questionText);

//   const optionsContainer = document.createElement("div");
//   optionsContainer.classList.add("survey-options");

//   optionsToUse.forEach(option => {
//     const btn = document.createElement("button");
//     btn.type = "button";
//     btn.textContent = option.name;
//     btn.setAttribute("data-value", option.name);
//     btn.addEventListener("click", () => handleAnswer(question.id, option.name));
//     optionsContainer.appendChild(btn);
//   });

//   questionDiv.appendChild(optionsContainer);

//   // Append to your container (adjust id/class to match your app)
//   const target = document.getElementById("questions") || document.body;
//   if (target === document.body) {
//     console.warn("DEBUG: survey container not found; appended to document.body. Replace with your actual container.");
//   }
//   target.appendChild(questionDiv);

//   // Final debug: list what was rendered
//   console.log("DEBUG: rendered options:", optionsToUse.map(o => o.name));
// }


        if (question.id === "mengundiAdun") {
            const currentSurvey = JSON.parse(localStorage.getItem("currentSurvey")) || { answers: {} };
            const selectedDun = currentSurvey.answers?.dun?.trim();

            console.log("Re-fetched selectedDun:", selectedDun);

            const questionDiv = document.createElement("div");
            questionDiv.classList.add("survey-question");

            const adunInfo = dunToAdun[selectedDun];

    // // Check if selectedDun exists, adunInfo is found, and both name & party are valid
    // if (
    //     selectedDun &&
    //     adunInfo &&
    //     adunInfo.name?.trim() &&
    //     adunInfo.party?.trim()
    // ) {
    //     // Construct question text
    //     const questionText = `Adakah anda akan mengundi ADUN <strong>${adunInfo.name}</strong> dari parti <strong>${adunInfo.party}</strong>?`;

    //     // Add text to questionDiv
    //     const text = document.createElement("p");
    //     text.innerHTML = questionText;
    //     questionDiv.appendChild(text);

    //     // Create message bubble
    //     const adunBubble = document.createElement("div");
    //     adunBubble.classList.add("message-bubble", "question-bubble");
    //     adunBubble.style.maxWidth = "300px";
    //     adunBubble.innerHTML = `<strong>Tuan Awang:</strong> ${questionText}`;

    //     // Create and append image
    //     const bubbleImg = document.createElement("img");
    //     bubbleImg.src = adunInfo.photo;
    //     bubbleImg.alt = adunInfo.name;
    //     bubbleImg.style.maxWidth = "100%";
    //     bubbleImg.style.margin = "10px auto 0";
    //     bubbleImg.style.borderRadius = "8px";
    //     bubbleImg.style.display = "block";

    //     adunBubble.appendChild(bubbleImg);
    //     messageView.appendChild(adunBubble);
    //     scrollToBottom();
    // } else {
    //     // Fallback message if no valid DUN or missing ADUN info
    //     questionDiv.innerHTML = "";
    //     const fallback = document.createElement("p");
    //     fallback.textContent = "Sila pilih kawasan DUN anda terlebih dahulu sebelum meneruskan.";
    //     questionDiv.appendChild(fallback);
    // }

    // surveyContainer.appendChild(questionDiv);
}

            if (question.id === "kerajaanSemasa") {
                questionDiv.innerHTML = ""; // Clear existing content

                const fallback = document.createElement("p");
                fallback.innerHTML = `Kategori manakah kerajaan negeri <span style="color:#C9980B; font-weight:bold;">semasa</span> telah menambah baik kualiti kehidupan rakyat Sabah?`;
                questionDiv.appendChild(fallback);
            }


            // if (question.id === "kerajaanSemasa"){
            //     // questionDiv
            //     // const text = document.createElement("p");
            //     // text.innerHTML = `Kategori manakah kerajaan negeri <span style="color:gold; font-weight:bold;">semasa</span> telah menambah baik kualiti kehidupan rakyat Sabah?`;
            //     // questionDiv.appendChild(text);


            //     questionDiv.innerHTML = "";
            //     const fallback = document.createElement("p");
            //     fallback.textContent = "Kategori manakah kerajaan negeri <span style="color:gold; font-weight:bold;">semasa</span> telah menambah baik kualiti kehidupan rakyat Sabah?";
            //     questionDiv.appendChild(fallback);
            // }

            if (question.id === "mengundiAdun") {
                const currentSurvey = JSON.parse(localStorage.getItem("currentSurvey")) || { answers: {} };
                const selectedDun = currentSurvey.answers?.dun?.trim();

                console.log("Re-fetched selectedDun:", selectedDun);

                const questionDiv = document.createElement("div");
                questionDiv.classList.add("survey-question");

                if (selectedDun && dunToAdun[selectedDun]) {
                    const adunInfo = dunToAdun[selectedDun];

                    questionDiv.innerHTML = "";

                    const adunImg = document.createElement("img");
                    adunImg.src = adunInfo.photo;
                    adunImg.alt = adunInfo.name;
                    adunImg.style.maxWidth = "200px";
                    adunImg.style.marginTop = "5px";
                    adunImg.style.borderRadius = "8px";
                    questionDiv.appendChild(adunImg);

                    const text = document.createElement("p");
                    text.innerHTML = `Adakah anda akan mengundi ADUN <strong>${adunInfo.name}</strong> dari parti <strong>${adunInfo.party}</strong>?`;
                    questionDiv.appendChild(text);

                    const adunBubble = document.createElement("div");
                    adunBubble.classList.add("message-bubble", "question-bubble");
                    adunBubble.style.maxWidth = "300px";
                    adunBubble.innerHTML = `<strong>Tuan Awang:</strong> Adakah anda akan mengundi ADUN <strong>${adunInfo.name}</strong> dari parti <strong>${adunInfo.party}</strong>?`;

                    
                    const bubbleImg = document.createElement("img");
                    bubbleImg.src = adunInfo.photo;
                    bubbleImg.alt = adunInfo.name;
                    bubbleImg.style.maxWidth = "100%";
                    bubbleImg.style.margin = "10px auto 0";
                    bubbleImg.style.borderRadius = "8px";
                    bubbleImg.style.display = "block";
                    

                    adunBubble.appendChild(bubbleImg);
                    messageView.appendChild(adunBubble);
                    scrollToBottom();
                } else {
                    questionDiv.innerHTML = "";
                    const fallback = document.createElement("p");
                    fallback.textContent = "Sila pilih kawasan DUN anda terlebih dahulu sebelum meneruskan.";
                    questionDiv.appendChild(fallback);
                }

                surveyContainer.appendChild(questionDiv);
            }

    
        // Other code handling question rendering like age input, options buttons, etc.
        if (question.id === "umur") {
            showAgeInput(question.text, question.id, index + 1);
        }


        else if (question.type === "multiselect") {
    const checkboxesDiv = document.createElement("div");
    checkboxesDiv.classList.add("options-checkboxes");
      

    let currentSurvey = JSON.parse(localStorage.getItem("currentSurvey")) || { answers: {} };

    if (!Array.isArray(currentSurvey.answers[question.id])) {
        currentSurvey.answers[question.id] = [];
    }

    // Create the "Seterusnya" button
    const nextButton = document.createElement("button");
    nextButton.style.marginTop = "30px";
    nextButton.textContent = "Seterusnya";
    nextButton.classList.add("survey-option");
    nextButton.disabled = true; // Disabled by default

    nextButton.addEventListener("click", () => {
        showQuestion(index + 1);
    });

    // Function to check if at least one checkbox is checked
    function updateButtonState() {
        const anyChecked = checkboxesDiv.querySelectorAll('input[type="checkbox"]:checked').length > 0;
        nextButton.disabled = !anyChecked;
    }

    // Build checkboxes
    question.options.forEach(option => {
        const label = document.createElement("label");
        label.classList.add("answer-option");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.value = option.name;

        input.checked = currentSurvey.answers[question.id].includes(option.name);

        input.addEventListener("change", (e) => {
            let updatedSurvey = JSON.parse(localStorage.getItem("currentSurvey")) || { answers: {} };

            if (!Array.isArray(updatedSurvey.answers[question.id])) {
                updatedSurvey.answers[question.id] = [];
            }

            if (e.target.checked) {
                if (!updatedSurvey.answers[question.id].includes(option.name)) {
                    updatedSurvey.answers[question.id].push(option.name);
                }
            } else {
                updatedSurvey.answers[question.id] = updatedSurvey.answers[question.id].filter(
                    item => item !== option.name
                );
            }

            localStorage.setItem("currentSurvey", JSON.stringify(updatedSurvey));

            updateButtonState(); //Check after any change
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(option.name));
        checkboxesDiv.appendChild(label);
    });

    // Call it once initially in case there's already a selection saved
    updateButtonState();

    surveyContainer.append(questionDiv, checkboxesDiv, nextButton);
}



//         else if (question.type === "multiselect") {
//             const checkboxesDiv = document.createElement("div");
//             checkboxesDiv.classList.add("options-checkboxes");

//             let currentSurvey = JSON.parse(localStorage.getItem("currentSurvey")) || { answers: {} };

// // Make sure it's always an array to begin with
// if (!Array.isArray(currentSurvey.answers[question.id])) {
//     currentSurvey.answers[question.id] = [];
// }

// question.options.forEach(option => {
//     const label = document.createElement("label");
//     label.classList.add("answer-option");

//     const input = document.createElement("input");
//     input.type = "checkbox";
//     input.value = option.name;

//     // Always get the current array from storage (prevents stale data)
//     input.checked = currentSurvey.answers[question.id].includes(option.name);

//     input.addEventListener("change", (e) => {
//         let updatedSurvey = JSON.parse(localStorage.getItem("currentSurvey")) || { answers: {} };

//         if (!Array.isArray(updatedSurvey.answers[question.id])) {
//             updatedSurvey.answers[question.id] = [];
//         }

//         if (e.target.checked) {
//             if (!updatedSurvey.answers[question.id].includes(option.name)) {
//                 updatedSurvey.answers[question.id].push(option.name);
//             }
//         } else {
//             updatedSurvey.answers[question.id] = updatedSurvey.answers[question.id].filter(
//                 item => item !== option.name
//             );
//         }

//         localStorage.setItem("currentSurvey", JSON.stringify(updatedSurvey));
//         console.log("Updated answers:", updatedSurvey.answers[question.id]);
//     });

//     label.appendChild(input);
//     label.appendChild(document.createTextNode(option.name));
//     checkboxesDiv.appendChild(label);
// });


//            // const currentSurvey = JSON.parse(localStorage.getItem("currentSurvey")) || { answers: {} };

//             // const selectedValues = currentSurvey.answers[question.id] || [];

//             // question.options.forEach(option => {
//             //     const label = document.createElement("label");
//             //     label.classList.add("answer-option");

//             //     const input = document.createElement("input");
//             //     input.type = "checkbox";
//             //     input.value = option.name;
//             //     input.checked = selectedValues.includes(option.name);

//             //     input.addEventListener("change", (e) => {
//             //         const checked = e.target.checked;
//             //         let updatedValues = [...selectedValues];

//             //         if (checked) {
//             //             updatedValues.push(option.name);
//             //         } else {
//             //             updatedValues = updatedValues.filter(item => item !== option.name);
//             //         }

//             //         currentSurvey.answers[question.id] = updatedValues;
//             //         localStorage.setItem("currentSurvey", JSON.stringify(currentSurvey));
//                 //});

//                 // label.appendChild(input);
//                 // label.appendChild(document.createTextNode(option.name));
//                 // checkboxesDiv.appendChild(label);
//             //});

//             // Add a "Next" button to proceed
//             const nextButton = document.createElement("button");
//             nextButton.textContent = "Seterusnya";
//             nextButton.classList.add("survey-option");
//             nextButton.addEventListener("click", () => {
//                 showQuestion(index + 1);
//             });

//             surveyContainer.append(questionDiv, checkboxesDiv, nextButton);
//         }

    
        else {
            const optionsDiv = document.createElement("div");
            optionsDiv.classList.add("options-container");
    
            question.options.forEach(option => {
                const button = document.createElement("button");
    
                // Handle question-specific button styling and behavior
                if (question.id === "parlimen" && option.code) {
                    button.textContent = `${option.name} (${option.code})`; // Show name + code
                } else if (option.name === "Lain - Lain") {
                    button.classList.add("lain-lain-option");
                    button.textContent = "Lain - Lain";

                } else if (option.name === "Mula Survey") {
                    button.style.backgroundColor = "#339A00";
                    button.style.color = "#FFFFFF";
                    button.style.display = "flex";
                    button.style.alignItems = "center";
                    button.style.justifyContent = "center"; 
                    button.style.marginLeft = "auto";
                    button.style.marginRight = "auto"; 


                    const icon = document.createElement("i");
                    icon.className = "fas fa-arrow-circle-right";
                    icon.style.marginLeft = "8px";                 
                    icon.style.fontSize = "20px";                    
                    button.appendChild(document.createTextNode("Mula Survey"));
                    button.appendChild(icon);


                } else if (option.name === "Semua Yang Tertera") {
                    button.style.backgroundColor = "#339A00";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Semua Yang Tertera";

                } else if (option.name === "Tiada") {
                    button.style.backgroundColor = "#ff0000ff";
                    button.style.color = "#FFFFFF";
                     button.innerHTML = "Tiada";

                } else if (option.name === "Ya" && question.id === "mengundiAdun") {
                    button.style.backgroundColor = "#339A00";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Ya";

                }else if (option.name === "Tidak" && question.id === "mengundiAdun") {
                    button.style.backgroundColor = "#ff0000ff";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Tidak";

                }else if (option.name === "Ya" && question.id === "pilihanRaya") {
                    button.style.backgroundColor = "#339A00";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Ya";

                }else if (option.name === "Tidak" && question.id === "pilihanRaya") {
                    button.style.backgroundColor = "#ff0000ff";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Tidak";

                }else if (option.name === "Perempuan" && question.id === "jantina") {
                    button.style.backgroundColor = "#ca0061ff";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Perempuan";

                }else if (option.name === "Parti" && question.id === "mengundiBedasarkan") {
                    button.style.backgroundColor = "#2563eb";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Parti";
                
                }else if (option.name === "Calon" && question.id === "mengundiBedasarkan") {
                    button.style.backgroundColor = "#22c55e";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Calon";

                }else if (option.name === "Isu" && question.id === "mengundiBedasarkan") {
                    button.style.backgroundColor = "#f97316";
                    button.style.color = "#000000";
                    button.innerHTML = "Isu";

                }else if (option.name === "Parti Lain" && question.id === "pemimpinSabah") {
                    button.style.backgroundColor = "#2563eb";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Parti Lain";
                
                }else if (option.name === "Parti/Gabungan Lain" && question.id === "pemimpinSabah") {
                    button.style.backgroundColor = "#475569";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Parti/Gabungan Lain";
                                
                }else if (option.name === "Tidak Pasti" && question.id === "pemimpinSabah") {
                    button.style.backgroundColor = "#CBD5E1";
                    button.style.color = "#000000";
                    button.innerHTML = "Tidak Pasti";

                }else if (option.name === "Iya, (isi kaji selidik yang baru)" && question.id === "isiBorangLagi") {
                    button.style.backgroundColor = "#339A00";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Iya, (isi kaji selidik yang baru)";
                    requestLocation();

                }else if (option.name === "Tidak, (Sesi ditamatkan)" && question.id === "isiBorangLagi") {
                    button.style.backgroundColor = "#ff0000ff";
                    button.style.color = "#FFFFFF";
                    button.innerHTML = "Tidak, (Sesi ditamatkan)";
                }
                else if (option.name === "Tidak Pasti" && question.id === "cenderungUntukUndi") {
                    button.style.backgroundColor = "#CBD5E1";
                    button.style.color = "#000000";
                    button.innerHTML = "Tidak Pasti";
                }
                else {
                    button.textContent = option.name || option.code;
                }
    
                button.classList.add("survey-option");
                button.addEventListener("click", () => handleOptionClick(question, option, index));
                optionsDiv.appendChild(button);
            });
    
            surveyContainer.append(questionDiv, optionsDiv);
        }
    }
    
    window.onload = function(){
        hideLoadingScreen();
    }
    

    function showAnswerInMessageView(answer) {
        const messageView = document.getElementById("message-view");

        // Create an answer bubble
        const answerBubble = document.createElement("div");
        answerBubble.classList.add("message-bubble", "answer-bubble");
        answerBubble.innerHTML = `<strong>Anda: </strong> &nbsp; ${answer}`;
    
        // Append answer to message view
        messageView.appendChild(answerBubble);
    
    }

    // Function to increment the total respondent count
    function incrementRespondentCount() {
        let totalRespondents = parseInt(localStorage.getItem('totalRespondents')) || 0;

        // Increment the total respondent count by 1
        totalRespondents++;

        // Save the updated count back to localStorage
        localStorage.setItem('totalRespondents', totalRespondents);
    }

async function updateTodayRespondentsDisplay() {
    const kod = localStorage.getItem("currentUserId");
    if (!kod) return;

    const todayDate = getFormattedTodayDate(); // DD/MM/YYYY

    try {
        const response = await fetch(`https://atiqahst-github-io.onrender.com/respondents/count?kod=${kod}&date=${todayDate}`);
        if (!response.ok) throw new Error("Failed to fetch count");

        const data = await response.json();
        const count = data.count || 0;

        const readableDate = new Date().toLocaleDateString('ms-MY', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        document.getElementById("todayRespondents").innerHTML = 
            `Dikemaskini setakat (${readableDate}) - <span style="color: #007BFF; font-weight: bold;">${count} Responden</span>`;

    } catch (err) {
        console.error("Error fetching respondents count:", err);
    }
}

// Update the UI on page load
document.addEventListener("DOMContentLoaded", updateTodayRespondentsDisplay);


    function handleOptionClick(question, option, index) {

        showAnswerInMessageView(option.name);
        userResponses[question.id] = option.name;
    
        console.log("User Responses: ", userResponses); // Check if it gets added here
        console.log(option.name);
    
        // Get the current date in 'YYYY-MM-DD' format for storage
        const currentDate = new Date().toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    

        //This applies for any question that has the "Lain - Lain" option.
        // if(option.name === "Lain - Lain") {

        //     if (question.id == "partiNasional" || question.id == "partiTempatan"){
        //         showQuestion(index + 1);
        //         handleAnswer(question.id, option);

        //     }
        //     else{
        //     showInputField(question.text, question.id, index + 1);
        //     }
        // }

        if (question.id === "bangsa" && option.name === "Lain - Lain"){
            showBangsaLainInput(question.text, question.id, index + 1);
        }


        else if (question.id === "mengundiAdun" && option.name === "Tidak Pasti"){
            showAdunLainInput(question.text, question.id, index + 1);
        }
      
        else if (question.id === "zon") {
         handleAnswer(question.id, option);
    
        const parlimenQuestion = surveyQuestions.find(q => q.id === "parlimen");
    
            if (parlimenQuestion && parlimenQuestion.options) {
                const filteredParliaments = parlimenQuestion.options.filter(p => option.parlimenCodes.includes(p.code));
                if (filteredParliaments.length > 0) {
                    showFilteredParliments(filteredParliaments, index + 1);
                } else {
                    alert("Tiada parlimen dalam zon ini.");
                }
            } else {
                console.error("Parlimen question or options not found in surveyQuestions.");
            }
    
        } else if (question.id === "parlimen") {
            handleAnswer(question.id, option);
            showDUNOptions(option.dun, index + 1);

        }
        
        else if (option.name.toLowerCase() === "iya, (isi kaji selidik yang baru)") {
            // When the user chooses to redo the survey, do not reset the total respondents.
            saveSurveyResponses();
            incrementRespondentCount();
            requestLocation();
    
            // Set the start time for the new survey
            let newStartTime = new Date();
            localStorage.setItem("surveyStartTime", newStartTime.toISOString()); // Store new start time
    
            // Show the "Redo Survey" bubble
            const messageView = document.getElementById("message-view");
    
            const endSurveyBubble = document.createElement("div");
            endSurveyBubble.classList.add("system-bubble");
            endSurveyBubble.innerHTML = `----- Membuat Survey Lagi Sekali -----`;
    
            messageView.appendChild(endSurveyBubble);
    
            // Re-initialize the survey form
            currentQuestionIndex = 0;
            showQuestion(currentQuestionIndex);
    
        } else if (option.name.toLowerCase() === "tidak, (sesi ditamatkan)") {

            localStorage.setItem("surveyCompleted", "true");

            // When the user finishes the survey, properly increment and show the count.
            saveSurveyResponses();
            
            // Increment total respondents count
            // incrementRespondentCount();
        
            // Retrieve and increment the current day's respondent count
            let currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
            let currentRespondents = localStorage.getItem(`respondents_${currentDate}`);
            currentRespondents = currentRespondents ? parseInt(currentRespondents, 10) : 0;
            // currentRespondents++; // Increment for today's respondent
        
            // Save the updated count for today's survey responses
            localStorage.setItem(`respondents_${currentDate}`, currentRespondents);
            updateTodayRespondentsDisplay();
        
            // Calculate total respondents over the last 31 days
            let totalRespondentsAllDays = 0;
            for (let i = 0; i < 31; i++) {
                const dateToCheck = new Date();
                dateToCheck.setDate(dateToCheck.getDate() - i);
                const dateKey = dateToCheck.toISOString().split('T')[0];
                const dailyRespondents = localStorage.getItem(`respondents_${dateKey}`);
                if (dailyRespondents) {
                    totalRespondentsAllDays += parseInt(dailyRespondents, 10);
                }
            }
        
            console.log("Total respondents in the last 31 days: ", totalRespondentsAllDays);
        
            // Display an alert
            // alert("Respon anda telah disimpan! Terima kasih!😊");
            // Show custom modal
            document.getElementById("customModal").style.display = "block";

        
            // Show the "End of Survey" bubble
            const messageView = document.getElementById("message-view");
        
            // Create the "End of Survey" message bubble
            const endSurveyBubble = document.createElement("div");
            endSurveyBubble.classList.add("surveyFinish-bubble");
            endSurveyBubble.innerHTML = `----- Selesai Mengisi Kaji Selidik -----`;
        
            // Create the "Total Respondents" message bubble
            const totalRespondentsBubble = document.createElement("div");
            totalRespondentsBubble.classList.add("system-bubble");
            totalRespondentsBubble.innerHTML = `Jumlah responden hari ini: ${currentRespondents}`;
            //This hides the bubble where by removing this function will affect the code for now
            totalRespondentsBubble.style.display = "none";
        
            // Append the bubbles to the message view
            messageView.appendChild(endSurveyBubble);
            messageView.appendChild(totalRespondentsBubble);
        
            // Ensure the view scrolls to the bottom after appending the messages
            scrollToBottom();
        
            // Log the stored data
            console.log("All survey data has been stored");
        
            // Show a thank-you message and end the survey
            surveyContainer.innerHTML = "<h3><strong>Terima kasih diatas kerjasama anda dalam menyertai kaji selidik ini! <br>Sekian dan Terima Kasih. <br><br> SABAH MAJU JAYA!<br><br> </strong> </h3>";

            displayAllSurveyResponses(true);  // Display survey responses (optional)
        
            // Optionally restart the survey
            //redoSurvey();  // Restart the survey (if needed)
        }
         else if (question.id === "cenderungUntukMengundi") {
            userResponses[question.id] = option.name;  // Explicitly store response
            console.log("User Responses Updated: ", userResponses);
    
            // // Custom flow based on user selection
            // if (option.name === "Parti Nasional") {
            //     showQuestion(index + 1);
            // } else if (option.name === "Parti Tempatan") {
            //     showQuestion(index + 2);
            // } else if (option.name === "Tidak Pasti") {
            //     showQuestion(index + 3);
            // }
    
        // } else if (option.name === "Tidak") {
        //     showInputField(question.text, question.id, index + 1);

         } else {
            handleAnswer(question.id, option);
            question.id === "parlimen" && option.dun ? showDUNOptions(option.dun, index + 1) : showQuestion(index + 1);
        }
    
    }

    function displayTotalRespondents() {
        // Retrieve the survey responses from localStorage
        const surveyResponses = JSON.parse(localStorage.getItem('allSurveyResponses')) || [];
    
        // Count the number of respondents (excluding the header row or empty responses)
        const totalRespondents = surveyResponses.length;
    
        console.log("Total Respondents (from localStorage):", totalRespondents);  // Debugging log
    
        // Ensure the survey container exists
        const surveyContainer = document.getElementById("survey-container");
    
        if (!surveyContainer) {
            console.error("surveyContainer not found!");
            return;
        }
    
        // Set the appropriate message based on the number of respondents
        let totalRespondentsMessage = '';
        if (totalRespondents === 0) {
            totalRespondentsMessage = `
                <div class="overallTotalRespondents-bubble">
                    <strong>Tak Ada Responden Yet</strong>
                </div>`;
        } else if (totalRespondents === 1) {
            totalRespondentsMessage = `
                <div class="overallTotalRespondents-bubble">
                    <strong>Jumlah Responden: </strong> &nbsp; 1 Responden
                </div>`;
        } else {
            totalRespondentsMessage = `
                <div class="overallTotalRespondents-bubble">
                    <strong>Jumlah Responden: </strong> &nbsp; ${totalRespondents} Responden
                </div>`;
        }
    
        // Append the total respondents message to the survey container
        surveyContainer.innerHTML += totalRespondentsMessage;
    
        // Optionally scroll to the bottom
        scrollToBottom();
    }

    //Automatically scroll down if the message contact surpasses the height pixels
    function scrollToBottom() {
        const contentContainer = document.getElementById('message-view');
        contentContainer.scrollTop = contentContainer.scrollHeight;
    }




    function showInputField(questionText, questionId, nextIndex, previousQuestion) {
        const messageView = document.getElementById("message-view");
        surveyContainer.innerHTML = "";
    
        if (!document.querySelector(".question-bubble")) {
            const questionBubble = document.createElement("div");
            showQuestion(nextIndex); // Ensure that showQuestion works correctly
            questionBubble.classList.add("message-bubble", "question-bubble", "dun-question", "answer-bubble");
            questionBubble.textContent = questionText;
            messageView.appendChild(questionBubble);
        }
    
        const questionTitle = document.createElement("p");
        questionTitle.textContent = questionText;
        questionTitle.style.textAlign = "center"
        questionTitle.style.marginBottom = "50px";;
    
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.style.width = "100%";
        inputField.style.borderRadius = "10px";
        inputField.style.padding = "10px";
        inputField.style.marginBottom = "10px";
        inputField.placeholder = "Sila masukkan jawapan anda...";
        inputField.classList.add("custom-input");
    
        const nextButton = document.createElement("button");
        nextButton.textContent = "Seterusnya";
        nextButton.style.backgroundColor = "Green";
        nextButton.classList.add("survey-option");
        nextButton.addEventListener("click", () => {
            if (inputField.value.trim()) {
                handleAnswer(questionId, { name: inputField.value.trim() });
    
                // Show user input in message view
                const userMessage = document.createElement("div");
                userMessage.classList.add("message-bubble", "answer-bubble");
                userMessage.innerHTML = `Anda: ${inputField.value.trim()}`;  // Display the typed answer
                messageView.appendChild(userMessage);
    
                console.log("Proceeding to next question...");
                showQuestion(nextIndex);  // Ensure showQuestion is triggered correctly
            } else {
                alert("Sila masukkan jawapan sebelum meneruskan.");
            }
        });
    
        // Add "Previous" button to return to zoe selection
        const backButton = document.createElement("button");
        backButton.innerHTML = `<i class="fas fa-arrow-left" style="color: black; margin-right: 5px;"></i> Kembali`;
        backButton.classList.add("previous-button");
        backButton.addEventListener("click", () => {
            showQuestion(nextIndex - 1); // Go back to Zon selection
        });
    
        surveyContainer.append(questionTitle, inputField, nextButton, backButton);
    }
    
    


function showFilteredParliments(parlimen, nextIndex) {

    const messageView = document.getElementById("message-view"); // Ensure message view is referenced
    surveyContainer.innerHTML = ""; 

             // ✅ Ensure the question is added only ONCE to the message view
        const questionBubble = document.createElement("div");
        questionBubble.textContent = "Sila pilih Parlimen anda:";
        showQuestion(nextIndex);
        questionBubble.classList.add("message-bubble", "question-bubble", "parlimen-question", "answer-bubble"); // Unique class for age question

    surveyContainer.innerHTML = "<p>Sila pilih Parlimen anda:</p>";

    surveyContainer.style.paddingTop = "45px";
    if (parlimen.length === 0) {
        surveyContainer.innerHTML += "<p>Tiada parlimen dalam zon ini.</p>";
        return;
    }

    parlimen.forEach(p => {

        const button = document.createElement("button");
        button.textContent = `${p.name} (${p.code})`;
        button.classList.add("survey-option");
        button.addEventListener("click", () => {
            handleAnswer("parlimen", p);


                //Show user input in message view
                const userMessage = document.createElement("div");
           
                userMessage.classList.add("message-bubble", "answer-bubble");
                userMessage.innerHTML = `<strong>Anda: </strong> &nbsp;${p.name} (${p.code})`;
                messageView.appendChild(userMessage);

            showDUNOptions(p.dun, nextIndex);  // Move to next question
        });
        surveyContainer.appendChild(button);
    });

    // Add "Previous" button to return to zon selection
    const backButton = document.createElement("button");
    backButton.innerHTML = `<i class="fas fa-arrow-left" style="color: black; margin-right: 5px;"></i> Kembali`;
    backButton.classList.add("previous-button");
    backButton.addEventListener("click", () => {
        showQuestion(1); // Go back to Zon selection
    });
    surveyContainer.appendChild(backButton);
}

    function showDUNOptions(dunList, nextIndex) {
        
    const messageView = document.getElementById("message-view"); // Ensure message view is referenced
    surveyContainer.innerHTML = ""; 

    // Ensure question is correctly retrieved
    let questionText = "Sila pilih DUN anda:"; // Default text for the DUN question

    // Ensure the DUN question is always added to the message view
    const existingDUNQuestion = document.querySelector(".dun-question");

    if (!existingDUNQuestion) {
        const questionBubble = document.createElement("div");
        questionBubble.classList.add("message-bubble", "question-bubble", "dun-question");
        questionBubble.innerHTML = `<strong>Tuan Awang: </strong> &nbsp; ${questionText}`;

        messageView.appendChild(questionBubble);
    }

        surveyContainer.innerHTML = "<p>Sila pilih DUN anda:</p>";

        dunList.forEach(dun => {
            const button = document.createElement("button");
            button.textContent = dun;
            button.classList.add("survey-option");
            button.addEventListener("click", () => {
                handleAnswer("dun", { name: dun });


                //Show user input in message view
                const userMessage = document.createElement("div");
                userMessage.classList.add("message-bubble", "answer-bubble");
                userMessage.innerHTML = `<strong>Anda: </strong> &nbsp; ${dun}`;
                messageView.appendChild(userMessage);

                showQuestion(nextIndex + 1);
            });
            surveyContainer.appendChild(button);
        });

            // Add "Previous" button below the options
            const backButton = document.createElement("button");
            backButton.innerHTML = `<i class="fas fa-arrow-left" style="color: black; margin-right: 5px;"></i> Kembali`;
            backButton.classList.add("previous-button"); // Apply custom class
            backButton.classList.add("survey-option");
            backButton.addEventListener("click", () => {
                showQuestion(nextIndex - 1); // Go back to the "Parlimen" selection

        });

        surveyContainer.appendChild(backButton);
        
    }
    
    function showAgeInput(questionText, questionId, nextIndex) {

        const messageView = document.getElementById("message-view"); // Ensure message view is referenced
        surveyContainer.innerHTML = ""; 

         // Ensure the question is added only ONCE to the message view
        if (!document.querySelector(".question-bubble")) {
        const questionBubble = document.createElement("div");
        questionBubble.classList.add("message-bubble", "question-bubble", "age-question", "answer-Bubble"); // Unique class for age question
        questionBubble.textContent = questionText;
        messageView.appendChild(questionBubble);
    }


        surveyContainer.innerHTML = ""; 
        const questionTitle = document.createElement("p");
        questionTitle.textContent = questionText;
        questionTitle.style.textAlign = "center";
        questionTitle.style.marginTop = "50px";
        questionTitle.style.marginBottom = "50px";
        


        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.style.width = "50%";
        inputField.style.borderRadius = "20px";
        inputField.style.padding = "10px";
        inputField.style.marginBottom = "10px";
        inputField.min = 18;
        inputField.max = 100;
        inputField.placeholder = "Masukkan umur anda (18-100)";
        inputField.classList.add("custom-input");

        const submitButton = document.createElement("button");
        submitButton.textContent = "Seterusnya";
        submitButton.classList.add("submit-button");

        submitButton.addEventListener("click", () => {
            const age = parseInt(inputField.value.trim());
            if (age < 18){
                showToast("Minta maaf, umur 18 tahun kebawah tidak mendapat meneruskan survey ini. Sila cuba lagi", "error");
                // alert("Minta maaf, umur 18 tahun kebawah tidak mendapat meneruskan survey ini. Sila cuba lagi")
            }
            else if (age > 100){
                showToast("Minta maaf, umur 100 tahun keatas tidak mendapat meneruskan survey ini. Sila cuba lagi", "error");
                // alert("Minta maaf, umur 100 tahun keatas tidak mendapat meneruskan survey ini. Sila cuba lagi")
            }
            else if (age >= 18 && age <= 100) {
                handleAnswer(questionId, { name: age });

                document.querySelectorAll(".answer-bubble.age-answer").forEach(el => el.remove());

                //Show user input in message view
                const userMessage = document.createElement("div");
                userMessage.classList.add("message-bubble", "answer-bubble");
                userMessage.innerHTML = `Anda : ${age} Tahun`;
                messageView.appendChild(userMessage);

                showQuestion(nextIndex);

            } else {
                //alert("Sila masukkan umur. Pastikan umur anda antara 18 hingga 100.");
                showToast("Sila masukkan umur. Pastikan umur anda antara 18 hingga 100.", "error");
            }
        });


            // Back button
            const backButton = document.createElement("button");
            backButton.innerHTML = `<i class="fas fa-arrow-left" style="color: black; margin-right: 5px;"></i> Kembali`;
            backButton.classList.add("previous-button", "survey-option");

            backButton.addEventListener("click", () => {
                // Show back message bubble
                const backBubble = document.createElement("div");
                backBubble.classList.add("previousQuestion-bubble");
                backBubble.innerHTML = `----- Kembali ke soalan sebelumnya. -----`;
                messageView.appendChild(backBubble);

                // Wait 1 second before going back
                setTimeout(() => {
                    showQuestion(3);
                }, 1000);
            });

    // Append everything
    surveyContainer.append(questionTitle, inputField, submitButton, backButton);
}


function showBangsaLainInput(questionText, questionId, nextIndex) {
    const messageView = document.getElementById("message-view");

    // Ensure the question bubble is added to messageView only once
    if (!document.querySelector(`.question-bubble-${questionId}`)) {
        const questionBubble = document.createElement("div");
        questionBubble.classList.add("message-bubble", "question-bubble", `question-bubble-${questionId}`, "answer-Bubble");
        questionBubble.textContent = questionText;
        messageView.appendChild(questionBubble);
    }

    // Clear previous content
    surveyContainer.innerHTML = "";

    // Create and show the prompt above the input field
    const instructionText = document.createElement("p");
    instructionText.textContent = "Sila nyatakan bangsa anda";
    instructionText.style.fontWeight = "bold";
    instructionText.style.textAlign = "center";
    instructionText.style.marginBottom = "30px";

    // Create question title (optional)
    // const questionTitle = document.createElement("p");
    // questionTitle.textContent = questionText;
    // questionTitle.style.textAlign = "center";
    // questionTitle.style.marginTop = "20px";
    // questionTitle.style.marginBottom = "20px";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.style.width = "50%";
    inputField.style.borderRadius = "20px";
    inputField.style.padding = "10px";
    inputField.style.marginBottom = "10px";
    inputField.placeholder = "Taip mesej anda...";
    inputField.classList.add("custom-input");

    const submitButton = document.createElement("button");
    submitButton.textContent = "Seterusnya";
    submitButton.classList.add("submit-button");

    submitButton.addEventListener("click", () => {
    const userInput = inputField.value.trim();

    // If field is empty, show toast and stop execution
    if (!userInput) {
        showToast("Sila masukkan bangsa anda sebelum meneruskan.", "error");
        return; // Stop here so it doesn't continue
    }


    // Always store 'Lain - Lain' in bangsa
    const answerData = {
        name: "Lain - Lain"
    };

    // If user typed something, also store it in bangsalain
    if (userInput) {
        answerData.bangsalain = userInput;
    }

    // Save both (or just one) depending on user input
    handleAnswer(questionId, answerData);

    // Remove previous answer bubbles (if any)
    // document.querySelectorAll(".answer-bubble").forEach(el => el.remove());

    // Show what the user entered or "Lain - Lain"
    const userMessage = document.createElement("div");
    userMessage.classList.add("message-bubble", "answer-bubble");
    userMessage.innerHTML = `Anda: ${userInput || "Lain - Lain"}`;
    messageView.appendChild(userMessage);

    // Go to next question
    showQuestion(nextIndex);
});
    // submitButton.addEventListener("click", () => {
    //     const userInput = inputField.value.trim();

    // //     if (!userInput) {
    // //         showToast("Sila masukkan nama calon dan parti pilihan anda.", "error");
    // //     } else {
    // //         handleAnswer(questionId, { calon: userInput });

    // //         document.querySelectorAll(".answer-bubble").forEach(el => el.remove());

    // //         const userMessage = document.createElement("div");
    // //         userMessage.classList.add("message-bubble", "answer-bubble");
    // //         userMessage.innerHTML = `Anda: ${userInput}`;
    // //         messageView.appendChild(userMessage);

    // //         showQuestion(nextIndex);
    // //     }
    // // });

    const backButton = document.createElement("button");
    backButton.innerHTML = `<i class="fas fa-arrow-left" style="color: black; margin-right: 5px;"></i> Kembali`;
    backButton.classList.add("previous-button", "survey-option");

    backButton.addEventListener("click", () => {
        const backBubble = document.createElement("div");
        backBubble.classList.add("previousQuestion-bubble");
        backBubble.innerHTML = `----- Kembali ke soalan sebelumnya. -----`;
        messageView.appendChild(backBubble);

        setTimeout(() => {
            showQuestion(3);
        }, 1000);
    });
    // Append everything in correct order
    surveyContainer.append(instructionText, inputField, submitButton, backButton);
}


function showAdunLainInput(questionText, questionId, nextIndex) {
    const messageView = document.getElementById("message-view");

    // Ensure the question bubble is added to messageView only once
    if (!document.querySelector(`.question-bubble-${questionId}`)) {
        const questionBubble = document.createElement("div");
        questionBubble.classList.add("message-bubble", "question-bubble", `question-bubble-${questionId}`, "answer-Bubble");
        questionBubble.textContent = questionText;
        messageView.appendChild(questionBubble);
    }

    // Clear previous input form (but NOT messages)
    surveyContainer.innerHTML = "";

    // Instruction text
    const instructionText = document.createElement("p");
    instructionText.textContent = "Siapakah calon pilihan anda untuk menjadi ADUN, dan dari parti manakah beliau?";
    instructionText.style.fontWeight = "bold";
    instructionText.style.textAlign = "center";
    instructionText.style.marginBottom = "30px";

    // Question title (optional)
    const questionTitle = document.createElement("p");
    questionTitle.textContent = questionText;
    questionTitle.style.textAlign = "center";
    questionTitle.style.marginTop = "20px"; 
    questionTitle.style.marginBottom = "20px";

    // Input field
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.style.width = "50%";
    inputField.style.borderRadius = "20px";
    inputField.style.padding = "10px";
    inputField.style.marginBottom = "10px";
    inputField.placeholder = "Contoh: Ali Bin Abu - Parti Contoh";
    inputField.classList.add("custom-input");

    // Submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Seterusnya";
    submitButton.classList.add("submit-button");

    submitButton.addEventListener("click", () => {
        const userInput = inputField.value.trim();

        if (!userInput) {
            showToast("Sila masukkan nama calon dan parti sebelum meneruskan.", "error");
            return;
        }

        // Always store 'Tidak pasti'
        const answerData = { name: "Tidak pasti" };
        if (userInput) answerData.mengundiAdunLain = userInput;

        handleAnswer(questionId, answerData);

        // Show user's answer without removing previous bubbles
        const userMessage = document.createElement("div");
        userMessage.classList.add("message-bubble", "answer-bubble");
        userMessage.innerHTML = `Anda: ${userInput || "Tidak pasti"}`;
        messageView.appendChild(userMessage);

        showQuestion(nextIndex);
    });

    // Back button
    const backButton = document.createElement("button");
    backButton.innerHTML = `<i class="fas fa-arrow-left" style="color: black; margin-right: 5px;"></i> Kembali`;
    backButton.classList.add("previous-button", "survey-option");

    backButton.addEventListener("click", () => {
        const backBubble = document.createElement("div");
        backBubble.classList.add("previousQuestion-bubble");
        backBubble.innerHTML = `----- Kembali ke soalan sebelumnya. -----`;
        messageView.appendChild(backBubble);

        setTimeout(() => {
            showQuestion(3);
        }, 1000);
    });

    // Append everything to surveyContainer (not messageView)
    surveyContainer.append(instructionText, questionTitle, inputField, submitButton, backButton);
}



// function showAdunLainInput(questionText, questionId, nextIndex) {
//     const messageView = document.getElementById("message-view");
//     surveyContainer.innerHTML = "Siapakah calon pilihan anda untuk menjadi ADUN, dan dari parti manakah beliau?";

//     // Ensure the question is added only ONCE to the message view
//     //if (!document.querySelector(".question-bubble")) {
//         const questionBubble = document.createElement("div");
//         questionBubble.classList.add("message-bubble", "question-bubble", "answer-Bubble"); // Removed age-question class
//         questionBubble.textContent = questionText;
//         messageView.appendChild(questionBubble);
//     //}

//     // Clear and recreate question + input UI
//     surveyContainer.innerHTML = "";

//     const questionTitle = document.createElement("p");
//     questionTitle.textContent = questionText;
//     questionTitle.style.textAlign = "center";
//     questionTitle.style.marginTop = "50px";
//     questionTitle.style.marginBottom = "50px";

//     const inputField = document.createElement("input");
//     inputField.type = "text";
//     inputField.style.width = "50%";
//     inputField.style.borderRadius = "20px";
//     inputField.style.padding = "10px";
//     inputField.style.marginBottom = "10px";
//     inputField.placeholder = "Contoh: Ali Bin Abu - Parti Contoh";
//     inputField.classList.add("custom-input");

//     const submitButton = document.createElement("button");
//     submitButton.textContent = "Seterusnya";
//     submitButton.classList.add("submit-button");

//     submitButton.addEventListener("click", () => {
//         const userInput = inputField.value.trim();

//         if (!userInput) {
//             showToast("Sila masukkan nama calon dan parti pilihan anda.", "error");
//         } else {
//             // Store the answer
//             handleAnswer(questionId, { calon: userInput });

//             // Remove previous answer bubbles (if any)
//             document.querySelectorAll(".answer-bubble").forEach(el => el.remove());

//             // Show user input in message view
//             const userMessage = document.createElement("div");
//             userMessage.classList.add("message-bubble", "answer-bubble");
//             userMessage.innerHTML = `Anda: ${userInput}`;
//             messageView.appendChild(userMessage);

//             // Proceed to next question
//             showQuestion(nextIndex);
//         }
//     });

//     // Back button
//     const backButton = document.createElement("button");
//     backButton.innerHTML = `<i class="fas fa-arrow-left" style="color: black; margin-right: 5px;"></i> Kembali`;
//     backButton.classList.add("previous-button", "survey-option");

//     backButton.addEventListener("click", () => {
//         const backBubble = document.createElement("div");
//         backBubble.classList.add("previousQuestion-bubble");
//         backBubble.innerHTML = `----- Kembali ke soalan sebelumnya. -----`;
//         messageView.appendChild(backBubble);

//         setTimeout(() => {
//             showQuestion(3);
//         }, 1000);
//     });

//     // Append everything
//     surveyContainer.append(questionTitle, inputField, submitButton, backButton);
// }



    //     // Add "Back" button
    //     const backButton = document.createElement("button");
    //     backButton.innerHTML = `<i class="fas fa-arrow-left" style="color: black; margin-right: 5px;"></i> Kembali`;
    //     backButton.classList.add("previous-button"); // Apply custom class
    //     backButton.classList.add("survey-option");

    //     backButton.addEventListener("click", () => {
    //     showQuestion(3); // Go back to previous Parliment Question
    //     });

    //     surveyContainer.append(questionTitle, inputField, submitButton, backButton);
    // }

    // function handleAnswer(questionId, selectedOption) {
    //     let survey = JSON.parse(localStorage.getItem("currentSurvey")) || { userId: Date.now(), answers: {} };
    //         // Get current date and time in "DD/MM/YYYY HH:MM:SS" format
    //         survey.answers["date"] = new Date().toLocaleString("en-GB", { 
    //             day: '2-digit', 
    //             month: '2-digit', 
    //             year: 'numeric', 
    //         }).toUpperCase();//Make am/pm Capital Letters
    //     survey.answers[questionId] = selectedOption.name || selectedOption.code;

    //     localStorage.setItem("currentSurvey", JSON.stringify(survey));
    // }


function handleAnswer(questionId, selectedOption) {
    let survey = JSON.parse(localStorage.getItem("currentSurvey")) || { userId: Date.now(), answers: {} };

    survey.answers["date"] = new Date().toLocaleString("en-GB", { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
    }).toUpperCase();

    // Always set main answer using selectedOption.name or fallback to string
    if (typeof selectedOption === 'object' && selectedOption !== null) {
        survey.answers[questionId] = selectedOption.name || "";
        if ('mengundiAdunLain' in selectedOption) {
            survey.answers.mengundiAdunLain = selectedOption.mengundiAdunLain;
        }
        if ('bangsalain' in selectedOption) {
            survey.answers.bangsalain = selectedOption.bangsalain;
        }
    } else {
        survey.answers[questionId] = selectedOption;
    }

    localStorage.setItem("currentSurvey", JSON.stringify(survey));
}

    function saveSurveyResponses() {
    let userid = localStorage.getItem("currentUserId");
    let storageKey = `allSurveyResponses_${userid}`;
    let allSurveys = JSON.parse(localStorage.getItem(storageKey)) || [];

    //let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
    let currentSurvey = JSON.parse(localStorage.getItem("currentSurvey"));
    //let userid = localStorage.getItem("currentUserId");

    let startTime = new Date(localStorage.getItem("surveyStartTime"));
    if (isNaN(startTime)) {
        console.error("Invalid start time");
        return;
    }

    let endTime = new Date();

    let formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    let formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    // Collect existing response IDs into a Set
    const existingIds = new Set(allSurveys.map(survey => survey.responseid));

    // Generate a truly unique ID
    const uniqueId = generateUniqueId(existingIds);



    if (currentSurvey) {
        const lastLocation = JSON.parse(localStorage.getItem("lastKnownLocation")) || {};
         
        let formattedSurvey = {
            tarikh: currentSurvey.answers.date || "-",
            responseid: uniqueId,
            kod: userid || "-",
            zon: currentSurvey.answers.zon || "-",
            dun: currentSurvey.answers.dun || "-",
            umur: currentSurvey.answers.umur ? String(currentSurvey.answers.umur) : "-",
            jantina: currentSurvey.answers.jantina || "-",
            bangsa: currentSurvey.answers.bangsa || "-",
            bangsalain: currentSurvey.answers.bangsalain,
            mengundiBedasarkan: currentSurvey.answers.mengundiBedasarkan || "-",
            //kerajaansemasa : currentSurvey.answers.kerajaanSemasa || "-",
            // mempengaruhiundian : currentSurvey.answers.mempengaruhiUndian || "-",
            // mempengaruhiundian: Array.isArray(currentSurvey.answers.mempengaruhiUndian)
            // ? currentSurvey.answers.mempengaruhiUndian.join(", ")
            // : currentSurvey.answers.mempengaruhiUndian || "-",
            // pilihanRaya : currentSurvey.answers.pilihanRaya || "-",
            parlimen : currentSurvey.answers.parlimen || "-",
            cenderunguntukundi : currentSurvey.answers.cenderungUntukUndi || "-",
            // mengundiAdun: currentSurvey.answers.mengundiAdun || "-",
            // mengundiAdunLain : currentSurvey.answers.mengundiAdunLain || "-",
            
            pemimpinsabah: currentSurvey.answers.pemimpinSabah || "-",
            //pemimpinsabahlain: currentSurvey.answers.pemimpinsabahlain || "-",
            //isiboranglagi: currentSurvey.answers.isiBorangLagi || "-",
            lokasi: currentSurvey.answers.locationName || lastLocation.lastLocation || "-",
            latitude: currentSurvey.answers.latitude ?? lastLocation.latitude ?? null,
            longitude: currentSurvey.answers.longitude ?? lastLocation.longitude ?? null,
            starttime: formattedStartTime,
            endtime: formattedEndTime,
            pushed: false
        };
        allSurveys.push(formattedSurvey);
        //localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
        localStorage.setItem(storageKey, JSON.stringify(allSurveys));

    }

    localStorage.removeItem("currentSurvey");
    localStorage.removeItem("surveyStartTime");
}


//Update this part of code to avoid any duplication once its uploaded to the database
function generateUniqueId(existingIds) {
    let newId;
    do {
        newId = Math.floor(Math.random() * 9000000) + 1000000;
    } while (existingIds.has(newId));
    return newId;
}

//Displaying all the survey respondents once all questions has been answered.. 
function displayAllSurveyResponses(hideTable = false) {

    const surveyCompleted = localStorage.getItem("surveyCompleted") === "true";
    console.log("displayAllSurveyResponses() called | surveyCompleted:", surveyCompleted);
    if (!surveyCompleted) return;

    // ✅ Always check current screen size every time we rebuild
    const isMobileView = window.innerWidth < 800; // or 1000px if you prefer
    isTableVisible = !hideTable;

    const surveyContainer = document.getElementById("survey-container");

    // Remove old elements
    document.getElementById("table-container")?.remove();
    document.getElementById("main-buttons-wrapper")?.remove();
    document.getElementById("green-buttons-wrapper")?.remove();

    // Get all surveys
    // let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
    let userid = localStorage.getItem("currentUserId");
    let storageKey = `allSurveyResponses_${userid}`;
    let allSurveys = JSON.parse(localStorage.getItem(storageKey)) || [];

    //allSurveys = allSurveys.map(survey => survey.answers ? survey.answers : survey);

    allSurveys = allSurveys.map(survey =>
    survey.answers
        ? { ...survey.answers, responseid: survey.responseid }
        : survey
);


    // ===== Main Buttons (Red, Blue, ToggleView) =====
    const mainButtonsWrapper = document.createElement("div");
    mainButtonsWrapper.id = "main-buttons-wrapper";
    mainButtonsWrapper.style.display = "flex";
    mainButtonsWrapper.style.justifyContent = "center";
    mainButtonsWrapper.style.margin = "0 auto 15px";
    mainButtonsWrapper.style.width = "100%";
    mainButtonsWrapper.style.flexWrap = "wrap";

    // Blue toggle table button
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggle-table-button";
    toggleButton.className = "survey-option";
    toggleButton.style.backgroundColor = "#0b3d91";
    toggleButton.style.color = "#ffffff";
    toggleButton.style.width = "300px";
    toggleButton.innerHTML = hideTable
        ? `<i class="fas fa-eye" style="margin-right:5px;"></i> Paparkan Jadual`
        : `<i class="fas fa-eye-slash" style="margin-right:5px;"></i> Sembunyikan Jadual`;

    // Red reset button
    const resetSurveyButton = document.createElement("button");
    resetSurveyButton.id = "reset-survey-Button";
    resetSurveyButton.className = "survey-option";
    resetSurveyButton.style.backgroundColor = "#ff0000";
    resetSurveyButton.style.color = "#ffffff";
    resetSurveyButton.style.width = "300px";
    resetSurveyButton.innerHTML = `<i class="fas fa-repeat" style="margin-right:5px;"></i> Isi Semula`;
    resetSurveyButton.onclick = () => redoSurvey();

    // Green toggle-view (mobile only)
    const toggleViewButton = document.createElement("button");
    toggleViewButton.id = "toggle-view-button";
    toggleViewButton.className = "survey-option";
    toggleViewButton.style.backgroundColor = "#006730ff";
    toggleViewButton.style.color = "#ffffff";
    toggleViewButton.style.width = "300px";
    toggleViewButton.innerHTML = `<i class="fas fa-eye" style="margin-right:5px;"></i> Papar Kaji Selidik`;

    // Show/hide based on screen size
    if (isMobileView) {
        toggleViewButton.style.display = "inline-block";
    } else {
        toggleViewButton.style.display = "none"; // hide in desktop
    }

    mainButtonsWrapper.appendChild(resetSurveyButton);
    mainButtonsWrapper.appendChild(toggleButton);
    mainButtonsWrapper.appendChild(toggleViewButton);
    surveyContainer.appendChild(mainButtonsWrapper);

    // ===== Layout Switching =====
    const messageView = document.getElementById("message-view");
    const surveyView = document.getElementById("survey-container");
    const surveyQuestions = document.querySelectorAll(".survey-question");

    // let showingSurvey = true;


// if (isMobileView) {
//     // Mobile layout: Only show survey view initially
//     messageView.style.display = "none";
//     surveyView.style.display = "block";
//     toggleViewButton.style.display = "inline-block";
//     resetSurveyButton.style.display = "inline-block";
//     toggleButton.style.display = "inline-block";
//     surveyQuestions.forEach(q => q.style.display = "block");
// } else {
//     // Desktop layout: Always show everything
//     messageView.style.display = "block";
//     surveyView.style.display = "block";
//     toggleViewButton.style.display = "none"; // Hide this in desktop
//     resetSurveyButton.style.display = "inline-block";
//     toggleButton.style.display = "inline-block";
//     surveyQuestions.forEach(q => q.style.display = "block");
// }

// Always show both survey and message views
messageView.style.display = "block";
surveyView.style.display = "block";

// Hide toggleViewButton because toggle no longer needed
toggleViewButton.style.display = "none";

resetSurveyButton.style.display = "inline-block";
toggleButton.style.display = "inline-block";

surveyQuestions.forEach(q => q.style.display = "block");



    // Toggle logic for mobile

// toggleViewButton.onclick = () => {
//     if (!window.matchMedia("(max-width: 800px)").matches) return;

//     showingSurvey = !showingSurvey;
    

//     if (showingSurvey) {
//         surveyView.style.display = "block";
//         messageView.style.display = "none";
//         resetSurveyButton.style.display = "inline-block";
//         toggleButton.style.display = "inline-block";
//         toggleViewButton.style.display = "inline-block"; // ensure it's visible
//         surveyQuestions.forEach(q => q.style.display = "block");

//         toggleViewButton.innerHTML = `<i class="fas fa-eye-slash" style="margin-right:5px;"></i> Tutup Kaji Selidik`;
//     } else {
//         surveyView.style.display = "none";
//         messageView.style.display = "block";
//         resetSurveyButton.style.display = "none";
//         toggleButton.style.display = "none";
//         toggleViewButton.style.display = "inline-block"; // ensure it's visible
//         surveyQuestions.forEach(q => q.style.display = "none");

//         toggleViewButton.innerHTML = `<i class="fas fa-eye" style="margin-right:5px;"></i> Papar Kaji Selidik`;
//     }
// };


// toggleViewButton.onclick = () => {
//     if (!window.matchMedia("(max-width: 800px)").matches) return;

//     if (showingSurvey) {
//         // HIDE survey view
//         surveyView.style.display = "none";
//         messageView.style.display = "block";
//         resetSurveyButton.style.display = "none";
//         toggleButton.style.display = "none";
//         surveyQuestions.forEach(q => q.style.display = "none");

//         // Now it's hidden, offer to SHOW again
//         toggleViewButton.innerHTML = `<i class="fas fa-eye" style="margin-right:5px;"></i> Papar Kaji Selidik`;
//     } else {
//         // SHOW survey view again
//         surveyView.style.display = "block";
//         messageView.style.display = "none";
//         resetSurveyButton.style.display = "inline-block";
//         toggleButton.style.display = "inline-block";
//         surveyQuestions.forEach(q => q.style.display = "block");

//         // Now it's visible, offer to CLOSE it
//         toggleViewButton.innerHTML = `<i class="fas fa-eye-slash" style="margin-right:5px;"></i> Tutup Kaji Selidik`;
//     }

//     showingSurvey = !showingSurvey;
// };


    // toggleViewButton.onclick = () => {
    //     if (!isMobileView) return;

    //     if (showingSurvey) {
    //         surveyView.style.display = "none";
    //         messageView.style.display = "block";
    //         resetSurveyButton.style.display = "none";
    //         toggleButton.style.display = "none";
    //         surveyQuestions.forEach(q => q.style.display = "none");

    //         toggleViewButton.innerHTML = `<i class="fas fa-eye-slash" style="margin-right:5px;"></i> Tutup Kaji Selidik`;
    //     } else {
    //         surveyView.style.display = "block";
    //         messageView.style.display = "none";
    //         resetSurveyButton.style.display = "inline-block";
    //         toggleButton.style.display = "inline-block";
    //         surveyQuestions.forEach(q => q.style.display = "block");

    //         toggleViewButton.innerHTML = `<i class="fas fa-eye" style="margin-right:5px;"></i> Papar Kaji Selidik`;
    //     }

    //     showingSurvey = !showingSurvey;
    // };

    // ===== Table =====
    const tableDiv = document.createElement("div");
    tableDiv.id = "table-container";
    tableDiv.style.display = hideTable ? "none" : "block";

    const table = document.createElement("table");
    table.style.width = "700px";
    table.style.margin = "0 auto";
    table.style.borderCollapse = "collapse";
    table.style.fontSize = "16px";

    const headers = ["Tarikh", "Kod", "Dun", "Umur", "Jantina", ""];
    table.innerHTML = `<tr>${headers.map(h => `<th style='padding:8px;font-weight:bold;'>${h}</th>`).join('')}</tr>`;

    allSurveys.forEach(survey => {
        const row = document.createElement("tr");
        const values = [
            survey.tarikh || survey.date || "-",
            survey.kod || "-",
            survey.dun || "-",
            survey.umur || "-",
            survey.jantina || "-"
        ];

        row.innerHTML = values.map(v => `<td style='padding:8px;'>${v}</td>`).join('');
        row.innerHTML += `<td style='padding:8px;'>
            <button style='color:white;background:red;padding:5px 10px;cursor:pointer;border:none;border-radius:5px;' 
                onclick='deleteSurveyResponse(${survey.responseid})'>
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>`;

        table.appendChild(row);
    });

    const tableScrollContainer = document.createElement("div");
    tableScrollContainer.style.overflow = "auto";
    tableScrollContainer.style.maxHeight = "200px";
    tableScrollContainer.appendChild(table);
    tableDiv.appendChild(tableScrollContainer);
    surveyContainer.appendChild(tableDiv);

    // ===== Green Buttons (Simpan & Muat Turun) =====
    const greenButtonsWrapper = document.createElement("div");
    greenButtonsWrapper.id = "green-buttons-wrapper";
    greenButtonsWrapper.style.display = hideTable ? "none" : "flex";
    greenButtonsWrapper.style.justifyContent = "center";
    greenButtonsWrapper.style.gap = "5px";
    greenButtonsWrapper.style.margin = "15px auto 0";
    greenButtonsWrapper.style.width = "100%";
    greenButtonsWrapper.style.flexWrap = "wrap";

    const pushDatabaseButton = document.createElement("button");
    pushDatabaseButton.id = "push-database";
    pushDatabaseButton.className = "survey-option";
    pushDatabaseButton.style.backgroundColor = "#007a00";
    pushDatabaseButton.style.color = "#ffffff";
    pushDatabaseButton.style.width = "200px";
    pushDatabaseButton.innerHTML = `<i class="fas fa-database" style="margin-right:5px;"></i> Simpan Data`;
    pushDatabaseButton.onclick = () => pushToDatabaseButton();

    const downloadExcelButton = document.createElement("button");
    downloadExcelButton.id = "download-excel";
    downloadExcelButton.className = "survey-option";
    downloadExcelButton.style.backgroundColor = "#007a00";
    downloadExcelButton.style.color = "#ffffff";
    downloadExcelButton.style.width = "200px";
    downloadExcelButton.innerHTML = `<i class="fas fa-file-excel" style="margin-right:5px;"></i> Muat Turun`;
    downloadExcelButton.onclick = () => downloadInExcelDoc();

    greenButtonsWrapper.appendChild(pushDatabaseButton);
    greenButtonsWrapper.appendChild(downloadExcelButton);
    surveyContainer.appendChild(greenButtonsWrapper);

    // ===== Toggle Table Behavior =====
    toggleButton.onclick = () => {
        const isHidden = tableDiv.style.display === "none";
        tableDiv.style.display = isHidden ? "block" : "none";
        greenButtonsWrapper.style.display = isHidden ? "flex" : "none";

        toggleButton.innerHTML = isHidden
            ? `<i class="fas fa-eye-slash" style="margin-right:5px;"></i> Sembunyikan Jadual`
            : `<i class="fas fa-eye" style="margin-right:5px;"></i> Paparkan Jadual`;
    };
}

// ===== Global Functions =====
window.redoSurvey = redoSurvey;
window.pushToDatabaseButton = pushToDatabaseButton;
window.downloadInExcelDoc = downloadInExcelDoc;
window.deleteSurveyResponse = (responseId) => {
    if (!responseId) return; // optional defensive check

    let userid = localStorage.getItem("currentUserId");
    let storageKey = `allSurveyResponses_${userid}`;
    let allSurveys = JSON.parse(localStorage.getItem(storageKey)) || [];

    allSurveys = allSurveys.map(survey =>
        survey.answers
            ? { ...survey.answers, responseid: survey.responseid }
            : survey
    );

    const updatedSurveys = allSurveys.filter(survey => survey.responseid !== responseId);
    localStorage.setItem(storageKey, JSON.stringify(updatedSurveys));

    displayAllSurveyResponses(false);
};

let showingSurvey = localStorage.getItem("showingSurvey") === "true";
let isTableVisible = true;
let previousIsMobile = window.innerWidth < 800;

// ===== Resize Listener =====
window.addEventListener("resize", () => {
    const currentIsMobile = window.innerWidth < 800;
    if (currentIsMobile !== previousIsMobile) {
        previousIsMobile = currentIsMobile;

        const surveyCompleted = localStorage.getItem("surveyCompleted") === "true";
        if (surveyCompleted) {
            displayAllSurveyResponses(!isTableVisible);
        }
    }
});


// function displayAllSurveyResponses(hideTable = false) {
//      isTableVisible = !hideTable;
//     const surveyContainer = document.getElementById("survey-container");

//     // Remove old content
//     document.getElementById("table-container")?.remove();
//     document.getElementById("main-buttons-wrapper")?.remove();
//     document.getElementById("green-buttons-wrapper")?.remove();

//     // Get all surveys from localStorage
//     let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//     allSurveys = allSurveys.map(survey => survey.answers ? survey.answers : survey);

//     // ===== Main Buttons (Blue + Red) =====
//     const mainButtonsWrapper = document.createElement("div");
//     mainButtonsWrapper.id = "main-buttons-wrapper";
//     mainButtonsWrapper.style.display = "flex";
//     mainButtonsWrapper.style.justifyContent = "center";
//     mainButtonsWrapper.style.margin = "0 auto 15px";
//     mainButtonsWrapper.style.width = "100%";
//     mainButtonsWrapper.style.flexWrap = "wrap";

//     // Toggle Table Button
//     const toggleButton = document.createElement("button");
//     toggleButton.id = "toggle-table-button";
//     toggleButton.className = "survey-option";
//     toggleButton.style.backgroundColor = "#0b3d91";
//     toggleButton.style.color = "#ffffff";
//     // toggleButton.style.flex = "1 1 auto";
//     toggleButton.style.whiteSpace = "nowrap";
//     toggleButton.style.width = "300px";
//     toggleButton.style.whiteSpace = "normal";
//     toggleButton.innerHTML = hideTable
//         ? `<i class="fas fa-eye" style="margin-right: 5px;"></i> Paparkan Jadual`
//         : `<i class="fas fa-eye-slash" style="margin-right: 5px;"></i> Sembunyikan Jadual`;

//     // Red "Isi Semula" button
//     const resetSurveyButton = document.createElement("button");
//     resetSurveyButton.id = "reset-survey-Button";
//     resetSurveyButton.className = "survey-option";
//     resetSurveyButton.style.backgroundColor = "#ff0000";
//     resetSurveyButton.style.color = "#ffffff";
//     // resetSurveyButton.style.flex = "1 1 auto";
//     resetSurveyButton.style.whiteSpace = "nowrap";
//     resetSurveyButton.style.width = "300px";
//     resetSurveyButton.style.whiteSpace = "normal";
//     resetSurveyButton.innerHTML = `<i class="fas fa-repeat" style="margin-right: 5px;"></i> Isi Semula`;
//     resetSurveyButton.onclick = () => redoSurvey();

// // Create the toggle view button
// const toggleViewButton = document.createElement("button");
// toggleViewButton.id = "toggle-view-button";
// toggleViewButton.className = "survey-option";
// toggleViewButton.style.backgroundColor = "#006730ff";
// toggleViewButton.style.color = "#ffffff";
// toggleViewButton.style.width = "300px";
// toggleViewButton.style.whiteSpace = "normal";
// toggleViewButton.innerHTML = `<i class="fas fa-eye" style="margin-right: 5px;"></i> Papar Kaji Selidik`; // Initial label

// // Initial state: survey is showing, message is hidden
// // let showingSurvey = true;
// // document.getElementById("message-view").style.display = "none";

// const messageView = document.getElementById("message-view");
// const surveyView = document.getElementById("survey-container");
// const surveyQuestions = document.querySelectorAll(".survey-question");

// let isMobileView = window.innerWidth < 800;
// let showingSurvey = true;

// // Set initial layout depending on device size
// if (isMobileView) {
//     messageView.style.display = "none";
//     surveyView.style.display = "block";
//     toggleViewButton.style.display = "inline-block";
// } else {
//     messageView.style.display = "block";
//     surveyView.style.display = "block";
//     toggleViewButton.style.display = "none";
// }


// // Toggle logic
// toggleViewButton.onclick = () => {
//     if (!isMobileView) return;

//     if (showingSurvey) {
//         // Show message, hide survey stuff
//         surveyView.style.display = "none";
//         messageView.style.display = "block";
//         resetSurveyButton.style.display = "none";
//         toggleButton.style.display = "none";
//         surveyQuestions.forEach(q => q.style.display = "none");

//         toggleViewButton.innerHTML = `<i class="fas fa-eye-slash" style="margin-right: 5px;"></i> Tutup Kaji Selidik`;
//     } else {
//         // Show survey, hide message
//         surveyView.style.display = "block";
//         messageView.style.display = "none";
//         resetSurveyButton.style.display = "inline-block";
//         toggleButton.style.display = "inline-block";
//         surveyQuestions.forEach(q => q.style.display = "block");

//         toggleViewButton.innerHTML = `<i class="fas fa-eye" style="margin-right: 5px;"></i> Papa Kaji Selidik`;
//     }

//     showingSurvey = !showingSurvey;
// };

//     mainButtonsWrapper.appendChild(resetSurveyButton);
//     mainButtonsWrapper.appendChild(toggleButton);
//     mainButtonsWrapper.appendChild(toggleViewButton);
//     surveyContainer.appendChild(mainButtonsWrapper);

//     // ===== Table =====
//     const tableDiv = document.createElement("div");
//     tableDiv.id = "table-container";
//     tableDiv.style.display = hideTable ? "none" : "block";

//     const table = document.createElement("table");
//     table.style.width = "700px";
//     table.style.margin = "0 auto";
//     table.style.borderCollapse = "collapse";
//     table.style.fontSize = "16px";

//     const headers = ["Tarikh", "Kod", "Dun", "Umur", "Jantina", ""];
//     table.innerHTML = `<tr>${headers.map(h => `<th style='padding:8px;font-weight:bold;'>${h}</th>`).join('')}</tr>`;

//     allSurveys.forEach(survey => {
//         const row = document.createElement("tr");
//         const values = [
//             survey.tarikh || survey.date || "-",
//             survey.kod || "-",
//             survey.dun || "-",
//             survey.umur || "-",
//             survey.jantina || "-",
//         ];

//         row.innerHTML = values.map(v => `<td style='padding:8px;'>${v}</td>`).join('');
//         row.innerHTML += `<td style='padding:8px;'>
//             <button style='color:white;background:red;padding:5px 10px;cursor:pointer;border:none;border-radius:5px;' 
//                 onclick='deleteSurveyResponse(${survey.responseid})'>
//                 <i class="fas fa-trash-alt" style="colour="red": 5px;"></i>
//             </button>
//         </td>`;


//         table.appendChild(row);
//     });

//     const tableScrollContainer = document.createElement("div");
//     tableScrollContainer.style.overflow = "auto";
//     tableScrollContainer.style.maxHeight = "200px";
//     tableScrollContainer.appendChild(table);
//     tableDiv.appendChild(tableScrollContainer);
//     surveyContainer.appendChild(tableDiv);

//     // ===== Green Buttons (Simpan & Muat Turun) =====
//     const greenButtonsWrapper = document.createElement("div");
//     greenButtonsWrapper.id = "green-buttons-wrapper";
//     greenButtonsWrapper.style.display = hideTable ? "none" : "flex";
//     greenButtonsWrapper.style.justifyContent = "center";
//     greenButtonsWrapper.style.gap = "5px";
//     greenButtonsWrapper.style.margin = "15px auto 0";
//     greenButtonsWrapper.style.width = "100%";
//     greenButtonsWrapper.style.flexWrap = "wrap";


//     const pushDatabaseButton = document.createElement("button");
//     pushDatabaseButton.id = "push-database";
//     pushDatabaseButton.className = "survey-option";
//     pushDatabaseButton.style.backgroundColor = "#007a00";
//     pushDatabaseButton.style.color = "#ffffff";
//     pushDatabaseButton.style.width = "200px";
//     pushDatabaseButton.style.whiteSpace = "nowrap";
//     pushDatabaseButton.style.width = "200px";
//     pushDatabaseButton.style.whiteSpace = "normal";
//     pushDatabaseButton.innerHTML = `<i class="fas fa-database" style="margin-right: 5px;"></i> Simpan Data`;
//     pushDatabaseButton.onclick = () => pushToDatabaseButton();

//     const downloadExcelButton = document.createElement("button");
//     downloadExcelButton.id = "download-excel";
//     downloadExcelButton.className = "survey-option";
//     downloadExcelButton.style.backgroundColor = "#007a00";
//     downloadExcelButton.style.color = "#ffffff";
//     downloadExcelButton.style.width = "200px";
//     downloadExcelButton.style.whiteSpace = "nowrap";
//     downloadExcelButton.style.width = "200px";
//     downloadExcelButton.style.whiteSpace = "normal";
//     downloadExcelButton.innerHTML = `<i class="fas fa-file-excel" style="margin-right: 5px;"></i> Muat Turun`;
//     downloadExcelButton.onclick = () => downloadInExcelDoc();

//     greenButtonsWrapper.appendChild(pushDatabaseButton);
//     greenButtonsWrapper.appendChild(downloadExcelButton);
//     surveyContainer.appendChild(greenButtonsWrapper);

//     // ===== Toggle Table Behavior =====
//     toggleButton.onclick = function () {
//         const isHidden = tableDiv.style.display === "none";
//         tableDiv.style.display = isHidden ? "block" : "none";
//         greenButtonsWrapper.style.display = isHidden ? "flex" : "none";

//         toggleButton.innerHTML = isHidden
//             ? `<i class="fas fa-eye-slash" style="margin-right: 5px;"></i> Sembunyikan Jadual`
//             : `<i class="fas fa-eye" style="margin-right: 5px;"></i> Paparkan Jadual`;
//     };
// }

// // Ensure functions are global
// window.redoSurvey = redoSurvey;
// window.pushToDatabaseButton = pushToDatabaseButton;
// window.downloadInExcelDoc = downloadInExcelDoc;
// window.deleteSurveyResponse = function(responseId) {
//     let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];

//     // Map to normalized structure if necessary
//     allSurveys = allSurveys.map(survey => survey.answers ? survey : { responseid: survey.responseid, answers: survey });

//     const updatedSurveys = allSurveys.filter(survey => survey.responseid !== responseId);

//     localStorage.setItem("allSurveyResponses", JSON.stringify(updatedSurveys));

//     displayAllSurveyResponses(false);
// }

// let isTableVisible = true; // default: table is visible

// let previousIsMobile = window.innerWidth < 1000;

// window.addEventListener("resize", () => {
//     const currentIsMobile = window.innerWidth < 1000;

//     if (currentIsMobile !== previousIsMobile) {
//         previousIsMobile = currentIsMobile;
//         displayAllSurveyResponses(!isTableVisible); // pass hideTable opposite of current visibility
//     }
// });





//FUNCTION : ONCE THE SURVEY ANSWERS ARE STORED IN THE LOCAL DATABASE, BY CLICK THE "SIMPAN DATA" BUTTON, IT WILL PUSH TO THE ACTUAL DATABASE
// function pushToDatabaseButton() {
//     // Only handle pushing logic — no button creation here
//     let allResponses = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//     let pushedIds = JSON.parse(localStorage.getItem("pushedRespondentIds")) || [];

//     // Filter only responses not pushed yet
//     const unpushedResponses = allResponses.filter(r => !pushedIds.includes(r.responseid));
//     showToast("Sedang menghantar data ke pangkalan data...", "success");

//     if (unpushedResponses.length === 0) {
//         //("Tiada data baru untuk dihantar.");
//         showToast("Tiada data baru untuk dihantar", "error");
//         return;
//     }

//     sendDataToBackend(unpushedResponses)
//         .then(() => {
//             // Mark as pushed
//             pushedIds = pushedIds.concat(unpushedResponses.map(r => r.responseid));
//             localStorage.setItem("pushedRespondentIds", JSON.stringify(pushedIds));

//             // Remove pushed surveys from allSurveyResponses
//             allResponses = allResponses.filter(r => !pushedIds.includes(r.responseid));
//             localStorage.setItem("allSurveyResponses", JSON.stringify(allResponses));

//             updateConfirmedRespondentCount(unpushedResponses.length);

//             // alert("Data berjaya dihantar ke pangkalan data.");
//             document.getElementById("saveDatabaseModal").style.display = "block";
//             document.getElementById("table-container").innerHTML = '';
//         })
//         .catch(error => {
//             document.getElementById("errorDatabaseModal").style.display = "block";
//             // alert("Ralat semasa menghantar data.");
//             console.error("Send to backend failed:", error);
//         });
// }

function pushToDatabaseButton() {
    const userid = localStorage.getItem("currentUserId");
    const storageKey = `allSurveyResponses_${userid}`;
    let allResponses = JSON.parse(localStorage.getItem(storageKey)) || [];
    let pushedIds = JSON.parse(localStorage.getItem("pushedRespondentIds")) || [];

    // Filter responses not yet pushed
    const unpushedResponses = allResponses.filter(r => !pushedIds.includes(r.responseid));
    showToast("Sedang menghantar data ke pangkalan data...", "success");

    if (unpushedResponses.length === 0) {
        showToast("Tiada data baru untuk dihantar", "error");
        return;
    }

    sendDataToBackend(unpushedResponses)
        .then(() => {
            // Mark as pushed
            pushedIds = pushedIds.concat(unpushedResponses.map(r => r.responseid));
            localStorage.setItem("pushedRespondentIds", JSON.stringify(pushedIds));

            // Optional: remove pushed responses from local storage
            allResponses = allResponses.filter(r => !pushedIds.includes(r.responseid));
            localStorage.setItem(storageKey, JSON.stringify(allResponses));

            // Update count in UI
            updateTodayRespondentsDisplay();

            // Show success modal
            document.getElementById("saveDatabaseModal").style.display = "block";
            document.getElementById("table-container").innerHTML = '';
        })
        .catch(error => {
            document.getElementById("errorDatabaseModal").style.display = "block";
            console.error("Send to backend failed:", error);
        });
}

// function pushToDatabaseButton() {
//     const userid = localStorage.getItem("currentUserId");
//     const storageKey = `allSurveyResponses_${userid}`;
//     let allResponses = JSON.parse(localStorage.getItem(storageKey)) || [];
//     let pushedIds = JSON.parse(localStorage.getItem("pushedRespondentIds")) || [];

//     // Filter only responses not yet pushed
//     const unpushedResponses = allResponses.filter(r => !pushedIds.includes(r.responseid));
//     showToast("Sedang menghantar data ke pangkalan data...", "success");

//     if (unpushedResponses.length === 0) {
//         showToast("Tiada data baru untuk dihantar", "error");
//         return;
//     }

//     sendDataToBackend(
//         unpushedResponses.map(r => ({
//             ...r,
//             tarikh: new Date(r.tarikh).toISOString().split('T')[0] // YYYY-MM-DD
//         }))
//     )
//     .then(() => {
//         // Mark these responses as pushed
//         pushedIds = pushedIds.concat(unpushedResponses.map(r => r.responseid));
//         localStorage.setItem("pushedRespondentIds", JSON.stringify(pushedIds));

//         // Remove pushed surveys from local storage (optional)
//         allResponses = allResponses.filter(r => !pushedIds.includes(r.responseid));
//         localStorage.setItem(storageKey, JSON.stringify(allResponses));

//         updateConfirmedRespondentCount(unpushedResponses.length);

//         // Show success modal
//         document.getElementById("saveDatabaseModal").style.display = "block";
//         document.getElementById("table-container").innerHTML = '';
//     })
//     .catch(error => {
//         document.getElementById("errorDatabaseModal").style.display = "block";
//         console.error("Send to backend failed:", error);
//     });

// }


function updateConfirmedRespondentCount(countJustPushed) {
    const userid = localStorage.getItem("currentUserId");
    const todayDate = new Date().toISOString().split('T')[0];
    const storageKey = `confirmedRespondents_${userid}_${todayDate}`;

    let confirmedCount = parseInt(localStorage.getItem(storageKey)) || 0;
    confirmedCount += countJustPushed;
    localStorage.setItem(storageKey, confirmedCount);

    updateTodayRespondentsDisplay(); // Refresh UI
}



function getFormattedTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // <-- backend expects this
}



// Get today's date in YYYY-MM-DD format for Malaysia timezone (UTC+8)
// function getFormattedTodayDate() {
//     const now = new Date();
//     const malaysiaOffset = 8 * 60; // UTC+8 in minutes
//     const localTime = new Date(now.getTime() + (malaysiaOffset - now.getTimezoneOffset()) * 60000);

//     const year = localTime.getFullYear();
//     const month = String(localTime.getMonth() + 1).padStart(2, '0');
//     const day = String(localTime.getDate()).padStart(2, '0');

//     return `${year}-${month}-${day}`; // backend expects this
// }

async function updateTodayRespondentsDisplay() {
    const kod = localStorage.getItem("currentUserId");
    if (!kod) return;

    const todayDate = getFormattedTodayDate(); // YYYY-MM-DD in Malaysia time

    try {
        // Add timestamp to avoid caching
        const response = await fetch(`https://atiqahst-github-io.onrender.com/respondents/count?kod=${kod}&date=${todayDate}&t=${Date.now()}`, {
            cache: "no-store"
        });

        if (!response.ok) throw new Error("Failed to fetch count");

        const data = await response.json();
        const count = data.count || 0;

        // Display readable date in Malaysia format
        const readableDate = new Date(todayDate).toLocaleDateString('ms-MY', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        document.getElementById("todayRespondents").innerHTML =
            `Dikemaskini setakat (${readableDate}) - <span style="color: #003c7cff; font-weight: 900;">${count} Responden</span>`;

    } catch (err) {
        console.error("Error fetching respondents count:", err);
    }
}

// Update the UI on page load
document.addEventListener("DOMContentLoaded", updateTodayRespondentsDisplay);





// function updateConfirmedRespondentCount(countJustPushed) {
//     const todayDate = new Date().toISOString().split('T')[0];
//     let confirmedCount = parseInt(localStorage.getItem(`confirmedRespondents_${todayDate}`)) || 0;

//     confirmedCount += countJustPushed;
//     localStorage.setItem(`confirmedRespondents_${todayDate}`, confirmedCount);

//     updateTodayRespondentsDisplay(); // Refresh UI
// }


// function updateTodayRespondentsDisplay() {
//     const todayDate = new Date().toISOString().split('T')[0];
//     const count = parseInt(localStorage.getItem(`confirmedRespondents_${todayDate}`)) || 0;

//     const element = document.getElementById("todayRespondents");
//     if (element) {
//         element.textContent = `Jumlah Responden Hari Ini (${todayDate}) - ${count} Responden`;
//     }
// }

// document.addEventListener("DOMContentLoaded", () => {
//     updateTodayRespondentsDisplay(); // Show initial count
// });

    // function pushToDatabaseButton(){
    //     const data = JSON.parse(localStorage.getItem("allSurveyResponses"));
    
    //     if (!document.getElementById("pushDatabase")) {
    //         const pushDatabase = document.createElement("button");
    //         pushDatabase.id = "push-database";
    //         pushDatabase.textContent = "Simpan Data";
    //         pushDatabase.classList.add("survey-option"); 
    //         pushDatabase.style.marginTop = "10px";
    
    //         // When clicked, reset and go back to ID input
    //         pushDatabase.addEventListener("click", () => {
    
    //             if (data && Array.isArray(data) && data.length > 0){
    //                 sendDataToBackend(data)
    
    //                 .then(() => {
    //                     alert("Successfully! All data has been saved. ");
    //                     localStorage.removeItem("allSurveyResponses");
    //                     document.getElementById("table-container").innerHTML = '';
    //                     console.log("item removed");
    //                 })
    //                 .catch(() => {
    //                     alert("Error! Some data failed to save.");
    //                     console.error('Error sending data to one or more items');
    //                 });
    //             } else {
    //                 alert("No valid data found in localStorage");
    //             }
    //         });
    
    //         // Append the button to the document body or a specific element
    //         document.getElementById("survey-container").appendChild(pushDatabase);
    
    //     }
    // }
    

async function sendDataToBackend(data) {
    try {
        const response = await fetch('https://atiqahst-github-io.onrender.com/cycle4_official', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to send data');
        const responseData = await response.json();
        console.log('Data successfully sent:', responseData);
        return responseData;

    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}

function redoSurvey() {
    //Reset state
    currentQuestionIndex = 0;
    userResponses = {};
    currentUserId = null;

    

    //Clear local storage
    localStorage.removeItem("surveyCompleted");
    localStorage.removeItem("currentSurvey");
    localStorage.removeItem("pushedRespondentIds");
    localStorage.removeItem("currentUserId");
    localStorage.setItem("totalRespondents", 0);

    //Reset views
    const messageView = document.getElementById("message-view");
    const surveyContainer = document.getElementById("survey-container");

    if (messageView) {
        messageView.style.display = "block";       // Show chat area again
        messageView.innerHTML = "";               // Clear all messages
    }

    if (surveyContainer) {
        surveyContainer.style.display = "none";    // Hide survey questions
        surveyContainer.innerHTML = "";           // Clear contents
    }

    //Remove any survey-related UI left over
    document.getElementById("main-buttons-wrapper")?.remove();
    document.getElementById("green-buttons-wrapper")?.remove();
    document.getElementById("table-container")?.remove();

    //Start fresh from ID input
    showIdInput();

    requestLocation();
}



    // function redoSurvey() {
    //     // if (!document.getElementById("reset-survey-Button")) {
    //     //     const redoSurvey = document.createElement("button");
    //     //     redoSurvey.id = "redo-survey"   ;
    //     //     redoSurvey.innerHTML = `<i class="fas fa-repeat" style="margin-right: 10px;"></i> Isi Semula`;
    //     //     redoSurvey.style.width = "auto";
    //     //     redoSurvey.style.backgroundColor = "#FF0000"
    //     //     redoSurvey.style.color = "#FFFFFFF"
    //     //     redoSurvey.classList.add("survey-option"); 
    //     //     redoSurvey.style.marginTop = "10px";
    
    //         // When clicked, reset and go back to ID input
    //         // redoSurvey.addEventListener("click", () => {

    //             const messageView = document.getElementById("message-view");
    //             const surveyContainer = document.getElementById("survey-container");

    //             //The message view will reappear again despite hiding the message vuew
    //             if (messageView) messageView.style.display = "block";
    //             if (surveyContainer) surveyView.style.display = "none";
            
    //             // Clear the message view (any previous messages)
    //             messageView.innerHTML = "";
            
    //             // Clear survey container (e.g., remove any previously shown questions or answers)
    //             surveyContainer.innerHTML = "";

    //             localStorage.removeItem("surveyCompleted");


    //             localStorage.setItem('totalRespondents', 0); // Reset count to zero in localStorage
                
    //             localStorage.removeItem("currentSurvey"); // Clear current survey





    //             // **Clear all previous responses so new survey starts fresh**
    //             //localStorage.removeItem("allSurveyResponses");  
    //             localStorage.removeItem("pushedRespondentIds");

    //             localStorage.removeItem("currentUserId"); 

    //             currentUserId = "";




    //             showIdInput(); // Go back to the ID input screen
    //         // });
    
    //         // // Append to the survey container
    //         // document.getElementById("survey-container").appendChild(redoSurvey);
    //     // }
    // }
    

    function downloadInExcelDoc() {
    // Read survey data from localStorage
    //let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];

    let userid = localStorage.getItem("currentUserId");
    let storageKey = `allSurveyResponses_${userid}`;
    let allSurveys = JSON.parse(localStorage.getItem(storageKey)) || [];


    if (allSurveys.length === 0) {
        //alert("Tiada data untuk dimuat turun.");
        showToast("Tiada data untuk dimuat turun", "error");
        return;
    }

    try {
        // Define headers
        const headers = [
            "Kod", "Tarikh", "Zon", "Parlimen", "DUN", "Umur", "Jantina",
            "Bangsa", "Bangsa Lain", "Mengundi Bedasarkan", "Pemimpin Sabah", "Cenderung Untuk Undi",
            "Longitude", "Latitude", "Location", "Response ID", "Start Time"
        ];

        // Convert survey data
        const data = allSurveys.map(survey => {
            const s = survey.answers ? survey.answers : survey;
            return [
                s.kod || "-",
                s.tarikh || s.date || "-",
                s.zon || "-",
                s.parlimen || "-",
                s.dun || "-",
                s.umur || "-",
                s.jantina || "-",
                s.bangsa || "-",
                s.bangsalain || "-",
                s.mengundiBedasarkan || "-",
                s.pemimpinsabah || "-",
                s.cenderunguntukundi || "-",
                s.longitude || 0,
                s.latitude || 0,
                s.lokasi ?? "-",   
                s.responseid || "-", 
                s.starttime || "-"
            ];
        });

        // Generate and download Excel file
        const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Survey Data");
        XLSX.writeFile(wb, "Latest_Data_2025_(Cycle 4).xlsx");
        showToast("Proses muat turun fail CSV sedang dijalankan...", "success");

    } catch (error) {
        alert("Ralat semasa memuat turun fail Excel.");
        console.error("Excel download failed:", error);
    }

    }
    showIdInput()
});