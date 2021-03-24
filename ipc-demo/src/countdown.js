module.exports = function countdown(tick) {
    let count = 10;

    let timer = setInterval(_ => {
        tick(count--);
        console.log("Count = ", count)
        if ( count === -1 ) {
            clearInterval(timer)
        }
    }, 300)
}