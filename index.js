module.exports = require('./src/BirAPI');


// Example usage
const BirAPI = require('./src/BirAPI');

let testURL = 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc';
let testApiKey = 'abcde12345abcde12345';
let testNIP = '7121050526';

let connectionAPI = new BirAPI(testURL);

console.log('Beginning login');
connectionAPI.login(testApiKey)
  .then(sessionID => {
    console.log('Logged in, session id', sessionID);
    return connectionAPI.query(testNIP);
  })
  .then(queryResults => {
    console.log('Got results');
    console.log(queryResults);
  })
  .catch(error => {
    console.error('Request error', error);
  });
