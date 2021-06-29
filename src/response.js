/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

const POLIS_PAGINATION_HEADER = {
  'x-polis-count': 'total',
  'x-polis-last-page': 'last',
  'x-polis-next-page': 'next',
  'x-polis-pages': 'pages',
  'x-polis-per-page': 'limit',
  'x-polis-prev-page': 'prev',
  'x-polis-requested-page': 'current',
};

/**
 * Wrapper around a response object to provide a common interface for
 * the remote resources.
 *
 * @param {Promise} req - The request to perform, a Promise to be resolved.
 * @returns {Object}
 */
const remoteResponse = function (res) {
  let _body;
  let _buffer;
  let _json;
  let _text;
  let _res;

  _res = res;

  const apiResponse = {
    _body,
    _buffer,
    _json,
    _text,
    _res,
    async json() {
      if (this.isJson()) {
        if (!this._json) {
          this._json = await this._res.json();
        }
        return this._json;
      }
    },
    async text() {
      if (this.isText()) {
        if (!this._text) {
          this._text = await this._res.text();
        }
        return this._text;
      }
    },
    get headers() {
      return this._res.headers;
    },
    get contentEncoding() {
      return this.headers.get('content-encoding');
    },
    get contentType() {
      return this.headers.get('content-type');
    },
    get length() {
      return this.headers.get('content-length');
    },
    get status() {
      return this._res.status;
    },
    get statusText() {
      return this._res.statusText;
    },
    get ok() {
      return this._res.ok;
    },
    get raw() {
      return this._res;
    },
    get body() {
      if (!this._body) {
        this._body = this._res.body;
      }
      return this._body;
    },
    async buffer() {
      if (!this._buffer) {
        this._buffer = await this._res.buffer();
      }
      return this._buffer;
    },
    isJson() {
      return /^application\/json/.test(this.contentType);
    },
    isText() {
      return /^text\//.test(this.contentType);
    },
    pagination() {
      const pagination = {
        total: 0,
        last: 0,
        next: 0,
        current: 0,
        pages: 0,
        lmit: 0,
        prev: 0,
      };

      const headers = this.headers.raw();

      if (Object.keys(headers).length === 0) {
        return pagination;
      }

      for (const [key, value] of Object.entries(POLIS_PAGINATION_HEADER)) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          // eslint-disable-next-line security/detect-object-injection
          pagination[value] = parseInt(headers[key], 10);
        }
      }

      return pagination;
    },
  };

  return Object.seal(apiResponse);
};

const error_status_map = {
  400: 'bad_request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not_found',
  405: 'not_allowed',
  406: 'not_acceptable',
  408: 'request_timeout',
  410: 'gone',
  500: 'server_error',
  501: 'not_implemented',
  503: 'service_unavailable',
  504: 'timeout',
};

class HTTPError extends Error {
  constructor(message) {
    super(message);
  }
}

/**
 * Create a response object.
 * @param {Promise} request - A request to be resolved.
 * @returns {Promise<Object>}
 */
export const createResponse = async (request) => {
  const response = remoteResponse(await request);
  if (response.ok) {
    return response;
  }

  console.log(response);

  const err = new HTTPError(response.statusText);
  err.status = response.status;
  err.error = error_status_map[response.status];
  err.text = await response.text();
  err.json = await response.json();

  throw err;
};

export default createResponse;
