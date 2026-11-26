// Deploy as a standalone Apps Script web app: execute as owner, access only myself.
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index').setTitle('VILASSTECH Oficina Virtual');
}
function verificarConexion() {
  return {cuota: MailApp.getRemainingDailyQuota()};
}
function enviarAprobado(datos) {
  if (!datos || datos.aprobado !== true) throw new Error('Aprobación requerida');
  const correo = String(datos.correo || '').trim();
  const asunto = String(datos.asunto || '').trim();
  const cuerpo = String(datos.cuerpo || '').trim();
  if (!/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(correo) || !asunto || !cuerpo) throw new Error('Datos incompletos');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = PropertiesService.getScriptProperties();
    const key = 'envio_' + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, correo+'\n'+asunto+'\n'+cuerpo));
    if (p.getProperty(key)) throw new Error('Envío duplicado o pendiente de verificación');
    p.setProperty(key, 'pendiente');
    MailApp.sendEmail({to:correo, subject:asunto, body:cuerpo, name:'VILASSTECH'});
    p.setProperty(key, 'enviado');
    return 'Correo enviado';
  } finally { lock.releaseLock(); }
}
