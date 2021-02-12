/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import createResponse from './response.js';
import Polis from './polis.js';

export class EmailVerify extends Polis {
  constructor(address) {
    super(address);
    this.basePath = '/auth/email/';
  }
}

/**
 * Update an email verify object.
 * @param {Object} data
 * @param {String} data.id - The email verify id.
 * @param {Object} data.data - The data to send.
 * @param {Object} [data.query] - Query parameters to pass.
 * @param {Object} [data.options] - Extra request options.
 * @return {Promise<Array>}
 */
EmailVerify.prototype.update = async function ({ id, data, options }) {
  return createResponse(this.patch({ path: id, body: data, options }));
};

export default EmailVerify;
