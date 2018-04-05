export const initialState = {
    breadCrumbs: { data: [] }
};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SETUP_BREADCRUMBS':
            const existanceItemIndex = state.breadCrumbs.data.findIndex(
                item => item.id === action.payload.id
            );
            const includedItemIndex = existanceItemIndex + 1;
            const newBreadcrumbs =
                existanceItemIndex === -1
                    ? [...state.breadCrumbs.data, action.payload]
                    : state.breadCrumbs.data.slice(0, includedItemIndex);
            return {
                ...state,
                breadCrumbs: {
                    data: newBreadcrumbs
                }
            };
        case 'SETUP_ROOT_BREADCRUMB':
            const newBreadCrumbs = action.payload
                ? [action.payload]
                : state.breadCrumbs.data;
            return {
                ...state,
                breadCrumbs: {
                    data: newBreadCrumbs
                }
            };
        case 'RESET_BREADCRUMBS':
            return {
                ...state,
                breadCrumbs: {
                    data: initialState.breadCrumbs.data
                }
            };
        default:
            return state;
    }
}
