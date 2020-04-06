/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import url from 'url';

import createResponse from './response';
import Polis from './polis';

export class Auth extends Polis {
  constructor(baseUrl) {
    const uri = new url.URL('/auth/', baseUrl);
    super(uri.href);
  }
}

Auth.prototype.Local = async function ({ email, password }) {
  const options = {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${email}:${password}`,
        'utf8'
      ).toString('base64')}`,
    },
  };

  return createResponse(this.get('local/', null, options));
};

export default Auth;
