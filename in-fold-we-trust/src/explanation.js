import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalTemplate from "./modal";



class Explanation extends Component {
    render() {
        return <ModalTemplate title={"Explanation"} closingCallback={this.props.closingCallback}>
            Hello from Explanation
        </ModalTemplate>
    }
}

Explanation.propTypes = {
    closingCallback: PropTypes.func.isRequired
};

export default Explanation
