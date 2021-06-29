/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response.js';
import Polis from './polis.js';

const membersPath = '/members';

export class Members extends Polis {
  constructor(address) {
    super(address);
    this.basePath = '/orgs/';
  }
}

/**
 * Find all members of a factory.
 * @param {Object} data
 * @param {String} data.oid - The factory/org id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Members.prototype.find = async function ({ oid, query, options }) {
  return createResponse(
    this.get({ path: `${oid}/${membersPath}`, query, options })
  );
};

/**
 * Find a member of a factory.
 * @param {Object} data
 * @param {String} data.oid - The factory/org id.
 * @param {String} data.uid - The user id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Members.prototype.findById = async function ({ oid, uid, query, options }) {
  return createResponse(
    this.get({ path: `${oid}/${membersPath}/${uid}`, query, options })
  );
};

/**
 * Add a member to a factory.
 * @param {Object} data
 * @param {String} data.oid - The factory/org id.
 * @param {String} data.uid - The user id.
 * @param {String} data.data - The payload to send.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Members.prototype.add = async function ({ oid, uid, data, query, options }) {
  return createResponse(
    this.post({
      path: `${oid}/${membersPath}/${uid}`,
      body: data,
      query,
      options,
    })
  );
};

/**
 * Remove a member from a factory.
 * @param {Object} data
 * @param {String} data.oid - The factory/org id.
 * @param {String} data.uid - The user id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Members.prototype.remove = async function ({ oid, uid, query, options }) {
  return createResponse(
    this.delete({ path: `${oid}/${membersPath}/${uid}`, query, options })
  );
};

/**
 * Remove all members from a factory.
 * @param {Object} data
 * @param {String} data.oid - The factory/org id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Members.prototype.removeAll = async function ({ oid, query, options }) {
  return createResponse(
    this.delete({ path: `${oid}/${membersPath}`, query, options })
  );
};

/**
 * Update a member of a factory.
 * @param {Object} data
 * @param {String} data.oid - The factory/org id.
 * @param {String} data.mid - The member id.
 * @param {String} data.data - The payload to send.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Members.prototype.update = async function ({ oid, mid, data, query, options }) {
  return createResponse(
    this.patch({
      path: `${oid}/${membersPath}/${mid}`,
      body: data,
      query,
      options,
    })
  );
};

/**
 * Update all members of a factory
 * @param {Object} data
 * @param {String} data.oid - The factory/org id.
 * @param {String} data.data - The payload to send.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise<Array>}
 */
Members.prototype.updateAll = async function ({ oid, data, query, options }) {
  return createResponse(
    this.patch({
      path: `${oid}/${membersPath}`,
      body: data,
      query,
      options,
    })
  );
};

export default Members;
