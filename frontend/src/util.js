export const toSqlDatetime = (date) => {
  const dateWithOffest = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  );
  return dateWithOffest.toISOString().slice(0, 19).replace('T', ' ');
};
