import { configureStore } from 'redux';
import reducers from './reducer';

//store공간을 생성한 뒤, 리듀서가 전달해주는 데이터를 저장
const store = configureStore(reducers);
export default store;
