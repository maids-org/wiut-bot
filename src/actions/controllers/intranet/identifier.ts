export default async function (course: string): Promise<string> {
  switch (course) {
    case "isds1":
      return "Introduction to Statistics and Data Science (Semester 1)";
    case "isds2":
      return "Introduction to Statistics and Data Science (Semester 2)";
    case "imob1":
      return "Introduction to Management and Organisational Behavior (Semester 1)";
    case "imob2":
      return "Introduction to Management and Organisational Behavior (Semester 2)";
    case "fop1":
      return "Fundamentals of Programming (Semester 1)";
    case "fop2":
      return "Fundamentals of Programming (Semester 2)";
    case "wt1":
      return "Web Technology (Semester 1)";
    case "wt2":
      return "Web Technology (Semester 2)";
    case "mfc":
      return "Mathematics for Computing";
    default:
      return "Underconstruction!";
  }
}
