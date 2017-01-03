const loginEnvelope = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
<wsa:To>{{ DESTINATION_URL }}</wsa:To>
<wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj</wsa:Action>
</soap:Header>
   <soap:Body>
      <ns:Zaloguj>
         <ns:pKluczUzytkownika>{{ API_KEY }}</ns:pKluczUzytkownika>
      </ns:Zaloguj>
   </soap:Body>
</soap:Envelope>
`.trim();

module.exports = class LoginEnvelope {
  constructor(destinationURL, apiKey) {
    this._destinationURL = destinationURL;
    this._apiKey = apiKey;
  }

  toString() {
    return loginEnvelope.replace('{{ DESTINATION_URL }}', this._destinationURL)
      .replace('{{ API_KEY }}', this._apiKey)
  }
};
