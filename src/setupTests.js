import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-plotly.js');

if (window) {
    window.URL = {
        createObjectURL: f => f
    };
    window.sessionStorage = {
        setItem: f => f,
        getItem: f => f,
        removeItem: f => f
    };
}
