export function getTagsFromData(restaurante: RestauranteApiProps) {
  const tags = []
  if (restaurante.destacado) tags.push('Destaque da semana')
  tags.push(restaurante.tipo)
  return tags
}

export function formataPreco(old_price = 0) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(old_price)
}
