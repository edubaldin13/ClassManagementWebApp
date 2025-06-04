import { Teacher } from "./Teacher";

export interface ClassSubject {
    classSubjectId: number;
    name: string;
    teacherId: number;
    teacher?: Teacher;
    managerId: number;
}
