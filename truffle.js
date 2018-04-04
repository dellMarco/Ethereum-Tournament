module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  test: /\.sol/,
  loader: 'truffle-solidity?migrations_directory='+path.resolve(__dirname, '../migrations' )
};
