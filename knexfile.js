// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/database.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      database: './db/migrations'
    },
    seeds: {
      database: './db/seeds'
    }
  }

};
