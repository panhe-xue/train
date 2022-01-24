import fetchApi from '../common/fetch'
import './album.css'

export default (mainElement) => {
  fetchApi('/photos?albumId=1').then(data => {
    data.forEach(item => {
      const section = document.createElement('section')
      section.className = 'photo'
  
      const img = document.createElement('img')
      img.src = item.thumbnailUrl
      section.appendChild(img);
  
      const h2 = document.createElement('h2')
      h2.textContent = item.title
      section.appendChild(h2)
  
      mainElement.appendChild(section)
    })
  })
}
