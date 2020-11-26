export default async (acronym: string): Promise<string> => {
    const baseUrl =
        'https://intranet.wiut.uz/LearningMaterial/Videoconference/StudentVideoconference?moduleId='

    switch (acronym) {
        case 'fop':
            return baseUrl + 314
        case 'wt':
            return baseUrl + 599
        case 'csf':
            return baseUrl + 559
        case 'mfc':
            return baseUrl + 600
        case 'isds':
            return baseUrl + 556
        case 'imob':
            return baseUrl + 539
        default:
            return 'https://intranet.wiut.uz/UserModuleMaterials'
    }
}
