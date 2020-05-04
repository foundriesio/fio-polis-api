/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response';
import Remote from './remote';

export class Polis extends Remote {
  constructor(uri) {
    super(uri);
    this.follows = true;
  }
}

/**
 * Prepare the options for the request.
 * @param {Object} user The user performing the request.
 * @param {Boolean} hasData If the request is sending data, defaults to false.
 * @returns {Promise} Resolve to an Object.
 */
Polis.prototype.prepare = async function (user, hasData = false) {
  const options = {
    rejectUnauthorized: false,
    followRedirects: this.follows,
    secureProtocol: 'TLSv1_2_method',
    headers: {},
  };

  if (hasData) {
    options.headers['Content-Type'] = this.contentType;
  }

  return options;
};

/**
 * Serialize the data to be sent.
 * It uses JSON.stringify() to serialize the data.
 *
 * @param {Object} data The data to be sent.
 * @returns {String} Serialized data as a string.
 */
Polis.prototype.serialize = function (data) {
  return JSON.stringify(data);
};

/**
 * Perform a find() search on the resource.
 *
 * @param {Object} user The user performing the action.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise}
 */
Polis.prototype.find = async function ({ user, path, query }) {
  return createResponse(this.get(path, query, await this.prepare(user)));
};

/**
 * Perform a findById() search on the resource.
 *
 * @param {Object} user The user performing the action.
 * @param {String} id The ID of the resource to search.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise}
 */
Polis.prototype.findById = async function ({ user, id, query }) {
  return createResponse(this.get(id, query, await this.prepare(user)));
};

/**
 * Create a resource on the server.
 *
 * @param {Object} user The user performing the action.
 * @param {Object} data The data to send.
 * @param {String} path The path on the server where to perform the action.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise}
 */
Polis.prototype.create = async function ({ user, data, path, query }) {
  return createResponse(
    this.post(data, path, query, await this.prepare(user, true))
  );
};

/**
 * Update a resource on the server.
 *
 * @param {Object} user The user performing the action.
 * @param {Object} data The data to send.
 * @param {String} id The id of the resource to update.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise}
 */
Polis.prototype.update = async function ({ user, data, id, query }) {
  return createResponse(
    this.patch(data, id, query, await this.prepare(user, true))
  );
};

/**
 * Remove a resource on the server.
 *
 * @param {Object} user The user performing the action.
 * @param {String} id The id of the resource to remove.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise}
 */
Polis.prototype.remove = async function ({ user, id, query }) {
  return createResponse(this.delete(id, query, await this.prepare(user)));
};

export default Polis;
