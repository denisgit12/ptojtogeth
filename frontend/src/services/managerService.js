import {urlsManager} from "../configs";
import {axiosService} from "./axiosService";

const managerService ={
    getAll:(page=1)=> axiosService.get(urlsManager.manager.gerAll, {params:{page}}),
    getStatistic:(id)=> axiosService.get(urlsManager.manager.getStatistic(id)),

    create:(manager)=> axiosService.post(urlsManager.manager.create, manager),
    update:(id, manager)=> axiosService.patch(urlsManager.manager.update(id), manager),
    // getByToken:(token)=> axiosService.get(urlsManager.manager.getByToken(token)),
    // getByToken:()=> axiosService.get(urlsManager.manager.getByToken),

}
export {
    managerService
}