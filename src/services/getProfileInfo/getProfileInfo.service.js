// import Config from 'react-native-config.js';
import request from '../request/request.service';
import methods from '../../utilities/methods';
import responseHandler from '../request/responseHandler/responseHandler';

const handleResponse = responseHandler();
const GET_PROFILE_INFO = 'https://drive-gateway-tst.jbhunt.com/ws_mobile_drive_gateway/driver-services/rest/miles/getMiles?alphaCode={username}&payGroup={payGroup}&jobGroup={jobGroup}';
export function getProfileInfoRequest(userCredentials, payload) {
  const {
    username, payGroup, jobGroup,
    requestBody,
  } = payload;
  const requestOptions = {
    method: methods.POST,
    url: GET_PROFILE_INFO.replace('{username}', username).replace('{payGroup}', payGroup).replace('{jobGroup}', jobGroup),
    userCredentials,
    body: requestBody ? JSON.stringify(requestBody) : '',
  };
  return request(requestOptions).then(handleResponse).then(response => response.data);
}
