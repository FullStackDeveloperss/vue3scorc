export interface SectionData {
    [index: string]: any
    current_page: number
    data: any[]
    per_page: number
    section_name: string
    sort: string
    sort_order: string
    total: number
    total_page: number
}

export interface LinkItem {
    [index: string]: any
    code: string
    help: string
    help_status: number
    id: number
    name: string
    total: number
    url: string
}
