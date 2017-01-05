declare module 'bir-regon' {
  class BirAPI {
    /**
     * Creates an instance of BirAPI.
     */
    constructor(url: string);

    /**
     * Tries to authenticate to the BIR database. Returns the session ID.
     */
    login(apiKey: string): Promise<string>;

    /**
     * Queries the BIR database for a specific NIP. Returns parsed company's information.
     */
    query(nip: string): Promise<Object>;

    logout(): void;

    /**
     * Checks if session ID already exists.
     */
    isAuthenticated(): boolean;
  }

  export = BirAPI;
}
