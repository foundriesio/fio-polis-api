/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import url from 'url';

import Polis from './polis';

export class Users extends Polis {
  constructor(baseUrl) {
    const uri = new url.URL('/users/', baseUrl);
    super(uri.href);
  }
}

/**
 * Retrieve all api tokens of a user.
 * @param {Object} options
 * @param {String} options.uid - The user id.
 * @param {Object} options.query - Query object for the request.
 * @param {Object} options.user - The user performing the request.
 */
Users.prototype.findApiTokens = async function ({ uid, query, user }) {
  return this.find({path: `${uid}/api_tokens/`, query, user});
};

/**
 * Retrieve all api tokens of a user.
 * @param {Object} options
 * @param {String} options.uid - The user id.
 * @param {String} options.tid - The token id.
 * @param {Object} options.query - Query object for the request.
 * @param {Object} options.user - The user performing the request.
 */
Users.prototype.findApiTokenById = async function ({ uid, tid, query, user }) {
  return this.find({ path: `${uid}/api_tokens/${tid}`, query, user });
};

/**
 * Create a new api token for a user.
 * @param {Object} options
 * @param {String} options.uid - The user id.
 * @param {Object} options.data - The payload to send.
 * @param {Object} options.query - Query object for the request.
 * @param {Object} options.user - The user performing the request.
 */
Users.prototype.createApiToken = async function ({ uid, data, query, user }) {
  return this.create({ path: `${uid}/api_tokens/`, data, query, user });
};

/**
 * Update an existing api token.
 * @param {Object} options
 * @param {String} options.uid - The user id.
 * @param {String} options.tid - The token id.
 * @param {Object} options.data - The payload to send.
 * @param {Object} options.query - Query object for the request.
 * @param {Object} options.user - The user performing the request.
 */
Users.prototype.updateApiToken = async function ({ uid, tid, data, query, user }) {
  return this.update({ path: `${uid}/api_tokens/${tid}`, data, query, user });
};

/**
 * Delete an api token.
 * @param {Object} options
 * @param {String} options.uid - The user id.
 * @param {String} options.tid - The token id.
 * @param {Object} options.query - Query object for the request.
 * @param {Object} options.user - The user performing the request.
 */
Users.prototype.deleteApiToken = async function ({ uid, tid, query, user }) {
  return this.remove({ path: `${uid}/api_tokens/${tid}`, query, user });
};

/**
 * Retrieve all client credentials of a user.
 * @param {Object} options
 * @param {String} options.uid - The user id.
 * @param {Object} options.query - Query object for the request.
 * @param {Object} options.user - The user performing the request.
 */
Users.prototype.findClientCredentials = async function ({ uid, query, user }) {
  return this.find({ path: `${uid}/client_credentials/`, query, user });
};

/**
 * Retrieve a client credentials of a user by its id.
 * @param {Object} options
 * @param {String} options.uid - The user id.
 * @param {String} options.cid - The credentials id.
 * @param {Object} options.query - Query object for the request.
 * @param {Object} options.user - The user performing the request.
 */
Users.prototype.findClientCredentialsById = async function ({ uid, cid, query, user }) {
  return this.find({ path: `${uid}/client_credentials/${cid}`, query, user });
};

/**
 * Retrieve a client credentials of a user by its id.
 * @param {Object} options
 * @param {String} options.uid - The user id.
 * @param {String} options.cid - The credentials id.
 * @param {Object} options.data - The payload to send.
 * @param {Object} options.query - Query object for the request.
 * @param {Object} options.user - The user performing the request.
 */
Users.prototype.createClientCredentials = async function ({ uid, cid, data, query, user }) {
  return this.create({ path: `${uid}/client_credentials/${cid}`, data, query, user });
};

/**
 * Update a client credentials of a user by its id.
 * @param {Object} options
 * @param {String} options.uid - The user id.
 * @param {String} options.cid - The credentials id.
 * @param {Object} options.data - The payload to send.
 * @param {Object} options.query - Query object for the request.
 * @param {Object} options.user - The user performing the request.
 */
Users.prototype.updateClientCredentials = async function ({ uid, cid, data, query, user }) {
  return this.update({ path: `${uid}/client_credentials/${cid}`, data, query, user });
};

/**
 * Remove a client credentials of a user by its id.
 * @param {Object} options
 * @param {String} options.uid - The user id.
 * @param {String} options.cid - The credentials id.
 * @param {Object} options.query - Query object for the request.
 * @param {Object} options.user - The user performing the request.
 */
Users.prototype.deleteClientCredentials = async function ({ uid, cid, query, user }) {
  return this.remove({ path: `${uid}/client_credentials/${cid}`, query, user });
};

export default Users;
