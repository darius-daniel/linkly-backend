import sequelize from './db_connection.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'users',
    timestamps: true,
    indexes: [{ unique: true, fields: ['username'] }],
  }
);

const Link = sequelize.define(
  'Link',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    longUrl: { type: DataTypes.STRING, allowNull: false, unique: true },
    shortUrl: { type: DataTypes.STRING, allowNull: false, unique: true },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      set(value) {
        this.setDataValue('clicks', value);
      },
    },
  },
  {
    tableName: 'links',
    timestamps: true,
  }
);

User.hasMany(Link, { foreignKey: 'userId' })
Link.belongsTo(User, { foreignKey: 'userId' });

(async () => {
  await sequelize.sync({ force: true });
})();

export { User, Link };
