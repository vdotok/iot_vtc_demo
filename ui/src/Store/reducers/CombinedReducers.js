import { combineReducers } from "redux";
import { user_data  , users, groups , room_messages,newreducer , group_subscribers} from "./User";
const AllReducer=combineReducers({user_data , users , groups , room_messages,newreducer , group_subscribers});
export default AllReducer;