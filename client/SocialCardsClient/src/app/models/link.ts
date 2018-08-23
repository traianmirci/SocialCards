export interface Link {
    name?: String,
    url?: string,
    clicks?: [{visits: Number, date:Date}],
    publicationDate?: Date,
    active?: boolean
}
