/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response';
import Remote from './remote';

export class Polis extends Remote {
  constructor(address) {
    super(address);
  }
}

/**
 * Perform a find() search on the resource.
 *
 * @param {Object} query Query/Search parameters.
 * @returns {Promise<Object>}
 */
Polis.prototype.find = async function ({ path, query, options }) {
  return createResponse(this.get({ path, query, options }));
};

/**
 * Perform a findById() search on the resource.
 *
 * @param {String} id The ID of the resource to search.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise<Object>}
 */
Polis.prototype.findById = async function ({ id, query, options }) {
  return createResponse(this.get({ path: id, query, options }));
};

/**
 * Create a resource on the server.
 *
 * @param {Object} data The data to send.
 * @param {String} path The path on the server where to perform the action.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise<Object>}
 */
Polis.prototype.create = async function ({ path, data, query, options }) {
  return createResponse(this.post({ path, body: data, query, options }));
};

/**
 * Update a resource on the server.
 *
 * @param {Object} data The data to send.
 * @param {String} path The resource path to update.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise<Object>}
 */
Polis.prototype.update = async function ({ path, data, query, options }) {
  return createResponse(this.patch({ path, body: data, query, options }));
};

/**
 * Remove a resource on the server.
 *
 * @param {String} id The id of the resource to remove.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise<Object>}
 */
Polis.prototype.remove = async function ({ path, query, options }) {
  return createResponse(this.delete({ path, query, options }));
};

export default Polis;
