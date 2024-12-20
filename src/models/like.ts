import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Blog from './blog';
import User from './user';

class Like extends Model {
  public id!: number;
  public blog_id!: number;
  public user_id!: number;
  public created_at!: Date;
}

Like.init(
  {
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
    timestamps: false,
  }
);

// Relación con Blog y User
Like.belongsTo(Blog, { foreignKey: 'blog_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

export default Like;
