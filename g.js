// Helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Year in footer
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll for internal links
$$('a[href^="#"]').forEach(a => {
	a.addEventListener('click', e => {
		const href = a.getAttribute('href');
		if (href && href.length > 1) {
			e.preventDefault();
			document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	});
	
	// Professional AI Camera Waste Detection System
	const cameraWasteDetection = {
		stream: null,
		video: null,
		canvas: null,
		detectionBox: null,
		cameraStatus: null,
		resultsList: null,
		ctx: null,
		isAnalyzing: false,
		detectionHistory: [],
		
		init() {
			this.video = document.getElementById('camera-feed');
			this.canvas = document.getElementById('detection-canvas');
			this.ctx = this.canvas.getContext('2d');
			this.detectionBox = document.getElementById('detection-box');
			this.cameraStatus = document.getElementById('camera-status');
			this.resultsList = document.getElementById('results-list');
			
			this.setupEventListeners();
			this.initializeCanvas();
		},
		
		initializeCanvas() {
			// Set canvas dimensions to match video
			this.video.addEventListener('loadedmetadata', () => {
				this.canvas.width = this.video.videoWidth;
				this.canvas.height = this.video.videoHeight;
			});
		},
		
		setupEventListeners() {
			const startBtn = document.getElementById('start-camera');
			const captureBtn = document.getElementById('capture-photo');
			const stopBtn = document.getElementById('stop-camera');
			
			startBtn?.addEventListener('click', () => this.startCamera());
			captureBtn?.addEventListener('click', () => this.captureAndAnalyze());
			stopBtn?.addEventListener('click', () => this.stopCamera());
		},
		
		async startCamera() {
			try {
				// Professional camera settings for optimal waste detection
				this.stream = await navigator.mediaDevices.getUserMedia({ 
					video: { 
						facingMode: 'environment',
						width: { ideal: 1920, min: 1280 },
						height: { ideal: 1080, min: 720 },
						frameRate: { ideal: 30, min: 24 },
						aspectRatio: { ideal: 16/9 },
						exposureMode: 'continuous',
						focusMode: 'continuous',
						whiteBalanceMode: 'continuous'
					} 
				});
				
				this.video.srcObject = this.stream;
				this.video.play();
				
				// Wait for video to be ready
				await new Promise(resolve => {
					this.video.addEventListener('canplay', resolve, { once: true });
				});
				
				this.cameraStatus.textContent = '🔍 AI Ready - Point camera at waste material';
				this.showNotification('Professional AI detection system activated!', 'success');
				
				// Enable/disable buttons
				document.getElementById('start-camera').disabled = true;
				document.getElementById('capture-photo').disabled = false;
				document.getElementById('stop-camera').disabled = false;
				
				// Start real-time analysis
				this.startRealTimeAnalysis();
				
			} catch (error) {
				console.error('Camera access error:', error);
				this.cameraStatus.textContent = '❌ Camera access denied';
				this.showNotification('Camera access denied. Please allow camera permissions.', 'error');
			}
		},
		
		startRealTimeAnalysis() {
			// Real-time waste material detection
			const analyzeFrame = () => {
				if (this.stream && !this.isAnalyzing) {
					this.analyzeCurrentFrame();
				}
				requestAnimationFrame(analyzeFrame);
			};
			analyzeFrame();
		},
		
		analyzeCurrentFrame() {
			if (!this.video.videoWidth || this.isAnalyzing) return;
			
			// Draw current video frame to canvas
			this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
			
			// Get image data for analysis
			const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
			
			// Simulate real-time AI analysis
			this.detectWasteInFrame(imageData);
		},
		
		detectWasteInFrame(imageData) {
			// Simulate AI waste detection with realistic patterns
			const detectionProbability = Math.random();
			
			if (detectionProbability > 0.85) { // 15% chance of detection per frame
				this.isAnalyzing = true;
				setTimeout(() => {
					this.performAdvancedAnalysis();
					this.isAnalyzing = false;
				}, 1000);
			}
		},
		
		performAdvancedAnalysis() {
			// Advanced AI analysis simulation
			this.cameraStatus.textContent = '🧠 AI Analyzing - Processing material composition...';
			
			// Show detection box
			this.showDetectionBox();
			
			// Perform comprehensive analysis
			setTimeout(() => {
				this.analyzeWasteItem();
			}, 1500);
		},
		
		showDetectionBox() {
			this.detectionBox.style.display = 'block';
			this.detectionBox.style.left = '15%';
			this.detectionBox.style.top = '15%';
			this.detectionBox.style.width = '70%';
			this.detectionBox.style.height = '70%';
			this.detectionBox.style.borderColor = 'var(--brand)';
			this.detectionBox.style.animation = 'pulse 1s infinite';
		},
		
		stopCamera() {
			if (this.stream) {
				this.stream.getTracks().forEach(track => track.stop());
				this.stream = null;
			}
			
			this.video.srcObject = null;
			this.cameraStatus.textContent = '📷 Click to start camera';
			this.detectionBox.style.display = 'none';
			
			// Reset buttons
			document.getElementById('start-camera').disabled = false;
			document.getElementById('capture-photo').disabled = true;
			document.getElementById('stop-camera').disabled = true;
		},
		
		captureAndAnalyze() {
			if (!this.stream) return;
			
			this.isAnalyzing = true;
			this.cameraStatus.textContent = '📸 Capturing high-resolution image...';
			
			// Capture high-quality frame
			setTimeout(() => {
				this.cameraStatus.textContent = '🔍 AI Processing - Analyzing material properties...';
				this.showDetectionBox();
				
				// Simulate advanced AI analysis
				setTimeout(() => {
					this.cameraStatus.textContent = '🧬 Material Composition Analysis...';
					
					setTimeout(() => {
						this.cameraStatus.textContent = '📊 Generating detailed report...';
						
						setTimeout(() => {
							this.analyzeWasteItem();
							this.isAnalyzing = false;
						}, 1000);
					}, 1000);
				}, 1500);
			}, 1000);
		},
		
		analyzeWasteItem() {
			// Professional-grade waste detection database with scientific accuracy
			const wasteDatabase = {
				plastic: [
					{ name: 'PET Plastic Bottle (Water)', category: 'dry', icon: '🥤', confidence: 98, material: 'Polyethylene Terephthalate (C10H8O4)n', recycling: '♻️ Recyclable - RIC #1' },
					{ name: 'HDPE Plastic Container (Milk)', category: 'dry', icon: '🥛', confidence: 97, material: 'High-Density Polyethylene (C2H4)n', recycling: '♻️ Recyclable - RIC #2' },
					{ name: 'PVC Plastic Pipe', category: 'dry', icon: '🔧', confidence: 96, material: 'Polyvinyl Chloride (C2H3Cl)n', recycling: '⚠️ Limited Recycling - RIC #3' },
					{ name: 'LDPE Plastic Bag', category: 'dry', icon: '🛍️', confidence: 95, material: 'Low-Density Polyethylene (C2H4)n', recycling: '♻️ Recyclable - RIC #4' },
					{ name: 'PP Plastic Food Container', category: 'dry', icon: '🍱', confidence: 97, material: 'Polypropylene (C3H6)n', recycling: '♻️ Recyclable - RIC #5' },
					{ name: 'PS Plastic Cup (Styrofoam)', category: 'dry', icon: '☕', confidence: 94, material: 'Polystyrene (C8H8)n', recycling: '❌ Limited Recycling - RIC #6' },
					{ name: 'Plastic Straw', category: 'dry', icon: '🥤', confidence: 93, material: 'Polypropylene (C3H6)n', recycling: '♻️ Recyclable - RIC #5' },
					{ name: 'Plastic Cutlery', category: 'dry', icon: '🍴', confidence: 92, material: 'Polypropylene (C3H6)n', recycling: '♻️ Recyclable - RIC #5' },
					{ name: 'PET Food Tray', category: 'dry', icon: '🍱', confidence: 96, material: 'Polyethylene Terephthalate (C10H8O4)n', recycling: '♻️ Recyclable - RIC #1' },
					{ name: 'HDPE Detergent Bottle', category: 'dry', icon: '🧴', confidence: 95, material: 'High-Density Polyethylene (C2H4)n', recycling: '♻️ Recyclable - RIC #2' }
				],
				paper: [
					{ name: 'Corrugated Cardboard Box', category: 'dry', icon: '📦', confidence: 99, material: 'Corrugated Fiberboard (C6H10O5)n', recycling: '♻️ Highly Recyclable - Paper Grade' },
					{ name: 'Office Paper (A4)', category: 'dry', icon: '📄', confidence: 98, material: 'Wood Pulp Paper (C6H10O5)n', recycling: '♻️ Highly Recyclable - Paper Grade' },
					{ name: 'Newspaper', category: 'dry', icon: '📰', confidence: 97, material: 'Newsprint Paper (C6H10O5)n', recycling: '♻️ Highly Recyclable - Paper Grade' },
					{ name: 'Magazine', category: 'dry', icon: '📖', confidence: 96, material: 'Coated Paper (C6H10O5)n + Clay', recycling: '♻️ Recyclable - Paper Grade' },
					{ name: 'Paper Towel', category: 'wet', icon: '🧻', confidence: 95, material: 'Tissue Paper (C6H10O5)n', recycling: '❌ Not Recyclable - Contaminated' },
					{ name: 'Paper Bag', category: 'dry', icon: '🛍️', confidence: 94, material: 'Kraft Paper (C6H10O5)n', recycling: '♻️ Recyclable - Paper Grade' },
					{ name: 'Egg Carton', category: 'dry', icon: '🥚', confidence: 93, material: 'Pulp Paper (C6H10O5)n', recycling: '♻️ Recyclable - Paper Grade' },
					{ name: 'Pizza Box', category: 'dry', icon: '🍕', confidence: 92, material: 'Corrugated Cardboard (C6H10O5)n', recycling: '⚠️ Conditionally Recyclable - Clean Only' },
					{ name: 'Waxed Paper', category: 'dry', icon: '📄', confidence: 91, material: 'Paper (C6H10O5)n + Paraffin Wax', recycling: '❌ Not Recyclable - Wax Coating' }
				],
				metal: [
					{ name: 'Aluminum Beverage Can', category: 'dry', icon: '🥤', confidence: 99, material: 'Aluminum Alloy (Al + Mn + Mg)', recycling: '♻️ Highly Recyclable - Metal Grade' },
					{ name: 'Steel Food Can', category: 'dry', icon: '🥫', confidence: 98, material: 'Tin-Coated Steel (Fe + Sn)', recycling: '♻️ Highly Recyclable - Metal Grade' },
					{ name: 'Aluminum Foil', category: 'dry', icon: '📄', confidence: 96, material: 'Aluminum Foil (Al 99.5%)', recycling: '♻️ Recyclable - Metal Grade' },
					{ name: 'Metal Jar Lid', category: 'dry', icon: '🫙', confidence: 95, material: 'Steel (Fe + C + Mn)', recycling: '♻️ Recyclable - Metal Grade' },
					{ name: 'Copper Wire', category: 'dry', icon: '🔌', confidence: 97, material: 'Copper (Cu 99.9%)', recycling: '♻️ Highly Recyclable - Metal Grade' },
					{ name: 'Aluminum Food Tray', category: 'dry', icon: '🍱', confidence: 94, material: 'Aluminum Alloy (Al + Si)', recycling: '♻️ Recyclable - Metal Grade' },
					{ name: 'Steel Nail', category: 'dry', icon: '🔨', confidence: 93, material: 'Carbon Steel (Fe + C)', recycling: '♻️ Recyclable - Metal Grade' }
				],
				glass: [
					{ name: 'Clear Glass Bottle', category: 'dry', icon: '🍾', confidence: 99, material: 'Soda-Lime Glass (SiO2 + Na2O + CaO)', recycling: '♻️ Highly Recyclable - Glass Grade' },
					{ name: 'Green Glass Bottle', category: 'dry', icon: '🍷', confidence: 98, material: 'Soda-Lime Glass + Fe2O3 (Green)', recycling: '♻️ Highly Recyclable - Glass Grade' },
					{ name: 'Brown Glass Bottle', category: 'dry', icon: '🍺', confidence: 98, material: 'Soda-Lime Glass + Fe2O3 (Brown)', recycling: '♻️ Highly Recyclable - Glass Grade' },
					{ name: 'Glass Jar', category: 'dry', icon: '🫙', confidence: 97, material: 'Soda-Lime Glass (SiO2 + Na2O + CaO)', recycling: '♻️ Highly Recyclable - Glass Grade' },
					{ name: 'Light Bulb (LED)', category: 'e-waste', icon: '💡', confidence: 95, material: 'Glass + Electronics + Rare Earth Elements', recycling: '♻️ Specialized E-Waste Recycling' },
					{ name: 'Mirror', category: 'dry', icon: '🪞', confidence: 94, material: 'Glass + Silver Coating + Paint', recycling: '❌ Not Recyclable - Coated Glass' },
					{ name: 'Window Glass', category: 'dry', icon: '🪟', confidence: 93, material: 'Float Glass (SiO2 + Na2O + CaO)', recycling: '♻️ Recyclable - Glass Grade' }
				],
				organic: [
					{ name: 'Banana Peel', category: 'wet', icon: '🍌', confidence: 99, material: 'Organic Fruit Waste (C6H10O5)n + K+', recycling: '♻️ Compostable - Organic Grade' },
					{ name: 'Apple Core', category: 'wet', icon: '🍎', confidence: 98, material: 'Organic Fruit Waste (C6H10O5)n + Pectin', recycling: '♻️ Compostable - Organic Grade' },
					{ name: 'Vegetable Scraps', category: 'wet', icon: '🥬', confidence: 97, material: 'Organic Vegetable Waste (C6H10O5)n + Cellulose', recycling: '♻️ Compostable - Organic Grade' },
					{ name: 'Coffee Grounds', category: 'wet', icon: '☕', confidence: 96, material: 'Organic Coffee Waste (C8H10N4O2)n + N + P', recycling: '♻️ Compostable - Organic Grade' },
					{ name: 'Tea Bags', category: 'wet', icon: '🫖', confidence: 95, material: 'Organic Tea Waste (C8H10N4O2)n + Tannins', recycling: '♻️ Compostable - Organic Grade' },
					{ name: 'Bread Crumbs', category: 'wet', icon: '🍞', confidence: 94, material: 'Organic Bread Waste (C6H10O5)n + Gluten', recycling: '♻️ Compostable - Organic Grade' },
					{ name: 'Egg Shells', category: 'wet', icon: '🥚', confidence: 93, material: 'Organic Egg Waste (CaCO3) + Protein', recycling: '♻️ Compostable - Organic Grade' },
					{ name: 'Orange Peel', category: 'wet', icon: '🍊', confidence: 92, material: 'Organic Fruit Waste (C6H10O5)n + Limonene', recycling: '♻️ Compostable - Organic Grade' },
					{ name: 'Potato Peels', category: 'wet', icon: '🥔', confidence: 91, material: 'Organic Vegetable Waste (C6H10O5)n + Starch', recycling: '♻️ Compostable - Organic Grade' }
				],
				hazardous: [
					{ name: 'Alkaline Battery (AA)', category: 'hazardous', icon: '🔋', confidence: 99, material: 'Zinc-Manganese Dioxide (Zn + MnO2 + KOH)', recycling: '⚠️ Hazardous - Specialized Battery Recycling' },
					{ name: 'Lithium Battery (CR2032)', category: 'hazardous', icon: '🔋', confidence: 98, material: 'Lithium Manganese Dioxide (Li + MnO2)', recycling: '⚠️ Hazardous - Specialized Battery Recycling' },
					{ name: 'Lead-Acid Battery', category: 'hazardous', icon: '🔋', confidence: 97, material: 'Lead (Pb) + Sulfuric Acid (H2SO4)', recycling: '⚠️ Hazardous - Specialized Battery Recycling' },
					{ name: 'Mercury Thermometer', category: 'hazardous', icon: '🌡️', confidence: 96, material: 'Mercury (Hg) + Glass (SiO2)', recycling: '⚠️ Hazardous - Specialized Hazardous Waste' },
					{ name: 'Paint Can (Oil-based)', category: 'hazardous', icon: '🎨', confidence: 95, material: 'Oil Paint + Volatile Organic Compounds', recycling: '⚠️ Hazardous - Specialized Paint Recycling' },
					{ name: 'Pesticide Container', category: 'hazardous', icon: '🧪', confidence: 94, material: 'Chemical Pesticides + Organophosphates', recycling: '⚠️ Hazardous - Specialized Chemical Waste' },
					{ name: 'Motor Oil Container', category: 'hazardous', icon: '🛢️', confidence: 93, material: 'Used Motor Oil + Contaminants', recycling: '⚠️ Hazardous - Specialized Oil Recycling' },
					{ name: 'Fluorescent Light Bulb', category: 'hazardous', icon: '💡', confidence: 92, material: 'Glass + Mercury (Hg) + Phosphor', recycling: '⚠️ Hazardous - Specialized Light Bulb Recycling' },
					{ name: 'Aerosol Can', category: 'hazardous', icon: '🧴', confidence: 91, material: 'Aluminum + Propellant + Contents', recycling: '⚠️ Hazardous - Specialized Aerosol Recycling' }
				],
				electronics: [
					{ name: 'Smartphone', category: 'e-waste', icon: '📱', confidence: 99, material: 'Plastic + Glass + Metals + Electronics + Rare Earth Elements', recycling: '♻️ Specialized E-Waste Recycling' },
					{ name: 'Laptop Computer', category: 'e-waste', icon: '💻', confidence: 98, material: 'Plastic + Metal + Electronics + Lithium Battery', recycling: '♻️ Specialized E-Waste Recycling' },
					{ name: 'LED TV Screen', category: 'e-waste', icon: '📺', confidence: 97, material: 'Glass + Plastic + Electronics + LED Components', recycling: '♻️ Specialized E-Waste Recycling' },
					{ name: 'Computer Mouse', category: 'e-waste', icon: '🖱️', confidence: 96, material: 'Plastic + Electronics + Optical Sensors', recycling: '♻️ Specialized E-Waste Recycling' },
					{ name: 'USB Cable', category: 'e-waste', icon: '🔌', confidence: 95, material: 'Copper + Plastic + Rubber + Shielding', recycling: '♻️ Specialized E-Waste Recycling' },
					{ name: 'Power Adapter', category: 'e-waste', icon: '🔌', confidence: 94, material: 'Plastic + Metal + Electronics + Transformers', recycling: '♻️ Specialized E-Waste Recycling' },
					{ name: 'Headphones', category: 'e-waste', icon: '🎧', confidence: 93, material: 'Plastic + Metal + Electronics + Speakers', recycling: '♻️ Specialized E-Waste Recycling' },
					{ name: 'Tablet Device', category: 'e-waste', icon: '📱', confidence: 92, material: 'Glass + Plastic + Electronics + Touch Screen', recycling: '♻️ Specialized E-Waste Recycling' },
					{ name: 'Gaming Console', category: 'e-waste', icon: '🎮', confidence: 91, material: 'Plastic + Metal + Electronics + Cooling Systems', recycling: '♻️ Specialized E-Waste Recycling' }
				],
				textiles: [
					{ name: 'Cotton T-Shirt', category: 'dry', icon: '👕', confidence: 97, material: '100% Cotton Fabric (C6H10O5)n', recycling: '♻️ Recyclable - Textile Grade' },
					{ name: 'Denim Jeans', category: 'dry', icon: '👖', confidence: 96, material: 'Denim Cotton Fabric (C6H10O5)n + Indigo Dye', recycling: '♻️ Recyclable - Textile Grade' },
					{ name: 'Wool Sweater', category: 'dry', icon: '🧥', confidence: 95, material: 'Wool Fiber (Keratin Protein)', recycling: '♻️ Recyclable - Textile Grade' },
					{ name: 'Polyester Fabric', category: 'dry', icon: '🧵', confidence: 94, material: 'Synthetic Polyester Fiber (C10H8O4)n', recycling: '♻️ Recyclable - Textile Grade' },
					{ name: 'Leather Shoes', category: 'dry', icon: '👟', confidence: 93, material: 'Animal Leather (Collagen + Tanning Agents)', recycling: '♻️ Recyclable - Textile Grade' },
					{ name: 'Silk Scarf', category: 'dry', icon: '🧣', confidence: 92, material: 'Silk Fiber (Fibroin Protein)', recycling: '♻️ Recyclable - Textile Grade' },
					{ name: 'Nylon Stockings', category: 'dry', icon: '🧦', confidence: 91, material: 'Synthetic Nylon Fiber (C6H11NO)n', recycling: '♻️ Recyclable - Textile Grade' }
				]
			};
			
			// Flatten all waste types into a single array
			const allWasteTypes = Object.values(wasteDatabase).flat();
			
			// Simulate realistic detection (1-2 items typically detected)
			const numItems = Math.floor(Math.random() * 2) + 1;
			const detectedItems = [];
			
			// Select random items with realistic confidence variations
			for (let i = 0; i < numItems; i++) {
				const randomItem = allWasteTypes[Math.floor(Math.random() * allWasteTypes.length)];
				const confidenceVariation = Math.floor(Math.random() * 6) - 3; // ±3% variation
				const finalConfidence = Math.max(85, Math.min(99, randomItem.confidence + confidenceVariation));
				
				detectedItems.push({
					...randomItem,
					confidence: finalConfidence
				});
			}
			
			// Sort by confidence (highest first)
			detectedItems.sort((a, b) => b.confidence - a.confidence);
			
			this.displayResults(detectedItems);
			this.cameraStatus.textContent = '✅ Analysis complete!';
			
			// Hide detection box after a delay
			setTimeout(() => {
				this.detectionBox.style.display = 'none';
			}, 3000);
		},
		
		displayResults(items) {
			this.resultsList.innerHTML = '';
			
			items.forEach(item => {
				const resultItem = document.createElement('div');
				resultItem.className = 'detection-item';
				resultItem.innerHTML = `
					<div class="item-info">
						<span class="item-icon">${item.icon}</span>
						<div class="item-details">
							<h5>${item.name}</h5>
							<span class="category">${item.category.toUpperCase()} WASTE</span>
							<span class="material">${item.material}</span>
							<span class="recycling">${item.recycling}</span>
						</div>
					</div>
					<span class="confidence">${item.confidence}%</span>
				`;
				
				this.resultsList.appendChild(resultItem);
			});
			
			// Show success notification
			this.showNotification(`Detected ${items.length} waste item(s)!`, 'success');
			
			// Add to detection history
			this.detectionHistory.push({
				timestamp: new Date(),
				items: items,
				totalItems: items.length
			});
			
			// Show analysis summary
			this.showAnalysisSummary(items);
		},
		
		showAnalysisSummary(items) {
			const summary = document.createElement('div');
			summary.className = 'analysis-summary';
			summary.innerHTML = `
				<div class="summary-header">
					<h4>🔬 AI Analysis Summary</h4>
					<span class="summary-timestamp">${new Date().toLocaleTimeString()}</span>
				</div>
				<div class="summary-stats">
					<div class="stat">
						<span class="stat-value">${items.length}</span>
						<span class="stat-label">Items Detected</span>
					</div>
					<div class="stat">
						<span class="stat-value">${Math.round(items.reduce((acc, item) => acc + item.confidence, 0) / items.length)}%</span>
						<span class="stat-label">Avg Confidence</span>
					</div>
					<div class="stat">
						<span class="stat-value">${new Set(items.map(item => item.category)).size}</span>
						<span class="stat-label">Categories</span>
					</div>
				</div>
				<div class="summary-recommendations">
					<h5>♻️ Recycling Recommendations:</h5>
					<ul>
						${items.map(item => `<li><strong>${item.name}:</strong> ${item.recycling}</li>`).join('')}
					</ul>
				</div>
			`;
			
			// Insert summary at the top of results
			this.resultsList.insertBefore(summary, this.resultsList.firstChild);
		},
		
		showNotification(message, type = 'info') {
			const notification = document.createElement('div');
			notification.style.cssText = `
				position: fixed;
				top: 20px;
				right: 20px;
				background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--surface)'};
				color: ${type === 'success' ? 'var(--bg)' : 'var(--text)'};
				border-left: 4px solid ${type === 'success' ? 'var(--brand)' : type === 'error' ? 'var(--danger)' : 'var(--accent)'};
				border-radius: 8px;
				padding: 16px 20px;
				box-shadow: 0 10px 30px rgba(0,0,0,0.3);
				z-index: 1000;
				max-width: 300px;
				animation: slideInRight 0.3s ease-out;
			`;
			notification.textContent = message;
			
			document.body.appendChild(notification);
			
			// Auto-remove after 4 seconds
			setTimeout(() => {
				notification.style.animation = 'slideOutRight 0.3s ease-out';
				setTimeout(() => notification.remove(), 300);
			}, 4000);
		}
	};
	
	// Initialize camera detection when DOM is loaded
	if (document.getElementById('camera-feed')) {
		cameraWasteDetection.init();
	}
});

// Scroll progress bar
const progressBar = $('.scroll-progress');
const updateProgress = () => {
	const scrollTop = window.scrollY || document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight - window.innerHeight;
	const progress = Math.max(0, Math.min(1, scrollTop / (height || 1)));
	if (progressBar) progressBar.style.width = `${progress * 100}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

// To-top button
const toTopBtn = $('.to-top');
const toggleToTop = () => {
	if (!toTopBtn) return;
	toTopBtn.classList.toggle('show', window.scrollY > 600);
};
window.addEventListener('scroll', toggleToTop, { passive: true });
toggleToTop();
if (toTopBtn) {
	toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Reveal on scroll
const revealEls = $$('.reveal');
const revealObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// Counter animation
const counters = $$('.counter');
const animateCounter = (el) => {
	const target = parseInt(el.getAttribute('data-target') || '0', 10);
	let current = 0;
	const duration = 1400 + Math.random() * 800;
	const start = performance.now();
	const step = (now) => {
		const p = Math.min(1, (now - start) / duration);
		// easeOutCubic
		const eased = 1 - Math.pow(1 - p, 3);
		current = Math.round(target * eased);
		el.textContent = current.toLocaleString();
		if (p < 1) requestAnimationFrame(step);
	};
	requestAnimationFrame(step);
};
const counterObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			animateCounter(entry.target);
			counterObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.4 });
counters.forEach(el => counterObserver.observe(el));

// Carpool dashboard counter animation
const carpoolCounters = $$('.animated-number');
const animateCarpoolCounter = (el) => {
	const target = parseFloat(el.getAttribute('data-target') || '0');
	let current = 0;
	const duration = 1800 + Math.random() * 600;
	const start = performance.now();
	const step = (now) => {
		const p = Math.min(1, (now - start) / duration);
		// easeOutQuart
		const eased = 1 - Math.pow(1 - p, 4);
		current = target * eased;
		
		// Format based on the type of number
		if (target >= 100) {
			el.textContent = Math.round(current).toLocaleString();
		} else {
			el.textContent = current.toFixed(1);
		}
		
		if (p < 1) requestAnimationFrame(step);
	};
	requestAnimationFrame(step);
};
const carpoolCounterObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			animateCarpoolCounter(entry.target);
			carpoolCounterObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.4 });
carpoolCounters.forEach(el => carpoolCounterObserver.observe(el));

// Tilt hover effect
const tiltEls = $$('.tilt');
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

tiltEls.forEach(el => {
	let rect;
	const onMove = (e) => {
		rect = rect || el.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width;
		const py = (e.clientY - rect.top) / rect.height;
		const rotateX = clamp((0.5 - py) * 14, -10, 10);
		const rotateY = clamp((px - 0.5) * 14, -10, 10);
		el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	};
	const onLeave = () => {
		rect = undefined;
		el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
	};
	el.addEventListener('mousemove', onMove);
	el.addEventListener('mouseleave', onLeave);
});

// Gentle parallax for floating leaves
const parallaxEls = $$('.parallax');
const parallax = () => {
	const sx = (window.scrollY || window.pageYOffset);
	parallaxEls.forEach(el => {
		const depth = parseFloat(el.getAttribute('data-depth') || '0.2');
		el.style.transform = `translate3d(0, ${sx * depth * 0.15}px, 0)`;
	});
};
window.addEventListener('scroll', parallax, { passive: true });
parallax();

// Minor: nav active link highlight on scroll
const sections = ['home','initiatives','challenges','carpool','impact','contact'].map(id => ({ id, el: document.getElementById(id) }));
const navLinks = $$('.nav a');
const activateNav = () => {
	const scrollPos = window.scrollY + 120;
	let active = 'home';
	for (const s of sections) {
		if (s.el && s.el.offsetTop <= scrollPos) active = s.id;
	}
	navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${active}`));
};
window.addEventListener('scroll', activateNav, { passive: true });
activateNav();

// Carpool section interactions
document.addEventListener('DOMContentLoaded', () => {
	// Leaderboard entry interactions
	const leaderboardEntries = $$('.leaderboard-entry');
	leaderboardEntries.forEach(entry => {
		entry.addEventListener('click', () => {
			const rank = entry.getAttribute('data-rank');
			const username = entry.querySelector('.username').textContent;
			const rides = entry.querySelector('.rides-count').textContent;
			const co2 = entry.querySelector('.co2-saved').textContent;
			const points = entry.querySelector('.points').textContent;
			
			// Create a simple notification
			const notification = document.createElement('div');
			notification.style.cssText = `
				position: fixed;
				top: 20px;
				right: 20px;
				background: var(--surface);
				border-left: 4px solid var(--accent);
				border-radius: 8px;
				padding: 16px 20px;
				box-shadow: 0 10px 30px rgba(0,0,0,0.3);
				z-index: 1000;
				max-width: 300px;
				animation: slideInRight 0.3s ease-out;
			`;
			notification.innerHTML = `
				<div style="font-weight: 600; color: var(--accent); margin-bottom: 8px;">🏆 ${username}</div>
				<div style="font-size: 0.9rem; color: var(--muted);">
					Rank: #${rank} | Rides: ${rides} | CO₂: ${co2} | Points: ${points}
				</div>
			`;
			
			// Add slide in animation
			if (!document.querySelector('#slide-in-animation')) {
				const style = document.createElement('style');
				style.id = 'slide-in-animation';
				style.textContent = `
					@keyframes slideInRight {
						from { transform: translateX(100%); opacity: 0; }
						to { transform: translateX(0); opacity: 1; }
					}
				`;
				document.head.appendChild(style);
			}
			
			document.body.appendChild(notification);
			
			// Auto-remove after 4 seconds
			setTimeout(() => {
				notification.style.animation = 'slideOutRight 0.3s ease-out';
				setTimeout(() => notification.remove(), 300);
			}, 4000);
			
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
		});
	});
	
	// Challenge card hover effects
	const challengeHero = $('.challenge-hero');
	if (challengeHero) {
		challengeHero.addEventListener('mouseenter', () => {
			const progressFill = challengeHero.querySelector('.progress-fill');
			if (progressFill) {
				progressFill.style.animation = 'pulse 1s ease-in-out';
			}
		});
		
		challengeHero.addEventListener('mouseleave', () => {
			const progressFill = challengeHero.querySelector('.progress-fill');
			if (progressFill) {
				progressFill.style.animation = '';
			}
		});
		
		// Add pulse animation
		if (!document.querySelector('#pulse-animation')) {
			const pulseStyle = document.createElement('style');
			pulseStyle.id = 'pulse-animation';
			pulseStyle.textContent = `
				@keyframes pulse {
					0%, 100% { transform: scale(1); }
					50% { transform: scale(1.02); }
				}
			`;
			document.head.appendChild(pulseStyle);
		}
	}
});


