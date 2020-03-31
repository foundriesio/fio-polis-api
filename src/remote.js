/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import url from 'url';

class Remote {
  constructor(uri) {
    this.uri = uri;
    this.contentType = 'application/json';
    this.options = {
      promise: require('bluebird'),
    };
    this.headers = {};
    this.hasTrailingSlash = true;
    this.request = require('request-promise');
  }
}

/**
 * Prepare the request options data structure.
 *
 * @param {Object} data This request options.
 * @returns {Object}
 */
Remote.prototype.prepareOptions = function (data) {
  const options = Object.assign({}, data);
  const headers = Object.assign({}, this.headers, options.headers);

  delete options.headers;

  const merged = Object.assign({}, this.options, options);

  merged.headers = headers;

  return merged;
};

/**
 * Create the href string to perform the request.
 *
 * @param {String} path The path to append to the server URL.
 * @param {Object} query The query/search parameters.
 * @returns {String} The href address.
 */
Remote.prototype.href = function (path, query) {
  let reqUrl;

  if (path && typeof path === 'string' && path.length > 0) {
    reqUrl = new url.URL(path, this.uri);
  } else {
    reqUrl = new url.URL(this.uri);
  }

  if (query) {
    const searchParams = new url.URLSearchParams(query);
    reqUrl.search = searchParams.toString();
  }

  if (this.hasTrailingSlash && !reqUrl.pathname.endsWith('/')) {
    reqUrl.pathname = `${reqUrl.pathname}/`;
  }
  reqUrl.pathname = reqUrl.pathname.replace(/\/\//g, '/');

  return url.format(reqUrl);
};

/**
 * Prepare the request configuration options.
 *
 * @param {Object} data The request special options.
 * @returns {Promise} Resolve to an Object.
 */
Remote.prototype.config = async function (data) {
  return this.prepareOptions(data);
};

/**
 * Serialize the data to be sent.
 */
Remote.prototype.serialize = function (data) {
  return data;
};

/**
 * Perform a GET request.
 * @returns {Promise}
 */
Remote.prototype.get = async function (path, query, options) {
  return this.request.get(this.href(path, query), await this.config(options));
};

/**
 * Perform a POST request.
 * @returns {Promise}
 */
Remote.prototype.post = async function (data, path, query, options) {
  return this.request.post(
    this.href(path, query),
    this.serialize(data),
    await this.config(options)
  );
};

/**
 * Perform a PUT request.
 * @returns {Promise}
 */
Remote.prototype.put = async function (data, path, query, options) {
  return this.request.put(
    this.href(path, query),
    this.serialize(data),
    await this.config(options)
  );
};

/**
 * Perform a DELETE request.
 * @returns {Promise}
 */
Remote.prototype.delete = async function (path, query, options) {
  return this.request.delete(
    this.href(path, query),
    await this.config(options)
  );
};

/**
 * Perform a PATCH request.
 * @returns {Promise}
 */
Remote.prototype.patch = async function (data, path, query, options) {
  return this.request.patch(
    this.href(path, query),
    this.serialize(data),
    await this.config(options)
  );
};

/**
 * Perform a HEAD request.
 * @returns {Promise}
 */
Remote.prototype.head = async function (path, query, options) {
  return this.request.head(this.href(path, query), await this.config(options));
};

export default Remote;
