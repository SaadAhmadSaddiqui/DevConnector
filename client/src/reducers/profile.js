const { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } = require( "../actions/types" );

const initialState = 
{
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

function profile(state = initialState, action)
{
    const { type, payload } = action;

    switch(type)
    {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
                error: {}
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: true
            };
        default:
            return state;
    }
}

export default profile;