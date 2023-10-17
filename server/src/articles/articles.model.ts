
import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface ArticleCreationAttrs{
    head : string;
    description : string;
    price: number;
    currency: string;
    postPhotos: string[];
}
@Table({tableName: "articles"})
export class Article extends Model<Article, ArticleCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @Column({type: DataType.STRING, allowNull : false})
    head: string;

    @Column({type: DataType.TEXT, defaultValue: ""})
    description: string;

    @Column({type: DataType.DOUBLE, allowNull: true})
    price: number;

    @Column({type: DataType.STRING, allowNull: true})
    currency: string;

    @Column({type: DataType.ARRAY(DataType.STRING), allowNull: true})
    postPhotos: string[];



    @BelongsTo(() => User)
    user: User;

}