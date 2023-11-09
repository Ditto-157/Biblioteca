const url = 'https://apibiblioteca.2.ie-1.fl0.io/user'

function checkIfUserExist() {
    let input_RG = document.getElementById('input-RG');
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: 'f1563cb61eaf857ce3042c12cd94e774', 
            RG: input_RG.value
        })
    })

    .then((response) => response.text())
    .then ((data) => {
        if (data.match('User not found')) {
            console.log('Not found')
        } else {
            console.log('Found');
            let user = JSON.parse(data);
            let user_keys = Object.keys(user);
            let user_values = Object.values(user);
            for (let i = 0; i < user_keys.length; i++) {
                console.log(user_keys[i], user_values[i])
                localStorage.setItem(user_keys[i], user_values[i])
            }
            console.log(document.cookie)
        }
    });

}