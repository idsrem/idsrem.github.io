//importing the listOfQuestions.js file from here to reference all of the questions provided
import { surveyQuestions } from "./listOfQuestions.js";
import { enumerator } from "./enumerator.js";

document.addEventListener("DOMContentLoaded", function () {
    const surveyContainer = document.getElementById("survey-container");
    //const sound = document.getElementById("clickSound");
    let currentQuestionIndex = 0;
    let currentUserId = localStorage.getItem("currentUserId") || null; // Get ID if stored
    let userResponses = {};

function showIdInput() {
    const surveyContainer = document.getElementById('survey-container');
    surveyContainer.innerHTML = ""; // Clear the survey container

    const messageView = document.getElementById("message-view"); // Ensure message view is referenced

    if (!messageView) {
        console.error("message-view element not found!");
        return;
    }

    // Get current date
    const currentDate = new Date().toLocaleDateString('ms-MY', { // 'ms-MY' is the language/locale for Malaysia
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Create date bubble element
    const dateBubble = document.createElement("div");
    dateBubble.classList.add("system-bubble");
    dateBubble.textContent = `Tarikh: ${currentDate}`; // Display current date
    messageView.appendChild(dateBubble);


    const questionText = "Sila masukkan kod anda untuk memulakan kaji selidik:";

    // Create question bubble element
    const questionBubble = document.createElement("div");
    questionBubble.classList.add("message-bubble", "question-bubble");
    questionBubble.textContent = questionText;
    messageView.appendChild(questionBubble);

    const questionTitle = document.createElement("p");
    questionTitle.textContent = "Sila masukkan kod anda untuk memulakan kaji selidik:";
    questionTitle.style.textAlign = "center";
    questionTitle.style.marginTop = "35px";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.style.width = "40%";
    inputField.style.borderRadius = "10px";
    inputField.style.padding = "10px";
    inputField.style.marginBottom = "10px";
    inputField.placeholder = "Masukkan ID anda...";
    inputField.classList.add("custom-input");

    if (currentUserId) inputField.value = currentUserId; // Auto-fill if ID exists

    const nextButton = document.createElement("button");
    nextButton.textContent = "Seterusnya";
    nextButton.classList.add("submit-button");

    nextButton.addEventListener("click", () => {
        const kodInput = inputField.value.trim();

        if (kodInput === '') {
            alert("Sila isi kod anda!");
            return; // If no input, alert and return
        }

        // Check if the entered code exists in the enumerator array
        const userExists = enumerator.some(user => user.userID === kodInput);

        if (!userExists) {
            alert("ID yang dimasukkan tidak wujud. Sila semak semula.");
            return; // If user doesn't exist, show an alert and return
        }

        // If user exists, store ID and proceed
        currentUserId = kodInput;
        localStorage.setItem("currentUserId", currentUserId); // Store the ID in local storage

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
            displayAllSurveyResponses(true); // Ensure the table appears
            return;
        }
    
        const question = surveyQuestions[index];
        surveyContainer.innerHTML = ""; // Clear previous content
    
        const questionBubble = document.createElement("div");
        questionBubble.classList.add("message-bubble", "question-bubble");
        questionBubble.innerHTML = `<strong>Tuan Awang:</strong> &nbsp; ${question.text}`;
        messageView.appendChild(questionBubble);
    
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
    
        // Display the question image if it exists
        if (question.picture?.trim()) {
            const img = document.createElement("img");
            Object.assign(img, {
                src: question.picture,
                alt: "IDS Logo",
                style: "width:30%;display:block;margin:auto;margin-bottom:10px;margin-top:-40px;"
            });
            questionDiv.appendChild(img);
        }
    
        const textElement = document.createElement("p");
        textElement.textContent = question.text;
        questionDiv.appendChild(textElement);
    
        // Create the Previous Button if it's not the first question
        if (index > 1) {
            const backButton = document.createElement("button");
            backButton.textContent = "Kembali";
            backButton.classList.add("previous-button"); // Apply custom class
            backButton.addEventListener("click", () => {
                // Show a bubble message before going back
                const backBubble = document.createElement("div");
                backBubble.classList.add("previousQuestion-bubble");
                backBubble.innerHTML = ` ----- Kembali ke soalan sebelumnya. -----`;
                messageView.appendChild(backBubble);
    
                // Delay the transition to the previous question for a smooth user experience
                setTimeout(() => {
                    if (question.id === "jantina") {
                        showQuestion(1); // Go to the 2nd question if it's 'jantina'
                    } else if (question.id === "pemimpinSabah" || question.id === "partiNasional" || question.id === "partiTempatan") {
                        // Clear the data for partiNasional and partiTempatan
                        let currentSurvey = JSON.parse(localStorage.getItem("currentSurvey"));
    
                        if (currentSurvey) {
                            // Reset partiNasional and partiTempatan fields to empty or default values
                            currentSurvey.answers.partiNasional = "";
                            currentSurvey.answers.partiTempatan = "";
    
                            // Update the survey in localStorage
                            localStorage.setItem("currentSurvey", JSON.stringify(currentSurvey));
                            showQuestion(12);
                        }
                    } else {
                        showQuestion(index - 1); // Show the previous question
                    }
                }, 1000); // Delay transition to allow the bubble message to be visible for a while
            });
            surveyContainer.appendChild(backButton);
        }
    
        // Other code handling question rendering like age input, options buttons, etc.
        if (question.id === "umur") {
            showAgeInput(question.text, question.id, index + 1);
        } else {
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

                } else if (option.name === "Mula") {
                    button.style.backgroundColor = "#339A00";
                    button.style.color = "#FFFFFF";
                    button.textContent = "Mula";

                } else if (option.name === "Ya") {
                    button.style.backgroundColor = "#339A00";
                    button.style.color = "#FFFFFF";
                    button.textContent = "Ya";

                } else if (option.name === "Tidak") {
                    button.style.backgroundColor = "#FF0000";
                    button.style.color = "#FFFFFF";
                    button.textContent = "Tidak";
                }

                else if(option.name === "Sangat Positif"){
                    button.style.backgroundColor = "#007000";
                    button.textContent = "Sangat Positif"
                } 

                else if(option.name === "Agak Positif"){
                    button.style.backgroundColor = "#238823";
                    button.textContent = "Agak Positif"
                }

                else if(option.name === "Agak Negatif"){
                    button.style.backgroundColor = "#FF581B";
                    button.textContent = "Agak Negatif"
                }

                else if(option.name === "Sangat Negatif"){
                    button.style.backgroundColor = "#D2222D";
                    button.textContent = "Sangat Negatif"

                }
                
                else if(option.name === "Parti"){
                    button.style.backgroundColor = "#007000";
                    button.textContent = "Parti"
                }

                else if(option.name === "Calon"){
                    button.style.backgroundColor = "#21548A";
                    button.textContent = "Calon"
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

    // function playSoundEffect(){
    //     const sound = document.getElementById("clickSound");
    //     sound.currentTime = 0;
    //     sound.play();
    // }


    // Function to increment the total respondent count
    function incrementRespondentCount() {
        let totalRespondents = parseInt(localStorage.getItem('totalRespondents')) || 0;

        // Increment the total respondent count by 1
        totalRespondents++;

        // Save the updated count back to localStorage
        localStorage.setItem('totalRespondents', totalRespondents);
    }


    // Function to get the total number of respondents
    // function getTotalRespondentCount() {
    //     let totalRespondents = parseInt(localStorage.getItem('totalRespondents')) || 0;
    //     return totalRespondents;
    // }

    function handleOptionClick(question, option, index) {

        showAnswerInMessageView(option.name);
        userResponses[question.id] = option.name;
    
        console.log("User Responses: ", userResponses); // Check if it gets added here
        console.log(option.name);
    
        // Get the current date in 'YYYY-MM-DD' format for storage
        const currentDate = new Date().toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    
        if(option.name === "Lain - Lain") {
            if (question.id == "partiNasional" || question.id == "partiTempatan"){
                showQuestion(index + 1);
                handleAnswer(question.id, option);

            }
            else{
            showInputField(question.text, question.id, index + 1);
            }
        }
      
        else if (question.id === "zone") {
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
            // When the user finishes the survey, properly increment and show the count.
            saveSurveyResponses();
            
            // Increment total respondents count
            incrementRespondentCount();
        
            // Retrieve and increment the current day's respondent count
            let currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
            let currentRespondents = localStorage.getItem(`respondents_${currentDate}`);
            currentRespondents = currentRespondents ? parseInt(currentRespondents, 10) : 0;
            currentRespondents++; // Increment for today's respondent
        
            // Save the updated count for today's survey responses
            localStorage.setItem(`respondents_${currentDate}`, currentRespondents);
        
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
            alert("Respon anda telah disimpan! Terima kasih!😊");
        
            // Show the "End of Survey" bubble
            const messageView = document.getElementById("message-view");
        
            // Create the "End of Survey" message bubble
            const endSurveyBubble = document.createElement("div");
            endSurveyBubble.classList.add("surveyFinish-bubble");
            endSurveyBubble.innerHTML = `---------- Selesai Survey ----------`;
        
            // Create the "Total Respondents" message bubble
            const totalRespondentsBubble = document.createElement("div");
            totalRespondentsBubble.classList.add("system-bubble");
            totalRespondentsBubble.innerHTML = `Jumlah responden hari ini: ${currentRespondents}`;
        
            // Append the bubbles to the message view
            messageView.appendChild(endSurveyBubble);
            messageView.appendChild(totalRespondentsBubble);
        
            // Ensure the view scrolls to the bottom after appending the messages
            scrollToBottom();
        
            // Log the stored data
            console.log("All survey data has been stored");
        
            // Show a thank-you message and end the survey
            surveyContainer.innerHTML = "<h3>Terima kasih diatas kerjasama anda dalam menyertai kaji selidik ini! <br><br> Sekian dan Terima Kasih. <br><br> SABAH MAJU JAYA!<br><br> </h3>";
        
            // Optional: Display total respondents and responses
            displayTotalRespondents(true);
            displayAllSurveyResponses(true);  // Display survey responses (optional)
        
            // Optionally restart the survey
            redoSurvey();  // Restart the survey (if needed)
        }
         else if (question.id === "cenderungUntukMengundi") {
            userResponses[question.id] = option.name;  // Explicitly store response
            console.log("User Responses Updated: ", userResponses);
    
            // Custom flow based on user selection
            if (option.name === "Parti Nasional") {
                showQuestion(index + 1);
            } else if (option.name === "Parti Tempatan") {
                showQuestion(index + 2);
            } else if (option.name === "Tidak Pasti") {
                showQuestion(index + 3);
            }
    
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
    

    // function handleOptionClick(question, option, index) {

    //     showAnswerInMessageView(option.name);
    //     userResponses[question.id] = option.name
    //     playSoundEffect();

    //     console.log("User Responses: ", userResponses); // Check if it gets added here
    //     console.log(option.name);
        

    //     if(option.name === "Lain - Lain") {
    //         showInputField(question.text, question.id, index + 1);

    //     } else if (question.id === "zone"){
    //     handleAnswer(question.id, option)


    //     const parlimenQuestion = surveyQuestions.find(q => q.id === "parlimen");

    //     if (parlimenQuestion && parlimenQuestion.options) {
    //         const filteredParliments = parlimenQuestion.options.filter(p => option.parlimenCodes.includes(p.code));
    //         if (filteredParliments.length > 0) {
    //             showFilteredParliments(filteredParliments, index + 1);
    //         } else {
    //             alert("Tiada parlimen dalam zon ini.");
    //         }
    //     } else {
    //         console.error("Parlimen question or options not found in surveyQuestions.");
    //     }
            
    //     }else if (question.name === "Lain - Lain" && question.id === "pengaruhPersepsi"){
    //         showInputField(question.text, question.id, index);
    //     }
    //     //Continue where you left off...
    //     else if (question.name === "Pendapat Peribadi" && question.id === "faktorLain"){
    //         showInputField(question.text, question.id, index);
    //     }
    //     //For the last question of the survey, a condition of ya and tidak...
    //     else if (question.id === "parlimen"){
    //         handleAnswer(question.id, option);
    //         showDUNOptions(option.dun, index + 1);
                
    //     }else if (question.id === "isiBorangLagi" && option.name.toLowerCase() === "ya, isi lagi") {
    //         saveSurveyResponses();//Save the response and..
    //         incrementRespondentCount();

    //         // Set the start time for the new survey
    //         let newStartTime = new Date();  // Capture the current date and time
    //         localStorage.setItem("surveyStartTime", newStartTime.toISOString());  // Store new start time as ISO string

    //         // Show the "Redo Survey" bubble
    //         const messageView = document.getElementById("message-view");
            
    //         const endSurveyBubble = document.createElement("div");
    //         endSurveyBubble.classList.add("system-bubble");
    //         endSurveyBubble.innerHTML = `----- Membuat Survey Lagi Sekali -----`;

    //         // Append to the message view
    //         messageView.appendChild(endSurveyBubble);

    //         // Re-initialize the survey form or set the first question, as needed
    //         currentQuestionIndex = 0;
    //         showQuestion(currentQuestionIndex);


    //     } else if (question.id === "isiBorangLagi" && option.name.toLowerCase() === "tidak, selesai") {
    //     // Save the responses
    //     saveSurveyResponses();
        
    //     // Increment the respondent count globally (not based on date)
    //     incrementRespondentCount();

    //      // Retrieve the current day's respondent count from localStorage
    //      let currentRespondents = localStorage.getItem(`respondents_${currentDate}`);
    //      currentRespondents = currentRespondents ? parseInt(currentRespondents, 10) : 0;
    //      currentRespondents++; // Increment for today's respondent
 
    //      // Save the updated count back to localStorage
    //      localStorage.setItem(`respondents_${currentDate}`, currentRespondents);
 

    //     // Get the total number of respondents (not based on date)
    //     const totalRespondents = getTotalRespondentCount();

    //      // Get the overall total respondents by summing up all the daily counts
    //     let totalRespondentsAllDays = 0;
    //     for (let i = 0; i < 31; i++) { // Check for up to 31 days
    //         const dateToCheck = new Date();
    //         dateToCheck.setDate(dateToCheck.getDate() - i);
    //         const dateKey = dateToCheck.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    //         const dailyRespondents = localStorage.getItem(`respondents_${dateKey}`);
    //         if (dailyRespondents) {
    //             totalRespondentsAllDays += parseInt(dailyRespondents, 10);
    //         }
    //     }

    //     // Display an alert to the user
    //     alert("Respon anda telah disimpan! Terima kasih!😊");

    //     // Show the "End of Survey" bubble
    //     const messageView = document.getElementById("message-view");

    //     // Create the "End of Survey" message bubble
    //     const endSurveyBubble = document.createElement("div");
    //     endSurveyBubble.classList.add("system-bubble");
    //     endSurveyBubble.innerHTML = `---------- Selesai Survey ----------`;

    //     // Create the "Total Respondents" message bubble
    //     const totalRespondentsBubble = document.createElement("div");
    //     totalRespondentsBubble.classList.add("system-bubble");
    //     totalRespondentsBubble.innerHTML = `Jumlah responden: ${totalRespondents} orang.`;

    //     // Append the bubbles to the message view
    //     messageView.appendChild(endSurveyBubble);
    //     messageView.appendChild(totalRespondentsBubble);

    //     // Ensure the view scrolls to the bottom after appending the messages
    //     scrollToBottom();

    //     // Log and clean up the survey interface
    //     console.log("All survey data has been stored");
    //     localStorage.setItem('totalRespondents', 0); // Reset count to zero in localStorage

    //     // Show a thank-you message and end the survey
    //     surveyContainer.innerHTML = "<h3>Terima kasih diatas kerjasama anda dalam menyertai kaji selidik ini! <br><br> Sekian dan Terima Kasih. <br><br> SABAH MAJU JAYA!<br><br> </h3>";
    //     displayAllSurveyResponses(true);  // Display survey responses (optional)
    //     redoSurvey();  // Restart the survey (if needed)

    //     } else if (question.id === "cenderungUntukMengundi") { 
    //         userResponses[question.id] = option.name;  // Explicitly store response
    //         console.log("User Responses Updated: ", userResponses);

    //         // Custom flow based on user selection
    //         if (option.name === "Parti Nasional") {
    //             showQuestion(index + 1); // Move to 'Parti Tempatan' options
    //         } else if (option.name === "Parti Tempatan") {
    //             showQuestion(index + 2); // Skip Parti Nasional and go to Parti Tempatan
    //         } else if (option.name === "Tiada Kecendurungan") {
    //             showQuestion(index + 3); //Skip to Pemimpin Sabah Options
    //         } 

    //     } 
    //     else if (option.name === "Tidak"){
    //         showInputField(question.text, question.id, index + 1);
    //     } else {
    //         handleAnswer(question.id, option);
    //           question.id === "parlimen" && option.dun ? showDUNOptions(option.dun, index + 1) : showQuestion(index + 1);
    //     }
  
    // }
    //Automatically scroll down if the message contact surpasses the height pixels
    function scrollToBottom() {
        const contentContainer = document.getElementById('message-view');
        contentContainer.scrollTop = contentContainer.scrollHeight;
    }

    // function showInputField(questionText, questionId, nextIndex) {
    //     const messageView = document.getElementById("message-view");
    //     surveyContainer.innerHTML = "";
    
    //     if (!document.querySelector(".question-bubble")) {
    //         const questionBubble = document.createElement("div");
    //         showQuestion(nextIndex); // Ensure that showQuestion works correctly
    //         questionBubble.classList.add("message-bubble", "question-bubble", "dun-question", "answer-bubble");
    //         questionBubble.textContent = questionText;
    //         messageView.appendChild(questionBubble);
    //     }
    
    //     const questionTitle = document.createElement("p");
    //     questionTitle.textContent = questionText;
    //     questionTitle.style.textAlign = "center";
    
    //     const inputField = document.createElement("input");
    //     inputField.type = "text";
    //     inputField.style.width = "80%";
    //     inputField.style.borderRadius = "10px";
    //     inputField.style.padding = "10px";
    //     inputField.style.marginBottom = "10px";
    //     inputField.placeholder = "Sila masukkan jawapan anda...";
    //     inputField.classList.add("custom-input");
    
    //     const nextButton = document.createElement("button");
    //     nextButton.textContent = "Seterusnya";
    //     nextButton.style.backgroundColor = "Green";
    //     nextButton.classList.add("survey-option");
    //     nextButton.addEventListener("click", () => {
    //         if (inputField.value.trim()) {
    //             handleAnswer(questionId, { name: inputField.value.trim() });
    
    //             // Show user input in message view
    //             const userMessage = document.createElement("div");
    //             userMessage.classList.add("message-bubble", "answer-bubble");
    //             userMessage.innerHTML = `Anda: ${inputField.value.trim()}`;  // Display the typed answer
    //             messageView.appendChild(userMessage);
    
    //             console.log("Proceeding to next question...");
    //             showQuestion(nextIndex);  // Ensure showQuestion is triggered correctly
    //         } else {
    //             alert("Sila masukkan jawapan sebelum meneruskan.");
    //         }
    //     });
    
    //     surveyContainer.append(questionTitle, inputField, nextButton);
    // }

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
        questionTitle.style.textAlign = "center";
    
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.style.width = "80%";
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
    
        // Add "Previous" button to return to zone selection
        const backButton = document.createElement("button");
        backButton.textContent = "Kembali";
        backButton.classList.add("previous-button");
        backButton.addEventListener("click", () => {
            showQuestion(nextIndex - 1); // Go back to Zone selection
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

    // Add "Previous" button to return to zone selection
    const backButton = document.createElement("button");
    backButton.textContent = "Kembali";
    backButton.classList.add("previous-button");
    backButton.addEventListener("click", () => {
        showQuestion(1); // Go back to Zone selection
    });
    surveyContainer.appendChild(backButton);
}

    function showDUNOptions(dunList, nextIndex) {
        
    const messageView = document.getElementById("message-view"); // Ensure message view is referenced
    surveyContainer.innerHTML = ""; 

    // ✅ Ensure question is correctly retrieved
    let questionText = "Sila pilih DUN anda:"; // Default text for the DUN question

    // ✅ Ensure the DUN question is always added to the message view
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

            // ✅ Add "Previous" button below the options
            const backButton = document.createElement("button");
            backButton.textContent = "Kembali";
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

         // ✅ Ensure the question is added only ONCE to the message view
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
        questionTitle.style.fontWeight = "bold";


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
                alert("Minta maaf, umur 18 tahun kebawah tidak mendapat meneruskan survey ini. Sila cuba lagi")
            }
            else if (age > 100){
                alert("Minta maaf, umur 100 tahun keatas tidak mendapat meneruskan survey ini. Sila cuba lagi")
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
                alert("Sila masukkan umur. Pastikan umur anda antara 18 hingga 100.");
            }
        });

        // Add "Back" button
        const backButton = document.createElement("button");
        backButton.textContent = "Kembali";

        
        
        backButton.classList.add("previous-button"); // Apply custom class
        backButton.classList.add("survey-option");

        backButton.addEventListener("click", () => {
        showQuestion(nextIndex - 2); // Go back to previous Parliment Question
        });

        surveyContainer.append(questionTitle, inputField, submitButton, backButton);
    }

    function handleAnswer(questionId, selectedOption) {
        let survey = JSON.parse(localStorage.getItem("currentSurvey")) || { userId: Date.now(), answers: {} };
            // Get current date and time in "DD/MM/YYYY HH:MM:SS" format
            survey.answers["date"] = new Date().toLocaleString("en-GB", { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric', 
            }).toUpperCase();//Make am/pm Capital Letters
        survey.answers[questionId] = selectedOption.name || selectedOption.code;

        localStorage.setItem("currentSurvey", JSON.stringify(survey));
    }

    // function saveSurveyResponses() {

    //     let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
    //     let currentSurvey = JSON.parse(localStorage.getItem("currentSurvey"));

    //     currentSurvey.userId = currentUserId;
    //     currentSurvey.answers = Object.assign({}, currentSurvey.answers, userResponses);

    //     if (currentSurvey) {
    //         allSurveys.push(currentSurvey);
    //         localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
    //         localStorage.removeItem("currentSurvey");
    //     }

    // }

    function saveSurveyResponses() {
        let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
        let currentSurvey = JSON.parse(localStorage.getItem("currentSurvey"));
        let userid = localStorage.getItem("currentUserId");
    
        // Retrieve the start time from localStorage and convert it back to a Date object
        let startTime = new Date(localStorage.getItem("surveyStartTime"));
        if (isNaN(startTime)) {
            console.error("Invalid start time");
            return;
        }
    
        // Capture the end time when the user clicks "Ya, isi lagi"
        let endTime = new Date();  // Current time when the survey finishes
    
        // Format start and end time as "hh:mm AM/PM"
        let formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        let formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    
        const uniqueId = Math.floor(Math.random() * 9000000) + 1000000;
    
        if (currentSurvey) {
            // Convert responses to the new format
            let formattedSurvey = {
                tarikh: currentSurvey.answers.date || "-",
                kod: userid || "-",
                zone: currentSurvey.answers.zone || "-",
                dun: currentSurvey.answers.dun || "-",
                umur: currentSurvey.answers.umur ? String(currentSurvey.answers.umur) : "-",
                jantina: currentSurvey.answers.jantina || "-",
                bangsa: currentSurvey.answers.bangsa || "-",
                bangsalain: "", // Empty placeholder
                parlimen: currentSurvey.answers.parlimen || "-",
                pengaruhmediasemasa: currentSurvey.answers.sumberUtama || "-",
                persepsi: currentSurvey.answers.pengaruhPersepsi || "-",
                persepsilain: "", // No direct equivalent
                pengaruhberita: currentSurvey.answers.beritaTerkini || "-",
                faktorlain: currentSurvey.answers.faktorLain || "-",
                pendapatperibadi: currentSurvey.answers.pendapatperibadi || "-", // Empty placeholder
                partiataucalon: currentSurvey.answers.partiDanCalon || "-",
                mengundiAdun: currentSurvey.answers.mengundiAdun || "-",
                tidakundi: "", // No direct equivalent
                cenderunguntukundi: currentSurvey.answers.cenderungUntukMengundi || "-",
                pilihanpartinasional: currentSurvey.answers.partiNasional || "-",
                pilihanpartitempatan: currentSurvey.answers.partiTempatan || "-",
                pemimpinsabah: currentSurvey.answers.pemimpinSabah || "-",
                pemimpinsabahlain: "", // Empty placeholder
                isiboranglagi: currentSurvey.answers.isiBorangLagi || "-",
                responseid: uniqueId,
                starttime: formattedStartTime,  // Store the start time in the desired format (e.g., "8:00 AM")
                endtime: formattedEndTime,      // Store the finish time in the desired format (e.g., "8:30 AM")
            };
    
            // Push formatted data to the array
            allSurveys.push(formattedSurvey);
    
            // Save back to localStorage
            localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
        }
    
        // Reset survey data after finalizing
        localStorage.removeItem("currentSurvey");
        localStorage.removeItem("surveyStartTime");  // Clean up the start time after finishing
    }
    
    // function displayAllSurveyResponses(hideTable = false) {


    //     document.getElementById("table-container")?.remove();

    //     // let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
    //     let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];

    //     allSurveys = allSurveys.map(survey => {
    //         return survey.answers ? survey.answers : survey; // Handles both old & new formats
    //     });

    //     const tableDiv = document.createElement("div");
    //     tableDiv.id = "table-container";
    //     tableDiv.style.display = hideTable ? "none" : "block"; 

    //     const table = document.createElement("table");
    //     table.style.width = "100%";
    //     table.style.borderCollapse = "collapse";

    //     const headers = ["Tarikh", "Parlimen", "Dun", "Umur", "Jantina", "Bangsa", "Actions"];
    //     table.innerHTML = `<tr>${headers.map(h => `<th style='border:1px solid #ddd;padding:8px;font-weight:bold;'>${h}</th>`).join('')}</tr>`;

    //     allSurveys.forEach((survey, index) => {
    //         const row = document.createElement("tr");
    //         ["date", "parlimen", "dun", "umur", "jantina", "bangsa"].forEach(q => {
    //             row.innerHTML += `<td style='border:1px solid #ddd;padding:8px;'>${survey.answers[q] || "-"}</td>`;
    //         });
    //         row.innerHTML += `<td style='padding:8px;'><button style='color:white;background:red;padding:5px 10px;cursor:pointer;' onclick='deleteSurveyResponse(${index})'>Delete</button></td>`;
    //         table.appendChild(row);
    //     });

    //     tableDiv.appendChild(table);
    //     surveyContainer.appendChild(tableDiv);

    //     let toggleButton = document.getElementById("toggle-table-button");
    //     if (!toggleButton) {
    //         toggleButton = document.createElement("button");
    //         toggleButton.id = "toggle-table-button";
    //         toggleButton.textContent = "Show Table";
    //         toggleButton.classList.add("survey-option");
    //         toggleButton.style.marginBottom = "10px";
    //         surveyContainer.insertBefore(toggleButton, tableDiv);
    //     }

    //     toggleButton.onclick = function () {
    //         const isHidden = tableDiv.style.display === "none";
    //         tableDiv.style.display = isHidden ? "block" : "none";
    //         toggleButton.textContent = isHidden ? "Hide Table" : "Show Table";
    //     };

    //     downloadInExcelDoc(true) //Download excel button
    // }


    function displayAllSurveyResponses(hideTable = false) {
        document.getElementById("table-container")?.remove();
    
        let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
    
        // Ensure compatibility with both formats
        allSurveys = allSurveys.map(survey => {
            return survey.answers ? survey.answers : survey; // Converts old format to match new
        });
    
        const tableDiv = document.createElement("div");
        tableDiv.id = "table-container";
        tableDiv.style.display = hideTable ? "none" : "block"; 
    
        const table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
    
        // Headers adapted to the new format
        const headers = ["Tarikh", "Zone", "Parlimen", "Dun", "Umur", "Jantina", "Bangsa", "Actions"];
        table.innerHTML = `<tr>${headers.map(h => `<th style='border:1px solid #ddd;padding:8px;font-weight:bold;'>${h}</th>`).join('')}</tr>`;
    
        allSurveys.forEach((survey, index) => {
            const row = document.createElement("tr");
    
            // Adjust field mappings for new format
            const values = [
                survey.tarikh || survey.answers?.date || "-",  // "tarikh" in new, "date" in old
                survey.zone || survey.answers?.zone || "-",
                survey.parlimen || survey.answers?.parlimen || "-",
                survey.dun || survey.answers?.dun || "-",
                survey.umur || survey.answers?.umur || "-",
                survey.jantina || survey.answers?.jantina || "-",
                survey.bangsa || survey.answers?.bangsa || "-"
            ];
    
            row.innerHTML = values.map(value => `<td style='border:1px solid #ddd;padding:8px;'>${value}</td>`).join('');
            
            // Add delete button
            row.innerHTML += `<td style='padding:8px;'><button style='color:white;background:red;padding:5px 10px;cursor:pointer;' onclick='deleteSurveyResponse(${index})'>Delete</button></td>`;
            
            table.appendChild(row);
        });
    
        tableDiv.appendChild(table);
        surveyContainer.appendChild(tableDiv);
    
        let toggleButton = document.getElementById("toggle-table-button");
        if (!toggleButton) {
            toggleButton = document.createElement("button");
            toggleButton.id = "toggle-table-button";
            toggleButton.textContent = "Paparkan Jadual";
            toggleButton.style.backgroundColor = ""
            toggleButton.classList.add("survey-option");
            toggleButton.style.marginBottom = "10px";
            surveyContainer.insertBefore(toggleButton, tableDiv);
        }
    
        toggleButton.onclick = function () {
            const isHidden = tableDiv.style.display === "none";
            tableDiv.style.display = isHidden ? "block" : "none";
            toggleButton.textContent = isHidden ? "Sembuyikan Jadual" : "Paparkan Jadual";
        };
            // Fix: Ensure the "Push Database" button is added only once
        if (!document.getElementById("push-database")) {
            pushToDatabaseButton();
        }

        downloadInExcelDoc(true); // Ensure Excel download button appears
    }
    

    window.deleteSurveyResponse = function (index) {
        let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
        allSurveys.splice(index, 1);
        localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
        displayAllSurveyResponses();
    };



//FUNCTION : ONCE THE SURVEY ANSWERS ARE STORED IN THE LOCAL DATABASE, BY CLICK THE "SIMPAN DATA" BUTTON, IT WILL PUSH TO THE ACTUAL DATABASE
    function pushToDatabaseButton(){
        const data = JSON.parse(localStorage.getItem("allSurveyResponses"));
    
        if (!document.getElementById("pushDatabase")) {
            const pushDatabase = document.createElement("button");
            pushDatabase.id = "push-database";
            pushDatabase.textContent = "Simpan Data";
            pushDatabase.classList.add("survey-option"); 
            pushDatabase.style.marginTop = "10px";
    
            // When clicked, reset and go back to ID input
            pushDatabase.addEventListener("click", () => {
    
                if (data && Array.isArray(data) && data.length > 0){
                    sendDataToBackend(data)
    
                    .then(() => {
                        alert("Successfully! All data has been saved. ");
                        localStorage.removeItem("allSurveyResponses");
                        document.getElementById("table-container").innerHTML = '';
                        console.log("item removed");
                    })
                    .catch(() => {
                        alert("Error! Some data failed to save.");
                        console.error('Error sending data to one or more items');
                    });
                } else {
                    alert("No valid data found in localStorage");
                }
            });
    
            // Append the button to the document body or a specific element
            document.getElementById("survey-container").appendChild(pushDatabase);
    
        }
    }
    

    async function sendDataToBackend(data){
        try {
            // Assuming this is the correct endpoint
            const response = await fetch('https://atiqahst-github-io.onrender.com/testResponse', {
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

    function redoSurvey() {

        if (!document.getElementById("redo-survey")) {
            const redoSurvey = document.createElement("button");
            redoSurvey.id = "redo-survey"   ;
            redoSurvey.textContent = "Padam Mesej & Ulangi Tinjauan";
            redoSurvey.classList.add("survey-option"); 
            redoSurvey.style.marginTop = "10px";
    
            // When clicked, reset and go back to ID input
            redoSurvey.addEventListener("click", () => {

                const messageView = document.getElementById("message-view");
                const surveyContainer = document.getElementById("survey-container");
            
                // Clear the message view (any previous messages)
                messageView.innerHTML = "";
            
                // Clear survey container (e.g., remove any previously shown questions or answers)
                surveyContainer.innerHTML = "";

                localStorage.setItem('totalRespondents', 0); // Reset count to zero in localStorage
                
                localStorage.removeItem("currentSurvey"); // Clear current survey
                showIdInput(); // Go back to the ID input screen
            });
    
            // Append to the survey container
            document.getElementById("survey-container").appendChild(redoSurvey);
        }
    }
    

    // function downloadInExcelDoc(){

    //     if(!document.getElementById("download-excel")){
    //         const downloadExcelDocButton = document.createElement("button");
    //         downloadExcelDocButton.id = "download-excel";
    //         downloadExcelDocButton.textContent = "Download in Excel";
    //         downloadExcelDocButton.classList.add("survey-option");
    //         downloadExcelDocButton.style.marginTop = "10px";

    //         downloadExcelDocButton.addEventListener("click", function() {

    //             let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];

    //             if (allSurveys.length === 0){
    //                 alert ("No survey data available to download");
    //                 return;
    //             }
                
    //             const headers = ["Kod", "Tarikh", "Zone", "Parlimen", "DUN", "Umur", "Jantina", "Bangsa", "Sumber Utama", "Pengaruh Persepsi", "Berita Terkini", "Faktor Lain", "Parti/Calon", "Mengundi Adun", "Cedurung Untuk Menundi", "Parti Nasional", "Parti Tempatan", "Pemimpin Sabah"];
    //             const data = allSurveys.map (survey => [
    //                 survey.userId ? survey.userId : (survey.answers.userId || "-"),
    //                 survey.answers.date || "-",
    //                 survey.answers.zone || "-",
    //                 survey.answers.parlimen || "-",
    //                 survey.answers.dun || "-",
    //                 survey.answers.umur || "-",
    //                 survey.answers.jantina || "-",
    //                 survey.answers.bangsa || "-",
    //                 survey.answers.sumberUtama || "-",
    //                 survey.answers.pengaruhPersepsi || "-",
    //                 survey.answers.beritaTerkini || "-",
    //                 survey.answers.faktorLain || "-",
    //                 survey.answers.partiDanCalon || "-",
    //                 survey.answers.mengundiAdun || "-",
    //                 survey.answers.cendurungUntukMenundi ||"-",
    //                 survey.answers.partiNasional || "-", 
    //                 survey.answers.partiTempatan || "-",
    //                 survey.answers.pemimpinSabah || "-"
    //             ]);
            

    //             const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    //             const wb = XLSX.utils.book_new();
    //             XLSX.utils.book_append_sheet(wb, ws, "Survey Data");
    //             XLSX.writeFile(wb, "Latest_Data_2025.xlsx");
    //         });

    //         surveyContainer.appendChild(downloadExcelDocButton);
    //     }
    // }

    function downloadInExcelDoc() {
        if (!document.getElementById("download-excel")) {
            const downloadExcelDocButton = document.createElement("button");
            downloadExcelDocButton.id = "download-excel";
            downloadExcelDocButton.textContent = "Muat Turun Dalam Excel";
            downloadExcelDocButton.classList.add("survey-option");
            downloadExcelDocButton.style.marginTop = "10px";
    
            downloadExcelDocButton.addEventListener("click", function () {
                // Ensure XLSX library is loaded
                if (typeof XLSX === "undefined") {
                    alert("Error: XLSX library is missing. Please include the script.");
                    console.error("XLSX library not found. Make sure to include it in your HTML.");
                    return;
                }
    
                let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
    
                if (allSurveys.length === 0) {
                    alert("No survey data available to download");
                    return;
                }
    
                // Define headers
                const headers = [
                    "Kod", "Tarikh", "Zone", "Parlimen", "DUN", "Umur", "Jantina", "Bangsa",
                    "Sumber Utama", "Pengaruh Persepsi", "Berita Terkini", "Faktor Lain",
                    "Parti/Calon", "Mengundi Adun", "Cenderung Untuk Menundi", "Parti Nasional",
                    "Parti Tempatan", "Pemimpin Sabah", "Response ID"
                ];
    
                // Convert survey data
                const data = allSurveys.map(survey => {
                    let s = survey.answers ? survey.answers : survey;
    
                    return [
                        s.kod || "-",
                        s.tarikh || s.date || "-",
                        s.zone || "-",
                        s.parlimen || "-",
                        s.dun || "-",
                        s.umur || "-",
                        s.jantina || "-",
                        s.bangsa || "-",
                        s.pengaruhmediasemasa || "-",
                        s.persepsi || "-",
                        s.pengaruhberita || "-",
                        s.faktorlain || "-",
                        s.partiataucalon || "-",
                        s.mengundiAdun || "-",
                        s.cenderunguntukundi || s.cenderungUntukMengundi || "-",
                        s.pilihanpartinasional || "-",
                        s.pilihanpartitempatan || "-",
                        s.pemimpinsabah || "-",
                        s.responseid || "-"
                    ];
                });
    
                // Generate and download Excel file
                try {
                    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "Survey Data");
                    XLSX.writeFile(wb, "Latest_Data_2025.xlsx");
                } catch (error) {
                    console.error("Error creating Excel file:", error);
                    alert("An error occurred while generating the Excel file.");
                }
            });
    
            // Ensure surveyContainer exists before appending
            if (!surveyContainer) {
                console.error("surveyContainer not found!");
                return;
            }
    
            surveyContainer.appendChild(downloadExcelDocButton);
        }
    }
    showIdInput()

});

// USE THIS CODE IF YOU MESSED ON THE LATEST ONE 22.03.2025
// import { surveyQuestions } from "./listOfQuestions.js";

// document.addEventListener("DOMContentLoaded", function () {
//     const surveyContainer = document.getElementById("survey-container");
//     let currentQuestionIndex = 0;
//     let currentUserId = localStorage.getItem("currentUserId") || null; // Get ID if stored

//     function showIdInput() {
//         surveyContainer.innerHTML = "";

//         const questionTitle = document.createElement("p");
//         questionTitle.textContent = "Sila masukkan kod anda untuk memulakan kaji selidik:";
//         questionTitle.style.textAlign = "center";

//         const inputField = document.createElement("input");
//         inputField.type = "text";
//         inputField.placeholder = "Masukkan ID anda...";
//         inputField.classList.add("custom-input");

//         if (currentUserId) inputField.value = currentUserId; // Auto-fill if ID exist

//         const nextButton = document.createElement("button");
//         nextButton.textContent = "Next";
//         nextButton.classList.add("survey-option");
//         nextButton.addEventListener("click", () => {
//             if (inputField.value.trim()) {
//                 currentUserId = inputField.value.trim(); // Store the entered ID
//                 localStorage.setItem("currentUserId", currentUserId); // Store ID permanently
//                 startSurvey();
//             } else {
//                 alert("Sila masukkan ID sebelum meneruskan.");
//             }
//         });

//         surveyContainer.append(questionTitle, inputField, nextButton);
//     }

//     function startSurvey() {
//         currentQuestionIndex = 0;
//         showQuestion(currentQuestionIndex);
//     }

//     function showQuestion(index) {
//         if (index >= surveyQuestions.length) {
//             surveyContainer.innerHTML = "<h3>Terima kasih kerana menjawab kaji selidik ini!</h3>";
//             saveSurveyResponses();
//             displayAllSurveyResponses(true); // Ensure the table appears
//             return;
//         }

//         const question = surveyQuestions[index];
//         surveyContainer.innerHTML = "";

//         const questionDiv = document.createElement("div");
//         questionDiv.classList.add("survey-question");


//         if (question.picture?.trim()) {
//             const img = document.createElement("img");
//             Object.assign(img, {
//                 src: question.picture,
//                 alt: "IDS Logo",
//                 style: "width:30%;display:block;margin:auto;margin-bottom:10px;"
//             });
//             questionDiv.appendChild(img);
//         }

//         const textElement = document.createElement("p");
//         textElement.textContent = question.text;
//         questionDiv.appendChild(textElement);

//         // Create the Previous Button if it's not the first question
//         if (index > 1) {
//             const backButton = document.createElement("button");
//             backButton.textContent = "Back";
//             backButton.classList.add("previous-button"); // Apply custom class
//             backButton.addEventListener("click", () => {
//                 showQuestion(index - 1); // Show the previous question
//             });
//             surveyContainer.appendChild(backButton);
//         }


//         if (question.id === "umur") {  
//             showAgeInput(question.text, question.id, index + 1);
//         }  
//         else {
//             const optionsDiv = document.createElement("div");
//             optionsDiv.classList.add("options-container");

//             question.options.forEach(option => {
//                 const button = document.createElement("button");
                
//                 // Check if the question is about "parlimen" and has a code
//                 if (question.id === "parlimen" && option.code) {
//                     button.textContent = `${option.name} (${option.code})`; // Show name + code
//                 } else {
//                     button.textContent = option.name || option.code; // Default behavior for other questions
//                 }
                
//                 button.classList.add("survey-option");
//                 button.addEventListener("click", () => handleOptionClick(question, option, index));
//                 optionsDiv.appendChild(button);
//             });

//             surveyContainer.append(questionDiv, optionsDiv);
//             // showTranslateButton(); // Call this function when loading the survey
//         }
//     }

//     function handleOptionClick(question, option, index) {
        
//         if(option.name === "Lain - Lain") {
//             showInputField(question.text, question.id, index + 1);
//             //For the last question of the survey, a condition of ya and tidak...
//         } else if (question.id === "isiBorangLagi" && option.name.toLowerCase() === "ya, isi lagi") {
//             saveSurveyResponses();//Save the response and..
//             showQuestion(1); //Restart form parlimen with the same ID
            
//         } else if (question.id === "isiBorangLagi" && option.name.toLowerCase() === "tidak") {
//             //currentUserId = null; // Reset to new id for the next survey
//             //localStorage.removeItem("currentUserId");
//             saveSurveyResponses();
//             showIdInput();
//             surveyContainer.innerHTML = "<h3>Terima kasih diatas kerjasama anda dalam menyertai kaji selidik ini! <br><br> Sekian dan Terima Kasih. <br><br> SABAH MAJU JAYA!<br><br> </h3>";
//             displayAllSurveyResponses(true);
//             redoSurvey();

//         //Conditions of where the user is in the Question of "Cendurung Untuk Menundi"

//         } else if (question.id === "cendurungUntukMenundi") {  
//             // Custom flow based on user selection
//             if (option.name === "Parti National (BN, PH...)") {
//                 showQuestion(index + 1); // Move to 'Parti Tempatan' options
//             } else if (option.name === "Parti Tempatan (PRGS, WARISAN...)") {
//                 showQuestion(index + 2); // Skip Parti Nasional and go to Parti Tempatan
//             } else if (option.name === "Tiada Kecendurungan") {
//                 showQuestion(index + 3); //Skip to Pemimpin Sabah Options
//             }

//         } else {
//             handleAnswer(question.id, option);
//             question.id === "parlimen" && option.dun
//                 ? showDUNOptions(option.dun, index + 1)
//                 : showQuestion(index + 1);
//         }
//     }

//     function showInputField(questionText, questionId, nextIndex) {
//         surveyContainer.innerHTML = ""; 

//         const questionTitle = document.createElement("h3");
//         questionTitle.textContent = questionText;
//         questionTitle.style.textAlign = "center";

//         const inputField = document.createElement("input");
//         inputField.type = "text";
//         inputField.placeholder = "Sila masukkan jawapan anda...";
//         inputField.classList.add("custom-input");

//         const nextButton = document.createElement("button");
//         nextButton.textContent = "Next";
//         nextButton.classList.add("survey-option");
//         nextButton.addEventListener("click", () => {
//             if (inputField.value.trim()) {
//                 handleAnswer(questionId, { name: inputField.value.trim() });
//                 showQuestion(nextIndex);
//             } else alert("Sila masukkan jawapan sebelum meneruskan.");
//         });

//         surveyContainer.append(questionTitle, inputField, nextButton);
//     }

//     function showDUNOptions(dunList, nextIndex) {
//         surveyContainer.innerHTML = "<h3>Sila pilih DUN anda:</h3>";
//         dunList.forEach(dun => {
//             const button = document.createElement("button");
//             button.textContent = dun;
//             button.classList.add("survey-option");
//             button.addEventListener("click", () => {
//                 handleAnswer("dun", { name: dun });
//                 showQuestion(nextIndex);
//             });
//             surveyContainer.appendChild(button);

//                 // ✅ Add "Previous" button below the options
//             const backButton = document.createElement("button");
//             backButton.textContent = "Previous";
//             backButton.classList.add("previous-button"); // Apply custom class
//             backButton.classList.add("survey-option");
//             backButton.addEventListener("click", () => {
//                 showQuestion(nextIndex - 1); // Go back to the "Parlimen" selection
//     });

//         });
        
//     }
    

//     function showAgeInput(questionText, questionId, nextIndex) {
//         surveyContainer.innerHTML = ""; 

//         const questionTitle = document.createElement("h3");
//         questionTitle.textContent = questionText;
//         questionTitle.style.textAlign = "center";

//         const inputField = document.createElement("input");
//         inputField.type = "text";
//         inputField.min = 18;
//         inputField.max = 100;
//         inputField.placeholder = "Masukkan umur anda (18-100)";
//         inputField.classList.add("custom-input");

//         const submitButton = document.createElement("button");
//         submitButton.textContent = "Submit";
//         submitButton.classList.add("survey-option");

//         submitButton.addEventListener("click", () => {
//             const age = parseInt(inputField.value.trim());
//             if (age < 18){
//                 alert("Minta maaf, umur 18 tahun kebawah tidak mendapat meneruskan survey ini. Sila cuba lagi")
//             }

//             else if (age > 100){
//                 alert("Minta maaf, umur 100 tahun keatas tidak mendapat meneruskan survey ini. Sila cuba lagi")
//             }
//             else if (age >= 18 && age <= 100) {
//                 handleAnswer(questionId, { name: age });
//                 showQuestion(nextIndex);
//             } else {
//                 alert("Sila masukkan umur. Pastikan umur anda antara 18 hingga 100.");
//             }
//         });

//         // ✅ Add "Back" button
//         const backButton = document.createElement("button");
//         backButton.textContent = "Back";
//         backButton.classList.add("previous-button"); // Apply custom class
//         backButton.classList.add("survey-option");

//         backButton.addEventListener("click", () => {
//         showQuestion(nextIndex - 2); // Go back to previous Parliment Question
//         });

//         surveyContainer.append(questionTitle, inputField, submitButton, backButton);
//     }

//     function handleAnswer(questionId, selectedOption) {
//         let survey = JSON.parse(localStorage.getItem("currentSurvey")) || { userId: Date.now(), answers: {} };
//         survey.answers["date"] = new Date().toLocaleDateString("en-GB");
//         survey.answers[questionId] = selectedOption.name || selectedOption.code;
//         localStorage.setItem("currentSurvey", JSON.stringify(survey));
//     }

//     function saveSurveyResponses() {
//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         let currentSurvey = JSON.parse(localStorage.getItem("currentSurvey"));

//         currentSurvey.userId = currentUserId;

//         if (currentSurvey) {
//             allSurveys.push(currentSurvey);
//             localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
//             localStorage.removeItem("currentSurvey");
//         }
//     }

//     function displayAllSurveyResponses(hideTable = false) {
//         document.getElementById("table-container")?.remove();

//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         const tableDiv = document.createElement("div");
//         tableDiv.id = "table-container";
//         tableDiv.style.display = hideTable ? "none" : "block"; 

//         const table = document.createElement("table");
//         table.style.width = "100%";
//         table.style.borderCollapse = "collapse";

//         const headers = ["Tarikh", "Parlimen", "Dun", "Umur", "Jantina", "Bangsa", "Actions"];
//         table.innerHTML = `<tr>${headers.map(h => `<th style='border:1px solid #ddd;padding:8px;font-weight:bold;'>${h}</th>`).join('')}</tr>`;

//         allSurveys.forEach((survey, index) => {
//             const row = document.createElement("tr");
//             ["date", "parlimen", "dun", "umur", "jantina", "bangsa"].forEach(q => {
//                 row.innerHTML += `<td style='border:1px solid #ddd;padding:8px;'>${survey.answers[q] || "-"}</td>`;
//             });
//             row.innerHTML += `<td style='padding:8px;'><button style='color:white;background:red;padding:5px 10px;cursor:pointer;' onclick='deleteSurveyResponse(${index})'>Delete</button></td>`;
//             table.appendChild(row);
//         });

//         tableDiv.appendChild(table);
//         surveyContainer.appendChild(tableDiv);

//         let toggleButton = document.getElementById("toggle-table-button");
//         if (!toggleButton) {
//             toggleButton = document.createElement("button");
//             toggleButton.id = "toggle-table-button";
//             toggleButton.textContent = "Show Table";
//             toggleButton.classList.add("survey-option");
//             toggleButton.style.marginBottom = "10px";
//             surveyContainer.insertBefore(toggleButton, tableDiv);
//         }

//         toggleButton.onclick = function () {
//             const isHidden = tableDiv.style.display === "none";
//             tableDiv.style.display = isHidden ? "block" : "none";
//             toggleButton.textContent = isHidden ? "Hide Table" : "Show Table";
//         };

//         downloadInExcelDoc(true) //Download excel button
//     }

//     window.deleteSurveyResponse = function (index) {
//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         allSurveys.splice(index, 1);
//         localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
//         displayAllSurveyResponses();
//     };

//     function redoSurvey() {
//         if (!document.getElementById("redo-survey")) {
//             const redoSurvey = document.createElement("button");
//             redoSurvey.id = "redo-survey";
//             redoSurvey.textContent = "Redo Survey";
//             redoSurvey.classList.add("survey-option"); 
//             redoSurvey.style.marginTop = "10px";
    
//             // When clicked, reset and go back to ID input
//             redoSurvey.addEventListener("click", () => {
//                 localStorage.removeItem("currentSurvey"); // Clear current survey
//                 showIdInput(); // Go back to the ID input screen
//             });
    
//             // Append to the survey container
//             document.getElementById("survey-container").appendChild(redoSurvey);
//         }
//     }

//     function downloadInExcelDoc(){
//         if(!document.getElementById("download-excel")){
//             const downloadExcelDocButton = document.createElement("button");
//             downloadExcelDocButton.id = "download-excel";
//             downloadExcelDocButton.textContent = "Download in Excel";
//             downloadExcelDocButton.classList.add("survey-option");
//             downloadExcelDocButton.style.marginTop = "10px";

//             downloadExcelDocButton.addEventListener("click", function() {

//                 let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];

//                 if (allSurveys.length === 0){
//                     alert ("No survey data available to download");
//                     return;
//                 }
                
//                 const headers = ["Tarikh", "Parlimen", "DUN", "Umur", "Jantina", "Bangsa"];
//                 const data = allSurveys.map (survey => [
//                     survey.answers.date || "-",
//                     survey.answers.parlimen || "-",
//                     survey.answers.dun || "-",
//                     survey.answers.umur || "-",
//                     survey.answers.jantina || "-",
//                     survey.answers.bangsa || "-",
//                 ]);

//                 const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
//                 const wb = XLSX.utils.book_new();
//                 XLSX.utils.book_append_sheet(wb, ws, "Survey Data");
//                 XLSX.writeFile(wb, "survey_data.xlsx");
//             });

//             surveyContainer.appendChild(downloadExcelDocButton);
//         }
//     }
//     showIdInput();

// });


//CHAT DESIGN
// import { surveyQuestions } from "./listOfQuestions.js";

// document.addEventListener("DOMContentLoaded", function () {
//     const surveyContainer = document.getElementById("survey-container");
//     let currentQuestionIndex = 0;

    

//     function showQuestion(index) {
//         if (index >= surveyQuestions.length) {
//             surveyContainer.innerHTML = "<h3>Terima kasih kerana menjawab kaji selidik ini!</h3>";
//             saveSurveyResponses();
//             displayAllSurveyResponses(true); // Ensure the table appears
//             return;
//         }
 
//         const question = surveyQuestions[index];
//         surveyContainer.innerHTML = "";

//         const questionDiv = document.createElement("div");
//         questionDiv.classList.add("survey-question");

//         if (question.picture?.trim()) {
//             const img = document.createElement("img");
//             Object.assign(img, {
//                 src: question.picture,
//                 alt: "IDS Logo",
//                 style: "width:30%;display:block;margin:auto;margin-bottom:10px;"
//             });
//             questionDiv.appendChild(img);
//         }

//         const textElement = document.createElement("h3");
//         textElement.textContent = question.text;
//         questionDiv.appendChild(textElement);

//         if (question.id === "umur") {  
//             showAgeInput(question.text, question.id, index + 1);
//         } else {
//             const optionsDiv = document.createElement("div");
//             optionsDiv.classList.add("options-container");

//             question.options.forEach(option => {
//                 const button = document.createElement("button");
//                 button.textContent = option.name || option.code;
//                 button.classList.add("survey-option");
//                 button.addEventListener("click", () => handleOptionClick(question, option, index));
//                 optionsDiv.appendChild(button);
//             });

//             surveyContainer.append(questionDiv, optionsDiv);
//         }
//     }

//     function handleOptionClick(question, option, index) {
//         if (option.name === "Lain - Lain") {
//             showInputField(question.text, question.id, index + 1);
//             //For the last question of the survey, a condition of ya and tidak...
//         } else if (question.id === "isiBorangLagi" && option.name.toLowerCase() === "ya, isi lagi") {
//             saveSurveyResponses();//Save the response and..
//             showQuestion(0); // Restart from parlimen
//         } else if (question.id === "isiBorangLagi" && option.name.toLowerCase() === "tidak") {
//             saveSurveyResponses();
//             surveyContainer.innerHTML = "<h3>Terima kasih kerana menjawab kaji selidik ini!</h3>";
//             displayAllSurveyResponses(true);
//         } else {
//             handleAnswer(question.id, option);
//             question.id === "parlimen" && option.dun
//                 ? showDUNOptions(option.dun, index + 1)
//                 : showQuestion(index + 1);
//         }
//     }

//     function showInputField(questionText, questionId, nextIndex) {
//         surveyContainer.innerHTML = ""; 

//         const questionTitle = document.createElement("h3");
//         questionTitle.textContent = questionText;
//         questionTitle.style.textAlign = "center";

//         const inputField = document.createElement("input");
//         inputField.type = "text";
//         inputField.placeholder = "Sila masukkan jawapan anda...";
//         inputField.classList.add("custom-input");

//         const nextButton = document.createElement("button");
//         nextButton.textContent = "Next";
//         nextButton.classList.add("survey-option");
//         nextButton.addEventListener("click", () => {
//             if (inputField.value.trim()) {
//                 handleAnswer(questionId, { name: inputField.value.trim() });
//                 showQuestion(nextIndex);
//             } else alert("Sila masukkan jawapan sebelum meneruskan.");
//         });

//         surveyContainer.append(questionTitle, inputField, nextButton);
//     }

//     function showDUNOptions(dunList, nextIndex) {
//         surveyContainer.innerHTML = "<h3>Sila pilih DUN anda:</h3>";
//         dunList.forEach(dun => {
//             const button = document.createElement("button");
//             button.textContent = dun;
//             button.classList.add("survey-option");
//             button.addEventListener("click", () => {
//                 handleAnswer("dun", { name: dun });
//                 showQuestion(nextIndex);
//             });
//             surveyContainer.appendChild(button);
//         });
//     }

//     function showAgeInput(questionText, questionId, nextIndex) {
//         surveyContainer.innerHTML = ""; 

//         const questionTitle = document.createElement("h3");
//         questionTitle.textContent = questionText;
//         questionTitle.style.textAlign = "center";

//         const inputField = document.createElement("input");
//         inputField.type = "text";
//         inputField.min = 18;
//         inputField.max = 100;
//         inputField.placeholder = "Masukkan umur anda (18-100)";
//         inputField.classList.add("custom-input");

//         const submitButton = document.createElement("button");
//         submitButton.textContent = "Submit";
//         submitButton.classList.add("survey-option");

//         submitButton.addEventListener("click", () => {
//             const age = parseInt(inputField.value.trim());
//             if (age >= 18 && age <= 100) {
//                 handleAnswer(questionId, { name: age });
//                 showQuestion(nextIndex);
//             } else {
//                 alert("Sila masukkan umur antara 18 hingga 100.");
//             }
//         });

//         surveyContainer.append(questionTitle, inputField, submitButton);
//     }

//     function handleAnswer(questionId, selectedOption) {
//         let survey = JSON.parse(localStorage.getItem("currentSurvey")) || { userId: Date.now(), answers: {} };
//         survey.answers["date"] = new Date().toLocaleDateString("en-GB");
//         survey.answers[questionId] = selectedOption.name || selectedOption.code;
//         localStorage.setItem("currentSurvey", JSON.stringify(survey));
//     }

//     function saveSurveyResponses() {
//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         let currentSurvey = JSON.parse(localStorage.getItem("currentSurvey"));
//         if (currentSurvey) {
//             allSurveys.push(currentSurvey);
//             localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
//             localStorage.removeItem("currentSurvey");
//         }
//     }

//     function displayAllSurveyResponses(hideTable = false) {
//         document.getElementById("table-container")?.remove();

//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         const tableDiv = document.createElement("div");
//         tableDiv.id = "table-container";
//         tableDiv.style.display = hideTable ? "none" : "block"; 

//         const table = document.createElement("table");
//         table.style.width = "100%";
//         table.style.borderCollapse = "collapse";

//         const headers = ["Tarikh", "Parlimen", "Dun", "Umur", "Jantina", "Bangsa", "Actions"];
//         table.innerHTML = `<tr>${headers.map(h => `<th style='border:1px solid #ddd;padding:8px;font-weight:bold;'>${h}</th>`).join('')}</tr>`;

//         allSurveys.forEach((survey, index) => {
//             const row = document.createElement("tr");
//             ["date", "parlimen", "dun", "umur", "jantina", "bangsa"].forEach(q => {
//                 row.innerHTML += `<td style='border:1px solid #ddd;padding:8px;'>${survey.answers[q] || "-"}</td>`;
//             });
//             row.innerHTML += `<td style='padding:8px;'><button style='color:white;background:red;padding:5px 10px;cursor:pointer;' onclick='deleteSurveyResponse(${index})'>Delete</button></td>`;
//             table.appendChild(row);
//         });

//         tableDiv.appendChild(table);
//         surveyContainer.appendChild(tableDiv);

//         let toggleButton = document.getElementById("toggle-table-button");
//         if (!toggleButton) {
//             toggleButton = document.createElement("button");
//             toggleButton.id = "toggle-table-button";
//             toggleButton.textContent = "Show Table";
//             toggleButton.classList.add("survey-option");
//             toggleButton.style.marginBottom = "10px";
//             surveyContainer.insertBefore(toggleButton, tableDiv);
//         }

//         toggleButton.onclick = function () {
//             const isHidden = tableDiv.style.display === "none";
//             tableDiv.style.display = isHidden ? "block" : "none";
//             toggleButton.textContent = isHidden ? "Hide Table" : "Show Table";
//         };
//     }

//     window.deleteSurveyResponse = function (index) {
//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         allSurveys.splice(index, 1);
//         localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
//         displayAllSurveyResponses();
//     };

//     showQuestion(currentQuestionIndex);

// });






// USE THIS FOR EMERGENCIES
// import { surveyQuestions } from "./listOfQuestions.js";

// document.addEventListener("DOMContentLoaded", function () {
//     const surveyContainer = document.getElementById("survey-container");
//     let currentQuestionIndex = 0;

    

//     function showQuestion(index) {
//         if (index >= surveyQuestions.length) {
//             surveyContainer.innerHTML = "<h3>Terima kasih kerana menjawab kaji selidik ini!</h3>";
//             saveSurveyResponses();
//             displayAllSurveyResponses(true); // Ensure the table appears
//             return;
//         }

//         const question = surveyQuestions[index];
//         surveyContainer.innerHTML = "";

//         const questionDiv = document.createElement("div");
//         questionDiv.classList.add("survey-question");

//         if (question.picture?.trim()) {
//             const img = document.createElement("img");
//             Object.assign(img, {
//                 src: question.picture,
//                 alt: "IDS Logo",
//                 style: "width:30%;display:block;margin:auto;margin-bottom:10px;"
//             });
//             questionDiv.appendChild(img);
//         }

//         const textElement = document.createElement("h3");
//         textElement.textContent = question.text;
//         questionDiv.appendChild(textElement);

//         if (question.id === "umur") {  
//             showAgeInput(question.text, question.id, index + 1);
//         } else {
//             const optionsDiv = document.createElement("div");
//             optionsDiv.classList.add("options-container");

//             question.options.forEach(option => {
//                 const button = document.createElement("button");
//                 button.textContent = option.name || option.code;
//                 button.classList.add("survey-option");
//                 button.addEventListener("click", () => handleOptionClick(question, option, index));
//                 optionsDiv.appendChild(button);
//             });

//             surveyContainer.append(questionDiv, optionsDiv);
//         }
//     }

//     function handleOptionClick(question, option, index) {
//         if (option.name === "Lain - Lain") {
//             showInputField(question.text, question.id, index + 1);
//         } else {
//             handleAnswer(question.id, option);
//             question.id === "parlimen" && option.dun
//                 ? showDUNOptions(option.dun, index + 1)
//                 : showQuestion(index + 1);
//         }
//     }

//     function showInputField(questionText, questionId, nextIndex) {
//         surveyContainer.innerHTML = ""; 

//         const questionTitle = document.createElement("h3");
//         questionTitle.textContent = questionText;
//         questionTitle.style.textAlign = "center";

//         const inputField = document.createElement("input");
//         inputField.type = "text";
//         inputField.placeholder = "Sila masukkan jawapan anda...";
//         inputField.classList.add("custom-input");

//         const nextButton = document.createElement("button");
//         nextButton.textContent = "Next";
//         nextButton.classList.add("survey-option");
//         nextButton.addEventListener("click", () => {
//             if (inputField.value.trim()) {
//                 handleAnswer(questionId, { name: inputField.value.trim() });
//                 showQuestion(nextIndex);
//             } else alert("Sila masukkan jawapan sebelum meneruskan.");
//         });

//         surveyContainer.append(questionTitle, inputField, nextButton);
//     }

//     function showDUNOptions(dunList, nextIndex) {
//         surveyContainer.innerHTML = "<h3>Sila pilih DUN anda:</h3>";
//         dunList.forEach(dun => {
//             const button = document.createElement("button");
//             button.textContent = dun;
//             button.classList.add("survey-option");
//             button.addEventListener("click", () => {
//                 handleAnswer("dun", { name: dun });
//                 showQuestion(nextIndex);
//             });
//             surveyContainer.appendChild(button);
//         });
//     }

//     function showAgeInput(questionText, questionId, nextIndex) {
//         surveyContainer.innerHTML = ""; 

//         const questionTitle = document.createElement("h3");
//         questionTitle.textContent = questionText;
//         questionTitle.style.textAlign = "center";

//         const inputField = document.createElement("input");
//         inputField.type = "number";
//         inputField.min = 18;
//         inputField.max = 100;
//         inputField.placeholder = "Masukkan umur anda (18-100)";
//         inputField.classList.add("custom-input");

//         const submitButton = document.createElement("button");
//         submitButton.textContent = "Submit";
//         submitButton.classList.add("survey-option");

//         submitButton.addEventListener("click", () => {
//             const age = parseInt(inputField.value.trim());
//             if (age >= 18 && age <= 100) {
//                 handleAnswer(questionId, { name: age });
//                 showQuestion(nextIndex);
//             } else {
//                 alert("Sila masukkan umur antara 18 hingga 100.");
//             }
//         });

//         surveyContainer.append(questionTitle, inputField, submitButton);
//     }

//     function handleAnswer(questionId, selectedOption) {
//         let survey = JSON.parse(localStorage.getItem("currentSurvey")) || { userId: Date.now(), answers: {} };
//         survey.answers["date"] = new Date().toLocaleDateString("en-GB");
//         survey.answers[questionId] = selectedOption.name || selectedOption.code;
//         localStorage.setItem("currentSurvey", JSON.stringify(survey));
//     }

//     function saveSurveyResponses() {
//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         let currentSurvey = JSON.parse(localStorage.getItem("currentSurvey"));
//         if (currentSurvey) {
//             allSurveys.push(currentSurvey);
//             localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
//             localStorage.removeItem("currentSurvey");
//         }
//     }

//     function displayAllSurveyResponses(hideTable = false) {
//         document.getElementById("table-container")?.remove();

//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         const tableDiv = document.createElement("div");
//         tableDiv.id = "table-container";
//         tableDiv.style.display = hideTable ? "none" : "block"; 

//         const table = document.createElement("table");
//         table.style.width = "100%";
//         table.style.borderCollapse = "collapse";

//         const headers = ["Tarikh", "Parlimen", "Dun", "Umur", "Jantina", "Bangsa", "Actions"];
//         table.innerHTML = `<tr>${headers.map(h => `<th style='border:1px solid #ddd;padding:8px;font-weight:bold;'>${h}</th>`).join('')}</tr>`;

//         allSurveys.forEach((survey, index) => {
//             const row = document.createElement("tr");
//             ["date", "parlimen", "dun", "umur", "jantina", "bangsa"].forEach(q => {
//                 row.innerHTML += `<td style='border:1px solid #ddd;padding:8px;'>${survey.answers[q] || "-"}</td>`;
//             });
//             row.innerHTML += `<td style='padding:8px;'><button style='color:white;background:red;padding:5px 10px;cursor:pointer;' onclick='deleteSurveyResponse(${index})'>Delete</button></td>`;
//             table.appendChild(row);
//         });

//         tableDiv.appendChild(table);
//         surveyContainer.appendChild(tableDiv);

//         let toggleButton = document.getElementById("toggle-table-button");
//         if (!toggleButton) {
//             toggleButton = document.createElement("button");
//             toggleButton.id = "toggle-table-button";
//             toggleButton.textContent = "Show Table";
//             toggleButton.classList.add("survey-option");
//             toggleButton.style.marginBottom = "10px";
//             surveyContainer.insertBefore(toggleButton, tableDiv);
//         }

//         toggleButton.onclick = function () {
//             const isHidden = tableDiv.style.display === "none";
//             tableDiv.style.display = isHidden ? "block" : "none";
//             toggleButton.textContent = isHidden ? "Hide Table" : "Show Table";
//         };
//     }

//     window.deleteSurveyResponse = function (index) {
//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         allSurveys.splice(index, 1);
//         localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
//         displayAllSurveyResponses();
//     };

//     showQuestion(currentQuestionIndex);

// });





// import { surveyQuestions } from "./listOfQuestions.js";

// document.addEventListener("DOMContentLoaded", function () {
//     const surveyContainer = document.getElementById("survey-container");
//     let currentQuestionIndex = 0;

//     function showQuestion(index) {
//         if (index >= surveyQuestions.length) {
//             surveyContainer.innerHTML = "<h3>Terima kasih kerana menjawab kaji selidik ini!</h3>";
//             saveSurveyResponses();
//             displayAllSurveyResponses(true);
//             return;
//         }

//         const question = surveyQuestions[index];
//         surveyContainer.innerHTML = "";

//         const questionDiv = document.createElement("div");
//         questionDiv.classList.add("survey-question");

//         if (question.picture?.trim()) {
//             const img = document.createElement("img");
//             Object.assign(img, {
//                 src: question.picture,
//                 alt: "IDS Logo",
//                 style: "width:30%;display:block;margin:auto;margin-bottom:10px;"
//             });
//             questionDiv.appendChild(img);
//         }

//         const textElement = document.createElement("h3");
//         textElement.textContent = question.text;
//         questionDiv.appendChild(textElement);

//         if (question.id === "umur") {  
//             showAgeInput(question.id, index + 1);
//         } else {
//             const optionsDiv = document.createElement("div");
//             optionsDiv.classList.add("options-container");

//             question.options.forEach(option => {
//                 const button = document.createElement("button");
//                 button.textContent = option.name || option.code;
//                 button.classList.add("survey-option");
//                 button.addEventListener("click", () => handleOptionClick(question, option, index));
//                 optionsDiv.appendChild(button);
//             });

//             surveyContainer.append(questionDiv, optionsDiv);
//         }
//     }

//     function handleOptionClick(question, option, index) {
//         if (option.name === "Lain - Lain") {
//             surveyContainer.innerHTML = "";
//             showInputField(question.id, index + 1);
//         } else {
//             handleAnswer(question.id, option);
//             question.id === "parlimen" && option.dun
//                 ? showDUNOptions(option.dun, index + 1)
//                 : showQuestion(index + 1);
//         }
//     }

//     function showInputField(questionId, nextIndex) {
//         const inputField = document.createElement("input");
//         inputField.type = "text";
//         inputField.placeholder = "Sila masukkan jawapan anda...";
//         inputField.classList.add("custom-input");

//         const nextButton = document.createElement("button");
//         nextButton.textContent = "Next";
//         nextButton.classList.add("survey-option");
//         nextButton.addEventListener("click", () => {
//             if (inputField.value.trim()) {
//                 handleAnswer(questionId, { name: inputField.value.trim() });
//                 showQuestion(nextIndex);
//             } else alert("Sila masukkan jawapan sebelum meneruskan.");
//         });

//         surveyContainer.append(inputField, nextButton);
//     }

//     function showDUNOptions(dunList, nextIndex) {
//         surveyContainer.innerHTML = "<h3>Sila pilih DUN anda:</h3>";
//         dunList.forEach(dun => {
//             const button = document.createElement("button");
//             button.textContent = dun;
//             button.classList.add("survey-option");
//             button.addEventListener("click", () => {
//                 handleAnswer("dun", { name: dun });
//                 showQuestion(nextIndex);
//             });
//             surveyContainer.appendChild(button);
//         });
//     }

//     function showAgeInput(questionId, nextIndex) {
//         const questionTitle = document.createElement("h3");
//         questionTitle.textContent = "Sila masukkan umur anda:";
//         questionTitle.style.textAlign = "center";
  

//         const inputField = document.createElement("input");
//         inputField.type = "text";
//         inputField.min = 18;
//         inputField.max = 100;
//         inputField.placeholder = "Masukkan umur anda (18-100)";
//         inputField.classList.add("custom-input");

//         const submitButton = document.createElement("button");
//         submitButton.textContent = "Submit";
//         submitButton.classList.add("survey-option");

//         submitButton.addEventListener("click", () => {
//             const age = parseInt(inputField.value.trim());
//             if (age >= 18 && age <= 100) {
//                 handleAnswer(questionId, { name: age });
//                 showQuestion(nextIndex);
//             } else {
//                 alert("Sila masukkan umur antara 18 hingga 100.");
//             }
//         });

//         surveyContainer.append(inputField, submitButton);
//     }

//     function handleAnswer(questionId, selectedOption) {
//         let survey = JSON.parse(localStorage.getItem("currentSurvey")) || { userId: Date.now(), answers: {} };
//         survey.answers["date"] = new Date().toLocaleDateString("en-GB");
//         survey.answers[questionId] = selectedOption.name || selectedOption.code;
//         localStorage.setItem("currentSurvey", JSON.stringify(survey));
//     }

//     function saveSurveyResponses() {
//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         let currentSurvey = JSON.parse(localStorage.getItem("currentSurvey"));
//         if (currentSurvey) {
//             allSurveys.push(currentSurvey);
//             localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
//             localStorage.removeItem("currentSurvey");
//         }
//     }

//     function displayAllSurveyResponses(hideTable = false) {
//         document.getElementById("table-container")?.remove();

//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         const tableDiv = document.createElement("div");
//         tableDiv.id = "table-container";
//         tableDiv.style.display = hideTable ? "none" : "block"; 

//         const table = document.createElement("table");
//         table.style.width = "100%";
//         table.style.borderCollapse = "collapse";

//         const headers = ["Tarikh", "Parlimen", "Dun", "Umur", "Jantina", "Bangsa", "Actions"];
//         table.innerHTML = `<tr>${headers.map(h => `<th style='border:1px solid #ddd;padding:8px;font-weight:bold;'>${h}</th>`).join('')}</tr>`;

//         allSurveys.forEach((survey, index) => {
//             const row = document.createElement("tr");
//             ["date", "parlimen", "dun", "umur", "jantina", "bangsa"].forEach(q => {
//                 row.innerHTML += `<td style='border:1px solid #ddd;padding:8px;'>${survey.answers[q] || "-"}</td>`;
//             });
//             row.innerHTML += `<td style='padding:8px;'><button style='color:white;background:red;padding:5px 10px;cursor:pointer;' onclick='deleteSurveyResponse(${index})'>Delete</button></td>`;
//             table.appendChild(row);
//         });

//         tableDiv.appendChild(table);
//         surveyContainer.appendChild(tableDiv);

//         let toggleButton = document.getElementById("toggle-table-button");
//         if (!toggleButton) {
//             toggleButton = document.createElement("button");
//             toggleButton.id = "toggle-table-button";
//             toggleButton.textContent = "Show Table"; 
//             toggleButton.classList.add("survey-option");
//             toggleButton.style.marginBottom = "10px";
//             surveyContainer.insertBefore(toggleButton, tableDiv);
//         }

//         toggleButton.onclick = function () {
//             const isHidden = tableDiv.style.display === "none";
//             tableDiv.style.display = isHidden ? "block" : "none";
//             toggleButton.textContent = isHidden ? "Hide Table" : "Show Table";
//         };
//     }

//     window.deleteSurveyResponse = function (index) {
//         let allSurveys = JSON.parse(localStorage.getItem("allSurveyResponses")) || [];
//         allSurveys.splice(index, 1);
//         localStorage.setItem("allSurveyResponses", JSON.stringify(allSurveys));
//         displayAllSurveyResponses();
//     };

//     showQuestion(currentQuestionIndex);
// });




// BACKUP CODE JUST INCASE!!
// import { surveyQuestions } from "./listOfQuestions.js";

// document.addEventListener("DOMContentLoaded", function () {
//     const surveyContainer = document.getElementById("survey-container");
//     let currentQuestionIndex = 0; // Track the current question index
//     let selectedAnswer = null; // Variable to store the selected answer

//     function showQuestion(index) {
//         if (index >= surveyQuestions.length) {
//             let responses = JSON.parse(localStorage.getItem("surveyResponses")) || {};
//             surveyContainer.innerHTML = "<h3>Terima kasih kerana menjawab kaji selidik ini!</h3>";

//             //Display responses 
//             const responseDiv = document.createElement("div");
//             responseDiv.innerHTML = "<h4> Jawapan Anda: </h4><pre>" + JSON.stringify(responses, null, 2) + "</pre>";
//             surveyContainer.appendChild(responseDiv);

//             return;
            
//         }

      

//         const question = surveyQuestions[index];
//         surveyContainer.innerHTML = ""; // Clear previous content

//         const questionDiv = document.createElement("div");
//         questionDiv.classList.add("survey-question");

//         //Add logo to the beginning of the survey referencing to the listOfQuestions.js. Updated at 20 March 2025
//         if (question.picture && question.picture.trim !== ""){
//             const img = document.createElement("img");
//             img.src = question.picture;
//             img.alt = "IDS Logo";
//             img.style.width = "30%";
//             img.style.display = "block";
//             img.style.marginLeft = "auto";
//             img.style.marginRight = "auto";
//             img.style.marginBottom = "10px";
//             questionDiv.appendChild(img);
//         }
//             // ✅ Use `appendChild` for text instead of `innerHTML` Updated at 20 March 2025.
//             const textElement = document.createElement("h3");
//             textElement.textContent = question.text;
//             questionDiv.appendChild(textElement);

//         // Create container for the options (answers)
//         const optionsDiv = document.createElement("div");
//         optionsDiv.classList.add("options-container");

   

//         // Create and display options as buttons
//         question.options.forEach(option => {
//             const button = document.createElement("button");
//             button.textContent = option.name || option.code;
//             button.classList.add("survey-option");

//             // Add specific behavior based on options
//             button.addEventListener("click", () => {
//                 selectedAnswer = option; // Store the selected answer
//                 handleAnswer(question.id, option);

//                 // If the question is 'parlimen', show corresponding DUN options
//                 if (question.id === "parlimen" && option.dun) {
//                     showDUNOptions(option.dun, index + 1); // Show DUN options after parlimen selection
//                 } else {
//                     // Handle transitions based on other options
//                     if (question.id === "cendurungUntukMenundi") {
//                         if (option.name === "Parti National") {
//                             showQuestion(index + 1); // Go to Parti Nasional question
//                         } else if (option.name === "Parti Tempatan") {
//                             showQuestion(index + 2); // Skip Parti Nasional and go to Parti Tempatan
//                         } else if (option.name === "Tiada Kecendurungan") {
//                             showQuestion(index + 3); // Skip to Pemimpin Sabah
//                         }
//                     } else {
//                         showQuestion(index + 1); // Normal flow to next question
//                     }
//                 }
//             });

//             optionsDiv.appendChild(button);
//         });

//         questionDiv.appendChild(optionsDiv); // Add options to the question container

//         // Create a separate div for Previous and Next buttons
//         const buttonsDiv = document.createElement("div");
//         buttonsDiv.classList.add("buttons-container");

//         // Show Previous Button only if we're not on the first question
//         if (index > 1) {
//             const prevButton = document.createElement("button");
//             prevButton.textContent = "Previous";
//             prevButton.classList.add("survey-option");
//             prevButton.addEventListener("click", () => {
//                 showQuestion(index - 1); // Go to the previous question
//             });
//             buttonsDiv.appendChild(prevButton);
//         }

//         // Append buttons div after options div
//         questionDiv.appendChild(buttonsDiv);

//         surveyContainer.appendChild(questionDiv);
//     }

//     // Function to show DUN options after selecting a parliament
//     function showDUNOptions(dunList, nextQuestionIndex) {
//         surveyContainer.innerHTML = "<h3>Sila pilih DUN anda:</h3>";

//         dunList.forEach(dun => {
//             const button = document.createElement("button");
//             button.textContent = dun;
//             button.classList.add("survey-option");
//             button.addEventListener("click", () => {
//                 handleAnswer("dun", { name: dun });
//                 showQuestion(nextQuestionIndex); // Move to the next question after selecting DUN
//             });
//             surveyContainer.appendChild(button);
//         });
//     }

//     function handleAnswer(questionId, selectedOption) {

//         let surveyResponses = JSON.parse(localStorage.getItem("surveyResponses")) || {};
//         surveyResponses[questionId] = selectedOption.name || selectedOption.code;

//         localStorage.setItem("surveyResponses", JSON.stringify(surveyResponses));

//         console.log(`Answered ${questionId}:`, selectedOption);
//         // Here you can store responses or send to a server if necessary
//     }

//     showQuestion(currentQuestionIndex); // Start with the first question
// });





//IMPORTANT NOTE! : THIS IS THE 1ST VERSION OF THE CODE BEFORE THE NEW VERSION APPPLIES AS SHOWN ABOVE (Not Comment)

// import { surveyQuestions } from "./listOfQuestions.js";

// document.addEventListener("DOMContentLoaded", function () {
//     const surveyContainer = document.getElementById("survey-container");
//     const prevButton = document.getElementById("prev-button");
//     const nextButton = document.getElementById("next-button");

//     let currentQuestionIndex = 0; // Track the current question index
//     let questionHistory = []; // Track previous questions for "Previous" button

//     function showQuestion(index) {
//         if (index >= surveyQuestions.length) {
//             surveyContainer.innerHTML = "<h3>Terima kasih kerana menjawab kaji selidik ini!</h3>";
//             prevButton.style.display = 'none';
//             nextButton.style.display = 'none';
//             return;
//         }

//         const question = surveyQuestions[index];
//         surveyContainer.innerHTML = ""; // Clear previous content

//         const questionDiv = document.createElement("div");
//         questionDiv.classList.add("survey-question");
//         questionDiv.innerHTML = `<h3>${question.text}</h3>`;

//         question.options.forEach(option => {
//             const button = document.createElement("button");
//             button.textContent = option.name || option.code;
//             button.classList.add("survey-option");
//             button.addEventListener("click", () => {
//                 handleAnswer(question.id, option);

//                 // Handle specific logic for different questions
//                 if (question.id === "parlimen" && option.dun) {
//                     // Show DUN options if a Parliament option is selected
//                     showDUNOptions(option.dun, index + 1);
//                 } else if (question.id === "cendurungUntukMenundi" && option.name === "Parti Nasional") {
//                     // Go to Parti Nasional questions if selected
//                     showQuestion(index + 1);  // Proceed to the next question (partiNasional)
//                 } else if (question.id === "cendurungUntukMenundi" && option.name === "Parti Tempatan") {
//                     // Skip Parti Nasional questions and go directly to Parti Tempatan
//                     showQuestion(index + 2);  // Skip the next question (partiNasional)
//                 } else if (question.id === "cendurungUntukMenundi" && option.name === "Tiada Kecendurungan") {
//                     // Skip directly to the final question (pemimpinSabah)
//                     showQuestion(index + 3);  // Skip to pemimpinSabah
//                 } else {
//                     // Default: move to the next question
//                     questionHistory.push(index); // Save question index for "Previous"
//                     showQuestion(index + 1);
//                 }
//             });
//             questionDiv.appendChild(button);
//         });

//         surveyContainer.appendChild(questionDiv);

//         // Update button visibility
//         updateButtons();
//     }

//     // Show DUN options when a Parliament is selected
//     function showDUNOptions(dunList, nextQuestionIndex) {
//         surveyContainer.innerHTML = "<h3>Sila pilih DUN anda:</h3>";

//         dunList.forEach(dun => {
//             const button = document.createElement("button");
//             button.textContent = dun;
//             button.classList.add("survey-option");
//             button.addEventListener("click", () => {
//                 handleAnswer("dun", { name: dun });
//                 questionHistory.push(currentQuestionIndex); // Save question index for "Previous"
//                 showQuestion(nextQuestionIndex); // Move to the next question after selecting DUN
//             });
//             surveyContainer.appendChild(button);
//         });

//         // Update button visibility
//         updateButtons();
//     }

//     function handleAnswer(questionId, selectedOption) {
//         console.log(`Answered ${questionId}:`, selectedOption);
//         // Store responses or send them to a server if needed
//     }

//     function updateButtons() {
//         // Show or hide the Previous button
//         if (currentQuestionIndex > 0) {
//             prevButton.style.display = "inline-block";
//         } else {
//             prevButton.style.display = "none";
//         }

//         // Show or hide the Next button based on the current question index
//         if (currentQuestionIndex >= surveyQuestions.length - 1) {
//             nextButton.textContent = "Finish"; // Change "Next" to "Finish" on last question
//         } else {
//             nextButton.textContent = "Next";
//         }
//     }

//     // "Next" button click event
//     nextButton.addEventListener("click", () => {
//         if (currentQuestionIndex < surveyQuestions.length) {
//             questionHistory.push(currentQuestionIndex); // Save question index for "Previous"
//             showQuestion(currentQuestionIndex + 1);
//         }
//     });

//     // "Previous" button click event
//     prevButton.addEventListener("click", () => {
//         if (questionHistory.length > 0) {
//             const prevIndex = questionHistory.pop(); // Get the previous question index
//             showQuestion(prevIndex); // Show the previous question
//         }
//     });

//     showQuestion(currentQuestionIndex); // Start with the first question
// });

// import { surveyQuestions } from "./listOfQuestions.js";

// document.addEventListener("DOMContentLoaded", function () {
//     const surveyContainer = document.getElementById("survey-container");
//     let currentQuestionIndex = 0; // Track the current question index

//     function showQuestion(index) {
//         if (index >= surveyQuestions.length) {
//             surveyContainer.innerHTML = "<h3>Terima kasih kerana menjawab kaji selidik ini!</h3>";
//             return;
//         }

//         const question = surveyQuestions[index];
//         surveyContainer.innerHTML = ""; // Clear previous content

//         const questionDiv = document.createElement("div");
//         questionDiv.classList.add("survey-question");
//         questionDiv.innerHTML = `<h3>${question.text}</h3>`;

//         // Show Previous Button only if we're not on the first question
//         if (index > 0) {
//             const prevButton = document.createElement("button");
//             prevButton.textContent = "Previous";
//             prevButton.classList.add("survey-option");
//             prevButton.addEventListener("click", () => {
//                 showQuestion(index - 1); // Go to the previous question
//             });
//             questionDiv.appendChild(prevButton);
//         }

//         // Show options as buttons
//         question.options.forEach(option => {
//             const button = document.createElement("button");
//             button.textContent = option.name || option.code;
//             button.classList.add("survey-option");

//             // Add specific behavior based on options
//             button.addEventListener("click", () => {
//                 handleAnswer(question.id, option);
                
//                 // Handle transitions based on option selections
//                 if (question.id === "cendurungUntukMenundi") {
//                     if (option.name === "Parti National") {
//                         showQuestion(index + 1); // Go to Parti Nasional question
//                     } else if (option.name === "Parti Tempatan") {
//                         showQuestion(index + 2); // Skip Parti Nasional and go to Parti Tempatan
//                     } else if (option.name === "Tiada Kecendurungan") {
//                         showQuestion(index + 3); // Skip to Pemimpin Sabah
//                     }
//                 } else if (question.id === "partiNasional" && option.name === "BN") {
//                     showQuestion(index + 1); // Proceed to next relevant question after Parti Nasional
//                 } else if (question.id === "partiTempatan") {
//                     showQuestion(index + 1); // Skip to Parti Tempatan
//                 } else {
//                     showQuestion(index + 1); // Normal flow to next question
//                 }
//             });

//             questionDiv.appendChild(button);
//         });

//         // Add Next Button (only after answering an option)
//         const nextButton = document.createElement("button");
//         nextButton.textContent = "Next";
//         nextButton.classList.add("survey-option");
//         nextButton.addEventListener("click", () => {
//             showQuestion(index + 1); // Go to the next question
//         });

//         questionDiv.appendChild(nextButton);

//         surveyContainer.appendChild(questionDiv);
//     }

//     function handleAnswer(questionId, selectedOption) {
//         console.log(`Answered ${questionId}:`, selectedOption);
//         // Here you can store responses or send to a server if necessary
//     }

//     showQuestion(currentQuestionIndex); // Start with the first question
// });