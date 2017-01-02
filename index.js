const rp = require('request-promise');
const entities = require('entities');
const xml2js = require('xml2js');
const { LoginEnvelope, LogoutEnvelope, QueryEnvelope } = require('./src/envelopes');

let testURL = 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc';

let commonOptions = {
  method: 'POST',
  uri: testURL,
  headers: {
    'Content-Type': 'application/soap+xml; charset=utf-8'
  }
};

let testLoginEnvelope = new LoginEnvelope(testURL, 'abcde12345abcde12345');
let loginOptions = Object.assign({}, commonOptions);
loginOptions.body = testLoginEnvelope.toString();
let loginEnvRegex = /<ZalogujResult>(.*)<\/ZalogujResult>/;
let queryEnvRegex = /<DaneSzukajResult>([\s\S]+)<\/DaneSzukajResult>/;

rp(loginOptions)
  .then(body => loginEnvRegex.exec(body)[1])
  .then(apiKey => {
    console.log('API key', apiKey);

    let testQueryEnvelope = new QueryEnvelope(testURL, '7121050526');
    let queryHeaders = Object.assign({}, commonOptions.headers, {
      sid: apiKey
    });
    let queryOptions = Object.assign({}, commonOptions, {
      headers: queryHeaders,
      body: testQueryEnvelope.toString()
    });
    return rp(queryOptions);
  })
  .then(body => {
    let results = queryEnvRegex.exec(body);
    return results ? results[1] : Promise.reject('NIP not found');
  } )
  .then(entities.decodeXML.bind(entities))
  .then(queryResultsString => new Promise((resolve, reject) =>
    xml2js.parseString(queryResultsString, (err, result) => err ? reject(err) : resolve(result))
  ))
  .then(queryResultsWrapped => queryResultsWrapped['root']['dane'][0])
  .then(queryResults => {
    let result = {};
    for (let key in queryResults) {
      if (!queryResults.hasOwnProperty(key)) {
        continue;
      }

      result[key] = Array.isArray(queryResults[key]) ? queryResults[key][0] : queryResults[key];
    }

    return result;
  })
  .then(queryResults => {
    console.log(queryResults);
  })
  .catch(error => {
    console.error('Request error', error);
  });
