import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-plotly.js');
jest.mock('web3');

if (window) {
    window.web3 = { currentProvider: 'metamask' };

    window.URL = {
        createObjectURL: jest.fn()
    };

    window.sessionStorage = {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn()
    };

    window.localStorage = {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn()
    };
}
