import { FETCH_ADD_NEW_RECIPE, FETCH_DELETE_RECIPE } from './actions';

const initialState = {
    recipes: []
};


function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ADD_NEW_RECIPE:
            console.log("reducer", action.payload)
            const recipee = JSON.parse(localStorage.getItem("recipes"))
            return {
                ...state.recipes,
                recipes: [...recipee, action.payload]
            };

        case FETCH_DELETE_RECIPE:
            let recipe = [...action.payload.recipe]
            recipe.splice(action.payload.id, 1)
            localStorage.setItem('recipes', JSON.stringify(recipe));
            // window.location.reload();
            return {
                recipes: [...recipe]
            };
        default:
            return state;
    }
}

export default reducer;