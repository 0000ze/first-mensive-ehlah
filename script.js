let submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
let assigned = [];

function submitData() {
  const name = document.getElementById("userName").value.trim();
  const suggestions = document.getElementById("characterSuggestions").value
    .split(",")
    .map(c => c.trim())
    .filter(c => c);

  if (!name || suggestions.length === 0) {
    alert("Please fill out both fields.");
    return;
  }

  submissions.push({ name, suggestions });
  localStorage.setItem("submissions", JSON.stringify(submissions));

  document.getElementById("submitMessage").innerText = "Submission received!";
  document.getElementById("userName").value = "";
  document.getElementById("characterSuggestions").value = "";
}

function showSubmissions() {
  if (submissions.length === 0) {
    document.getElementById("submissionList").innerText = "No submissions yet.";
    return;
  }

  let output = submissions.map((s, i) => `${i + 1}. ${s.name} → [${s.suggestions.join(", ")}]`).join("\n");
  document.getElementById("submissionList").innerText = output;
}

function assignCharacters() {
  if (submissions.length === 0) {
    alert("No submissions to assign.");
    return;
  }

  let allCharacters = submissions.flatMap(s => s.suggestions);
  allCharacters = Array.from(new Set(allCharacters)); // Remove duplicates

  if (allCharacters.length < submissions.length) {
    alert("Not enough unique characters for each user.");
    return;
  }

  shuffleArray(allCharacters);
  assigned = submissions.map((s, i) => ({
    name: s.name,
    character: allCharacters[i]
  }));

  let result = assigned.map((a, i) => `${i + 1}. ${a.name} → ${a.character}`).join("\n");
  document.getElementById("assignedList").innerText = result;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Admin auth
function checkAdmin() {
  const correctPassword = "pajeganteng"; // Change this to something secure
  const input = document.getElementById("adminPassword").value;
  if (input === correctPassword) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    document.getElementById("loginMessage").innerText = "Incorrect password.";
  }
}
