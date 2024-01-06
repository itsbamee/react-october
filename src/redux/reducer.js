import { combineReducers } from 'redux';

const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

//해당 리듀서 함수가 반환하는 객체를 외부로 export
const reducers = combineReducers({ memberReducer });
export default reducers;
