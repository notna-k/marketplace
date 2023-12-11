
import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Article} from "../articles/articles.model";


interface UserCreationAttrs{
    name : string;
    email : string;
    password : string;
}
@Table({tableName: "User"})
export class User extends Model<User, UserCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull : false, unique: false})
    name: string;

    @Column({type: DataType.STRING, allowNull : false, unique: true})
    email: string;

    @Column({type: DataType.STRING, allowNull : true})
    phoneNumber: string;


    @Column({type: DataType.STRING, allowNull : false})
    password: string;

    @Column({type: DataType.STRING, allowNull: true})
    profilePhotos: string;

    @Column({type: DataType.ARRAY(DataType.STRING), defaultValue : ["USER"], allowNull : false})
    groups: string[];

    @Column({type: DataType.STRING, allowNull: true})
    region : string;

    @Column({type: DataType.STRING, allowNull: true})
    city : string;

    @HasMany(() => Article)
    articles: Article[];

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isActivated: boolean;

    @Column({type: DataType.STRING, allowNull: true})
    refreshToken: string;

    @Column({type: DataType.STRING, allowNull: true})
    activationLink: string;



}