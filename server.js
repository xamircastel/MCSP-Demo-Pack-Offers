const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const hostname = 'localhost';

// MIME types para diferentes archivos
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Obtener la ruta del archivo
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);
    
    // Obtener la extensión del archivo
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Leer y servir el archivo
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Archivo no encontrado
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <body>
                            <h1>404 - Archivo no encontrado</h1>
                            <p>El archivo ${req.url} no existe.</p>
                            <a href="/">Ir al inicio</a>
                        </body>
                    </html>
                `);
            } else {
                // Error del servidor
                res.writeHead(500);
                res.end(`Error del servidor: ${err.code}`);
            }
        } else {
            // Archivo encontrado, servirlo
            const headers = { 
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            };
            
            // Headers adicionales para CSS
            if (extname === '.css') {
                headers['Access-Control-Allow-Origin'] = '*';
                headers['X-Content-Type-Options'] = 'nosniff';
            }
            
            res.writeHead(200, headers);
            res.end(content);
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`🚀 Servidor corriendo en http://${hostname}:${port}/`);
    console.log(`📁 Sirviendo archivos desde: ${__dirname}`);
    console.log(`⏰ Iniciado en: ${new Date().toLocaleString()}`);
    console.log(`\n🌐 Abre tu navegador en: http://localhost:${port}`);
    console.log(`\n💡 Para detener el servidor, presiona Ctrl+C`);
});

// Manejar cierre graceful
process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor cerrado correctamente.');
        process.exit(0);
    });
});

// Manejar errores
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ El puerto ${port} ya está en uso.`);
        console.log(`💡 Intenta cerrar otros servidores o usa otro puerto.`);
    } else {
        console.error('❌ Error del servidor:', err);
    }
});
