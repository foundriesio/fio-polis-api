/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import Polis from './polis';

export class Auth extends Polis {
  constructor(address) {
    super(address);
    this.basePath = '/auth/';
  }
}

/**
 * Authenticate a user with username/password.
 * @param {Object} data
 * @param {String} data.email - The user email.
 * @param {String} data.password - The user password.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Auth.prototype.Local = async function ({ email, password }) {
  const options = {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${email}:${password}`,
        'utf8'
      ).toString('base64')}`,
    },
  };

  return this.find({ path: 'local/', options });
};

export default Auth;
