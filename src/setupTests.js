import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

window.sessionStorage = {
    setItem: f => f,
    getItem: f => f,
    removeItem: f => f
};
