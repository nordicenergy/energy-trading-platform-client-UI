export const initialState = {
    breadCrumbs: { data: [] }
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
        default:
            return state;
    }
}
