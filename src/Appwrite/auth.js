import conf from "../conf/conf";
import {Client , Account , ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client 
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client);   
    }

    //User account creation for the first time 
    async createAccount({ email , password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //Calling another method 
              return this.login({email,password});
            }
            else{
              return userAccount;
            }
        } 
        catch (error) {
            throw error;
        }
    }

    //Login 
    async login({email,password}){
        try {
            const userLogin = await this.account.createEmailPasswordSession(email,password);
            return userLogin;

        } catch (error) {
            throw error;
        }
    }

    //check user is doing singup or not
    async getCurrentUser(){
        try {
          return await this.account.get();  
        }
         catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error" , error);

        }

        return null;
    }

    // logout 
     async logout(){
        try {
          await this.account.deleteSessions();  
            
        } 
        catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

}

const authService = new AuthService();
export default authService
