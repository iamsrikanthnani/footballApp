const commandLineArgs = require('command-line-args'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs');
const _ = require('lodash');

const optionDefinitions = [
  { name: 'name', type: String },
  { name: 'key', type: String },
  { name: 'URL', type: String },
  { name: 'httpMethod', type: String },
  { name: 'group', type: String },
];

const options = commandLineArgs(optionDefinitions);
const serviceName = options.name;
const serviceKey = options.key;
const serviceURL = options.URL;
const serviceType = options.httpMethod;
const serviceGroup = options.group;

let serviceGroupPath = '';

if (serviceGroup) {
  serviceGroupPath = `${serviceGroup}/`;
}

if (!serviceName) {
  console.log('Must provide serviceName'); // eslint-disable-line no-console
  process.exit();
}
if (!serviceKey) {
  console.log('Must provide serviceKey'); // eslint-disable-line no-console
  process.exit();
}
if (!serviceURL) {
  console.log('Must provide serviceURL'); // eslint-disable-line no-console
  process.exit();
}
if (!serviceType) {
  console.log('Must provide serviceType'); // eslint-disable-line no-console
  process.exit();
}

let payloadObject;

async function generateService() {
  addConfigData();
  await addServicesFiles();
  await addReducerFiles();
  await addTypesFiles();
  await addSagaFiles();
  await addActionFiles();
  await addFixture();
  console.log(`\n\nDone! \n\nupdate ./src/fixtures/apiResponses/${serviceName} for actual success response\n\nPayload to dispatch action should be like \n${payloadObject.replace(/, /g, ',\n ')}`); // eslint-disable-line no-console
}

function createFile(fileName, content) {
  try {
    fs.writeFileSync(fileName, content);
  } catch (e) {
    console.log('Cannot write file ', e); // eslint-disable-line no-console
    process.exit();
  }
}

function createDir(dirName, ignoreIfExists) {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
    console.log(`Created directory at path ${dirName}`); // eslint-disable-line no-console
  } else if (ignoreIfExists) {
    console.log(`It was ok to exist this path  ${dirName}, continuing`); // eslint-disable-line no-console
  } else {
    console.log(`Error: Directory already exist ${dirName}, Exiting`); // eslint-disable-line no-console
    process.exit();
  }
}

function addConfigData() {
  if (!serviceURL.includes('-tst')) {
    console.log('Error: service url must be test env, Exiting'); // eslint-disable-line no-console
    process.exit();
  }
  let envContent = fs.readFileSync('.env', 'utf8');
  if (envContent.includes(serviceKey)) {
    console.log('Warning: Config already exists, ignoring'); // eslint-disable-line no-console
  } else {
    envContent += `${serviceKey}=${serviceURL.replace('-tst.jbhunt.com', '.jbhunt.com')}\n`;
    fs.writeFileSync('.env', envContent);
  }
  let tmpEnvContent = fs.readFileSync('.env.test', 'utf8');
  if (tmpEnvContent.includes(serviceKey)) {
    console.log('Warning: Config already exists, ignoring'); // eslint-disable-line no-console
  } else {
    tmpEnvContent += `${serviceKey}=${serviceURL}\n`;
    fs.writeFileSync('.env.test', tmpEnvContent);
  }

  let configContent = fs.readFileSync('__mocks__/react-native-config.js', 'utf8');
  if (configContent.includes(serviceKey)) {
    console.log('Warning: Config already exists, ignoring '); // eslint-disable-line no-console
  } else {
    configContent = configContent.replace('\n};', '');
    configContent += `  ${serviceKey}: '${serviceURL}',\n};\n`;
    fs.writeFileSync('__mocks__/react-native-config.js', configContent);
  }
}

async function addServicesFiles() {
  let serviceDir = '';
  if (serviceGroupPath) {
    serviceDir = `./src/services/${serviceGroup}`;
    createDir(serviceDir, true);
  }
  serviceDir = `./src/services/${serviceGroupPath}${serviceName}`;
  createDir(serviceDir);

  // create service index file
  if (serviceGroupPath) {
    const serviceIndexFileName = `./src/services/${serviceGroup}/index.js`;
    let envContent = '';
    const filePath = serviceIndexFileName;
    if (fs.existsSync(filePath)) {
      envContent = fs.readFileSync(filePath, 'utf8');
    } else {
      envContent = `export { ${serviceName}Request } from './${serviceName}/${serviceName}.service';\n`;
      createFile(serviceIndexFileName, envContent);
    }
    if (envContent.includes(`${serviceName}Request`)) {
      console.log('Warning: types requests group already exists, ignoring'); // eslint-disable-line no-console
    } else {
      envContent += `export { ${serviceName}Request } from './${serviceName}/${serviceName}.service';\n`;
      fs.writeFileSync(filePath, envContent);
    }
  }

  // create service file
  const serviceKeys = serviceURL.match(/\{[^\}]{0,}\}/g);
  let destructuringString = '';
  let testOptions = '';
  let urlString = '';
  if (serviceKeys) {
    serviceKeys.forEach(keyStr => {
      const key = keyStr.replace(/[\{\}]/g, '');
      destructuringString += ` ${key},`;
      testOptions += ` ${key}: 'test_${key}',\n   `;
      urlString += `.replace('{${key}}', ${key})`;
    });
  }
  testOptions = testOptions && testOptions.replace(/,\n {3}$/, ',');
  payloadObject = `{\n${destructuringString}\n}`;
  const serviceFileName = `${serviceDir}/${serviceName}.service.js`;
  createFile(serviceFileName, `import Config from 'react-native-config';
import request from '../${servicePathOneStepBack()}request/request.service';
import methods from '../../${servicePathOneStepBack()}utilities/methods';
import responseHandler from '../${servicePathOneStepBack()}request/responseHandler/responseHandler';

const handleResponse = responseHandler();

export function ${serviceName}Request(userCredentials, payload) {
  const {
   ${destructuringString}${(serviceType === 'POST' || serviceType === 'UPDATE' || serviceType === 'PUT') ? '\n    requestBody,' : ''}
  } = payload;
  const requestOptions = {
    method: methods.${serviceType},
    url: Config.${serviceKey}${urlString},
    userCredentials,${(serviceType === 'POST' || serviceType === 'UPDATE' || serviceType === 'PUT') ? '\n    body: requestBody ? JSON.stringify(requestBody) : \'\',' : ''}
  };
  return request(requestOptions).then(handleResponse).then(response => response.data);
}
`);

  // create service test file
  const serviceTestFileName = `${serviceDir}/${serviceName}.service.test.js`;
  createFile(serviceTestFileName, `import { ${serviceName}Request } from './${serviceName}.service';
import request from '../${servicePathOneStepBack()}request/request.service';
import fakeSuccessResult from '../../${servicePathOneStepBack()}fixtures/apiResponses/${serviceName}/success.json';

jest.mock('../${servicePathOneStepBack()}request/request.service');

describe('${serviceName} Service', () => {
  const options = {
   ${testOptions}
  };
  const userCredentials = { username: 'demo', password: 'demo' };

  it('can request ${serviceName}', async () => {
    request.mockImplementation(() => Promise.resolve(fakeSuccessResult));
    expect(await ${serviceName}Request(userCredentials, options)).toEqual(fakeSuccessResult.data);
  });

  it('fails because of a non-success-related error', async () => {
    request.mockImplementation(() => {
      return Promise.reject(Error('SOME_RANDOM_ERROR'));
    });
    await expect(${serviceName}Request(userCredentials, options)).rejects.toThrow('SOME_RANDOM_ERROR');
  });
});
`);
}

function groupOrServiceName() {
  if (serviceGroupPath) {
    return serviceGroup;
  }
  return serviceName;
}

async function addReducerFiles() {
  let reducerDir = '';
  if (serviceGroupPath) {
    reducerDir = `./src/state/reducers/requests/${serviceGroup}`;
    createDir(reducerDir, true);
  }
  reducerDir = `./src/state/reducers/requests/${serviceGroupPath}${serviceName}`;
  createDir(reducerDir);

  // create reducer file
  const reducerFileName = `${reducerDir}/${serviceName}.reducer.js`;
  createFile(reducerFileName, `import { createRequestResponseReducer } from '../../${servicePathOneStepBack()}generic';
import { ${_.upperFirst(serviceName)}RequestTypes } from '../../../${servicePathOneStepBack()}types/requests/${groupOrServiceName()}${(serviceGroupPath) ? '' : `/${serviceName}.types`}';

export default createRequestResponseReducer(${_.upperFirst(serviceName)}RequestTypes);
`);

  // Edit state reducer index index
  let envContent = fs.readFileSync('./src/state/reducers/requests/index.js', 'utf8');
  if (envContent.includes(serviceName) || envContent.includes(serviceGroup)) {
    console.log('Warning: state reducer index already exists, ignoring'); // eslint-disable-line no-console
  } else {
    if (serviceGroupPath) {
      envContent = envContent.replace('\n});', `\n  ${serviceGroup},\n});`);
      envContent = envContent.replace('\n\n', `\nimport ${serviceGroup} from './${serviceGroup}';\n\n`);
    } else {
      envContent = envContent.replace('\n});', `\n  ${serviceName},\n});`);
      envContent = envContent.replace('\n\n', `\nimport ${serviceName} from './${serviceName}/${serviceName}.reducer';\n\n`);
    }
    fs.writeFileSync('./src/state/reducers/requests/index.js', envContent);
  }

  // Edit state reducer group  index
  if (serviceGroupPath) {
    let shouldWrite = true;
    const fileName = `./src/state/reducers/requests/${serviceGroup}/index.js`;

    if (fs.existsSync(fileName)) {
      envContent = fs.readFileSync(fileName, 'utf8');
    } else {
      envContent = `import { combineReducers } from 'redux';
import ${serviceName}Reducers from './${serviceName}/${serviceName}.reducer';

export default combineReducers({
  ${serviceName}: ${serviceName}Reducers,
});
`;
      fs.writeFileSync(fileName, envContent);
      shouldWrite = false;
    }
    if (envContent.includes(`${serviceName}Reducer`)) {
      console.log('Warning: state reducer group index already exists, ignoring'); // eslint-disable-line no-console
      shouldWrite = false;
    }
    if (shouldWrite) {
      envContent = envContent.replace('\n});', `\n  ${serviceName}: ${serviceName}Reducer,\n});`);
      envContent = envContent.replace('\n\n', `\nimport ${serviceName}Reducer from './${serviceName}/${serviceName}.reducer';\n\n`);

      fs.writeFileSync(fileName, envContent);
    }
  }

  // Edit state saga index index
  envContent = fs.readFileSync('./src/state/sagas/index.js', 'utf8');
  if (envContent.includes(`${serviceGroup}Saga()`) || envContent.includes(`${serviceName}`)) {
    console.log('Warning: state sagas index already exists, ignoring'); // eslint-disable-line no-console
  } else {
    if (serviceGroupPath) {
      envContent = envContent.replace('\n  ]);', `\n    ${serviceGroup}Saga(),\n  ]);`);
      envContent = envContent.replace('\n\n', `\nimport ${serviceGroup}Saga from './${serviceGroup}';\n\n`);
    } else {
      envContent = envContent.replace('\n  ]);', `\n    ${serviceName}Saga(),\n  ]);`);
      envContent = envContent.replace('\n\n', `\nimport ${serviceName}Saga from './${serviceName}/${serviceName}.saga';\n\n`);
    }
    fs.writeFileSync('./src/state/sagas/index.js', envContent);
  }
}

function servicePathOneStepBack() {
  if (serviceGroupPath) {
    return '../';
  } else {
    return '';
  }
}

async function addTypesFiles() {
  const typesDir = `./src/state/types/requests/${groupOrServiceName()}`;
  createDir(typesDir, true);

  // create types file
  const reducerFileName = `${typesDir}/${serviceName}.types.js`;
  let key = _.upperFirst(serviceName);
  if (serviceGroupPath) {
    key = serviceGroup.replace(/\.?([A-Z])/g, (x, y) => `_${y.toLowerCase()}`).replace(/^_/, '').toUpperCase();
  }
  const service = serviceName.replace(/\.?([A-Z])/g, (x, y) => `_${y.toLowerCase()}`).replace(/^_/, '');

  createFile(reducerFileName, `import { createRequestResponseActionTypeSet } from '../../generic';

const ActionNamespace = '${key}';
export const ${_.upperFirst(serviceName)}RequestTypes = createRequestResponseActionTypeSet(\`\${ActionNamespace}/${service.toUpperCase()}\`);
`);

  // Edit saga type index
  let envContent = fs.readFileSync('./src/state/types/sagas/index.js', 'utf8');
  if (envContent.includes(`${serviceName}SagaType`)) {
    console.log('Warning: saga type already exists, ignoring'); // eslint-disable-line no-console
  } else {
    const sagaType = serviceName.replace(/\.?([A-Z])/g, (x, y) => `_${y.toLowerCase()}`).replace(/^_/, '');
    envContent += `\n// ${_.upperFirst(serviceName)}\nexport const ${serviceName}SagaType = \`\${namespace}/${sagaType.toUpperCase()}\`;\n`;
    fs.writeFileSync('./src/state/types/sagas/index.js', envContent);
  }

  // Edit types requests/ service group index.js
  if (serviceGroupPath) {
    const filePath = `./src/state/types/requests/${serviceGroupPath}index.js`;
    if (fs.existsSync(filePath)) {
      envContent = fs.readFileSync(filePath, 'utf8');
    } else {
      envContent = '';
    }
    if (envContent.includes(`./${serviceName}.types`)) {
      console.log('Warning: types requests group already exists, ignoring'); // eslint-disable-line no-console
    } else {
      envContent += `export * from './${serviceName}.types';\n`;
      fs.writeFileSync(filePath, envContent);
    }
  }
}

async function addSagaFiles() {
  let sagaDir = '';
  if (serviceGroupPath) {
    sagaDir = `./src/state/sagas/${serviceGroup}`;
    createDir(sagaDir, true);
  }

  sagaDir = `./src/state/sagas/${serviceGroupPath}${serviceName}`;
  createDir(sagaDir);
  let envContent = '';
  // src/state/sagas/ group /index.js
  if (serviceGroupPath) {
    const filePath = `./src/state/sagas/${serviceGroupPath}index.js`;
    if (fs.existsSync(filePath)) {
      envContent = fs.readFileSync(filePath, 'utf8');
    } else {
      envContent = `import { all } from 'redux-saga/effects';
import ${serviceName}WatcherSaga from './${serviceName}/${serviceName}.saga';

export default function* ${serviceGroup}Saga() {
  yield all([
    ${serviceName}WatcherSaga(),
  ]);
}
`;
      fs.writeFileSync(filePath, envContent);
    }
    if (envContent.includes(`${serviceName}WatcherSaga()`)) {
      console.log('Warning: types requests group already exists, ignoring'); // eslint-disable-line no-console
    } else {
      envContent = envContent.replace('\n  ]);', `\n    ${serviceName}WatcherSaga(),\n  ]);`);
      envContent = envContent.replace('\n\n', `\nimport ${serviceName}WatcherSaga from './${serviceName}/${serviceName}.saga';\n\n`);
      fs.writeFileSync(filePath, envContent);
    }
  }

  let sagaIndexContent = fs.readFileSync('./src/state/actions/sagas/index.js', 'utf8');
  if (sagaIndexContent.includes(`${serviceName}SagaAction`)) {
    console.log('Warning: Config already exists, ignoring'); // eslint-disable-line no-console
  } else {
    const service = serviceName.replace(/\.?([A-Z])/g, (x, y) => `_${y.toLowerCase()}`).replace(/^_/, '');
    sagaIndexContent += `\n// ${_.upperFirst(serviceName)}\nexport const ${serviceName}SagaAction = payload => ({type: types.${serviceName}SagaType, payload });\n`;
    fs.writeFileSync('./src/state/actions/sagas/index.js', sagaIndexContent);
  }

  // create saga file
  const sagaFileName = `${sagaDir}/${serviceName}.saga.js`;
  createFile(sagaFileName, `import { call, put, takeLatest } from 'redux-saga/effects';
import { ${serviceName}SagaType } from '../../${servicePathOneStepBack()}types/sagas';
import { ${serviceName}RequestActions } from '../../${servicePathOneStepBack()}actions/requests/${(serviceGroupPath) ? serviceGroup : `${serviceName}/get${_.upperFirst(serviceName)}.actions`}';
import { ${serviceName}Request } from '../../../${servicePathOneStepBack()}services/${(serviceGroupPath) ? serviceGroup : `${serviceGroupPath}${serviceName}/${serviceName}.service`}';
import { getUserCredentials } from '../../../${servicePathOneStepBack()}services/authentication/userCredentials';

export default function* ${serviceName}WatcherSaga() {
  yield takeLatest(${serviceName}SagaType, ${serviceName}WorkerSaga);
}

export function* ${serviceName}WorkerSaga({ payload }) {
  yield put(${serviceName}RequestActions.start(payload));
  const userCredentials = yield call(getUserCredentials);
  try {
    const result = yield call(${serviceName}Request, userCredentials, payload);
    yield put(${serviceName}RequestActions.succeed(result));
  } catch (error) {
    yield put(${serviceName}RequestActions.fail(error));
  }
}
`);

  // create saga test file
  const sagaTestFileName = `${sagaDir}/${serviceName}.saga.test.js`;
  createFile(sagaTestFileName, `import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import MockDate from 'mockdate';
import { throwError } from 'redux-saga-test-plan/providers';
import ${serviceName}WatcherSaga from './${serviceName}.saga';
import { ${serviceName}SagaAction } from '../../${servicePathOneStepBack()}actions/sagas';
import { ${serviceName}RequestActions } from '../../${servicePathOneStepBack()}actions/requests/${(serviceGroupPath) ? serviceGroup : `${serviceName}/get${_.upperFirst(serviceName)}.actions`}';
import successResponse from '../../../${servicePathOneStepBack()}fixtures/apiResponses/${serviceName}/success.json';
import { ${serviceName}Request } from '../../../${servicePathOneStepBack()}services/${(serviceGroupPath) ? serviceGroup : `${serviceGroupPath}${serviceName}/${serviceName}.service`}';
import ${serviceName}Reducer from '../../${servicePathOneStepBack()}reducers/requests/${serviceGroupPath}${serviceName}/${serviceName}.reducer';
import { getUserCredentials } from '../../../${servicePathOneStepBack()}services/authentication/userCredentials';

describe('${serviceName} Saga', () => {
  const payload = {};
  const userCredentials = { username: 'demo', password: 'password' };
  const genericError = 'RANDOM_ERROR';
  MockDate.set('2017-09-10T17:12:12.000Z');
  const timeStamp = Date.now();
  it('can store ${serviceName} to state', async () => {
    await expectSaga(${serviceName}WatcherSaga)
      .withReducer(${serviceName}Reducer)
      .provide([
        [matchers.call.fn(${serviceName}Request), successResponse.data],
        [matchers.call.fn(getUserCredentials), userCredentials],
      ])
      .put(${serviceName}RequestActions.start(payload))
      .put(${serviceName}RequestActions.succeed(successResponse.data))
      .dispatch(${serviceName}SagaAction(payload))
      .hasFinalState(({
        isWaiting: false,
        value: payload,
        error: null,
        result: successResponse.data,
        timestamp: timeStamp,
      }))
      .run({ silenceTimeout: true });
  });

  it('handles failure', async () => {
    await expectSaga(${serviceName}WatcherSaga)
      .withReducer(${serviceName}Reducer)
      .provide([
        [matchers.call.fn(${serviceName}Request), throwError(genericError)],
        [matchers.call.fn(getUserCredentials), userCredentials],
      ])
      .put(${serviceName}RequestActions.start(payload))
      .put(${serviceName}RequestActions.fail(genericError))
      .dispatch(${serviceName}SagaAction(payload))
      .hasFinalState({
        isWaiting: false,
        value: payload,
        error: genericError,
        result: null,
      })
      .run({ silenceTimeout: true });
  });
});
`);
}

async function addActionFiles() {
  let actionDir = '';
  if (serviceGroupPath) {
    actionDir = `./src/state/actions/requests/${serviceGroup}`;
    createDir(actionDir, true);
  } else {
    actionDir = `./src/state/actions/requests/${serviceName}`;
    createDir(actionDir);
  }

  // src/state/actions/requests/group/index.js
  let envContent = '';
  let shouldWrite = true;
  if (serviceGroupPath) {
    const filePath = `./src/state/actions/requests/${serviceGroupPath}index.js`;
    if (fs.existsSync(filePath)) {
      envContent = fs.readFileSync(filePath, 'utf8');
    } else {
      envContent = `export * from './get${_.upperFirst(serviceName)}.actions';\n`;
      fs.writeFileSync(filePath, envContent);
      shouldWrite = false;
    }
    if (envContent.includes(`get${_.upperFirst(serviceName)}.actions`)) {
      console.log('Warning: types requests group already exists, ignoring'); // eslint-disable-line no-console
      shouldWrite = false;
    }
    if (shouldWrite) {
      envContent += `export * from './get${_.upperFirst(serviceName)}.actions';\n`;
      fs.writeFileSync(filePath, envContent);
    }
  }

  // create reducer file
  const reducerFileName = `${actionDir}/get${_.upperFirst(serviceName)}.actions.js`;
  createFile(reducerFileName, `import { createRequestResponseActionSet } from '../../generic';
import { ${_.upperFirst(serviceName)}RequestTypes } from '../../../types/requests/${serviceGroupPath ? serviceGroup : `${serviceName}/${serviceName}.types`}';

export const ${serviceName}RequestActions = createRequestResponseActionSet(${_.upperFirst(serviceName)}RequestTypes);
`);
}

async function addFixture() {
  const fixtureDir = `./src/fixtures/apiResponses/${serviceName}`;
  createDir(fixtureDir, true);

  // create fixture fail file
  const fixtureFailFileName = `${fixtureDir}/fail.json`;
  createFile(fixtureFailFileName, `{
  "data": null,
  "success": true
}
`);
  // create fixture success file
  const fixtureSuccessFileName = `${fixtureDir}/success.json`;
  createFile(fixtureSuccessFileName, `{
"data": {"tmpKey":"tmpVal"},
"success": true,
"status": "SUCCESS"
}
`);
}
generateService();
