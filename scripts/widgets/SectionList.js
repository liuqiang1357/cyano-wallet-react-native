import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  StyleSheet,
  SectionList as RCTSectionList,
  View,
  ViewPropTypes,
} from 'react-native'

import { bindMethod } from '../utils/decorators'

export default class SectionList extends Component {
  static propTypes = {
    ...RCTSectionList.propTypes,
    columnWrapperStyle: ViewPropTypes.style,
    numColumns: PropTypes.number,
  }

  static defaultProps = {
    ...RCTSectionList.defaultProps,
    numColumns: 1,
  }

  static getDerivedStateFromProps(props, state) {
    let sections = props.sections
    if (props.numColumns > 1) {
      sections = sections.map(section => {
        const rows = _.chunk(section.data, props.numColumns)
          .map(row => ({
            key: row.map((item, index) => props.keyExtractor(item, index)).join(':'),
            data: row,
          }))
        return { ...section, data: rows }
      })
    }
    return { sections }
  }

  constructor(props) {
    super(props)
    this.state = {
      sections: [],
    }
  }

  render() {
    return (
      <RCTSectionList
        ref={ref => this.wrappedInstance = ref}
        {...this.props}
        sections={this.state.sections}
        renderItem={this.renderItem}
      />
    )
  }

  @bindMethod renderItem({ item: row, index: rowIndex, separators }) {
    if (this.props.numColumns > 1) {
      return (
        <View style={[styles.row, this.props.columnWrapperStyle]}>
          {
            row.data.map((item, index) => React.cloneElement(
              this.props.renderItem({
                item,
                index: rowIndex * this.props.numColumns + index,
                separators,
              }),
              { key: this.props.keyExtractor(item, index) },
            ))
          }
        </View>
      )
    }
    return this.props.renderItem({ item: row, index: rowIndex, separators })
  }
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
})
