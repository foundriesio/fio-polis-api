/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import createResponse from './response.js';
import Polis from './polis.js';

export class Billing extends Polis {
  constructor(address) {
    super(address);
    this.basePath = '/billing/';
  }
}

/**
 * Retrieve a billing object.
 * @param {Object} data
 * @param {String} data.id - The billing id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Billing.prototype.findById = async function ({ id, query, options }) {
  return createResponse(this.get({ path: id, query, options }));
};

/**
 * Create a billing object.
 * @param {Object} data
 * @param {String} data.data - The billing payload.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Billing.prototype.create = async function ({ data, query, options }) {
  return createResponse(this.post({ body: data, query, options }));
};

/**
 * Remove a billing object.
 * @param {Object} data
 * @param {String} data.id - The billing id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Billing.prototype.remove = async function ({ id, query, options }) {
  return createResponse(this.delete({ path: id, query, options }));
};

export default Billing;
