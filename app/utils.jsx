//Shuffle images 
export const shuffleEntries = (array) => {
    console.log('shuffle ....', array)
    let currentIndex = array.length;
    console.log(currentIndex)
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      console.log('inside while ... ', )
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      console.log('random ind ....', currentIndex, array[currentIndex], randomIndex, array[randomIndex], [array[randomIndex], array[currentIndex]])
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];

    }  
    return (array)
}

//Generates some random indices to to select images
export const getRandomIndices = (length, indNum) => {
    let randomIndices = []
    for (let i = 0; i < indNum; i++) {
        const randNum = Math.floor(Math.random() * length)
        if (randomIndices.includes(randNum))
            i--
        else
            randomIndices.push(randNum)
    }
    return randomIndices
}

//Get images from the random indices
export const getDataToDisplay = (data, indices) => {
    return (indices.map((index) => data[index]))
}
