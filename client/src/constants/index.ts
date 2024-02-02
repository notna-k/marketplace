export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export enum FetchEndPoint {
    REFRESH_TOKEN = "user/refresh",
    SIGN_IN = "user/sign_in",
    SIGN_UP = "user/sign_up",
    LOG_OUT = "user/logout",
    ALL_ARTICLES = "article",
    ARTICLE = "article"
}

export enum Currency {
    UAH = "UAH",
    USD = "USD",
    EUR = "EUR"
}

export enum ArticleCategories{
    CARS = "Car",
    ELECTRONICS = "Electronics",
    ESTATE = "Estate",
    MUSIC = "Music",
    WORK = "Work",
    SERVICE = "Service",
    ANIMALS = "Animals"
}