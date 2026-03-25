import { useMemo } from 'react'
import { usePageFocus } from '../../hooks/usePageFocus'
import MockData from '../../data/mock'

export default function Settings() {
  usePageFocus('settings')

  const categories = useMemo(() => MockData.categories, [])

  return (
    <div id="settings-page" className="page active">
      <div className="settings-container">
        <h1 className="settings-title">Browse by Category</h1>
        <div className="category-grid-container categories-grid" id="settings-categories">
          {categories.map((category) => {
            const dramas = MockData.getDramasByCategory(category.id)
            let imageUrl = 'assets/CodeBubbyAssets/3052_654/2.png'
            if (dramas.length > 0) {
              const randomDrama = dramas[Math.floor(Math.random() * dramas.length)]
              imageUrl = randomDrama.image
            }
            return (
              <div
                key={category.id}
                className="category-card"
                data-category-id={category.id}
                data-focusable="true"
              >
                <img src={imageUrl} alt={category.name} className="category-card-thumbnail" />
                <div className="category-card-overlay" />
                <h3 className="category-card-name">{category.name}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
