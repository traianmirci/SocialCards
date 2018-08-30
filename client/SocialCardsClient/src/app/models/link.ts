export interface Link {
    name?: String,
    url?: string,
    clicks?: [{visits: Number, date:Date}],
    publicationDate?: Date,
    active?: boolean,
    type?: string,
    twitter?: {
        username?: {type: String},
        postslimit?: {type: Number}
    },
    instagram?: {
        accesstoken?: {type: String},
        postslimit?: {type: Number},
        profile_picture?: string,
        username?: string

    },

    
    facebooktype?:{ String, enum: ['fbpagina','fbvideo','fbpublicacion','fbcomentarios']}

    youtubetype?: {String, enum: ['video','playlsit']}

    
}
