const JsflorIco = artifacts.require("JSFLOR_ICO");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(JsflorIco, accounts[0]);
};
