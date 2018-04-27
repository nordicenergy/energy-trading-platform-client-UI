export const initialState = {
    breadCrumbs: { data: [] },
    localization: {
        data: {
            locale: localStorage.getItem('locale'),
            aboutUs: [],
            faq: []
        },
        loading: false,
        error: null
    }
};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SETUP_BREADCRUMBS':
            const newBreadcrumbs = action.payload ? action.payload : initialState.breadCrumbs.data;
            return {
                ...state,
                breadCrumbs: {
                    data: newBreadcrumbs
                }
            };
        case 'SETUP_LOCALE':
            const payload = action && action.payload;
            const [locale] = action.meta;
            let newLocale = state.localization.data.locale;

            if (locale) {
                window.localStorage.setItem('locale', locale);
                newLocale = locale;
            }

            return {
                ...state,
                localization: {
                    data: payload ? { ...payload, locale } : { ...state.localization.data, locale: newLocale },
                    loading: action.loading,
                    error: action.error
                }
            };
        default:
            return state;
    }
}
