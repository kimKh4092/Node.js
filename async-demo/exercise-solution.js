

async function sendMovies() {
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);

    if (customer.isGold) {
        const movies = await getTopMovies();
        console.log('Top movies: ', movies);
        await sendEmail(customer.email, movies);
        console.log('Email sent...')

    }

}

sendMovies();

function getCustomer(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'kimia khalili',
                isGold: true,
                email: 'email'
            }, 2000)

        })
    })
}

function getTopMovies() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2'])
        }, 2000)

    })

}

function sendEmail(email, movies) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000)

    })

}
