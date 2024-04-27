const addZero = (val) => (val > 9 ? val : `0${val}`);

export const convertDate = (date, type = 0) => {
  let d = new Date(date);

  return type == 0
    ? `${addZero(d.getHours())}:${addZero(d.getMinutes())} ${addZero(
        d.getDate()
      )}.${addZero(d.getMonth() + 1)}.${d.getFullYear()}`
    : type == 1
    ? `${addZero(d.getDate())}.${addZero(d.getMonth() + 1)}.${d.getFullYear()}`
    : `${addZero(d.getHours())}:${addZero(d.getMinutes())}`;
};
