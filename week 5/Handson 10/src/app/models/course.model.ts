export type GradeStatus = 'passed' | 'in-progress' | 'failed' | 'not-started';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: GradeStatus;
}
