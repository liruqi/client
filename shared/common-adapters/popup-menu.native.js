// @flow
import React, {Component} from 'react'
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import Box from './box'
import Text from './text'
import {globalColors, globalMargins, globalStyles} from '../styles'

import type {Props, MenuItem} from './popup-menu'

// Menu Item
type MenuItemProps = MenuItem & {
  isHeader?: boolean,
  index: number,
  numItems: number,
}

const MenuRow = (props: MenuItemProps) => (
  <TouchableOpacity disabled={!props.onClick} onPress={props.onClick} style={{...styleRow(props), ...props.style}}>
    {props.view || <Text type={'BodyBig'} style={styleRowText(props)}>{props.title}</Text>}
  </TouchableOpacity>
)

const styleRow = ({isHeader, danger, index, numItems}: {isHeader?: boolean, danger?: boolean, index: number, numItems: number}) => {
  const sharedStyle = {
    ...globalStyles.flexBoxColumn,
    alignItems: 'center',
    justifyContent: 'center',
  }
  if (isHeader) {
    return {
      ...sharedStyle,
      padding: globalMargins.medium,
      backgroundColor: danger ? globalColors.red : globalColors.white,
    }
  }
  return {
    ...styleButtonAlert,
    backgroundColor: globalColors.white,
    borderColor: '#d7d7d7',
    ...(index === 1 ? {borderTopWidth: 1} : {}),
  }
}

const styleRowText = ({isHeader, danger}: {isHeader?: boolean, danger?: boolean}) => {
  const dangerColor = danger ? globalColors.red : globalColors.blue
  const color = isHeader ? globalColors.white : dangerColor
  return {
    color,
    ...(isHeader ? {textAlign: 'center'} : {}),
  }
}

// Popup Menu
class PopupMenu extends Component<void, Props, void> {
  render () {
    // $ForceType
    const menuItemsNoDividers: Array<MenuItem> = this.props.items.filter((mi) => mi !== 'Divider')
    const menuItemsWithHeader: Array<MenuItem> = [].concat(menuItemsNoDividers)
    if (this.props.header) {
      menuItemsWithHeader.unshift({...this.props.header, isHeader: true})
    }
    return (
      <TouchableWithoutFeedback style={styleOverlayContainer} onPress={this.props.onHidden}>
        <Box style={styleOverlay}>
          <Box style={{...styleMenu, ...this.props.style}}>
            <Box style={styleMenuGroup}>
              {menuItemsWithHeader.map((mi, idx) => <MenuRow key={mi.title} {...mi} index={idx} numItems={menuItemsWithHeader.length} />)}
            </Box>
            <Box style={{...styleMenuGroup, borderColor: '#d7d7d7', borderTopWidth: 1}}>
              <MenuRow title='Cancel' onClick={this.props.onHidden} index={0} numItems={1} />
            </Box>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    )
  }
}

function PopupHeaderText () {
  // TODO
}

const styleOverlayContainer = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const styleOverlay = {
  ...styleOverlayContainer,
  ...globalStyles.flexBoxColumn,
  justifyContent: 'flex-end',
  alignItems: 'stretch',
  backgroundColor: globalColors.black_40,
}

const styleMenu = {
  ...globalStyles.flexBoxColumn,
  justifyContent: 'flex-end',
  alignItems: 'stretch',
  backgroundColor: globalColors.white,
}

const styleMenuGroup = {
  ...globalStyles.flexBoxColumn,
  justifyContent: 'flex-end',
  alignItems: 'stretch',
}

const styleButtonAlert = {
  ...globalStyles.flexBoxColumn,
  alignItems: 'center',
  height: 56,
  justifyContent: 'center',
  paddingLeft: globalMargins.medium,
  paddingRight: globalMargins.medium,
}

export {PopupHeaderText}

export default PopupMenu
