/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

/**
 * Wrapper around an HTTPResponse object to provide a common interface for
 * the remote resources.
 *
 * @param {Promise} req The request to perform, a Promise to be resolved.
 * @return {Object}
 */
const remoteResponse = function (req) {
  let res;

  const jobservResponse = {
    res,
    async resolve() {
      this.res = await req;
      return this;
    },
    json() {
      return this.res.json();
    },
    text() {
      return this.res.text();
    },
    get headers() {
      return this.res.headers;
    },
    get contentType() {
      return this.res.contentType();
    },
    get status() {
      return this.res.statusCode;
    },
    get raw() {
      return this.res;
    },
    get body() {
      return this.res.body;
    },
    get pagination() {
      // TODO
      return {};
    },
  };

  return Object.seal(jobservResponse);
};

/**
 *
 * @param {Promise} request A request to be resolved.
 * @returns {Promise}
 */
export const createResponse = (request) => remoteResponse(request).resolve();

export default createResponse;
