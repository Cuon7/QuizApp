import { MasterBaseViewModel } from "../master-base.view-model";

export class QuizViewModel extends MasterBaseViewModel {
    public title!: string;
    public description!: string;
    public questionIdWithOrders!: [];
    public duration!: number;
    public isActive!: boolean;
    public thumbnailUrl!: string
}