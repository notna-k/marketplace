import React, {useState} from 'react';
import {useQuery} from "react-query";
import {fetchArticles} from "../../services/api/fetch-articles";
import ArticleItem from "../ArticleItem/index";
import './styles.css';



const ArticleList = () => {
    const [page, setPage] = useState(0);

    const {data, isLoading, isError} = useQuery(['articles', page], () => fetchArticles(10*page))

    if(isLoading){
        return(
            <>Loading...</>
        )
    }

    if(isError){
        return(
            <>Error occured!</>
        )
    }
    if(!data){
        return(
            <>No data present!</>
        );
    }
    return (
        <div className="row">
            {data.map((article, index) => {
                //const user = users.find((user) => user.id === article.userId);
                return (
                    <ArticleItem
                        key={index}
                        id={article.id}
                        image={article.images[0]}
                        title={article.title}
                        price={article.price}
                        currency={article.currency}
                        userCity={''}
                        userRegion={''}
                        date={new Date(article.date)}
                    />


                );
            })}
        </div>
    );
};

export default ArticleList;
