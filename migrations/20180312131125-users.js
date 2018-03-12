'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    email: { type: 'string', unique: true, notNull: true },
    firstname: { type: 'string', notNull: true },
    lastname: { type: 'string', notNull: true },
    password: { type: 'string', notNull: true },
    registered_at: { type: 'timestamp', notNull: true, defaultValue: new String('now()')},
    last_logged_at: { type: 'timestamp', notNull: false },
    status: { type: 'int', notNull: true, defaultValue: 0 }
  });
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
