export interface ResponseData {
    fields: Fields
    hints: Hints
}

interface Hints {
    rss_links: string
}

export interface Fields {
    [index: string]: any
    posting: boolean
    frends_for_posting_start:  number
    text_to_posting: string
    rss_links: string
    rss_with_comments: string
    text_to_bio: string
    groups_of_group_field: string
    text_input_field: string
    pictures_folder_path: string
    post_link_and_text_to_profile: boolean
    reposting_day_start: number
    links_to_repost: string
    posting_like: boolean
    posting_share: boolean
    like_to_post: boolean
    comment_to_post_status: boolean
    comment_to_post: string
    post_to_dating_group: boolean
    post_to_dating_group_day_start: number
}
