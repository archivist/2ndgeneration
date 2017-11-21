import { Component } from 'substance'

class Menu extends Component {
  render($$) {
    let el = $$('div').addClass('sc-spine')

    el.append(
      this.renderSecondLogo($$),
      this.renderLogo($$),
      this.renderMenu($$)
    )

    return el
  }

  renderLogo($$) {
    return $$('div').addClass('se-logo')
      .append(
        $$('div').addClass('se-main-logo').append(
          'Люди и судьбы'
        ),
        $$('div').addClass('se-slogan').append(
          'имена, свидетельства, документы'
        )
      )
  }

  renderSecondLogo($$) {
    return $$('div').addClass('se-second-logo')
      .append(
        $$('img').attr('src', '/assets/iofe-logo.png')
      )
  }

  renderMenu($$) {
    let items = [{id: 'archive', name: 'архив'}, {id: 'collections', name: 'коллекции'}]
    let el = $$('ul').addClass('se-menu')

    items.forEach(item => {
      el.append(
        $$('li').addClass('se-item').append(item.name)
      )
    })

    el.append(
      $$('li').addClass('se-item se-search').append(
        $$('i').addClass('fa fa-search')
      )
    )

    return el
  }
}

export default Menu
