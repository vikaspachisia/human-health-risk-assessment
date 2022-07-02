const mongoose = require('mongoose');

const UserModel = class UserModel {
    model = null;
    schema = null;
    modelName = 'user';

    init = async () => {
        this.schema = this.getSchema();
        this.model = await service.DBService.registerModel(this.modelName, this.schema, "user");
    };

    getSchema = () => {
        if (this.schema == null) {
            this.schema = new mongoose.Schema({
                userid: { type: Number, required: true, immutable: true },
                first_name: { type: String, required: true },
                middle_name: { type: String },
                last_name: { type: String },
                age: { type: Number, min: 0, max: 150 },
                gender: { type: String, enum: ['Male', 'Female', 'Other'] }
            },
                {
                    timestamps: {
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            );
        }

        return this.schema;
    }

    getNewUserID = async () => {
        try {
            const lastUser = await this.model.findOne().sort({ userid: -1 });
            if (lastUser != null) {
                return lastUser.userid + 1;
            } else {
                return 1;
            }
        } catch (e) {
            console.log(e);
        }
    }

    createAsync = async (userData) => {
        var newUserID = await this.getNewUserID();

        const user = new this.model({ ...userData, userid: newUserID });
        const savedUser = await user.save();

        return savedUser;
    }

    readAsync = async (userid) => {
        var filter = {};
        if (userid && userid > 0) { filter = { userid: userid } }

        const users = await this.model.find(filter);
        if (!users) {
            throw new Error('Provided user does not exist. Failed to read user.');
        }

        return users;
    }

    updateAsync = async (userid, userData) => {
        const filter = { userid: userid };
        const updatedUser = await this.model.findOneAndUpdate(filter, userData);
        if (!updatedUser) {
            throw new Error('Provided user does not exist. Failed to update user.');
        }

        return updatedUser;
    }

    deleteAsync = async (userid) => {
        const user = await this.model.findOneAndDelete({ userid: userData.userid });
        if (!user) {
            throw new Error('Provided user does not exist. Failed to delete user.');
        }

        return user;
    }
};

const userModel = new UserModel();
userModel.init();

const model = {
    UserModel: userModel
};

module.exports = model;
