// import Config from 'react-native-config';
import Config from 'react-native-config';
import request from '../request/request.service';
import methods from '../../utilities/methods';
import responseHandler from '../request/responseHandler/responseHandler';

const handleResponse = responseHandler();

export function loginUserRequest(userCredentials, payload) {

  const {
    username, payGroup, jobGroup,
    requestBody,
  } = payload;
  const requestOptions = {
    method: methods.POST,
    url: Config.LOGIN_USER.replace('{username}', username).replace('{payGroup}', payGroup).replace('{jobGroup}', jobGroup),
    userCredentials,
    body: requestBody ? JSON.stringify(requestBody) : '',
  };
  return request(requestOptions).then(handleResponse).then(response => response.data);
}
