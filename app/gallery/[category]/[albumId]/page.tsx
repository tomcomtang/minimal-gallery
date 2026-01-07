import { getCategoryInfo, getAlbumsByCategory, getAlbumById, getAllCategories } from '@/app/utils/config'
import AlbumContent from './AlbumContent'

// Generate static params
export async function generateStaticParams() {
  const categories = getAllCategories()
  const paths = []
  
  for (const category of categories) {
    const albums = getAlbumsByCategory(category)
    for (const album of albums) {
      paths.push({
        category: category,
        albumId: album.id,
      })
    }
  }
  
  return paths
}

export default function AlbumPage({ params }: { params: { category: string; albumId: string } }) {
  const albumData = getAlbumById(params.category, params.albumId)
  
  if (!albumData) {
    return <div>Album not found</div>
  }

  return <AlbumContent albumData={albumData} category={params.category} />
} 