function zoomer(state, action){
    if(state === undefined){
        return 0;
    }    
    switch(action.type){
        case "increase":
            return state + 1;
        case "decrease":
            return state - 1;
        default:
            return state;
    }
}
export default zoomer;