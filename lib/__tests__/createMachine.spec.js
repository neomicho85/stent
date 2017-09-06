'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createMachine = require('../createMachine');

var _createMachine2 = _interopRequireDefault(_createMachine);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Given the createMachine factory', function () {

  describe('when registering methods', function () {
    it('should create methods dynamically (based on states and actions)', function () {
      var machine = {};

      (0, _createMachine.registerMethods)(machine, { 'idle': { run: 'running' }, 'running': { stop: 'idle' } }, sinon.spy());

      expect(_typeof(machine.isIdle)).to.be.equal('function');
      expect(_typeof(machine.isRunning)).to.be.equal('function');
      expect(_typeof(machine.run)).to.be.equal('function');
      expect(_typeof(machine.stop)).to.be.equal('function');
    });
    it('should dispatch an action with the given payload', function () {
      var dispatch = sinon.spy();
      var machine = {};
      var payload = { answer: 42 };

      (0, _createMachine.registerMethods)(machine, { 'idle': { run: 'running' }, 'running': { stop: 'idle' } }, dispatch);

      machine.run(payload);

      expect(dispatch).to.be.calledOnce.and.to.be.calledWith('run', payload);
    });
    it('should check if the machine is in a particular state', function () {
      var machine = { state: { name: 'running' } };

      (0, _createMachine.registerMethods)(machine, { 'idle': { run: 'running' }, 'running': { stop: 'idle' } }, sinon.spy());

      expect(machine.isIdle()).to.be.false;
      expect(machine.isRunning()).to.be.true;
    });
  });

  describe('when validating config', function () {
    it('should throw errors if state or transitions are missing', function () {
      expect(_createMachine.validateConfig.bind(null, { transitions: {} })).to.throw(_constants.ERROR_MISSING_STATE);
      expect(_createMachine.validateConfig.bind(null, { state: {} })).to.throw(_constants.ERROR_MISSING_TRANSITIONS);
      expect((0, _createMachine.validateConfig)({ state: {}, transitions: {} })).to.equal(true);
    });
  });
});