class AppConfig {
    // auth URL's
    public registerUrl = "http://localhost:4000/api/auth/register"
    public loginUrl = "http://localhost:4000/api/auth/login"

    // data URL's
    public usersUrl = 'http://localhost:4000/api/home/'
    public newMessageUrl = 'http://localhost:4000/api/message/'
    public messageHistoryUrl = 'http://localhost:4000/api/history/'
}

const appConfig = new AppConfig();

export default appConfig;