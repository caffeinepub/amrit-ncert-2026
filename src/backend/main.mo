import Array "mo:core/Array";
import Text "mo:core/Text";
import Map "mo:core/Map";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

actor {
  // Data Types
  type MCQ = {
    subject : Text;
    chapter : Text;
    questionText : Text;
    options : [Text];
    correctAnswerIndex : Nat;
  };

  type Note = {
    classNum : Nat;
    subject : Text;
    chapter : Text;
    keyPoints : [Text];
  };

  type Solution = {
    classNum : Nat;
    subject : Text;
    chapter : Text;
    question : Text;
    answer : Text;
  };

  type ImportantQuestion = {
    classNum : Nat;
    subject : Text;
    chapter : Text;
    questions : [Text];
  };

  // Module for MCQ comparison
  module MCQ {
    public func compare(mcq1 : MCQ, mcq2 : MCQ) : Order.Order {
      switch (Text.compare(mcq1.subject, mcq2.subject)) {
        case (#equal) {
          switch (Text.compare(mcq1.chapter, mcq2.chapter)) {
            case (#equal) { Text.compare(mcq1.questionText, mcq2.questionText) };
            case (order) { order };
          };
        };
        case (order) { order };
      };
    };
  };

  let mcqMap = Map.empty<Nat, MCQ>();
  let noteMap = Map.empty<Nat, Note>();
  let solutionMap = Map.empty<Nat, Solution>();
  let importantQuestionsMap = Map.empty<Nat, ImportantQuestion>();

  // Add MCQ
  public shared ({ caller }) func addMCQ(id : Nat, mcq : MCQ) : async () {
    if (mcqMap.containsKey(id)) { Runtime.trap("MCQ with this ID already exists!") };
    mcqMap.add(id, mcq);
  };

  // Get all MCQs
  public query ({ caller }) func getAllMCQs() : async [MCQ] {
    mcqMap.values().toArray().sort();
  };

  // Add Note
  public shared ({ caller }) func addNote(id : Nat, note : Note) : async () {
    if (noteMap.containsKey(id)) { Runtime.trap("Note with this ID already exists!") };
    noteMap.add(id, note);
  };

  // Get all Notes
  public query ({ caller }) func getAllNotes() : async [Note] {
    noteMap.values().toArray();
  };

  // Add Solution
  public shared ({ caller }) func addSolution(id : Nat, solution : Solution) : async () {
    if (solutionMap.containsKey(id)) { Runtime.trap("Solution with this ID already exists!") };
    solutionMap.add(id, solution);
  };

  // Get all Solutions
  public query ({ caller }) func getAllSolutions() : async [Solution] {
    solutionMap.values().toArray();
  };

  // Add Important Questions
  public shared ({ caller }) func addImportantQuestions(id : Nat, importantQuestion : ImportantQuestion) : async () {
    if (importantQuestionsMap.containsKey(id)) { Runtime.trap("Important questions with this ID already exist!") };
    importantQuestionsMap.add(id, importantQuestion);
  };

  // Get all Important Questions
  public query ({ caller }) func getAllImportantQuestions() : async [ImportantQuestion] {
    importantQuestionsMap.values().toArray();
  };

  // Search by keyword
  public query ({ caller }) func searchByKeyword(keyword : Text) : async ([MCQ], [Note], [Solution], [ImportantQuestion]) {
    let mcqResults = mcqMap.values().filter(
      func(mcq) { mcq.questionText.contains(#text keyword) }
    ).toArray();

    let noteResults = noteMap.values().filter(
      func(note) {
        note.keyPoints.find(func(point) { point.contains(#text keyword) }) != null;
      }
    ).toArray();

    let solutionResults = solutionMap.values().filter(
      func(solution) { solution.question.contains(#text keyword) or solution.answer.contains(#text keyword) }
    ).toArray();

    let importantQuestionResults = importantQuestionsMap.values().filter(
      func(impQ) {
        impQ.questions.find(func(q) { q.contains(#text keyword) }) != null;
      }
    ).toArray();

    (mcqResults, noteResults, solutionResults, importantQuestionResults);
  };
};
