const crypto = require('crypto');

function diagnoseByBuffer(buffer, allDiseases) {
  const hash = crypto.createHash('sha1').update(buffer).digest('hex');
  const pick = parseInt(hash.slice(0, 8), 16) % allDiseases.length;
  return allDiseases[pick].name;
}

module.exports = { diagnoseByBuffer };
