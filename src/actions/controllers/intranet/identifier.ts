export default async function (course: string): Promise<string> {
    switch (course) {
        case 'isds':
            return 'Introduction to Statistics and Data Science'
        default:
            return 'Underconstruction!'
    }
}
