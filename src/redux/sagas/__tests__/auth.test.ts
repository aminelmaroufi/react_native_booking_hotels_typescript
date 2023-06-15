import {takeLatest, all} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {CommonActions} from '@react-navigation/native';
import recordSaga from '../recordSaga';
import watchAuthRequest, {
  check_user_request,
  login_request,
  save_account,
} from '../auth';
import ActionTypes from '../../..//utils/actionTypes';
import * as api from '../../../api/auth';
import {IUser} from '../../../models';
import {navigateToScreen} from '../../../redux/actions';

const error_message = 'Error from API';
const success_message = 'SUCCESS_OPERATION';

describe('Test watchAuthRequest sagas', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call 'all' with the correct functions", async () => {
    const genObject = watchAuthRequest();
    const effects = genObject.next().value;
    expect(effects).toEqual(
      all([
        takeLatest(ActionTypes.SAVE_ACCOUNT_REQUEST, save_account),
        takeLatest(ActionTypes.LOGIN_REQUEST, login_request),
        takeLatest(ActionTypes.CHECK_USER_REQUEST, check_user_request),
      ]),
    );
  });

  //Test check_user_request saga
  describe('Test check_user_request saga', () => {
    it('should call api and dispatch success action', async () => {
      const currUser: IUser = {
        _id: '1',
        firstname: 'test',
        lastname: 'test',
        fullname: 'test test',
        email: 'test@test.com',
        phone: '',
        password: '',
        cards: [],
      };
      const res: AxiosResponse<any> = {
        data: {
          ok: true,
          result: {
            user: currUser,
          },
        },
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      };

      const checkUserRequest = jest
        .spyOn(api, 'checkUser')
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(check_user_request, null);
      expect(checkUserRequest).toHaveBeenCalledTimes(1);
      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_SUCCESS,
        },
        {type: ActionTypes.CHECK_USER_SUCCESS, payload: {user: currUser}},
      ];
      expect(dispatched).toEqual(expectedDispatched);
      checkUserRequest.mockClear();
    });

    it('should check_user_request saga disptach failure from the server', async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: false,
          result: {
            message: error_message,
            user: null,
          },
        },
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      };
      const checkUserRequest = jest
        .spyOn(api, 'checkUser')
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(check_user_request, null);
      expect(checkUserRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: {message: error_message},
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      checkUserRequest.mockClear();
    });

    it('should check_user_request saga disptach failure', async () => {
      const checkUserRequest = jest
        .spyOn(api, 'checkUser')
        .mockImplementation(() => Promise.reject(new Error(error_message)));

      const dispatched = await recordSaga(check_user_request, null);
      expect(checkUserRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: {message: error_message},
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      checkUserRequest.mockClear();
    });
  });

  //Test login_request saga
  describe('Test login_request saga', () => {
    const action = {
      email: 'test@test.com',
      password: 'Azerty123@@',
    };
    it('should call api and dispatch success action', async () => {
      const currUser: IUser = {
        _id: '1',
        firstname: 'test',
        lastname: 'test',
        fullname: 'test test',
        email: 'test@test.com',
        phone: '',
        password: '',
        cards: [],
      };
      const res: AxiosResponse<any> = {
        data: {
          ok: true,
          result: {
            user: currUser,
          },
        },
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      };
      const loginRequest = jest
        .spyOn(api, 'login')
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(login_request, action);
      expect(loginRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_SUCCESS,
        },
        {type: ActionTypes.LOGIN_SUCCESS, payload: {user: currUser}},
        navigateToScreen('Overview', {}),
      ];
      expect(dispatched).toEqual(expectedDispatched);
      loginRequest.mockClear();
    });

    it('should login_request saga disptach failure from the server', async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: false,
          result: {
            message: error_message,
            user: null,
          },
        },
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      };
      const loginRequest = jest
        .spyOn(api, 'login')
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(login_request, action);
      expect(loginRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: {message: error_message},
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      loginRequest.mockClear();
    });

    it('should login_request saga disptach failure', async () => {
      const loginRequest = jest
        .spyOn(api, 'login')
        .mockImplementation(() => Promise.reject(new Error(error_message)));

      const dispatched = await recordSaga(login_request, action);
      expect(loginRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: {message: error_message},
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      loginRequest.mockClear();
    });
  });

  //Test save_account saga
  describe('Test save_account saga', () => {
    const currUser: IUser = {
      _id: '1',
      firstname: 'test',
      lastname: 'test',
      fullname: 'test test',
      email: 'test@test.com',
      phone: '',
      password: '',
      cards: [],
    };
    const action = {
      account: currUser,
      navigation: {
        pop: jest.fn(),
      },
    };
    it('should call api and dispatch success action', async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: true,
          result: {
            message: success_message,
            user: currUser,
          },
        },
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      };
      const saveAccountRequest = jest
        .spyOn(api, 'saveAccount')
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(save_account, action);
      expect(saveAccountRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.SUCCESS_OPERATION,
          payload: {message: success_message},
        },
        {type: ActionTypes.CREATE_ACCOUNT_SUCCESS, payload: {user: currUser}},
        // CommonActions.goBack(),
        // CommonActions.navigate({name: 'Login'}),
      ];
      expect(dispatched).toEqual(expectedDispatched);
      saveAccountRequest.mockClear();
    });

    it('should login_request saga disptach failure from the server', async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: false,
          result: {
            message: error_message,
            user: null,
          },
        },
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      };
      const saveAccountRequest = jest
        .spyOn(api, 'saveAccount')
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(save_account, action);
      expect(saveAccountRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: {message: error_message},
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      saveAccountRequest.mockClear();
    });

    it('should login_request saga disptach failure', async () => {
      const saveAccountRequest = jest
        .spyOn(api, 'saveAccount')
        .mockImplementation(() => Promise.reject(new Error(error_message)));

      const dispatched = await recordSaga(save_account, action);
      expect(saveAccountRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: {message: error_message},
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      saveAccountRequest.mockClear();
    });
  });
});
