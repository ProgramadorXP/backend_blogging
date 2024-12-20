import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Category extends Model {
  public id!: number;
  public name!: string;
  public created_at!: Date;
}

Category.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false,
  }
);

export default Category;
