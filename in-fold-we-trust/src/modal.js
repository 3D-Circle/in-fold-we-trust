import React, {Component} from 'react';
import PropTypes from 'prop-types';


class ModalTemplate extends Component {
    render() {
        return <div className="modal-wrapper">
            <div className="modal-title">
                <h3>{this.props.title}</h3>
                <button onClick={this.props.closingCallback}>Exit</button>
            </div>

            <div className="modal-content">
                {this.props.children}
            </div>
        </div>;
    }
}

ModalTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    closingCallback: PropTypes.func.isRequired
};

export default ModalTemplate
