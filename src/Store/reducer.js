import * as immutable from 'object-path-immutable';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_APP_URL':
      return {
        ...state,
        appURL: action.payload,
      };
    case 'SET_DEVICE_MODE':
      return {
        ...state,
        deviceMode: action.payload,
      };
    case 'SET_POST_MESSAGE':
      return {
        ...state,
        postMessage: action.payload,
      };
    case 'RESET_VCC':
      return {
        ...state,
        activeVCCName: null,
        activeVCCPath: null,
        activeVCCType: null,
      };
    case 'SET_ACTIVE_VCC_TYPE':
      return {
        ...state,
        activeVCCType: action.payload,
      };
    case 'SET_ACTIVE_VCC_NAME':
      return {
        ...state,
        activeVCCName: action.payload,
      };
    case 'SET_ACTIVE_VCC_VALUE':
      return {
        ...state,
        activeVCCValue: action.payload,
      };
    case 'SET_ACTIVE_VCC_PATH':
      return {
        ...state,
        activeVCCPath: action.payload,
      };
    case 'SET_IS_REMIXING':
      return {
        ...state,
        isRemixing: action.payload
      };
    case 'SET_TAGS':
      return {
        ...state,
        tags: action.payload
      };
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload
      };
    case 'SET_PROFILE_IMAGE':
      return {
        ...state,
        profileImage: action.payload
      };
    case 'SET_VCC_VALUES':
      return {
        ...state,
        vccValues: action.payload
      };
    case 'UPDATE_VCC_VALUE':
      return {
        ...state,
        vccValues: immutable.set(
          state.vccValues,
          action.payload.path.join('.'),
          action.payload.newValue,
        ),
      };
    default:
      return state;
  }
};

export default reducer;
