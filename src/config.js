module.exports = {
  commonOptions: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/soap+xml; charset=utf-8'
    }
  },
  loginEnvRegex: /<ZalogujResult>(.*)<\/ZalogujResult>/,
  queryEnvRegex: /<DaneSzukajResult>([\s\S]+)<\/DaneSzukajResult>/
};
