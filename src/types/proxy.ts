export interface Fields {
    [index: string]: any
    proxy_accounts_count: number
    proxy_max_threads: number
}

export interface ProxyDashboard {
    [index: string]: any,
    total: number,
    total_valid: number,
    total_invalid: number,
}
