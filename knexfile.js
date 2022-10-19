// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'Cluckr',
      username: 'username',
      password: 'password'
    }
  },

  migrations: {
    tableName: 'migrations',
    directory: 'db/migrations'
  },
  seeds: {
    directory: 'db/seeds'
  }
  
  };


