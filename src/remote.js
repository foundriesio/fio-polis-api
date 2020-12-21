/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import http from 'http';
import https from 'https';
import querystring from 'querystring';
import url from 'url';

import fetch from 'node-fetch';

const DEFAULT_HTTP_AGENT = new http.Agent({
  keepAlive: true,
});

const DEFAULT_HTTPS_AGENT = new https.Agent({
  keepAlive: true,
});

const DEFAULT_FETCH_OPTIONS = {
  agent: function (_parsedUrl) {
    if (_parsedUrl.protocol === 'http:') {
      return DEFAULT_HTTP_AGENT;
    }

    return DEFAULT_HTTPS_AGENT;
  },
};

class Remote {
  constructor(address) {
    this.contentType = 'application/json';
    this.follows = true;
    this.basePath = '/';
    this.address = address;
  }
}

/**
 * Create the href string to perform the request.
 *
 * @param {String} path The path to append to the server URL.
 * @param {Object} query The query/search parameters.
 * @returns {String}
 */
Remote.prototype.createPath = function (path, query) {
  let reqURL;

  if (path) {
    const reqPath = `${this.basePath}${path}`.replace(/\/\//g, '/');
    reqURL = new url.URL(reqPath, this.address);
  } else {
    reqURL = new url.URL(this.basePath, this.address);
  }

  if (query) {
    const searchParams = new url.URLSearchParams(querystring.stringify(query));
    reqURL.search = searchParams.toString();
  }

  return url.format(reqURL);
};

/**
 * Serialize the data as JSON.
 * If the data is String or Buffer, it will be returned as is.
 * @param {Object} body - The data to serialize.
 * @return {Buffer|String}
 */
Remote.prototype.serialize = function (body) {
  if (!body) {
    return;
  }

  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    return body;
  }

  return JSON.stringify(body);
};

/**
 * Perform the fetch request.
 * @param {Object} data
 * @param {String} [data.path] - The path of the request.
 * @param {String|Buffer} [data.body] - The data to send.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @param {Object} [data.options.headers] - Opitonal request headers.
 * @param {String} [data.method=GET] - The request method to perform.
 * @returns {Promise}
 */
Remote.prototype.fetch = async function ({
  path,
  body,
  query,
  options,
  method = 'GET',
}) {
  const fetchOptions = Object.assign({}, DEFAULT_FETCH_OPTIONS, options);
  if (body) {
    if (!fetchOptions.headers) {
      fetchOptions.headers = {};
      fetchOptions.headers['Content-type'] = this.contentType;
    } else {
      if (
        !Object.prototype.hasOwnProperty.call(
          fetchOptions.headers,
          'Content-Type'
        )
      ) {
        fetchOptions.headers['Content-Type'] = this.contentType;
      }
    }
  }
  return fetch(this.createPath(path, query), {
    method,
    body: this.serialize(body),
    ...fetchOptions,
  });
};

/**
 * Perform a GET request.
 * @param {Object} data
 * @param {String} [data.path] - The path of the request.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise}
 */
Remote.prototype.get = async function ({ path, query, options }) {
  return this.fetch({ path, query, options });
};

/**
 * Perform a POST request.
 * @param {Object} data
 * @param {String|Buffer} data.body - The data to send.
 * @param {String} [data.path] - The path of the request.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise}
 */
Remote.prototype.post = async function ({ path, body, query, options }) {
  return this.fetch({ path, body, query, options, method: 'POST' });
};

/**
 * Perform a PUT request.
 * @param {Object} data
 * @param {String|Buffer} data.body - The data to send.
 * @param {String} [data.path] - The path of the request.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise}
 */
Remote.prototype.put = async function ({ path, body, query, options }) {
  return this.fetch({ path, body, query, options, method: 'PUT' });
};

/**
 * Perform a DELETE request.
 * @param {Object} data
 * @param {String} [data.path] - The path of the request.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise}
 */
Remote.prototype.delete = async function ({ path, query, options }) {
  return this.fetch({ path, query, options, method: 'DELETE' });
};

/**
 * Perform a PATCH request.
 * @param {Object} data
 * @param {String|Buffer} data.body - The data to send.
 * @param {String} [data.path] - The path of the request.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise}
 */
Remote.prototype.patch = async function ({ path, body, query, options }) {
  return this.fetch({ path, body, query, options, method: 'PATCH' });
};

/**
 * Perform a HEAD request.
 * @param {Object} data
 * @param {String} [data.path] - The path of the request.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise}
 */
Remote.prototype.head = async function ({ path, query, options }) {
  return this.fetch({ path, query, options, method: 'HEAD' });
};

/**
 * Perform an OPTIONS request.
 * @param {Object} data
 * @param {String} [data.path] - The path of the request.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Opitonal request configurations.
 * @returns {Promise}
 */
Remote.prototype.options = async function ({ path, query, options }) {
  return this.fetch({ path, query, options, method: 'OPTIONS' });
};

export default Remote;
