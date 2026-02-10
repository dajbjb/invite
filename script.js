document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createSmoke();
});

function createParticles() {
    const container = document.body;
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Random animation duration and delay
        const duration = Math.random() * 3 + 2; // 2-5s
        const delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        container.appendChild(particle);
    }
}

function createSmoke() {
    const smokeContainer = document.createElement('div');
    smokeContainer.classList.add('smoke-container');
    document.body.appendChild(smokeContainer);

    for (let i = 0; i < 3; i++) {
        const smoke = document.createElement('div');
        smoke.classList.add('smoke');
        smoke.style.animationDelay = `${i * 5}s`;
        smokeContainer.appendChild(smoke);
    }
}
