module.exports = {
  development: {
    username: 'jason',
    password: '1qaz2wsx',
    database: 'aim',
    host: '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT+8',
    },
    define: {
      timestamps: false,
    }
  },
};
