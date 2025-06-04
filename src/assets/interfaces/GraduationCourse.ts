import { ClassSubject } from "./ClassSubject"
import { ClassTime } from "./ClassTime"
import { Teacher } from "./Teacher"

export interface GraduationCourse {
        graduationCourseId? : number
        name : string 
        managerName? : string
        managerId: number
        classDuration : number
        classTimes? : Array<ClassTime>
        classStart: Date
        classEnd: Date
}

export class GetCourseDataByGraduationCourseIdRequest {
        graduationCourseId: number;
        teachers?: Array<Teacher>;
        classSubjects?: Array<ClassSubject>;
}