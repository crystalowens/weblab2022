function randomNum(begin, end){
    return Math.floor(Math.random() * (end - begin)) + begin;
}
function randomElement(array){
    return array[randomNum(0, array.length)];
}

module.exports = {
    randomNum : randomNum,
    randomElement : randomElement
};