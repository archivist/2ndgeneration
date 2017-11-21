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
    return $$('a').addClass('se-logo').attr('href','/')
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
    return $$('a').addClass('se-second-logo').attr({href:'http://iofe.center/',target:'_blank'})
      .append(
        $$('img').attr('src', '/assets/iofe-logo.png')
      )
  }

  renderMenu($$) {
    let items = [{id: 'archive', name: 'архив', url: '/'}, {id: 'collections', name: 'коллекции', url: '/'}]
    let el = $$('ul').addClass('se-menu')

    items.forEach(item => {
      el.append(
        $$('li').addClass('se-item').append(
          $$('a').attr('href',item.url).append(item.name)
        )
      )
    })

    el.append(
      $$('li').addClass('se-item se-search').append(
        $$('i').addClass('fa fa-search')
      ).on('click', this._onSearch)
    )

    return el
  }

  _onSearch() {
    this.send('search')
  }
}

export default Menu
