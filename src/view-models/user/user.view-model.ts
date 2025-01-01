import { MasterBaseViewModel } from "../master-base.view-model";

export class UserViewModel extends MasterBaseViewModel {
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public userName!: string;
    public phoneNumber!: string;
    public isActive!: boolean;
}