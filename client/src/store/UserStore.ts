import {makeAutoObservable} from "mobx";


export default class UserStore{
    private isAuth: boolean;
    private user;
    constructor() {
        this.isAuth = localStorage.getItem("accessToken") !== null;
        this.user = {};
        makeAutoObservable(this);

    }

    setIsAuth(bool: boolean){
        this.isAuth = bool;
    }

    setUser(user:{}){
        this.user = user;
    }

    getIsAuth(){
        return this.isAuth;
    }

    getUser(){
        return this.user;
    }
}