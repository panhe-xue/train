
console.log('前端444')
console.log1111('adasddsas')


document.querySelector('#btn').addEventListener('click', function() {
    import('./login').then(login => {
        console.log(login)
    })
})