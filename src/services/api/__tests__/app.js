import Axios from 'axios';
import { getAboutUsContent, getFAQContent, getTermsAndConditions } from '../app';

describe('App API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
    });

    it('should provide method for getting about us content', async () => {
        Axios.get.mockReturnValue(Promise.resolve({ data: { introductionText: 'test' } }));
        const aboutUsContent = await getAboutUsContent('en');
        expect(Axios.get).toHaveBeenCalledWith('/api/content/aboutUs', { params: { lang: 'en' } });
        expect(aboutUsContent).toEqual({ data: ['test'] });
    });

    it('should provide method for getting FAQ content', async () => {
        Axios.get.mockReturnValue(Promise.resolve({ data: { faq: ['faq 1', 'faq 2'] } }));
        const FAQContent = await getFAQContent('en');
        expect(Axios.get).toHaveBeenCalledWith('/api/content/FAQ', { params: { lang: 'en' } });
        expect(FAQContent).toEqual({ data: ['faq 1', 'faq 2'] });
    });

    it('should provide method for getting FAQ content', async () => {
        const result = await getTermsAndConditions('en');
        expect(result).toEqual({ data: [
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                'Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. '
            ] });
    });
});
