import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './user'; // Importamos el modelo de User para la relación

class Blog extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public author_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Blog.init(
  {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    timestamps: false,
  }
);

// Relación con el modelo User (autor del blog)
Blog.belongsTo(User, { foreignKey: 'author_id' });

export default Blog;
