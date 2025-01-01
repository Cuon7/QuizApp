import { MasterBaseViewModel } from "../master-base.view-model";

export class RoleViewModel extends MasterBaseViewModel {
    public name!: string;
    public description!: string;
    public isActive!: boolean;
}