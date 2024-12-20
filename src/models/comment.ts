import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Blog from './blog';
import User from './user';

class Comment extends Model {
  public id!: number;
  public blog_id!: number;
  public author_id!: number;
  public content!: string;
  public created_at!: Date;
}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: false,
  }
);

// Relación con Blog y User
Comment.belongsTo(Blog, { foreignKey: 'blog_id' });
Comment.belongsTo(User, { foreignKey: 'author_id' });

export default Comment;
