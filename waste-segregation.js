// Waste Segregation JavaScript
class WasteSegregation {
    constructor() {
        this.draggedItem = null;
        this.dropZones = {};
        this.wasteItems = {};
        this.impactData = {
            wetWaste: { co2: 0.5, water: 10, energy: 0.2 },
            dryWaste: { co2: 2.1, water: 25, energy: 0.8 },
            hazardous: { co2: 1.8, water: 15, energy: 0.6 }
        };
        
        this.init();
    }

    init() {
        this.setupDragAndDrop();
        this.setupImpactCalculator();
        this.setupAnimations();
        this.setupEventListeners();
        this.initializeUI();
    }

    setupDragAndDrop() {
        // Initialize waste items
        document.querySelectorAll('.waste-item').forEach(item => {
            this.wasteItems[item.dataset.category] = item;
            
            item.addEventListener('dragstart', (e) => {
                this.draggedItem = item;
                item.style.opacity = '0.5';
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', item.outerHTML);
            });

            item.addEventListener('dragend', () => {
                item.style.opacity = '1';
                this.draggedItem = null;
            });
        });

        // Initialize drop zones
        document.querySelectorAll('.drop-zone').forEach(zone => {
            this.dropZones[zone.dataset.category] = zone;
            
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                if (this.draggedItem && this.draggedItem.dataset.category === zone.dataset.category) {
                    this.handleCorrectDrop(this.draggedItem, zone);
                } else {
                    this.handleIncorrectDrop(this.draggedItem, zone);
                }
            });
        });
    }

    handleCorrectDrop(item, zone) {
        // Create a copy of the item for the zone
        const zoneItem = document.createElement('div');
        zoneItem.className = 'zone-item';
        zoneItem.textContent = item.querySelector('span').textContent;
        
        // Add to zone with celebration animation
        zone.querySelector('.zone-items').appendChild(zoneItem);
        
        // Show success feedback
        this.showNotification('✅ Correct! ' + item.querySelector('span').textContent + ' belongs in ' + zone.querySelector('h4').textContent, 'success');
        
        // Animate the zone
        zone.style.transform = 'scale(1.05)';
        setTimeout(() => {
            zone.style.transform = 'scale(1)';
        }, 200);
        
        // Check if all items are sorted
        this.checkCompletion();
    }

    handleIncorrectDrop(item, zone) {
        // Show error feedback
        this.showNotification('❌ Incorrect! ' + item.querySelector('span').textContent + ' doesn\'t belong in ' + zone.querySelector('h4').textContent, 'error');
        
        // Animate the zone with error effect
        zone.style.borderColor = 'var(--danger)';
        zone.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            zone.style.borderColor = '';
            zone.style.animation = '';
        }, 500);
    }

    checkCompletion() {
        const totalItems = document.querySelectorAll('.waste-item').length;
        const sortedItems = document.querySelectorAll('.zone-item').length;
        
        if (sortedItems === totalItems) {
            setTimeout(() => {
                this.showCompletionCelebration();
            }, 500);
        }
    }

    showCompletionCelebration() {
        // Create celebration overlay
        const celebration = document.createElement('div');
        celebration.className = 'completion-celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-icon">🎉</div>
                <h2>Congratulations!</h2>
                <p>You've successfully sorted all waste items!</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Continue</button>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        // Add celebration styles
        if (!document.querySelector('#celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'celebration-styles';
            style.textContent = `
                .completion-celebration {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .celebration-content {
                    background: var(--surface);
                    border-radius: var(--radius);
                    padding: 40px;
                    text-align: center;
                    box-shadow: var(--shadow-hover);
                    animation: scaleIn 0.5s ease-out;
                }
                
                .celebration-icon {
                    font-size: 4rem;
                    margin-bottom: 20px;
                    animation: bounce 1s ease-in-out infinite;
                }
                
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scaleIn { from { transform: scale(0.8); } to { transform: scale(1); } }
            `;
            document.head.appendChild(style);
        }
    }

    setupImpactCalculator() {
        const calculateBtn = document.getElementById('calculate-impact');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculateImpact();
            });
        }
    }

    calculateImpact() {
        const wetWaste = parseFloat(document.getElementById('wet-waste').value) || 0;
        const dryWaste = parseFloat(document.getElementById('dry-waste').value) || 0;
        const hazardousWaste = parseFloat(document.getElementById('hazardous-waste').value) || 0;

        // Calculate weekly impact
        const co2Saved = (wetWaste * this.impactData.wetWaste.co2) + 
                        (dryWaste * this.impactData.dryWaste.co2) + 
                        (hazardousWaste * this.impactData.hazardous.co2);
        
        const waterSaved = (wetWaste * this.impactData.wetWaste.water) + 
                          (dryWaste * this.impactData.dryWaste.water) + 
                          (hazardousWaste * this.impactData.hazardous.water);
        
        const energySaved = (wetWaste * this.impactData.wetWaste.energy) + 
                           (dryWaste * this.impactData.dryWaste.energy) + 
                           (hazardousWaste * this.impactData.hazardous.energy);

        // Animate the results
        this.animateCounter('co2-saved', co2Saved, ' kg');
        this.animateCounter('water-saved', waterSaved, ' L');
        this.animateCounter('energy-saved', energySaved, ' kWh');

        // Show impact summary
        this.showNotification(`🌱 Your weekly segregation saves ${co2Saved.toFixed(1)}kg CO2, ${waterSaved}L water, and ${energySaved.toFixed(1)}kWh energy!`, 'success');
    }

    animateCounter(elementId, targetValue, unit) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startValue = 0;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = startValue + (targetValue - startValue) * this.easeOutQuart(progress);
            element.textContent = currentValue.toFixed(1) + unit;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    setupAnimations() {
        // Add scroll reveal animations
        this.setupScrollReveal();
        
        // Add hover effects for category cards
        this.setupCategoryCardAnimations();
        
        // Add tip card animations
        this.setupTipCardAnimations();
    }

    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for reveal animation
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    setupCategoryCardAnimations() {
        document.querySelectorAll('.category-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupTipCardAnimations() {
        document.querySelectorAll('.tip-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
            
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.tip-icon');
                icon.style.animation = 'bounce 0.6s ease-in-out';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.tip-icon');
                icon.style.animation = 'float 4s ease-in-out infinite';
            });
        });
    }

    setupEventListeners() {
        // Schedule card interactions
        document.querySelectorAll('.schedule-card').forEach(card => {
            card.addEventListener('click', () => {
                this.showScheduleDetails(card);
            });
        });

        // CTA button interactions
        document.querySelectorAll('.cta-buttons .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCTAClick(btn.textContent);
            });
        });
    }

    showScheduleDetails(card) {
        const day = card.querySelector('.schedule-day').textContent;
        const items = Array.from(card.querySelectorAll('.schedule-item')).map(item => item.textContent);
        const time = card.querySelector('.schedule-time').textContent;
        
        this.showNotification(`🗓️ ${day}: ${items.join(', ')} - ${time}`, 'info');
    }

    handleCTAClick(buttonText) {
        if (buttonText.includes('Download')) {
            this.showNotification('📥 Download started! Check your downloads folder.', 'success');
        } else if (buttonText.includes('Join')) {
            this.showNotification('🤝 Welcome to the community! You\'ll receive updates soon.', 'success');
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--surface);
                    border-left: 4px solid var(--accent);
                    border-radius: 8px;
                    padding: 16px 20px;
                    box-shadow: var(--shadow-hover);
                    z-index: 1000;
                    animation: slideInRight 0.3s ease-out;
                    max-width: 400px;
                }
                
                .notification-success {
                    border-left-color: var(--success);
                }
                
                .notification-error {
                    border-left-color: var(--danger);
                }
                
                .notification-info {
                    border-left-color: var(--brand);
                }
                
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: grid;
                    place-items: center;
                    border-radius: 50%;
                    transition: background 0.2s ease;
                }
                
                .notification-close:hover {
                    background: rgba(255,255,255,0.1);
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Add slide out animation
        if (!document.querySelector('#slide-out-animation')) {
            const slideStyle = document.createElement('style');
            slideStyle.id = 'slide-out-animation';
            slideStyle.textContent = `
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(slideStyle);
        }
    }

    initializeUI() {
        // Add shake animation for error feedback
        if (!document.querySelector('#shake-animation')) {
            const shakeStyle = document.createElement('style');
            shakeStyle.id = 'shake-animation';
            shakeStyle.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(shakeStyle);
        }
        
        // Initialize with a welcome message
        setTimeout(() => {
            this.showNotification('🗂️ Welcome to the Waste Segregation Guide! Start by dragging waste items to their correct categories.', 'info');
        }, 1000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new WasteSegregation();
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    if (!document.querySelector('#ripple-animation')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-animation';
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    // Add floating particles effect to header
    const header = document.querySelector('.segregation-header');
    if (header) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            header.appendChild(particle);
        }
        
        // Add particle animation
        if (!document.querySelector('#particle-animation')) {
            const particleStyle = document.createElement('style');
            particleStyle.id = 'particle-animation';
            particleStyle.textContent = `
                @keyframes float-particle {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                    50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
                }
            `;
            document.head.appendChild(particleStyle);
        }
    }
});


