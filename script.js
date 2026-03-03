// 1. Parallax Effect
function updateParallax(x, y) {
    const moveX = (x - window.innerWidth / 2) * 0.01;
    const moveY = (y - window.innerHeight / 2) * 0.01;

    const bg = document.getElementById('parallaxBg');
    const card = document.getElementById('tiltCard');

    if (bg) {
        bg.style.transform = `scale(1.1) translate(${moveX * -2}px, ${moveY * -2}px)`;
    }

    // Tilt the card only if it's active and not on mobile
    if (card && window.innerWidth > 768 && card.style.opacity === "1") {
        card.style.transform = `translate(-50%, -50%) rotateY(${moveX * 5}deg) rotateX(${moveY * -5}deg)`;
    }
}

document.addEventListener('mousemove', (e) => {
    updateParallax(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        updateParallax(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });

// 2. Confetti Cannon
function createConfetti() {
    const colors = ['#ff007a', '#7000ff', '#ffb800', '#00d4ff', '#00ff85'];
    const container = document.body;

    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

        const duration = Math.random() * 3 + 2;
        confetti.animate([
            { transform: `translateY(0) rotate(0)`, opacity: 1 },
            { transform: `translateY(110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear',
            fill: 'forwards'
        });

        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

// 3. Floating Emojis
const emojis = ['🎭', '🃏', '🍭', '💖', '✨', '🥳'];
function spawnEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 90 + 5 + 'vw';
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 6000);
}

// 4. Firework Canvas Effect
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let partyStarted = false;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * -3 - 2;
        this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
        this.alpha = 1;
        this.size = Math.random() * 3 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.005;
        if (this.alpha <= 0 || this.y < -20) this.reset();
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animateParty() {
    if (!partyStarted) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParty);
}

function startFestivities() {
    if (partyStarted) return;
    partyStarted = true;

    // Start Fireworks
    const count = window.innerWidth < 600 ? 20 : 40;
    for (let i = 0; i < count; i++) particles.push(new Particle());
    animateParty();

    // Intervals
    setInterval(spawnEmoji, 2000);
    setInterval(createConfetti, 5000);
    createConfetti();
    spawnEmoji();
}

// Envelope Animation Logic
const envelopeWrapper = document.getElementById('envelopeWrapper');
if (envelopeWrapper) {
    envelopeWrapper.addEventListener('click', () => {
        if (!envelopeWrapper.classList.contains('open')) {
            envelopeWrapper.classList.add('open');
            document.body.classList.add('open');

            // Create Burst of Sparkles
            createMagicSparkles(envelopeWrapper);

            // Wait for letter to pop out before starting party
            setTimeout(startFestivities, 1500);
        }
    });
}

function createMagicSparkles(parent) {
    const symbols = ['✨', '💖', '⭐', '🍭', '🃏'];
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'magic-sparkle';
        sparkle.innerText = symbols[Math.floor(Math.random() * symbols.length)];

        // Random direction for explosion
        const angle = Math.random() * Math.PI * 2;
        const dist = 100 + Math.random() * 150;
        sparkle.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        sparkle.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        sparkle.style.left = '50%';
        sparkle.style.top = '50%';

        parent.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
    }
}
