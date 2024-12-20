import User from './user';
import Blog from './blog';
import Category from './category';
import Tag from './tag';
import BlogCategory from './blogCategory';
import BlogTag from './blogTag';
import Comment from './comment';
import Like from './like';

// Establecer relaciones entre los modelos
Blog.belongsTo(User, { foreignKey: 'author_id' });
Blog.belongsToMany(Category, {
  through: BlogCategory,
  foreignKey: 'blog_id',
});
Blog.belongsToMany(Tag, {
  through: BlogTag,
  foreignKey: 'blog_id',
});
Comment.belongsTo(Blog, { foreignKey: 'blog_id' });
Comment.belongsTo(User, { foreignKey: 'author_id' });
Like.belongsTo(Blog, { foreignKey: 'blog_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

export { User, Blog, Category, Tag, BlogCategory, BlogTag, Comment, Like };
