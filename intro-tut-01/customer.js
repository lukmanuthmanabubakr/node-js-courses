const pap = 50
const akara = 100

const sales = () => {
    if((akara + pap) === 150) {
        return (
            console.log('U can take it')
        )
    }
    else {
        console.log('Put it down');
    }
}

module.exports = {sales}