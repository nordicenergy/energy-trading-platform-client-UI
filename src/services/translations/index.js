import en from './en.json';
import de from './de.json';

const locales = { de, en };

export function getTranslationOf(name) {
    const translations = locales[document.documentElement.getAttribute('lang') || 'en'];
    return translations[name];
}

export default { en, de };
