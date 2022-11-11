import configuration from '../configuration'


class UserService {

    LoginService(loginId,password){
        return configuration.get(`/login?loginId=${loginId}&password=${password}`)
    }
    RegisterUserService(user){

        return configuration.post(`/register`,JSON.stringify(user))
    }

    ResetPasswordService(loginId,Newpassword){

        return configuration.get(`/${loginId}/forgot?newPassword=${Newpassword}`)
    }
}


export default new UserService(); 