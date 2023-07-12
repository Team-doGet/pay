const tmp = Array.from({ length: 9 }, (_, index) => index + 1);
for (let i = tmp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
}
const array = [[], [], []];
tmp.forEach((num, i) => {
    array[parseInt(i / 3)].push(num);
});

export default array;
