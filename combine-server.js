const fs = require('fs');

// Loeme failid sisse
const serverMain = fs.readFileSync('server.js', 'utf8');
const serverPart4 = fs.readFileSync('server-part4.js', 'utf8');
const serverPart5 = fs.readFileSync('server-part5.js', 'utf8');

// Kombineerime failid kokku
const combined = serverMain + '\n\n' + serverPart4 + '\n\n' + serverPart5;

// Kirjutame kombineeritud faili
fs.writeFileSync('server-combined.js', combined);

console.log('Server.js kombineeritud edukalt!');
