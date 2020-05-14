import createDataContext from './createDataContext';
import requestapi from '../../api/axiosapi';
const authreducer=(state,action)=>{
    switch(action.type)
    {
        default 
        :return state;
    }
};
const signin=(dispach)=>{
    return ({number})=>{
        //make api request to singup and ask for verify number

        //if we sign up,modify our state,and say that we are authenticated
        //if signingup fail,we probably need to reflect an error message
    };
}

const signout=(dispach)=>{
    return ()=>{

    };}
export const{Context,Provider}=createDataContext(authreducer,
    {signin,signout},
    {isSignedIn:false}
    );