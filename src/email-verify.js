/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import url from 'url';

import createResponse from './response';
import Polis from './polis';

export class EmailVerify extends Polis {
  constructor(baseUrl) {
    const uri = new url.URL('/auth/email/', baseUrl);
    super(uri.href);
  }
}

/**
 * Update an email verify object.
 * @param {Object} data
 * @param {String} data.id - The email verify id.
 * @param {Object} data.data - The data to send.
 * @param {Object} [data.user] - The user performing the request.
 * @param {Object} [data.query] - Query parameters to pass.
 * @return {Promise<Array>}
 */
EmailVerify.prototype.update = async function ({ id, data, user, query }) {
  return createResponse(
    this.patch(data, id, query, await this.prepare(user, true))
  );
};

export default EmailVerify;
