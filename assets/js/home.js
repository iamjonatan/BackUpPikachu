var cards;
var cardSearch = document.getElementById('cardSearch');
var toaster = document.getElementById('toastMsg');
var cardsView = document.getElementById('cardsView');

hideSearch();

function createBackup(backUpBtn) {
    backUpBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;
    getCards(function (apiResult) {
        if(apiResult && apiResult.cards) {
            localStorage.setItem('pikachu-cards', JSON.stringify(apiResult.cards));
        }
        backUpBtn.innerHTML = 'Create Backup';
        toastMsg('Back up has been created', false)
    });
}

function purgeData() {
    localStorage.removeItem('pikachu-cards');
    hideSearch();
    cardsView.innerHTML = ''; //clear  cards view
    toastMsg('Back up has been destroyed', false);
}

function showSearch() {
    if(toaster) toaster.style.display = 'none';  //hide toaster first
    if(cardSearch) cardSearch.style.display = 'flex';
}

function hideSearch() {
    if(cardSearch) cardSearch.style.display = 'none';
}

function toastMsg(msg, warning) {
    if(warning) {
        toaster.style.color = '#ff9966';
    }
    toaster.innerText = msg;
    toaster.style.display = 'block';
    setTimeout(()=>{
        toaster.style.display = 'none';
        toaster.style.color = '#34ce57';
    }, 5000);
}

function searchCards() {
    var rawData, allCards;
    rawData = localStorage.getItem('pikachu-cards');
    allCards = rawData ? JSON.parse(rawData) : null;
    if(allCards) {
        var name = document.getElementById('cardName').value;
        var hitpoint = document.getElementById('cardHitpoint').value;
        var rarity = document.getElementById('cardRarity').value;

        if(name || hitpoint || rarity) {
            cards = allCards.filter(  card =>
                (name === '' || card.name.toLowerCase() === name.toLowerCase())
                && (hitpoint === '' || card.hp === hitpoint)
                && ( rarity ==='' || card.rarity.toLowerCase() === rarity.toLowerCase())
            );

            presentCards();
        } else {
            toastMsg('Enter at least one input in the search options', true);
        }
    } else {
        toastMsg("You do not have any cards yet. Create backup first.", true);
    }
}

function presentCards() {
    if(cardsView) {
        cardsView.innerHTML = '';
        cards.forEach(card =>{
            var img = document.createElement('img');
            img.src = card.imageUrl;
            img.classList.add('img-fluid');
            cardsView.appendChild(img);
        });
    }
}
