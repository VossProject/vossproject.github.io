document.querySelector("button").addEventListener("click", gradeQuiz);

let score = 0;
let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
  attempts = 0;
} else {
  attempts = Number(attempts);
}

displayQ4Choices();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  shuffleArray(q4ChoicesArray);

  let choicesContainer = document.querySelector("#q4Choices");
  choicesContainer.textContent = "";

  for (let choice of q4ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

function isFormValid() {
  let validationFdbk = document.querySelector("#validationFdbk");
  let requiredQuestions = [1, 2, 5, 6, 9, 10];

  for (let num of requiredQuestions) {
    let response = document.querySelector(`#q${num}`).value.trim();
    if (response === "") {
      validationFdbk.textContent = `Question ${num} was not answered`;
      return false;
    }
  }

  return true;
}

function setMarkImage(index, imageName, altText) {
  let markContainer = document.querySelector(`#markImg${index}`);
  markContainer.textContent = "";

  let img = document.createElement("img");
  img.src = `img/${imageName}`;
  img.alt = altText;
  markContainer.appendChild(img);
}

function rightAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Correct!";
  feedback.className = "bg-success text-white mt-2 p-1 rounded";
  setMarkImage(index, "checkmark.png", "Checkmark");
  score += 10;
}

function wrongAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Incorrect!";
  feedback.className = "bg-warning text-dark mt-2 p-1 rounded";
  setMarkImage(index, "xmark.png", "X mark");
}

function gradeQuiz() {
  document.querySelector("#validationFdbk").textContent = "";

  if (!isFormValid()) {
    return;
  }

  score = 0;
  let q1Response = document.querySelector("#q1").value.trim().toLowerCase();
  let q2Response = document.querySelector("#q2").value;
  let q5Response = document.querySelector("#q5").value.trim().toLowerCase();
  let q6Response = document.querySelector("#q6").value;
  let q9Response = Number(document.querySelector("#q9").value);
  let q10Response = document.querySelector("#q10").value.trim().toLowerCase();

  if (q1Response === "sacramento") {
    rightAnswer(1);
  } else {
    wrongAnswer(1);
  }

  if (q2Response === "mo") {
    rightAnswer(2);
  } else {
    wrongAnswer(2);
  }

  if (document.querySelector("#Jefferson").checked &&
      document.querySelector("#Roosevelt").checked &&
      !document.querySelector("#Jackson").checked &&
      !document.querySelector("#Franklin").checked) {
    rightAnswer(3);
  } else {
    wrongAnswer(3);
  }

  let selectedQ4 = document.querySelector("input[name=q4]:checked");

  if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
    rightAnswer(4);
  } else {
    wrongAnswer(4);
  }

  if (q5Response === "austin") {
    rightAnswer(5);
  } else {
    wrongAnswer(5);
  }

  if (q6Response === "ak") {
    rightAnswer(6);
  } else {
    wrongAnswer(6);
  }

  if (document.querySelector("#az").checked &&
      document.querySelector("#nm").checked &&
      !document.querySelector("#nv").checked &&
      !document.querySelector("#ok").checked) {
    rightAnswer(7);
  } else {
    wrongAnswer(7);
  }

  let selectedQ8 = document.querySelector("input[name=q8]:checked");

  if (selectedQ8 !== null && selectedQ8.value === "Atlantic") {
    rightAnswer(8);
  } else {
    wrongAnswer(8);
  }

  if (q9Response === 50) {
    rightAnswer(9);
  } else {
    wrongAnswer(9);
  }

  if (q10Response === "denali" || q10Response === "mount denali") {
    rightAnswer(10);
  } else {
    wrongAnswer(10);
  }

  let totalScore = document.querySelector("#totalScore");
  totalScore.textContent = `Total Score: ${score}`;

  if (score < 80) {
    totalScore.className = "mt-4 text-danger";
  } else {
    totalScore.className = "mt-4 text-success";
  }

  let congrats = document.querySelector("#congrats");
  if (score > 80) {
    congrats.textContent = "Congratulations! You really know your US geography!";
  } else {
    congrats.textContent = "";
  }

  attempts++;
  document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
  localStorage.setItem("total_attempts", attempts);
}
