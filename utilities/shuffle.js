
export default function shuffle(array) {

    const shuffled = array.filter((item) => item !== undefined);

    for (let num = shuffled.length - 1; num > 0; num--) {
      const randomIndex = Math.floor(Math.random() * num);
      const temp = shuffled[num];
      shuffled[num] = shuffled[randomIndex];
      shuffled[randomIndex] = temp;
    }

    return shuffled;
  }
