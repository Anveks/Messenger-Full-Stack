class AppConfig {

    // Server Port:
    public port = 4000;

    // mongo db conenction string:
    public connectionString = "mongodb://127.0.0.1:27017/messenger" // 127.0.0.1 this pc's address

    // server url:
    public serverUrl = "http://localhost:" + this.port;

    // image url:
    public imageUrl = this.serverUrl + "/api/images/";

}

const appConfig = new AppConfig();

export default appConfig;


