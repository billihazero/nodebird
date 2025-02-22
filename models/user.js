const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true, //null 가능
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false, //null 불가능
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provide: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true, //true - createAt, updateAt 컬럼을 자동으로 추가
        underscored: false, //기본으로 camelCase로 생성되는데, true로 설정할 시 자동으로 snake case로 바꿔준다.
        modelName: "User", // node에서 사용되는 모델 이름
        tableName: "users", //실제 db에 저장될 테이블 이름
        paranoid: true, //deletedAt 컬럼 생성, 주로 row를 복원할 상황이 생길 것 같다면 미리 true로 설정
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
}

module.exports = User;
