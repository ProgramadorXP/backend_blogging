import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Tag extends Model {
  public id!: number;
  public name!: string;
  public created_at!: Date;
}

Tag.init(
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
    modelName: 'Tag',
    tableName: 'tags',
    timestamps: false,
  }
);

export default Tag;
