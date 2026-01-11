import { skillModel } from "./skill.schema"
import { ISkills } from "./skill.interface"

// create
const save_skill_into_db = async (payload: ISkills) => {
    const result = await skillModel.create(payload)
    return result;
}

// update
const update_skill_into_db = async (id: string, payload: Partial<ISkills>) => {
    const result = await skillModel.findByIdAndUpdate(id, payload, { new: true })
    return result;
}
// delete
const delete_skill_into_db = async (id: string) => {
    const result = await skillModel.findByIdAndUpdate(id, { isDeleted: true })
    return result;
}
// get all
const get_all_skill_from_db = async () => {
    const result = await skillModel.find({ isDeleted: false })
    return result;
}

// get specific
const get_one_skill_from_db = async (id: string) => {
    const result = await skillModel.findById(id)
    return result;
}

export const skill_services = {
    save_skill_into_db,
    update_skill_into_db,
    delete_skill_into_db,
    get_all_skill_from_db,
    get_one_skill_from_db
}