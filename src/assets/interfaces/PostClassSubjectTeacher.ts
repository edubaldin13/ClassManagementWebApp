export default interface PostClassSubjectOrTeacherRequest {
    graduationCourseId: number;
    teacherId?: number;
    classSubjectId?: number;
    teacherDayId: number;
    hourId?: number;
}