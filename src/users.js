/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import Polis from './polis';

export class Users extends Polis {
  constructor(address) {
    super(address);
    this.basePath = '/users/';
  }
}

/**
 * Retrieve all api tokens of a user.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {Object} data.query - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.findApiTokens = async function ({ uid, query, options }) {
  return this.find({ path: `${uid}/api_tokens/`, query, options });
};

/**
 * Retrieve all api tokens of a user.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {String} data.tid - The token id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.findApiTokenById = async function ({
  uid,
  tid,
  query,
  options,
}) {
  return this.find({ path: `${uid}/api_tokens/${tid}`, query, options });
};

/**
 * Create a new api token for a user.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {Object} data.data - The payload to send.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.createApiToken = async function ({
  uid,
  data,
  query,
  options,
}) {
  return this.create({ path: `${uid}/api_tokens/`, data, query, options });
};

/**
 * Update an existing api token.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {String} data.tid - The token id.
 * @param {Object} data.data - The payload to send.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.updateApiToken = async function ({
  uid,
  tid,
  data,
  query,
  options,
}) {
  return this.update({
    path: `${uid}/api_tokens/${tid}`,
    data,
    query,
    options,
  });
};

/**
 * Delete an api token.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {String} data.tid - The token id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.deleteApiToken = async function ({ uid, tid, query, options }) {
  return this.remove({ path: `${uid}/api_tokens/${tid}`, query, options });
};

/**
 * Retrieve all client credentials of a user.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.findClientCredentials = async function ({
  uid,
  query,
  options,
}) {
  return this.find({ path: `${uid}/client_credentials/`, query, options });
};

/**
 * Retrieve a client credentials of a user by its id.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {String} data.cid - The credentials id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.findClientCredentialsById = async function ({
  uid,
  cid,
  query,
  options,
}) {
  return this.find({
    path: `${uid}/client_credentials/${cid}`,
    query,
    options,
  });
};

/**
 * Create a new client credentials for a user.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {Object} data.data - The payload to send.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.createClientCredentials = async function ({
  uid,
  data,
  query,
  options,
}) {
  return this.create({
    path: `${uid}/client_credentials/`,
    data,
    query,
    options,
  });
};

/**
 * Update a client credentials of a user by its id.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {String} data.cid - The credentials id.
 * @param {Object} data.data - The payload to send.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.updateClientCredentials = async function ({
  uid,
  cid,
  data,
  query,
  options,
}) {
  return this.update({
    path: `${uid}/client_credentials/${cid}`,
    data,
    query,
    options,
  });
};

/**
 * Remove a client credentials of a user by its id.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {String} data.cid - The credentials id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.deleteClientCredentials = async function ({
  uid,
  cid,
  query,
  options,
}) {
  return this.remove({
    path: `${uid}/client_credentials/${cid}`,
    query,
    options,
  });
};

/**
 * Create a password reset link for a user.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.resetPassword = async function ({ uid, query, options }) {
  return this.create({ path: `${uid}/pwd_reset/`, query, options });
};

/**
 * Create a password reset link for a user.
 * @param {Object} data
 * @param {String} data.rid - The reset password uid.
 * @param {String} [data.uid] - The user id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.findResetPassword = async function ({
  rid,
  uid,
  query,
  options,
}) {
  let path;

  if (uid) {
    path = `${uid}/pwd_reset/${rid}`;
  } else {
    path = `pwd_reset/${rid}`;
  }

  return this.find({ path, query, options });
};

/**
 * Update a password reset for a user.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {String} data.rid - The password reset id.
 * @param {Object} data.data - The data to send.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.updateResetPassword = async function ({
  uid,
  rid,
  data,
  query,
  options,
}) {
  return this.update({ path: `${uid}/pwd_reset/${rid}`, data, query, options });
};

/**
 * Remove a password reset for a user.
 * @param {Object} data
 * @param {String} data.uid - The user id.
 * @param {String} data.rid - The password reset id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Users.prototype.removeResetPassword = async function ({
  uid,
  rid,
  query,
  options,
}) {
  return this.remove({ path: `${uid}/pwd_reset/${rid}`, query, options });
};

export default Users;
