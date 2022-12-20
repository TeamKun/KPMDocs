declare type KPMToml = {
    project: ProjectInfo
}

declare type ProjectInfo = {
    name: string
    short_name: string
    url: string

    version: VersionInfo
    license: LicenseInfo
}

declare type LicenseInfo = {
    name: string
    url: string
}

declare type VersionInfo = {
    name: string
    url: string
}
