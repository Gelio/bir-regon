const logoutEnvelope = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
<wsa:To>{{ DESTINATION_URL }}</wsa:To>
<wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Wyloguj</wsa:Action>
</soap:Header>
   <soap:Body>
      <ns:Wyloguj>
         <ns:pIdentyfikatorSesji>{{ SESSION_ID }}</ns:pIdentyfikatorSesji>
      </ns:Wyloguj>
   </soap:Body>
</soap:Envelope>
`.trim();

module.exports = class LogoutEnvelope {
  constructor(destinationURL, sessionID) {
    this._destinationURL = destinationURL;
    this._sessionID = sessionID;
  }

  toString() {
    return logoutEnvelope.replace('{{ DESTINATION_URL }}', this._destinationURL)
      .replace('{{ SESSION_ID }}', this._sessionID)
  }
};
