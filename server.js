const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  // Normalize URL
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.startsWith('/Bloom-Beauty/')) {
    reqPath = reqPath.slice('/Bloom-Beauty'.length);
  } else if (reqPath === '/Bloom-Beauty') {
    reqPath = '/index.html';
  }
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // First look directly in root
  let filePath = path.join(__dirname, reqPath);

  // Security check: stay within directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Helper to serve a found file
  function serveFile(p) {
    const ext = path.extname(p).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(p).pipe(res);
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      return serveFile(filePath);
    }

    // Try in public/ folder (for /images/..., /css/..., /js/...)
    const publicPath = path.join(__dirname, 'public', reqPath);
    fs.stat(publicPath, (errPub, statsPub) => {
      if (!errPub && statsPub.isFile()) {
        return serveFile(publicPath);
      }

      // If missing asset with extension, do not return index.html
      const ext = path.extname(reqPath).toLowerCase();
      if (ext && ext !== '.html') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`404 Not Found: ${reqPath}`);
        return;
      }

      // Fallback to index.html for navigation / SPA routes
      const fallbackPath = path.join(__dirname, 'index.html');
      fs.readFile(fallbackPath, (errFallback, content) => {
        if (errFallback) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
    });
  });
});

server.listen(PORT, () => {
  console.log(`Bloom Beauty server running at http://localhost:${PORT}`);
});
