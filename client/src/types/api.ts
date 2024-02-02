import {ArticleCategories, Currency} from "../constants";

export type UserCredentialsT = {
    email: string;
    password: string;
}

export type UserT = {
    id: number;
    name: string;
    email: string;
    groups: string[];
    region: string;
    city: string;
}

export type UserAuthResponseT = {
    accessToken: string;
    refreshToken: string;
    user: UserT;
}

export type RefreshTokenResponseT = {
    accessToken: string;
}

export type ArticleT = {
    id: number;
    title: string;
    description: string;
    currency: Currency;
    price: number;
    category: ArticleCategories;
    date: Date;
    images: string[];
    userId: number;
}