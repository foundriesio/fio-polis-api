/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import Polis from './polis';

export class Factories extends Polis {
  constructor(address) {
    super(address);
    this.basePath = '/orgs/';
  }
}

/**
 * Update a factory billing object.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {String} data.bid - The billing id.
 * @param {Object} data.data - The payload to send.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Extra options for the request.
 * @return {Promise<Object>}
 */
Factories.prototype.updateBilling = async function ({
  oid,
  bid,
  data,
  query,
  options,
}) {
  return this.update({ path: `${oid}/billing/${bid}`, data, query, options });
};

export default Factories;
