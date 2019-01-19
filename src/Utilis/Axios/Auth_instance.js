import axios from 'axios';

export const SignUp_Axios = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDYOFSAhbvIBP3_psicUja6RrmPuTZjjrM',
});

export const SignIn_Axios = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDYOFSAhbvIBP3_psicUja6RrmPuTZjjrM',
});

