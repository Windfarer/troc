import { messages, actions, dataNames } from './proto'

const { api, utils } = messages

const types = {
  [actions.ERROR]: {
    request: utils.Error,
    response: utils.Error,
    dataName: 'error'
  },
  [actions.LOGIN]: {
    request: api.Login,
    response: api.LoginResponse,
    dataName: 'login'
  },
  [actions.GET_USER_INFO]: {
    request: utils.Empty,
    response: api.UserInfo,
    dataName: 'getUserInfo'
  },
  [actions.UPDATE_WECHAT_USER_INFO]: {
    request: api.UpdateWechatUserInfo,
    response: utils.SimpleResult,
    dataName: 'updateWechatUserInfo'
  },
  [actions.PUSH_FORM_ID]: {
    request: api.PushFormId,
    response: utils.SimpleResult,
    dataName: 'pushFormId'
  },
  [actions.REQUEST_AD_AUTH]: {
    request: utils.Empty,
    response: api.AdAuthChallengeInfo,
    dataName: 'requestAdAuth'
  },
  [actions.GET_DAILY_CHALLENGE_INFO]: {
    request: utils.Empty,
    response: api.DailyChallengeInfo,
    dataName: 'getDailyChallengeInfo'
  },
  [actions.ENROLL_DAILY_CHALLENGE]: {
    request: api.EnrollChallenge,
    response: api.DailyChallengeInfo,
    dataName: 'enrollDailyChallenge'
  },
  [actions.GET_WITHDRAW_INFO]: {
    request: utils.Empty,
    response: api.WithdrawInfo,
    dataName: 'getWithdrawInfo'
  },
  [actions.REQUEST_WITHDRAW]: {
    request: utils.Empty,
    response: api.WithdrawInfo,
    dataName: 'requestWithdraw'
  },
  [actions.GET_INVITATION_INFO]: {
    request: utils.Empty,
    response: api.InvitationInfo,
    dataName: 'getInvitationInfo'
  },
  [actions.BIND_INVITATION]: {
    request: utils.ItemRequest,
    response: utils.SimpleResult,
    dataName: 'bindInvitation'
  }
}

Object.keys(types).forEach(i => {
  types[i].dataName = dataNames[i]
})

export default types
