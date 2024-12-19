document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const messageDiv = document.querySelector('.formField__message');
    const successCard = document.getElementById("successCard");
    const cardContent = document.querySelector(".card__content");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const email = emailInput.value.trim();

        if (!validateEmail(email)) {
            messageDiv.textContent = "Valid email required";
            messageDiv.style.color = "red";
            emailInput.style.color = "red";
            emailInput.style.borderColor = "red";
            emailInput.style.backgroundColor = "#ffe6e6";
            return;
        }

        successCard.querySelector("b").textContent = email;
        successCard.style.display = "block";
        cardContent.style.display = "none";
        
    })
})
