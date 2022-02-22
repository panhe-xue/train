// import album from './album/album'
// import post from './post'

// const render = () => {
//     console.log('hash改不了')
//     const mainElement = document.querySelector('.main')
//     const hash = window.location.hash || '#post'
//      mainElement.innerHTML = ''
//     if (hash === '#post') {
//         post(mainElement)
//     } else {
//         album(mainElement)
//     }
// }

// window.addEventListener('hashchange', render)
import './common/global.css'

const render = () => {
    console.log('hash改不了...')
    const mainElement = document.querySelector('.main')
    const hash = window.location.hash || '#post'
    mainElement.innerHTML = ''
    if (hash === '#post') {
        import(/* webpackChunkName: 'post' */'./post').then(post => {
            console.log(post, 'post...');
            post['default'](mainElement)
        })
    } else {
        import(/* webpackChunkName: 'album' */'./album/album').then(album => {
            album['default'](mainElement)
        })
    }
}

window.addEventListener('hashchange', render)