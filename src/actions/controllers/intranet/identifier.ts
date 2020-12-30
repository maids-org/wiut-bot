export default async function (course: string): Promise<string> {
    switch (course) {
        case 'csf':
            return 'Computer Science Fundamentals'
        case 'isds':
            return 'Introduction to Statistics and Data Science'
        default:
            return 'Deconstruction!'
    }
}
