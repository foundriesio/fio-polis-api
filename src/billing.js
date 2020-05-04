/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import url from 'url';

import createResponse from './response';
import Polis from './polis';

export class Billing extends Polis {
  constructor(baseUrl) {
    const uri = new url.URL('/billing/', baseUrl);
    super(uri.href);
  }
}

Billing.prototype.findById = async function ({ user, id, query }) {
  return createResponse(this.get(id, query, await this.prepare(user)));
};

Billing.prototype.create = async function ({ user, query, data }) {
  return createResponse(
    this.post(data, '', query, await this.prepare(user, true))
  );
};

Billing.prototype.remove = async function ({ user, id, query }) {
  return createResponse(this.delete(id, query, await this.prepare(user)));
};

export default Billing;
