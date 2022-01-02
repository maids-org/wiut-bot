export default async function (course: string): Promise<string> {
  switch (course) {
    case "isds":
      return "Introduction to Statistics and Data Science";
    case "imob":
      return "Introduction to Management and Organisational Behavior";
    case "fop":
      return "Fundamentals of Programming";
    case "wt":
      return "Web Technology";
    case "mfc":
      return "Mathematics for Computing";
    case "dsd":
      return "Database Systems Development";
    case "mad":
      return "Mobile Applications Development";
    case "gd":
      return "Game Development";
    case "oop":
      return "Object Oriented Programming";
    case "wad":
      return "Web Applications Development";
    case "ism":
      return "Information Systems Management";
    default:
      return "Under maintenance!";
  }
}
