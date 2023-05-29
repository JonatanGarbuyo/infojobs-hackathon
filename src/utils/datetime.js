export function dateFormater(value) {
  const date = new Date(value)
  const formater = new Intl.DateTimeFormat('es-ES')
  return formater.format(date)
}
