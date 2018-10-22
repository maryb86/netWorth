//THIS IS JUST AN EXAMPLE, REMOVE THIS IF NO NEED TO MOCK
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };
global.localStorage = localStorageMock

