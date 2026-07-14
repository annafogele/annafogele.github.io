// Fixed ASCII Art Generator
function loadImageAndConvert() {
    console.log("ASCII Art script started...");
    
    const img = new Image();
    // IMPORTANT: Change this to YOUR image path
    img.src = "assets/fona-bilde/gult.jpg"; 
    
    img.onload = function() {
        console.log("Image loaded successfully!");
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const width = 60; // Made smaller for better display
        const height = 60;
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        // Characters from dark to light
        const chars = ['█', '▓', '▒', '░', ' ', ' ', ' ', ' '];
        
        let ascii = '';
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const brightness = (data[index] + data[index+1] + data[index+2]) / 3;
                const charIndex = Math.floor((brightness / 256) * chars.length);
                ascii += chars[charIndex] || ' ';
            }
            ascii += '\n';
        }
        
        // Find the container and display it
        const container = document.getElementById('ascii-container');
        if (container) {
            container.innerHTML = `<pre style="font-family: monospace; color: #f43f5e; font-size: 10px; line-height: 1.2;">${ascii}</pre>`;
            console.log("ASCII art displayed!");
        } else {
            console.error("Couldn't find #ascii-container element");
        }
    };
    
    img.onerror = function() {
        console.error("Failed to load image. Check the path: /images/your-image.webp");
        document.getElementById('ascii-container').innerHTML = '<p style="color:red;">Image not found! Make sure /images/your-image.webp exists</p>';
    };
}