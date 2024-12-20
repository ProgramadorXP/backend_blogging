import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Blog from './blog';
import Tag from './tag';

class BlogTag extends Model {
  public blog_id!: number;
  public tag_id!: number;
}

BlogTag.init(
  {
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BlogTag',
    tableName: 'blog_tags',
    timestamps: false,
  }
);

// Establecer relaciones
Blog.belongsToMany(Tag, {
  through: BlogTag,
  foreignKey: 'blog_id',
});
Tag.belongsToMany(Blog, {
  through: BlogTag,
  foreignKey: 'tag_id',
});

export default BlogTag;
