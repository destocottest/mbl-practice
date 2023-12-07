export interface GoogleBook {
  id: string
  volumeInfo: {
    title: string
    authors: string[]
    imageLinks: {
      smallThumbnail: string
      thumbnail: string
    }
  }
}
