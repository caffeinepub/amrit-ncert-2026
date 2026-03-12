import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MCQ {
    subject: string;
    questionText: string;
    correctAnswerIndex: bigint;
    chapter: string;
    options: Array<string>;
}
export interface Solution {
    question: string;
    subject: string;
    answer: string;
    chapter: string;
    classNum: bigint;
}
export interface ImportantQuestion {
    subject: string;
    questions: Array<string>;
    chapter: string;
    classNum: bigint;
}
export interface Note {
    subject: string;
    keyPoints: Array<string>;
    chapter: string;
    classNum: bigint;
}
export interface backendInterface {
    addImportantQuestions(id: bigint, importantQuestion: ImportantQuestion): Promise<void>;
    addMCQ(id: bigint, mcq: MCQ): Promise<void>;
    addNote(id: bigint, note: Note): Promise<void>;
    addSolution(id: bigint, solution: Solution): Promise<void>;
    getAllImportantQuestions(): Promise<Array<ImportantQuestion>>;
    getAllMCQs(): Promise<Array<MCQ>>;
    getAllNotes(): Promise<Array<Note>>;
    getAllSolutions(): Promise<Array<Solution>>;
    searchByKeyword(keyword: string): Promise<[Array<MCQ>, Array<Note>, Array<Solution>, Array<ImportantQuestion>]>;
}
