import SecondPublisherLayout from './SecondPublisherLayout'
import { BracketsPackage, TabbedContextPackage } from 'archivist'

export default {
  name: 'second-publisher',
  configure: function(config) {
    config.import(BracketsPackage)
    config.import(TabbedContextPackage)
    config.addComponent('editor', SecondPublisherLayout)
    config.addToolGroup('references')
    config.addToolGroup('utils')
  }
}