/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import createResponse from './response.js';
import Polis from './polis.js';

export class FactoryNotes extends Polis {
  constructor(address) {
    super(address);
    this.basePath = '/orgs/';
  }
}

/**
 * List all notes of a factory.
 *
 * @param {Object} data
 * @param {String} data.oid - The factory id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Extra options for the request.
 * @returns {Promise<Array<Object>}
 */
FactoryNotes.prototype.list = async function ({ oid, query, options }) {
  return this.find({ path: `${oid}/notes`, query, options });
};

/**
 * Retrieve a single note of a factory.
 *
 * @param {Object} data
 * @param {String} data.oid - The factory id.
 * @param {String} data.nid - The note id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Extra options for the request.
 * @returns {Promise<Array<Object>}
 */
FactoryNotes.prototype.retrieve = async function ({
  oid,
  nid,
  query,
  options,
}) {
  return this.find({ path: `${oid}/notes/${nid}/`, query, options });
};

/**
 * Create a new note for a factory.
 *
 * @param {Object} data
 * @param {String} data.oid - The factory id.
 * @param {Object} data.data - The data to send.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Extra options for the request.
 * @returns {Promise<Array<Object>}
 */
FactoryNotes.prototype.create = async function ({ oid, data, query, options }) {
  return createResponse(
    this.post({ path: `${oid}/notes`, body: data, query, options })
  );
};

/**
 * Update a new note for a factory.
 *
 * @param {Object} data
 * @param {String} data.oid - The factory id.
 * @param {String} data.nid - The factory id.
 * @param {Object} data.data - The data to send.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Extra options for the request.
 * @returns {Promise<Array<Object>}
 */
FactoryNotes.prototype.update = async function ({
  oid,
  nid,
  data,
  query,
  options,
}) {
  return createResponse(
    this.patch({ path: `${oid}/notes/${nid}/`, body: data, query, options })
  );
};

/**
 * Remove a new note from a factory.
 *
 * @param {Object} data
 * @param {String} data.oid - The factory id.
 * @param {String} data.nid - The factory id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Extra options for the request.
 * @returns {Promise}
 */
FactoryNotes.prototype.remove = async function ({ oid, nid, query, options }) {
  return createResponse(
    this.delete({ path: `${oid}/notes/${nid}/`, query, options })
  );
};

/**
 * Remove all notes from a factory.
 *
 * @param {Object} data
 * @param {String} data.oid - The factory id.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Extra options for the request.
 * @returns {Promise}
 */
FactoryNotes.prototype.removeAll = async function ({ oid, query, options }) {
  return createResponse(this.delete({ path: `${oid}/notes`, query, options }));
};

export class Factories extends Polis {
  constructor(address) {
    super(address);
    this.basePath = '/orgs/';

    this.Notes = new FactoryNotes(address);
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
