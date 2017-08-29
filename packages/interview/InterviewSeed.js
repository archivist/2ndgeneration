let seed = function(tx) {
  let body = tx.get('body')

  tx.create({
    id: 'meta',
    type: 'meta',
    title: 'Безымянное интервью'
  })

  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: 'Вставьте сюда расшифровку интервью.'
  })
  body.show('p1')
}

export default seed
