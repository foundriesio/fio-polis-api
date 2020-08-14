/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import url from 'url';

import Polis from './polis';

export class Factories extends Polis {
  constructor(baseUrl) {
    const uri = new url.URL('/orgs/', baseUrl);
    super(uri.href);
  }
}

/**
 * Update a factory billing object.
 * @param {Object} options
 * @param {String} options.uid - The user id.
 * @param {String} options.bid - The billing id.
 * @param {Object} options.data - The payload to send.
 * @param {Object} options.query - Query object for the request.
 * @param {Object} options.user - The user performing the request.
 */
Factories.prototype.updateBilling = async function ({ oid, bid, data, query, user }) {
  return this.update({ path: `${oid}/billing/${bid}`, data, query, user });
};


export default Factories;
