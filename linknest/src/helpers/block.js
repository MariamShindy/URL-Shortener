const bannedIPs = new Set();

function checkBan(req, res, next) {
  const ip = req.ip;
  if (bannedIPs.has(ip)) {
    return res.status(403).json({ error: 'Your IP is banned due to abuse.' });
  }
  next();
}

function banIP(ip) {
  bannedIPs.add(ip);
  console.log(`IP ${ip} has been banned.`);
}

function unbanIP(ip) {
  bannedIPs.delete(ip);
  console.log(`IP ${ip} has been unbanned.`);
}

exports.checkBan = checkBan;
exports.banIP = banIP;
exports.unbanIP = unbanIP;
