import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalTemplate from "./modal";


class Tutorial extends Component {
    render() {
        return <ModalTemplate title="Tutorial" closingCallback={this.props.closingCallback}>
            Hello from Tutorial
        </ModalTemplate>
    }
}

Tutorial.propTypes = {
    closingCallback: PropTypes.func.isRequired
};

export default Tutorial
