import status from 'http-status';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from "../user/user.schema";
import { TUser, TUserLogin } from "../user/user.interface";
import { ProjectModel } from "../project/project.schema";
import { BlogModel } from "../blog/blog.schema";
import { skillModel } from "../skills/skill.schema";
import { MessageModel } from "../message/message.schema";
import AppError from '../../errors/AppError';
import config from '../../config';

// Register a new user in the database
const registerUserIntoDB = async (payload: TUser) => {
  // Check if user already exists
  const userExist = await UserModel.findOne({ email: payload.email });
  if (userExist) {
    throw new AppError(status.BAD_REQUEST, "User already exists with this email");
  }

  // Create new user
  const result = await UserModel.create(payload);

  // Mask password before returning
  const userObject = result.toObject();
  userObject.password = undefined;

  return userObject;
};

// Authenticate user and generate JWT token
const loginUserFromDb = async (payload: TUserLogin) => {
  const { email, password } = payload;

  // Find user by email, including password field
  const userExist = await UserModel.findOne({ email }).select("+password");
  if (!userExist) {
    throw new AppError(status.NOT_FOUND, "User does not exist with this email");
  }

  // Validate password
  const isPasswordMatch = bcrypt.compareSync(password, userExist.password);
  if (!isPasswordMatch) {
    throw new AppError(status.UNAUTHORIZED, "Incorrect password");
  }

  // Generate JWT token with expiration (consider moving expiresIn to config)
  const token = jwt.sign({ email: userExist.email }, config.jwt_access_secret as string, { expiresIn: "1h" });

  return { token };
};

// Fetch current user details by email
const getMeFromDb = async (email: string) => {
  const user = await UserModel.findOne({ email }).lean();
  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }
  return user;
};

// Fetch overview statistics for projects, blogs, skills, and messages
const getOverviewFromDb = async () => {
  // Fetch projects and categorize
  const projects = await ProjectModel.find().lean();
  const activeProjects = projects.filter(pj => !pj.isDeleted);
  const deletedProjects = projects.filter(pj => pj.isDeleted);

  // Fetch blogs and categorize
  const blogs = await BlogModel.find().lean();
  const activeBlogs = blogs.filter(b => !b.isDeleted);
  const deletedBlogs = blogs.filter(b => b.isDeleted);

  // Fetch skills and categorize
  const skills = await skillModel.find().lean();
  const activeSkills = skills.filter(s => !s.isDeleted);
  const deletedSkills = skills.filter(s => s.isDeleted);

  // Fetch messages and categorize
  const messages = await MessageModel.find().sort({ createdAt: -1 }).lean();
  const readMessages = messages.filter(m => m.isRead);    // corrected spelling from isReded to isRead
  const unreadMessages = messages.filter(m => !m.isRead);

  return {
    project: {
      total: projects.length,
      active: activeProjects.length,
      deleted: deletedProjects.length,
    },
    blog: {
      total: blogs.length,
      active: activeBlogs.length,
      deleted: deletedBlogs.length,
    },
    skill: {
      total: skills.length,
      active: activeSkills.length,
      deleted: deletedSkills.length,
    },
    message: {
      total: messages.length,
      unread: unreadMessages.length,
      read: readMessages.length,
      messages,
    },
  };
};

export const authServices = {
  registerUserIntoDB,
  loginUserFromDb,
  getMeFromDb,
  getOverviewFromDb,
};
