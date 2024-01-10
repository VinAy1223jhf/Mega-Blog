import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";



//ek class bnalo kisi bhi naam se aur usmei saare methods/services/functions call krdo 
//jab bhi kuch krna ho toh iss class mei se uss service ko call krlo by AuthServices."serviceName"
export class AuthServices {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method that ki agr signup ojaaye toh sidha login hi krdo
                return this.login({ email, password });
            }
            else {
                return userAccount; // isko baad mei change krdenge accordingly
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.getPrefs();
        } catch (error) {
            throw error
        }

        // return null; // ye extra nul isiliye bcz agr try catch mei koi dikkat aayi toh handle hojaaye
    }

    async logout() {
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}


const authService = new AuthServices();

export default authService;

