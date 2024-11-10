const establishments = [
  {
    id: 1,
    name: "McDonald's",
    logo: "https://www.press-agrum.com/wp-content/uploads/2024/02/logo-mcdonalds-1024x640.jpg",
    description: "Le midi ou en soirée, la célèbre chaine de restauration rapide t'ouvre les portes de ses restaurants rochelais (les Mimes, Beaulieu, Angoulins, Lagord et Ferrières",
    offers: [
      {
        id: 1,
        type: "ponctuelle",
        title: "1 MENU ACHETÉ = 1 MENU OFFERT",
        description: "(Sur toutes les gammes hors menu Happy Meal et McSmart)",
        used: false
      }
    ]
  }
];

const establishmentList = document.getElementById('establishment-list');
const detailsModal = document.getElementById('details-modal');
const confirmationOverlay = document.getElementById('confirmationOverlay');
const closeDetailsButton = document.getElementById('close-details');
let selectedEstablishment = null;
let selectedOffer = null;

// Function to open the details modal
function openDetails(estName) {
  selectedEstablishment = establishments.find(est => est.name === estName);
  if (selectedEstablishment) {
    document.getElementById('establishment-name').textContent = selectedEstablishment.name;
    document.getElementById('establishment-description').textContent = selectedEstablishment.description;
    document.getElementById('offer-title').textContent = selectedEstablishment.offers[0].title;
    document.getElementById('offer-description').textContent = selectedEstablishment.offers[0].description;
    
    // Met à jour le bouton d'utilisation de l'offre
    const offerButton = document.querySelector('.use-offer-button');
    offerButton.textContent = selectedEstablishment.offers[0].used ? 'OFFRE DÉJÀ UTILISÉE' : 'UTILISER';
    offerButton.classList.toggle('used', selectedEstablishment.offers[0].used);  // Ajoute la classe CSS 'used' si l'offre est déjà utilisée

    detailsModal.classList.add('active');
  }
}

// Function to confirm offer use
function confirmUseOffer() {
  selectedOffer = selectedEstablishment.offers[0];
  if (selectedOffer && !selectedOffer.used) {
    confirmationOverlay.style.display = 'flex';
  }
}

// Confirm action
function confirmOffer() {
  selectedOffer.used = true;  // Marque l'offre comme utilisée
  closeConfirmation();        // Ferme l'overlay de confirmation
  
  // Met à jour le bouton d'utilisation de l'offre
  const offerButton = document.querySelector('.use-offer-button');
  offerButton.textContent = 'OFFRE DÉJÀ UTILISÉE';
  offerButton.classList.add('used');  // Applique la classe CSS pour le style désactivé
}

// Cancel action
function cancelOffer() {
  closeConfirmation();
}

// Close confirmation overlay
function closeConfirmation() {
  confirmationOverlay.style.display = 'none';
}

// Close details modal when clicking the back button
closeDetailsButton.addEventListener('click', () => {
  detailsModal.classList.remove('active');
});

// Function to show the card
function showCard() {
  document.getElementById('cardModal').style.display = 'flex';
}

// Function to close the card
function closeCard() {
  document.getElementById('cardModal').style.display = 'none';
}

// Initialize page
function init() {
  establishmentList.innerHTML = '';
  establishments.forEach(est => {
    const card = document.createElement('div');
    card.className = 'establishment-card';
    card.innerHTML = `<img src="${est.logo}" alt="${est.name}"><div class="heart-icon">❤️</div>`;
    card.onclick = () => openDetails(est.name);
    establishmentList.appendChild(card);
  });
}

// Run the init function
init();
