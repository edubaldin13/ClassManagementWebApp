import { TeacherIdDayEnum } from "../enums/TeacherIdDayEnum";
import { ClassSubject } from "./ClassSubject";
import { Teacher } from "./Teacher";

export interface ClassTime {
    id: number;
    teacherIdDay: TeacherIdDayEnum
    teacher?: Teacher;
    graduationCourseId: number;
    classSubject: ClassSubject;
    start: Date;
    end: Date;
}