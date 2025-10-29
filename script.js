// Load and apply custom button colors from localStorage
function applyCustomButtonColors() {
    const savedColors = localStorage.getItem('buttonColors');
    if (savedColors) {
        try {
            const colors = JSON.parse(savedColors);

            const groupBtn = document.getElementById('groupBtn');
            const clearBtn = document.getElementById('clearBtn');
            const newGameBtn = document.querySelector('.new-game-btn');

            if (groupBtn && colors.groupBtn) {
                groupBtn.style.background = colors.groupBtn;
            }
            if (clearBtn && colors.clearBtn) {
                clearBtn.style.background = colors.clearBtn;
            }
            if (newGameBtn && colors.newGameBtn) {
                newGameBtn.style.background = colors.newGameBtn;
            }
        } catch (e) {
            console.error('Error applying custom colors:', e);
        }
    }
}

// Apply custom colors when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCustomButtonColors);
} else {
    applyCustomButtonColors();
}

const allCategories = {
    animals: {
        icons: ['🐶', '🐱', '🐰', '🐸'],
        title: '🐾 Animals',
        color: '#FF6B6B'
    },
    food: {
        icons: ['🍎', '🍌', '🍪', '🥛'],
        title: '🍎 Yummy Food',
        color: '#4ECDC4'
    },
    vehicles: {
        icons: ['🚗', '🚂', '✈️', '🚲'],
        title: '🚗 Things That Go',
        color: '#45B7D1'
    },
    colors: {
        icons: ['❤️', '💙', '💚', '💛'],
        title: '🌈 Pretty Colors',
        color: '#9C27B0'
    },
    weather: {
        icons: ['☀️', '🌧️', '❄️', '☁️'],
        title: '🌤️ Weather',
        color: '#FF9800'
    },
    toys: {
        icons: ['⚽', '🧸', '🎲', '🎈'],
        title: '🎮 Fun Toys',
        color: '#E91E63'
    },
    nature: {
        icons: ['🌳', '🌸', '🍃', '🦋'],
        title: '🌿 Nature',
        color: '#4CAF50'
    },
    fruits: {
        icons: ['🍓', '🍊', '🍇', '🍒'],
        title: '🍓 Sweet Fruits',
        color: '#FF5722'
    },
    ocean: {
        icons: ['🐟', '🐙', '🦈', '🐚'],
        title: '🌊 Ocean Friends',
        color: '#00BCD4'
    },
    farm: {
        icons: ['🐄', '🐷', '🐔', '🐴'],
        title: '🚜 Farm Animals',
        color: '#8BC34A'
    },
    sports: {
        icons: ['⚽', '🏀', '🎾', '🏈'],
        title: '⚽ Sports Balls',
        color: '#607D8B'
    },
    space: {
        icons: ['🌟', '🌙', '🚀', '🪐'],
        title: '🚀 Space Things',
        color: '#3F51B5'
    },
    clothing: {
        icons: ['👕', '👗', '👒', '👟'],
        title: '👕 Things to Wear',
        color: '#FF7043'
    },
    faces: {
        icons: ['😊', '😢', '😴', '😮'],
        title: '😊 Happy Faces',
        color: '#FFC107'
    },
    bugs: {
        icons: ['🐛', '🦋', '🐝', '🐞'],
        title: '🐛 Little Bugs',
        color: '#795548'
    },
    buildings: {
        icons: ['🏠', '🏢', '🏰', '⛪'],
        title: '🏠 Places to Go',
        color: '#607D8B'
    },
    tools: {
        icons: ['🔨', '✂️', '🔧', '📏'],
        title: '🔨 Helper Tools',
        color: '#9E9E9E'
    },
    music: {
        icons: ['🎵', '🎸', '🎹', '🥁'],
        title: '🎵 Music Time',
        color: '#E040FB'
    },
    sweets: {
        icons: ['🍭', '🍩', '🧁', '🍰'],
        title: '🍭 Sweet Treats',
        color: '#F06292'
    },
    birds: {
        icons: ['🦆', '🦅', '🦉', '🦜'],
        title: '🦆 Flying Birds',
        color: '#42A5F5'
    },
    vegetables: {
        icons: ['🥕', '🥦', '🌽', '🍅'],
        title: '🥕 Healthy Veggies',
        color: '#66BB6A'
    },
    hands: {
        icons: ['👍', '✋', '👏', '✌️'],
        title: '✋ Hand Signs',
        color: '#FFB74D'
    }
};

let gameData = {};
let selectedCards = [];
let solvedGroups = [];
let currentIcons = [];

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function selectRandomCategories() {
    const categoryNames = Object.keys(allCategories);
    const shuffled = shuffleArray(categoryNames);
    const selected = shuffled.slice(0, 3);

    gameData = {};
    selected.forEach(categoryName => {
        gameData[categoryName] = allCategories[categoryName];
    });

    return selected;
}

function initializeGame() {
    selectRandomCategories();

    currentIcons = [];
    Object.values(gameData).forEach(category => {
        currentIcons = currentIcons.concat(category.icons);
    });
    currentIcons = shuffleArray(currentIcons);

    selectedCards = [];
    solvedGroups = [];

    document.getElementById('gameGrid').innerHTML = '';

    renderGrid();
    updateFeedback('');
    updateButtons();
}

function renderGrid() {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = '';

    const completedCategories = [];
    for (const [categoryName, category] of Object.entries(gameData)) {
        if (category.icons.every(icon => {
            const iconIndex = currentIcons.indexOf(icon);
            return iconIndex !== -1 && solvedGroups.includes(iconIndex);
        })) {
            completedCategories.push(categoryName);
        }
    }

    completedCategories.forEach(categoryName => {
        const category = gameData[categoryName];
        const categoryDiv = document.createElement('div');
        categoryDiv.className = `completed-category ${categoryName}`;
        categoryDiv.style.background = `linear-gradient(135deg, ${category.color}, ${darkenColor(category.color, 20)})`;
        categoryDiv.innerHTML = `
            <div>${category.title}</div>
            <div class="icons">${category.icons.join(' ')}</div>
        `;
        grid.appendChild(categoryDiv);
    });

    currentIcons.forEach((icon, index) => {
        if (!solvedGroups.includes(index)) {
            const card = document.createElement('div');
            card.className = 'icon-card';
            card.textContent = icon;
            card.onclick = () => selectCard(index, card);
            card.dataset.index = index;
            grid.appendChild(card);
        }
    });
}

function darkenColor(color, percent) {
    const colorMap = {
        '#FF6B6B': '#FF5252',
        '#4ECDC4': '#26A69A',
        '#45B7D1': '#2196F3',
        '#9C27B0': '#7B1FA2',
        '#FF9800': '#F57C00',
        '#E91E63': '#C2185B',
        '#4CAF50': '#388E3C',
        '#FF5722': '#D84315',
        '#00BCD4': '#0097A7',
        '#8BC34A': '#689F38',
        '#607D8B': '#455A64',
        '#3F51B5': '#303F9F',
        '#FF7043': '#E64A19',
        '#FFC107': '#FF8F00',
        '#795548': '#5D4037',
        '#9E9E9E': '#757575',
        '#E040FB': '#AB47BC',
        '#F06292': '#D81B60',
        '#42A5F5': '#1976D2',
        '#66BB6A': '#388E3C',
        '#FFB74D': '#F57C00'
    };
    return colorMap[color] || color;
}

function selectCard(index, cardElement) {
    if (solvedGroups.includes(index)) return;

    const cardIndex = selectedCards.indexOf(index);

    if (cardIndex > -1) {
        selectedCards.splice(cardIndex, 1);
        cardElement.classList.remove('selected');
    } else if (selectedCards.length < 4) {
        selectedCards.push(index);
        cardElement.classList.add('selected');
    }

    updateButtons();
}

function updateButtons() {
    const groupBtn = document.getElementById('groupBtn');
    groupBtn.disabled = selectedCards.length !== 4;
}

function checkGroup() {
    if (selectedCards.length !== 4) return;

    const selectedIcons = selectedCards.map(index => currentIcons[index]);
    let matchedCategory = null;

    for (const [categoryName, category] of Object.entries(gameData)) {
        if (selectedIcons.every(icon => category.icons.includes(icon))) {
            matchedCategory = categoryName;
            break;
        }
    }

    if (matchedCategory) {
        solvedGroups = solvedGroups.concat(selectedCards);
        selectedCards = [];
        updateFeedback('Great job! You found a group! 🎉', 'success');

        setTimeout(() => {
            renderGrid();
        }, 500);

        if (solvedGroups.length === 12) {
            setTimeout(() => {
                updateFeedback('Amazing! You found all the groups! 🏆🎊', 'success');
            }, 1000);
        }
    } else {
        updateFeedback('Not quite right. Try again! 💪', 'error');
        setTimeout(() => updateFeedback(''), 2000);
    }

    clearSelection();
}

function clearSelection() {
    selectedCards.forEach(index => {
        const card = document.querySelector(`[data-index="${index}"]`);
        if (card) card.classList.remove('selected');
    });
    selectedCards = [];
    updateButtons();
}

function updateFeedback(message, type = '') {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
}

function newGame() {
    initializeGame();
}

initializeGame();