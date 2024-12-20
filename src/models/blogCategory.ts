import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Blog from './blog';
import Category from './category';

class BlogCategory extends Model {
  public blog_id!: number;
  public category_id!: number;
}

BlogCategory.init(
  {
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BlogCategory',
    tableName: 'blog_categories',
    timestamps: false,
  }
);

// Establecer relaciones
Blog.belongsToMany(Category, {
  through: BlogCategory,
  foreignKey: 'blog_id',
});
Category.belongsToMany(Blog, {
  through: BlogCategory,
  foreignKey: 'category_id',
});

export default BlogCategory;
