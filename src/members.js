/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
import url from 'url';

import createResponse from './response';
import Polis from './polis';

const membersPath = '/members';

export class Members extends Polis {
  constructor(baseUrl) {
    const uri = new url.URL('/orgs/', baseUrl);
    super(uri.href);
  }
}

Members.prototype.find = async function ({ user, oid, query }) {
  return createResponse(
    this.get(`${oid}/${membersPath}`, query, await this.prepare(user))
  );
};

Members.prototype.findById = async function ({ user, oid, uid, query }) {
  return createResponse(
    this.get(`${oid}/${membersPath}/${uid}`, query, await this.prepare(user))
  );
};

Members.prototype.add = async function ({ user, oid, uid, query, data }) {
  return createResponse(
    this.post(
      data,
      `${oid}/${membersPath}/${uid}`,
      query,
      await this.prepare(user, true)
    )
  );
};

Members.prototype.remove = async function ({ user, oid, uid, query }) {
  return createResponse(
    this.delete(`${oid}/${membersPath}/${uid}`, query, await this.prepare(user))
  );
};

Members.prototype.removeAll = async function ({ user, oid, query }) {
  return createResponse(
    this.delete(`${oid}/${membersPath}`, query, await this.prepare(user))
  );
};

Members.prototype.update = async function ({ user, oid, mid, data, query }) {
  return createResponse(
    this.patch({ user, data, query, path: `${oid}/${membersPath}/${mid}` })
  );
};

export default Members;
