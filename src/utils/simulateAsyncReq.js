const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const simulateAsyncReq = async (data) => {
  const delay = (ms) =>
    new Promise((res, rej) =>
      setTimeout(getRandomInt(1, 5) > 2 ? res : rej, ms)
    );
  await delay(getRandomInt(500, 2000));
  // throw new Error("error");
  return data;
};

export default simulateAsyncReq;
