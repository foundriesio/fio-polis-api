/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import url from 'url';

import createResponse from './response';
import Polis from './polis';

export class DeviceAuthorization extends Polis {
  constructor(baseUrl) {
    const uri = new url.URL('/auth/devices/', baseUrl);
    super(uri.href);
  }
}

/**
 * Retrieve a device authorization using the user provided code.
 * @param {Object} data
 * @param {String} data.user_code - The code typed by the user.
 * @param {Object} [data.user] - The user performing the request.
 * @param {Object} [data.query] - Query parameters to pass.
 * @return {Promise<Array>}
 */
DeviceAuthorization.prototype.findByUserCode = async function ({
  user_code,
  user,
  query,
}) {
  return createResponse(
    this.post({ user_code }, '', query, await this.prepare(user, true))
  );
};

/**
 * Retrieve a device authorization using the user provided code.
 * @param {Object} data
 * @param {String} data.aid - The device authorization id.
 * @param {String} data.client_id - The client id.
 * @param {String} data.status - The device authorization status.
 * @param {Object} data.user - The user performing the request.
 * @param {Object} [data.query] - Query parameters to pass.
 * @return {Promise<Array>}
 */
DeviceAuthorization.prototype.update = async function ({
  aid,
  client_id,
  status,
  user,
  query,
}) {
  return createResponse(
    this.patch(
      { client_id, status, user: user._id },
      aid,
      query,
      await this.prepare(user, true)
    )
  );
};

export default DeviceAuthorization;
