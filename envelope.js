document.addEventListener('DOMContentLoaded', () => {
    // Envelope Functionality
    const envelopeWrapper = document.getElementById('wrapper');
    const seal = document.getElementById('wax-seal');
    const mainContainer = document.getElementById('main-invitation');
    const envelopeContainer = document.getElementById('envelope-container');

    if (seal) {
        seal.addEventListener('click', () => {
            // 1. Play Break/Open Sound (if we had one) or Visual Effect
            createSparkles(seal);

            // Create Flash Effect
            const flash = document.createElement('div');
            flash.classList.add('flash-effect');
            document.body.appendChild(flash);
            setTimeout(() => {
                flash.classList.add('flash-animation');
            }, 500); // Flash slightly after seal breaks and flap starts to open

            // 2. Start Envelope Animation
            envelopeWrapper.classList.add('envelope-opening');

            // 3. Reveal Invitation Content
            setTimeout(() => {
                document.body.classList.add('invitation-revealed');
                // Ensure particles are running
                if (typeof createParticles === 'function') {
                    // createParticles(); // Already running globally
                }
            }, 800);

            // 4. Remove envelope from DOM flow after animation to prevent clicks
            setTimeout(() => {
                envelopeContainer.style.display = 'none';
            }, 2000);
        });
    }

    // Sparkle Effect on Click
    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            document.body.appendChild(sparkle);

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            sparkle.style.left = `${centerX}px`;
            sparkle.style.top = `${centerY}px`;

            // Random movement
            sparkle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                fill: 'forwards'
            });

            setTimeout(() => sparkle.remove(), 1200);
        }
    }
});
