module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'jason',
    password: process.env.DB_PASSWORD || '1qaz2wsx',
    database: process.env.DB_NAME || 'aim',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_TYPE || 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT+8',
    },
    define: {
      timestamps: false,
    }
  },
};
