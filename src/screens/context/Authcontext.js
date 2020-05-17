import createDataContext from './createDataContext';
import requestApi from '../../api/axiosapi';
import {AsyncStorage} from 'react-native';
import {navigate}from '../../NavigationRef';
const authreducer=(state,action)=>{
    switch(action.type)
    { case 'add_error':
    return{...state,errorMessage:action.payload};
    case 'signin':
        return{errorMessage:'',token:action.payload};
    case'signout':
    return{token:null,errorMessage:''};
        default 
        :return state;
    }
};
const signin=dispach=>{
    return async ({mobile,otp})=>{

        //make api request to singup and ask for verify number
try{
   
    const response= await requestApi.post('/sendsms',{mobile,otp});
    
    console.log(response.data);
}
catch(err){
    console.log("errrror");
   dispach({type:'add_error',payload:'something went wrong with sign up'})
}
        
    };
}

const signout=dispach=>{
    return async ()=>{
await AsyncStorage.removeItem('token');
dispach({type:'signout'})
    };}
    
const verifysms=dispach=>{
    
    return async(enteredotp,otp,mobile)=>{
       console.log({enteredotp,otp,mobile});
        try{
   console.log('befor');
            const response= await requestApi.post('/verifysmscode',{enteredotp,otp,mobile});
            console.log('after');
            console.log(response.data);
            v=response.data.data.token;
            console.log(v);
            await AsyncStorage.setItem('token',response.data.data.token);
            dispach({type:'signin',payload:response.data.data.token});
          //  navigate('LogIn');
          
        }
        catch(err){
            console.log("errrror");
           dispach({type:'add_error',payload:'something went wrong with sign up'})
        }
    };}
    /*
    const getservices=dispach=>{
        return async()=>{
            const response= await requestApi.get('/service');
            console.log(response.data);
        };
    }*/
export const{Context,Provider}=createDataContext(authreducer,
    {signin,signout,verifysms},
    {token:null,errorMessage:''}
    );