import React from 'react';
import './styles.css';
import {SERVER_URL} from "../../constants";
import {useNavigate, useRoutes} from "react-router-dom";
import {Routes} from "../../router/routes";

interface ArticleItemProps {
    id: number
    image: string;
    title: string;
    price: number;
    currency: string;
    userCity: string;
    userRegion: string;
    date: Date;
}

const ArticleItem: React.FC<ArticleItemProps> = ({
                                                     image,
                                                     id,
                                                     title,
                                                     price,
                                                     currency,
                                                     userCity,
                                                     userRegion,
                                                     date,
                                                 }: ArticleItemProps) => {

    const router = useNavigate();
    return (
        <div className="card-article" onClick={() => router(Routes.HOME + "/" + id)}>
            <img src={SERVER_URL + "static/image/" + image} className="card-img-top" alt="Article" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div>
                    <p className="card-text">
                        <strong>Price:</strong>
                        {price ?
                            <>  {price} {currency}</>
                            : <label className="text-muted">  trade</label>
                        }

                    </p>
                    <p className="card-text">
                        <strong>Location:</strong> {userCity}, {userRegion}
                    </p>
                </div>
                {date && (
                    <p className="card-text">
                        <small className="text-muted">Published on: {date.toUTCString()}</small>
                    </p>
                )}
            </div>
        </div>
    );
};

export default ArticleItem;