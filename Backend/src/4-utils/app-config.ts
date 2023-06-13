require('dotenv').config();

class AppConfig {

    // Server Port:
    public port = process.env.PORT || 4000;

    // Database Host (on which computer the database exists):
    public mySqlHost = "localhost";

    // Database User
    public mySqlUser = "root";

    // Database Password: 
    public mySqlPassword = "";

    // Database Name: 
    public mySqlDatabase = "___"; // fill in database namenpm 
}

const appConfig = new AppConfig();

export default appConfig;
