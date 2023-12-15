import React, { useState, useEffect } from 'react';
import ArticleItem from './ArticleItem';
import {Article} from "../API/article/article-entity";
import {ArticleService} from "../API/article/article-service";
import {UserService} from "../API/user/user-service";
import {User} from "../API/user/user-entity"; // Assuming you have ArticleItem component

const ArticleList = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [users, setUsers] = useState<User[]>([]);


    useEffect(() => {

        const fetch = async () =>{
            const articleRes = await ArticleService.getAll();
            setArticles(articleRes.data);
            const userRes = await Promise.all(articles.map(async(value) => {
                const res = await UserService.getUser(value.userId);
                return res.data;
            }));
            setUsers(userRes);

        }
        fetch();
    }, [articles, users]);

    return (
        <div>
            <h2>Article List</h2>
            {articles.map((article, index) => {
                const user = users.find((user) => user.id === article.userId);
                return (
                    <ArticleItem
                        key={index}
                        image={process.env.REACT_APP_SERVER_URL + "/" + article.images[0]}
                        title={article.title}
                        price={article.price}
                        currency={article.currency}
                        userCity={user ? user.city : ''}
                        userRegion={user ? user.city : ''}
                        date={new Date(article.date)}
                    />
                );
            })}
        </div>
    );
};

export default ArticleList;
