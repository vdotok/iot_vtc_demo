
const user_data = (state = [], action) => {
  switch (action.type) {
    case 'USER':
      return action.userData
    default:
      return state;
  }

};
const users = (state = [], action) => {
  switch (action.type) {
    case 'AllUsers':
      return action.AllUsers
    default:
      return state;
  }
}
const groups = (state = [], action) => {
  switch (action.type) {
    case 'AllGroups':
      return action.AllGroups
    default:
      return state;
  }
}
const room_messages = (state = [
], action) => {
  switch (action.type) {
    case 'RoomMessages':
      return action.RoomMessages
    default:
      return state;
  }
}

const newreducer = (state = {
    myarr: [],
    humarr: [],
    newobj: {},
    switch1: false, 
    switch2: false,
    switch3: false,
    switch4: false }, action) => {
  console.log('**in dispatch==>', action);

  switch (action.type) {
      case 'newdispatch':
        return {
          ...state,
          newobj: { ...action.groupsobj }
        }
      case 'timearray':
        return {
          ...state,
          myarr:  [...action.timesarray] 
        }
        case 'humarray':
        return {
          ...state,
          humarr: [...action.humtimearray]
        }
      case 'switch1':
        return{
          ...state,
          switch1:action.payload
        }
        case 'switch2':
        return{
          ...state,
          switch2:action.payload
        }
        case 'switch3':
        return{
          ...state,
          switch3:action.payload
        }
        case 'switch4':
        return{
          ...state,
          switch4:action.payload
        }
    default:
      return state;
  }
}


const group_subscribers = (state = { subscribers: [] }, action) => {
  switch (action.type) {
    case 'subscribers':
      return {
        ...state,
        subscribers: action.group_subscribers,
      }
    default:
      return state;
  }
}
export { user_data, users, groups, room_messages, newreducer, group_subscribers }

