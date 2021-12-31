function GenerateId() {
  const id = 1000000 + parseInt(new Date().getTime().toString().slice(-2),10);
  return (id.toString(16)
  );
}
export { GenerateId }