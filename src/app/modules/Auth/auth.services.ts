
import status from 'http-status';
import bcript from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from "../user/user.schema";
import { TUser, TUserLogin } from "../user/user.interface";


import { server_config } from "../../config/server.config";
import AppError from '../../errors/AppError';
import { ProjectModel } from '../project/project.schema';
import { BlogModel } from '../blog/blog.schema';
import { skillModel } from '../skill/skill.schema';
import { MessageModel } from '../message/message.schema';


// create user into db
const registerUserIntoDB = async (payload: TUser) => {
    // check user already exits
    const userExist = await UserModel.findOne({ email: payload.email });
    if (userExist) {
        throw new AppError(status.BAD_REQUEST, "User already exist with this email");
    }
    const result = await UserModel.create(payload);
    result.password = "*******"
    return result;
}
// login user from db
const loginUserFromDb = async (payload: TUserLogin) => {
    const { email, password } = payload;

    // check user not exits
    const userExist = await UserModel.findOne({ email }).select("+password");
    if (!userExist) {
        throw new AppError(status.NOT_FOUND, "User not exist with this email");
    }

    // check password
    const isPasswordMatch = bcript.compareSync(password, userExist?.password);
    if (!isPasswordMatch) {
        throw new AppError(status.UNAUTHORIZED, "Password not match");
    }
    // genareate token
    const token = jwt.sign({ email: userExist.email }, server_config.jwt_access_secret as string, { expiresIn: "1h" });

    return {
        token
    };
}
const get_me_from_db = async (email: string) => {
    const result = await UserModel.findOne({ email })
    if (!result) {
        throw new AppError(status.NOT_FOUND, "User not found!!",)
    }
    return result
}

const get_overview_from_db = async () => {
    // for project
    const project = await ProjectModel.find()
    const activeProject = project.filter((pj) => !pj.isDeleted)
    const deleteProject = project.filter((pj) => pj.isDeleted)

    // for blog
    const blog = await BlogModel.find();
    const activeBlog = blog.filter((b) => !b.isDeleted)
    const deleteBlog = blog.filter((b) => b.isDeleted)

    // for skill
    const skill = await skillModel.find();
    const activeSkill = skill.filter((b) => !b.isDeleted)
    const deleteSkill = skill.filter((b) => b.isDeleted)

    // for message
    const message = await MessageModel.find().sort({ createdAt: -1 });
    const oldMessage = message.filter((b) => b.isReded)
    const newMessage = message.filter((b) => !b.isReded)

    return {
        project: {
            totalProject: project?.length,
            activeProject: activeProject?.length,
            deleteProject: deleteProject?.length
        },
        blog: {
            totalBlog: blog?.length,
            activeBlog: activeBlog?.length,
            deleteBlog: deleteBlog?.length
        },
        skill: {
            totalSkill: skill?.length,
            activeSkill: activeSkill?.length,
            deleteSkill: deleteSkill?.length
        },
        message: {
            totalMessage: message?.length,
            newMessage: newMessage?.length,
            oldMessage: oldMessage?.length,
            message
        }
    }
}

export const authServices = {
    registerUserIntoDB,
    loginUserFromDb,
    get_me_from_db,
    get_overview_from_db
}