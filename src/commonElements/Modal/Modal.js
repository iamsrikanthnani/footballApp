import React, { Component } from 'react';
import { Text, View, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { hideModalAction } from '../../state/actions/ModalActions/modalActions';
import styles from './Modal.style'

const mapStateToProps = state => ({
  shouldShowModal: state.Modal.modalVisibility,
  modalChildren: state.Modal.children,
});

const mapDispatchToProps = {
  hideModal: hideModalAction
};

class ModalScreen extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Modal animationType={"slide"} transparent={false}
          visible={ this.props.shouldShowModal }
          onRequestClose={() => { console.log("Modal has been closed.") }}>

          <View style={styles.modal}>
            
              { this.props.modalChildren }
            <TouchableHighlight style={styles.touchableButton}
              onPress={() => { this.props.hideModal() }}>
              <Text style={styles.text}>Close Modal</Text>
            </TouchableHighlight>

          </View>
        </Modal>        
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalScreen);
