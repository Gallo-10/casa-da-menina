export interface GraphMediaImage {
  height: number
  src: string
  width: number
}

export interface GraphMedia {
  image?: GraphMediaImage
  source?: string
}

export interface GraphAttachmentItem {
  description?: string
  media: GraphMedia
}

export interface GraphAttachments {
  data: GraphAttachmentItem[]
}

export interface GraphFeedPost {
  attachments: GraphAttachments
  permalink_url: string
  id: string
}

export interface GraphPagingCursors {
  before: string
  after: string
}

export interface GraphPaging {
  cursors: GraphPagingCursors
  next?: string
  previous?: string
}

export interface GraphApiResponse {
  data: GraphFeedPost[]
  paging: GraphPaging
}