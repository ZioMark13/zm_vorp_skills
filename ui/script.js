let skillContainer, skillsList, skillDetails, closeBtn, characterName;
let currentSkills = {};
let skillConfig = [];

document.addEventListener('DOMContentLoaded', () => {
    skillContainer = document.getElementById('skill-container');
    skillsList = document.getElementById('skills-list');
    skillDetails = document.getElementById('skill-details');
    closeBtn = document.getElementById('close-btn');
    characterName = document.getElementById('character-name');

    closeBtn.addEventListener('click', closeSkillTree);
});

window.addEventListener('message', (event) => {
    const data = event.data;
    if (data.type === 'open') {
        currentSkills = data.skills;
        skillConfig = data.skillConfig;
        characterName.textContent = `${data.firstname} ${data.lastname}`;
        updateSkillsList(data.skills);
        skillContainer.classList.remove('hidden');
    } else if (data.type === 'close') {
        skillContainer.classList.add('hidden');
    }
});

function updateSkillsList(skills) {
    skillsList.innerHTML = '';
    Object.entries(skills).forEach(([skillName, skillData]) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <div class="skill-icon">${getSkillIcon(skillName)}</div>
            <div class="skill-name">${skillName}</div>
        `;
        skillItem.addEventListener('click', () => showSkillDetails(skillName, skillData));
        skillsList.appendChild(skillItem);
    });
}

function showSkillDetails(skillName, skillData) {
    const selectedSkillName = document.getElementById('selected-skill-name');
    const skillLevel = document.getElementById('skill-level');
    const skillLabel = document.getElementById('skill-label');
    const progressBar = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    selectedSkillName.textContent = skillName;
    skillLevel.textContent = `Level ${skillData.Level}/${skillData.MaxLevel}`;
    skillLabel.textContent = `Current Title: ${skillData.Label}`;
    
    const progress = (skillData.Exp / skillData.NextLevel) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${skillData.Exp}/${skillData.NextLevel} EXP`;
    
    skillDetails.classList.remove('hidden');
    
    document.querySelectorAll('.skill-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

function getSkillIcon(skillName) {
    const skill = skillConfig.find(s => s.name === skillName);
    return skill ? skill.icon : "❓";
}

function closeSkillTree() {
    skillContainer.classList.add('hidden');
    fetch(`https://${GetParentResourceName()}/close`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({})
    });
}