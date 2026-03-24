// ==========================================
// 1. FONCTIONS GLOBALES (Accessibles par le HTML)
// ==========================================

function openBuyModal(button) {
    const modal = document.getElementById('buy-modal');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    
    const gameCard = button.closest('.game');
    if (!gameCard) return;

    const gameName = gameCard.querySelector('p').innerText;
    const gamePrice = gameCard.querySelector('h2').innerText;
    const gameImg = gameCard.querySelector('img').src; 

    document.getElementById('modal-game-name').innerText = gameName;
    document.getElementById('modal-game-price').innerText = gamePrice;
    document.getElementById('modal-game-img').src = gameImg;

    step1.style.display = 'flex'; 
    step2.style.display = 'none';
    modal.classList.add('active');
}

function addCommentToUI(name, text) {
    const zoneCommentaires = document.querySelector('.comments');
    if (!zoneCommentaires) return;

    const newCard = document.createElement('div');
    newCard.classList.add('comment');
    newCard.innerHTML = `
        <div>
            <img src="images/im.png">
            <h4>${name}</h4>
        </div>
        <p>${text}</p>
    `;
    zoneCommentaires.prepend(newCard);
}

// ==========================================
// 2. LOGIQUE AU CHARGEMENT DU DOM
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. PRE-ORDER FORM (TOAST) ---
    const form = document.getElementById('preorder-form');
    const toast = document.getElementById('toast-notification');

    if (form && toast) {
        form.onsubmit = function(e) {
            e.preventDefault(); 
            toast.classList.add("active");
            form.reset();
            setTimeout(() => {
                toast.classList.remove("active");
            }, 4000);
        };
    }

    // --- 2. COMMENT SYSTEM ---
    const commentForm = document.getElementById('comment-form');
    const savedComments = JSON.parse(localStorage.getItem('userComments')) || [];
    
    savedComments.forEach(comment => {
        addCommentToUI(comment.name, comment.text);
    });

    if (commentForm) {
        commentForm.onsubmit = function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('user-name');
            const commentInput = document.getElementById('user-comment');
            const submitBtn = commentForm.querySelector('button');
            const name = nameInput.value;
            const text = commentInput.value;

            savedComments.push({ name: name, text: text });
            localStorage.setItem('userComments', JSON.stringify(savedComments));

            addCommentToUI(name, text);

            const originalText = submitBtn.innerText;
            submitBtn.innerText = "COMMENT ADDED! ";
            submitBtn.style.backgroundColor = "#28a745"; 

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = "purple"; 
            }, 3000);

            commentForm.reset();
        };
    }

    // --- 3. LOGIQUE INTERNE DE LA MODALE ---
    const modal = document.getElementById('buy-modal');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');

    if (modal && step1 && step2) {
        // Navigation vers Step 2
        const btnToStep2 = document.getElementById('btn-to-step-2');
        if (btnToStep2) {
            btnToStep2.onclick = () => {
                step1.style.display = 'none';
                step2.style.display = 'flex';
            };
        }

        // Retour vers Step 1
        const btnBack = document.getElementById('btn-back-to-1');
        if (btnBack) {
            btnBack.onclick = () => {
                step2.style.display = 'none';
                step1.style.display = 'flex';
            };
        }

        // Fermeture
        const closeBtn = document.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.onclick = () => modal.classList.remove('active');
        }
        
        // Confirmation finale
        const purchaseForm = document.getElementById('purchase-form');
        if (purchaseForm) {
            purchaseForm.onsubmit = function(e) {
                e.preventDefault();
                const modalContent = document.querySelector('.modal-content');
                modalContent.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <h2 style="color: purple;">Order Confirmed! </h2>
                        <p>Your game will arrive within 1 or 2 weeks.</p>
                        <button onclick="location.reload()" style="margin-top:15px; background:purple; color:white; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Close</button>
                    </div>
                `;
            };
        }
    }
});