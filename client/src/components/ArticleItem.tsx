import React from 'react';

interface ArticleItemProps {
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
                                                     title,
                                                     price,
                                                     currency,
                                                     userCity,
                                                     userRegion,
                                                     date,
                                                 }: ArticleItemProps) => {
    return (
        <div className="card mb-3">
            <img src={image} className="card-img-top" alt="Article" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text mb-0">
                        <strong>Price:</strong> {price} {currency}
                    </p>
                    <p className="card-text mb-0">
                        <strong>Location:</strong> {userCity}, {userRegion}
                    </p>
                </div>
                {date && (
                    <p className="card-text mt-2">
                        <small className="text-muted">Published on: {date.toUTCString()}</small>
                    </p>
                )}
            </div>
        </div>
    );
};

export default ArticleItem;
