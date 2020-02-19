const queryEnvelope = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07" xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract">
<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
<wsa:To>{{ DESTINATION_URL }}</wsa:To>
<wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukaj</wsa:Action>
</soap:Header>
   <soap:Body>
      <ns:DaneSzukaj>
         <ns:pParametryWyszukiwania>
            <dat:Nip>{{ NIP }}</dat:Nip>
         </ns:pParametryWyszukiwania>
      </ns:DaneSzukaj>
   </soap:Body>
</soap:Envelope>
`.trim();

module.exports = class QueryEnvelope {
  constructor(destinationURL, NIP) {
    this._destinationURL = destinationURL;
    this._NIP = NIP;
  }

  toString() {
    return queryEnvelope
      .replace('{{ DESTINATION_URL }}', this._destinationURL)
      .replace('{{ NIP }}', this._NIP);
  }
};
