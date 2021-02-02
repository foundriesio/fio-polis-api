/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response.js';
import Polis from './polis.js';

export class DeviceAuthorization extends Polis {
  constructor(address) {
    super(address);
    this.basePath = '/auth/devices/';
  }
}

/**
 * Retrieve a device authorization using the user provided code.
 * @param {Object} data
 * @param {String} data.user_code - The code typed by the user.
 * @param {Object} [data.user] - The user performing the request.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @return {Promise<Array>}
 */
DeviceAuthorization.prototype.findByUserCode = async function ({
  user_code,
  query,
  options,
}) {
  return createResponse(this.post({ body: { user_code }, query, options }));
};

/**
 * Retrieve a device authorization using the user provided code.
 * @param {Object} data
 * @param {String} data.aid - The device authorization id.
 * @param {String} data.client_id - The client id.
 * @param {String} data.status - The device authorization status.
 * @param {Object} data.user - The user performing the request.
 * @param {Object} [data.query] - Query object for the request.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @return {Promise<Array>}
 */
DeviceAuthorization.prototype.update = async function ({
  aid,
  client_id,
  status,
  user,
  options,
  query,
}) {
  return createResponse(
    this.patch({
      path: aid,
      body: { client_id, status, user: user._id },
      query,
      options,
    })
  );
};

export default DeviceAuthorization;
