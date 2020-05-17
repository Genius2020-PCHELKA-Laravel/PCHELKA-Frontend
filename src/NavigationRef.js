import {NavigationAction} from 'react-navigation';
let navigator;
export const setNavigator=(nav)=>{
navigator=nav;
};
export const navigate=(routName,params)=>{
navigator.dispatch(
    NavigationAction.navigate(
        {
            routName,
            params
        }
    )
)
}