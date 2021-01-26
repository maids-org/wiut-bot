export default async (subject: string): Promise<string> => {
    const baseUrl =
        'https://intranet.wiut.uz/LearningMaterial/Videoconference/StudentVideoconference?moduleId='

    const matches: Array<string> = await subject.match(/\b(\w)/g)
    const acronym: string = await matches.join('').toLowerCase()

    switch (acronym) {
        case 'fop':
            return baseUrl + 314
        case 'wt':
            return baseUrl + 599
        case 'mfc':
            return baseUrl + 600
        case 'itsads':
            return baseUrl + 556
        case 'itmaob':
            return baseUrl + 539
        case 'taid':
            return baseUrl + 557
        case 'adr':
            return baseUrl + 541
        case 'efas':
            return baseUrl + 25
        case 'fa':
            return baseUrl + 687
        default:
            return 'https://intranet.wiut.uz/UserModuleMaterials'
    }
}
