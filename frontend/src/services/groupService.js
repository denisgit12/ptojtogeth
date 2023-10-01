import {urlsGroup} from "../configs";
import {axiosService} from "./axiosService";

const groupService = {
    getAllGroups:()=> axiosService.get(urlsGroup.group.getAll),
    addGroups:(group)=> axiosService.post(urlsGroup.group.addGroup, group),

}
export {
    groupService
}