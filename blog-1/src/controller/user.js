const loginCheck = (username,password) => {
    console.log(username,password)
    if(username === "zhangsan" && password === 123){
        return true 
    }else{
        return false
    }
}

module.exports = {
    loginCheck
}