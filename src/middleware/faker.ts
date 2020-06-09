import faker from '../util/faker'
import { SET_VOTE, START_GAME, SET_USER_STATE, SET_STATE, setQuestion } from '../actions/faker'
import { setPayload, SET_PAYLOAD, showRoleInfo, SUBMIT_PROMPT, setUserStatus, SUBMIT_ANSWER } from '../actions/index'
import { SHOW_VOTE, SHOW_ROLE, WRITE_ANSWER } from '../models/FakerState'
import profile from '../util/profile'
import uuidUtil from '../util/uuid'


export default store => next => action => {
  try {
    switch (action.type) {
      case START_GAME:
        faker.sendGameChange(
          store,
          START_GAME,
          {});
        break;
      case SET_STATE:
        console.log('Set state: ', action.data);
        switch (action.data.event) {
          case START_GAME:
          case WRITE_ANSWER:
            if (action.data.round <= 1) {
              store.dispatch(showRoleInfo())
            }
            console.log('Submit prompt payload: ', action.data.payload);
            store.dispatch(setQuestion(action.data.payload.message))
            break;
          case SHOW_VOTE:
            store.dispatch(setPayload(action.data.payload));
          break;
        }
        break
      case SET_USER_STATE:
        console.log('SET USER STATE: ', action);
        break
      case SUBMIT_PROMPT:
        faker.sendGameChange(
          store,
          SUBMIT_PROMPT,
          {
            message: action.question,
            datetime: new Date(),
            name: profile.getName(),
            messageUUID: uuidUtil.createUUID(),
            type: 'STATUS'
          });
          break;
      case SUBMIT_ANSWER:
        faker.submitAnswer(store, action.answer);
        break;
      case SET_VOTE:
        faker.submitVote(store, action.uuid);
        break;
      default:
    }
    next(action)
  } catch (err) {
    console.error('Caught an error in musictionary middleware', err)
    throw err
  }
}

