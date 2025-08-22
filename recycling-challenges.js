// Recycling Challenges JavaScript
class RecyclingChallenges {
    constructor() {
        this.currentUser = {
            level: 7,
            points: 2450,
            streak: 12,
            weeklyGoal: 85,
            challengesCompleted: 23
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.animateProgressBars();
        this.setupChallengeInteractions();
        this.setupBadgeAnimations();
        this.setupLeaderboardAnimations();
        this.setupTipInteractions();
        this.startProgressAnimations();
    }

    setupEventListeners() {
        // Progress card hover effects
        document.querySelectorAll('.progress-card').forEach(card => {
            card.addEventListener('mouseenter', this.handleProgressCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleProgressCardLeave.bind(this));
        });

        // Challenge card interactions
        document.querySelectorAll('.challenge-card').forEach(card => {
            card.addEventListener('click', this.handleChallengeClick.bind(this));
            card.addEventListener('mouseenter', this.handleChallengeHover.bind(this));
        });

        // Badge item interactions
        document.querySelectorAll('.badge-item').forEach(badge => {
            badge.addEventListener('click', this.handleBadgeClick.bind(this));
            badge.addEventListener('mouseenter', this.handleBadgeHover.bind(this));
        });

        // Leaderboard item interactions
        document.querySelectorAll('.leaderboard-item').forEach(item => {
            item.addEventListener('mouseenter', this.handleLeaderboardHover.bind(this));
        });

        // Button interactions
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', this.handleButtonClick.bind(this));
        });
    }

    handleProgressCardHover(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(-8px) scale(1.02)';
        
        // Add floating animation to icon
        const icon = card.querySelector('.progress-icon');
        if (icon) {
            icon.style.animation = 'float 0.6s ease-in-out infinite alternate';
        }
    }

    handleProgressCardLeave(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
        
        // Remove floating animation
        const icon = card.querySelector('.progress-icon');
        if (icon) {
            icon.style.animation = '';
        }
    }

    handleChallengeClick(event) {
        const card = event.currentTarget;
        const status = card.querySelector('.challenge-status');
        
        if (status.classList.contains('new')) {
            this.startChallenge(card);
        } else if (status.classList.contains('in-progress')) {
            this.updateChallengeProgress(card);
        }
    }

    handleChallengeHover(event) {
        const card = event.currentTarget;
        const rewards = card.querySelectorAll('.badge');
        
        rewards.forEach((badge, index) => {
            badge.style.animationDelay = `${index * 0.1}s`;
            badge.style.animation = 'bounce 0.6s ease-in-out infinite alternate';
        });
    }

    handleBadgeClick(event) {
        const badge = event.currentTarget;
        
        if (badge.classList.contains('locked')) {
            this.showBadgeInfo(badge);
        } else {
            this.celebrateBadge(badge);
        }
    }

    handleBadgeHover(event) {
        const badge = event.currentTarget;
        
        if (badge.classList.contains('unlocked')) {
            badge.style.transform = 'scale(1.1) rotate(5deg)';
            badge.style.filter = 'drop-shadow(0 8px 20px rgba(61,220,151,.6))';
        }
    }

    handleLeaderboardHover(event) {
        const item = event.currentTarget;
        const rank = item.querySelector('.rank');
        
        if (rank) {
            rank.style.transform = 'scale(1.2)';
            rank.style.color = '#a0f0c5';
        }
    }

    handleButtonClick(event) {
        const btn = event.currentTarget;
        const action = btn.textContent.toLowerCase();
        
        if (action.includes('mark as read')) {
            this.markTipAsRead(btn);
        } else if (action.includes('share tip')) {
            this.shareTip();
        }
    }

    startChallenge(card) {
        const status = card.querySelector('.challenge-status');
        const progressFill = card.querySelector('.progress-fill');
        
        // Animate status change
        status.textContent = '⋯';
        status.className = 'challenge-status in-progress';
        status.style.background = '#ffd43b';
        
        // Start progress animation
        progressFill.style.width = '10%';
        
        // Show notification
        this.showNotification('Challenge started! Good luck! 🍀', 'success');
        
        // Update user stats
        this.currentUser.challengesCompleted++;
        this.updateUserStats();
    }

    updateChallengeProgress(card) {
        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.progress-text');
        const status = card.querySelector('.challenge-status');
        
        // Get current progress
        const currentWidth = parseFloat(progressFill.style.getPropertyValue('--fill'));
        const newProgress = Math.min(currentWidth + 20, 100);
        
        // Animate progress
        progressFill.style.width = `${newProgress}%`;
        progressFill.style.setProperty('--fill', `${newProgress}%`);
        
        // Update progress text
        if (newProgress === 100) {
            this.completeChallenge(card);
        } else {
            progressText.textContent = `${Math.round(newProgress * 0.15)}/15kg collected`;
        }
    }

    completeChallenge(card) {
        const status = card.querySelector('.challenge-status');
        const progressText = card.querySelector('.progress-text');
        
        // Update status
        status.textContent = '✓';
        status.className = 'challenge-status completed';
        status.style.background = '#51cf66';
        
        // Update progress text
        progressText.textContent = '15/15kg collected';
        
        // Add completion animation
        card.style.animation = 'celebrate 0.8s ease-in-out';
        
        // Show completion notification
        this.showNotification('Challenge completed! 🎉 +20 points earned!', 'success');
        
        // Update user stats
        this.currentUser.points += 20;
        this.currentUser.challengesCompleted++;
        this.updateUserStats();
        
        // Remove animation after completion
        setTimeout(() => {
            card.style.animation = '';
        }, 800);
    }

    showBadgeInfo(badge) {
        const title = badge.querySelector('h4').textContent;
        const description = badge.querySelector('p').textContent;
        const unlockInfo = badge.querySelector('.unlock-date').textContent;
        
        this.showNotification(`${title}: ${description} (${unlockInfo})`, 'info');
    }

    celebrateBadge(badge) {
        // Add celebration animation
        badge.style.animation = 'celebrate 1s ease-in-out';
        
        // Show celebration notification
        const title = badge.querySelector('h4').textContent;
        this.showNotification(`Achievement unlocked: ${title}! 🏆`, 'success');
        
        // Remove animation
        setTimeout(() => {
            badge.style.animation = '';
        }, 1000);
    }

    markTipAsRead(btn) {
        btn.textContent = '✓ Read';
        btn.style.background = '#51cf66';
        btn.style.color = '#000';
        btn.disabled = true;
        
        this.showNotification('Tip marked as read! 📚', 'success');
    }

    shareTip() {
        // Simulate sharing functionality
        this.showNotification('Sharing tip with community... 📤', 'info');
        
        setTimeout(() => {
            this.showNotification('Tip shared successfully! 🌍', 'success');
        }, 1500);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#51cf66' : type === 'warning' ? '#ffd43b' : '#3ddc97'};
            color: ${type === 'warning' ? '#000' : '#fff'};
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,.3);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }

    animateProgressBars() {
        // Animate progress bars on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFill = entry.target;
                    const progress = progressFill.style.getPropertyValue('--progress') || 
                                   progressFill.style.getPropertyValue('--goal') ||
                                   progressFill.style.getPropertyValue('--fill');
                    
                    if (progress) {
                        setTimeout(() => {
                            progressFill.style.width = progress;
                        }, 200);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.progress-fill, .goal-fill').forEach(bar => {
            observer.observe(bar);
        });
    }

    setupChallengeInteractions() {
        // Add click effects to challenge cards
        document.querySelectorAll('.challenge-card').forEach(card => {
            card.addEventListener('mousedown', () => {
                card.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('mouseup', () => {
                card.style.transform = 'scale(1)';
            });
        });
    }

    setupBadgeAnimations() {
        // Add entrance animations for badges
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        document.querySelectorAll('.badge-item').forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(20px)';
            badge.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(badge);
        });
    }

    setupLeaderboardAnimations() {
        // Add entrance animations for leaderboard items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.3 });
        
        document.querySelectorAll('.leaderboard-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    }

    setupTipInteractions() {
        // Add image hover effects
        const tipImage = document.querySelector('.tip-image img');
        if (tipImage) {
            tipImage.addEventListener('mouseenter', () => {
                tipImage.style.transform = 'scale(1.05) rotate(1deg)';
            });
            
            tipImage.addEventListener('mouseleave', () => {
                tipImage.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    }

    startProgressAnimations() {
        // Animate progress numbers
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.level-number, .points-number, .goal-percentage, .streak-days').forEach(num => {
            observer.observe(num);
        });
    }

    animateNumber(element) {
        const finalValue = parseInt(element.textContent.replace(/,/g, ''));
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * finalValue);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    updateUserStats() {
        // Update displayed stats
        const levelNumber = document.querySelector('.level-number');
        const pointsNumber = document.querySelector('.points-number');
        const challengesCompleted = document.querySelector('.goal-display + p');
        
        if (levelNumber) levelNumber.textContent = this.currentUser.level;
        if (pointsNumber) pointsNumber.textContent = this.currentUser.points.toLocaleString();
        if (challengesCompleted) {
            challengesCompleted.textContent = `${this.currentUser.challengesCompleted}/20 challenges completed`;
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(5deg); }
    }
    
    @keyframes celebrate {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        50% { transform: scale(1.2) rotate(5deg); }
        75% { transform: scale(1.1) rotate(-3deg); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
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
        background: rgba(255,255,255,0.2);
    }
    
    .progress-card, .challenge-card, .badge-item, .leaderboard-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

document.head.appendChild(style);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new RecyclingChallenges();
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
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});


