const expect = require('chai').expect;
const {
  LoginEnvelope,
  LogoutEnvelope,
  QueryEnvelope
} = require('../src/envelopes');

describe('Envelopes', function() {
  describe('login', function() {
    it('should contain provided destination URL and api key', function() {
      let loginEnvelope = new LoginEnvelope('http://example.com', 'abcde12345');
      expect(loginEnvelope.toString()).to.contain('http://example.com');
      expect(loginEnvelope.toString()).to.contain('abcde12345');
    });
  });

  describe('logout', function() {
    it('should contain provided destination URL and session ID', function() {
      let logoutEnvelope = new LogoutEnvelope('http://example.com', 'r48gjgh28sevc');
      expect(logoutEnvelope.toString()).to.contain('http://example.com');
      expect(logoutEnvelope.toString()).to.contain('r48gjgh28sevc');
    });
  });

  describe('query', function() {
    it('should contain provided destination URL and NIP', function() {
      let queryEnvelope = new QueryEnvelope('http://example.com', '7123456789');
      expect(queryEnvelope.toString()).to.contain('http://example.com');
      expect(queryEnvelope.toString()).to.contain('7123456789');
    });
  });
});
