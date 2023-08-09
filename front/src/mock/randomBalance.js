function getRandomNumber() {
    const candidates = [50000, 60000, 70000, 80000, 90000, 100000];
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
}

export default getRandomNumber;
