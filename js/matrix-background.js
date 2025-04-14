document.addEventListener('DOMContentLoaded', () => {
    // Create a canvas element for the matrix effect
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Matrix grid settings
    const gridSize = 20;
    const gridColor = 'rgba(51, 51, 51, 0.1)';
    const gridLines = [];
    
    // Create grid lines
    for (let x = 0; x < width; x += gridSize) {
        gridLines.push({ x, y: 0, length: height, angle: 0 });
    }
    for (let y = 0; y < height; y += gridSize) {
        gridLines.push({ x: 0, y, length: width, angle: Math.PI / 2 });
    }

    // Mouse position for parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        // Recreate grid lines
        gridLines.length = 0;
        for (let x = 0; x < width; x += gridSize) {
            gridLines.push({ x, y: 0, length: height, angle: 0 });
        }
        for (let y = 0; y < height; y += gridSize) {
            gridLines.push({ x: 0, y, length: width, angle: Math.PI / 2 });
        }
    });

    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Smooth mouse tracking
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        // Calculate parallax offset
        const offsetX = (targetX - width / 2) * 0.01;
        const offsetY = (targetY - height / 2) * 0.01;
        
        // Draw grid with parallax effect
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        
        gridLines.forEach(line => {
            ctx.beginPath();
            
            if (line.angle === 0) {
                // Vertical lines
                const x = line.x + offsetX;
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            } else {
                // Horizontal lines
                const y = line.y + offsetY;
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            
            ctx.stroke();
        });
        
        // Request next frame
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
}); 