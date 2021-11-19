export default function dataFormatada() {
  const data = new Date();
  let dia = data.getDate();
  if (dia.toString().length === 1) {
    dia = `0${dia}`;
  }
  let mes = data.getMonth() + 1;
  if (mes.toString().length === 1) {
    mes = `0${mes}`;
  }
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}
