
import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {CurrencyType} from "../shared/constants/currency-type";

export interface ArticleCreationAttrs{
    title : string;
    description : string;
    price: number;
    currency: string;
    images: string[];
    userId: number;
    date: Date;
}
@Table({tableName: "articles"})
export class Article extends Model<Article, ArticleCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull : false})
    title: string;

    @Column({type: DataType.TEXT, defaultValue: ""})
    description: string;

    @Column({type: DataType.DOUBLE, allowNull: true})
    price: number;

    @Column({ type: DataType.ENUM(...Object.values(CurrencyType)), allowNull: true })
    currency: CurrencyType;

    @Column({type: DataType.ARRAY(DataType.STRING), allowNull: true})
    images: string[];

    @Column({type: DataType.DATE, allowNull: false})
    date: Date;



    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User, 'userId')
    user: User;

}