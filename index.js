import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, StyleSheet, Image, Platform, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'

class Checkbox extends PureComponent {
  state = {
    checked: this.props.checked
  }

  static Container = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback

  static defaultProps = {
    custom: false,
    label: 'Label',
    customLabel: null,
    numberOfLabelLines: 1,
    labelBefore: false,
    checked: false,
    checkedImage: require('./checked.png'),
    uncheckedImage: require('./unchecked.png'),
    checkedComponent: null,
    uncheckedComponent: null,
    noFeedback: false,
    disabled: false
  }

  static propTypes = {
    checkedComponent: PropTypes.element,
    uncheckedComponent: PropTypes.element,
    checked: PropTypes.bool,
    checkboxStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    label: PropTypes.string,
    customLabel: PropTypes.element,
    labelBefore: PropTypes.bool,
    labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    numberOfLabelLines: PropTypes.number,
    onChange: PropTypes.func,
    noFeedback: PropTypes.bool,
    disabled: PropTypes.bool
  }

  componentDidUpdate (prevProps, prevState) {
    this.setState({ checked: this.props.checked })
  }

  render () {
    const { checked } = this.state
    const {
      labelBefore,
      containerStyle,
      checkedComponent,
      uncheckedComponent,
      checkedImage,
      uncheckedImage,
      checkboxStyle,
      labelStyle,
      numberOfLabelLines,
      label,
      noFeedback,
      customLabel,
      disabled
    } = this.props

    const Container = noFeedback ? TouchableWithoutFeedback : Checkbox.Container

    return (
      <Container
        style={[styles.container, containerStyle]}
        onPress={this.handleToggleChecked}
        disabled={disabled}
      >
        <View style={[styles.container, containerStyle]}>
          {labelBefore ? (
            <Label
              labelStyle={labelStyle}
              numberOfLabelLines={numberOfLabelLines}
              label={label}
              customLabel={customLabel}
            />
          ) : null}

          {checkedComponent && uncheckedComponent ? (
            checked ? (
              checkedComponent
            ) : (
              uncheckedComponent
            )
          ) : (
            <Image
              style={[styles.checkbox, checkboxStyle]}
               resizeMode={'contain'} 
              source={checked ? checkedImage : uncheckedImage}
            />
          )}

          {!labelBefore && (
            <Label
              labelStyle={labelStyle}
              numberOfLabelLines={numberOfLabelLines}
              label={label}
              customLabel={customLabel}
            />
          )}

        </View>

      </Container>
    )
  }

  handleToggleChecked = () => {
    const { label } = this.props
    const checked = !this.state.checked

    this.setState({ checked })
    this.props.onChange && this.props.onChange({ label, checked })
  }
}

const Label = ({ labelStyle, numberOfLabelLines, label, customLabel }) => {
  return !customLabel ? (
    <View style={styles.labelContainer}>
      <Text style={[styles.label, labelStyle]} numberOfLines={50}>
        {label}
      </Text>
    </View>
  ) : customLabel
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
  },
  checkbox: {
    flex:0.1,
    alignItems: 'center',
    justifyContent:'center',
    width: 30,
    height: 30
  },
  labelContainer: {
    flex:0.9,
    marginLeft: 10,
    marginRight: 10
  },
  label: {
   
    fontSize: 16,
    color: '#222'
  }
})

export default Checkbox

