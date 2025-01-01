import { QuestionType } from "../../enums/question-type.enum";
import { MasterBaseViewModel } from "../master-base.view-model";

export class QuestionViewModel extends MasterBaseViewModel {
    public content!: string;
    public questionType!: QuestionType;
    public isActive!: boolean;
    public numberOfAnswers! : number
}