import Axios from 'axios';
import { getAboutUsContent, getFAQContent, getLocalizationContent } from '../app';

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
        expect(aboutUsContent).toEqual(['test']);
    });

    it('should provide method for getting FAQ content', async () => {
        Axios.get.mockReturnValue(Promise.resolve({ data: { faq: ['faq 1', 'faq 2'] } }));
        const FAQContent = await getFAQContent('en');
        expect(Axios.get).toHaveBeenCalledWith('/api/content/FAQ', { params: { lang: 'en' } });
        expect(FAQContent).toEqual(['faq 1', 'faq 2']);
    });

    it('should provide method for getting localization content', async () => {
        Axios.get.mockReturnValue(
            Promise.resolve({
                data: { introductionText: 'test', faq: ['faq 1', 'faq 2'] }
            })
        );

        const localizationContent = await getLocalizationContent('en');
        expect(Axios.get).toHaveBeenCalledTimes(2);
        expect(localizationContent).toEqual({
            data: {
                aboutUs: ['test'],
                faq: ['faq 1', 'faq 2']
            }
        });
    });
});
