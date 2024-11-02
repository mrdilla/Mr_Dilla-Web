async function fetchAccountInfo() {
  const region = document.querySelector('input[name="region"]:checked').value;
  const uid = document.getElementById('uid').value.trim();
  const apiKey = 'tharu_saduGaming';

  if (!uid) {
    document.getElementById('result').textContent = 'Please enter a valid User ID.';
    return;
  }

  const url = `https://www.ffinfo.freefireinfo.site/info/${region}/${uid}?key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Please Check Your Region & Uid');
    
    const data = await response.json();
    displayAccountInfo(data);
  } catch (error) {
    document.getElementById('result').textContent = `Error: ${error.message}`;
  }
}

function getRank(points) {
    if (points < 100) {
        return "Silver";
    } else if (points >= 100 && points < 200) {
        return "Gold";
    } else if (points >= 200 && points < 300) {
        return "Diamond";
    } else if (points >= 300) {
        return "Master";
    } else {
        return "N/A"; // For cases where points might be undefined or null
    }
}

function displayAccountInfo(data) {
  const brRankPoints = data["BR Rank Points"];
  const rank = getRank(brRankPoints);

  let html = `
    <h3>Player Information</h3>
    <p><strong>Name:</strong> ${data["Account Name"] || 'N/A'}</p>
    <p><strong>Account UID:</strong> ${data["Account UID"] || 'N/A'}</p>
    <p><strong>Region:</strong> ${data["Account Region"] || 'N/A'}</p>
    <p><strong>Level:</strong> ${data["Account Level"] || 'N/A'}</p>
    <p><strong>Last Login:</strong> ${data["Account Last Login (GMT 0530)"] || 'N/A'}</p>
    <p><strong>Account Avatar:</strong> <img src="${data["Account Avatar Image"] || '#'}" alt="Avatar" class="account-avatar"></p>
    <p><strong>Account Banner:</strong> <img src="${data["Account Banner Image"] || '#'}" alt="Banner" class="account-banner"></p>
    <p><strong>Account XP:</strong> ${data["Account XP"] || 'N/A'}</p>
    <p><strong>Booyah Pass:</strong> ${data["Account Booyah Pass"] || 'N/A'}</p>
    <p><strong>Likes:</strong> ${data["Account Likes"] || 'N/A'}</p>
    <p><strong>Booyah Pass Badges:</strong> ${data["Account Booyah Pass Badges"] || 'N/A'}</p>
    <p><strong>Celebrity Status:</strong> ${data["Account Celebrity Status"] || 'N/A'}</p>
    <p><strong>Character ID:</strong> ${data["Account Character ID"] || 'N/A'}</p>
    <p><strong>Create Time:</strong> ${data["Account Create Time (GMT 0530)"] || 'N/A'}</p>
    <p><strong>Evo Access Badge:</strong> ${data["Account Evo Access Badge"] || 'N/A'}</p>
    <p><strong>Honor Score:</strong> ${data["Account Honor Score"] || 'N/A'}</p>
    <p><strong>Language:</strong> ${data["Account Language"] || 'N/A'}</p>
    <p><strong>Signature:</strong> ${data["Account Signature"] || 'N/A'}</p>
    <p><strong>Recent OB:</strong> ${data["Account Recent OB"] || 'N/A'}</p>
    <p><strong>BR Rank Points:</strong> ${brRankPoints || 'N/A'}</p>
    <p><strong>BR Rank:</strong> ${rank}</p>
    <p><strong>CS Rank Points:</strong> ${data["CS Rank Points"] || 'N/A'}</p>
  `;

  // Additional HTML for Equipped Items, Skills, etc., as in your existing code
// Display Equipped Items
if (data["Equipped Items"] && data["Equipped Items"].profile && data["Equipped Items"].profile.Clothes) {
html += `<h4>Equipped Items:</h4><div class="equipped-items">`;
const equippedItems = data["Equipped Items"].profile.Clothes;
equippedItems.forEach(item => {
  html += `<img src="${item}" alt="Equipped Item" class="equipped-item">`;
});
html += `</div>`;
}

// Display Equipped Skills
if (data["Equipped Items"] && data["Equipped Items"].profile && data["Equipped Items"].profile["Equipped Skills"]) {
html += `<h4>Equipped Skills:</h4><p>${data["Equipped Items"].profile["Equipped Skills"].join(', ') || 'N/A'}</p>`;
}

// Display External Items
if (data["Equipped Items"] && data["Equipped Items"].profile && data["Equipped Items"].profile["External Items"]) {
html += `<h4>External Items:</h4>`;
data["Equipped Items"].profile["External Items"].forEach(item => {
  html += `<p><strong>Category:</strong> ${item.Category || 'N/A'} <br> <img src="${item["Image URL"] || '#'}" alt="External Item" class="external-item"></p>`;
});
}

// Display Pet Information
if (data["Equipped Pet Information"]) {
const pet = data["Equipped Pet Information"];
html += `
  <h3>Pet Info</h3>
  <p><strong>Name:</strong> ${pet["Pet Name"] || 'N/A'}</p>
  <p><strong>Type:</strong> ${pet["Pet Type"] || 'N/A'}</p>
  <p><strong>Level:</strong> ${pet["Pet Level"] || 'N/A'}</p>
  <p><strong>XP:</strong> ${pet["Pet XP"] || 'N/A'}</p>
`;
}

// Display Equipped Title
if (data["Equipped Title"]) {
html += `<p><strong>Equipped Title:</strong> ${data["Equipped Title"] || 'N/A'}</p>`;
}

// Display Guild Information
if (data["Guild Information"]) {
const guild = data["Guild Information"];
html += `
  <h3>Guild Information</h3>
  <p><strong>Name:</strong> ${guild["Guild Name"] || 'N/A'}</p>
  <p><strong>Capacity:</strong> ${guild["Guild Capacity"] || 'N/A'}</p>
  <p><strong>Current Members:</strong> ${guild["Guild Current Members"] || 'N/A'}</p>
  <p><strong>ID:</strong> ${guild["Guild ID"] || 'N/A'}</p>
  <p><strong>Level:</strong> ${guild["Guild Level"] || 'N/A'}</p>
`;
}

// Display Guild Leader Information
if (data["Guild Leader Information"]) {
const leader = data["Guild Leader Information"];
html += `
  <h3>Guild Leader Information</h3>
  <p><strong>Name:</strong> ${leader["Leader Name"] || 'N/A'}</p>
  <p><strong>Level:</strong> ${leader["Leader Level"] || 'N/A'}</p>
  <p><strong>UID:</strong> ${leader["Leader UID"] || 'N/A'}</p>
  <p><strong>Last Login:</strong> ${leader["Leader Last Login Time (GMT 0530)"] || 'N/A'}</p>
  <p><strong>Avatar:</strong> <img src="${leader["Leader Avatar Image"] || '#'}" alt="Leader Avatar" class="leader-avatar"></p>
  <p><strong>Likes:</strong> ${leader["Leader Likes"] || 'N/A'}</p>
  <p><strong>Title:</strong> ${leader["Leader Title"] || 'N/A'}</p>
  <p><strong>BP Badges:</strong> ${leader["Leader BP Badges"] || 'N/A'}</p>
  <p><strong>BR Points:</strong> ${leader["Leader BR Points"] || 'N/A'}</p>
  <p><strong>CS Points:</strong> ${leader["Leader CS Points"] || 'N/A'}</p>
`;
}
  
  document.getElementById('result').innerHTML = html;
}
