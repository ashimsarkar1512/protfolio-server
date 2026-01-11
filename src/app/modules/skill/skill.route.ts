import { Router } from "express";

import { skill_validation } from "./skill.validation";
import { skill_controller } from "./skill.controller";
import auth from "../../utils/auth";
import authSchemaValidation from "../../utils/authSchemaValidation";

const skill_router = Router()


// create skill
skill_router.post("/", auth(), authSchemaValidation(skill_validation.create_skill), skill_controller.create_skill)
skill_router.patch("/:id", auth(), authSchemaValidation(skill_validation.update_skill), skill_controller.update_skill)
skill_router.delete("/:id", auth(), skill_controller.delete_skill)
skill_router.get("/", skill_controller.get_all_skill)
skill_router.get("/:id", skill_controller.get_one_skill)


export default skill_router;