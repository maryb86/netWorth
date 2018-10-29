import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class AccountsTable extends Component {

  static propTypes = {
    accounts: PropTypes.array.isRequired,
    currency: PropTypes.string.isRequired,
    handleSetAmount: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
    editable: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      editableRowKey: null
    }
    this._setAmount = this._setAmount.bind(this);
  }

  componentDidUpdate() {
    if (document.getElementById("editAmount")) {
      document.getElementById("editAmount").focus();
    }
  }

  _formatNumber = (number) => {
    return new Intl.NumberFormat("en-CA", {style: "currency", currency: this.props.currency}).format(number);
  }

  _handleFocus = (accountId) => {
    if (this.props.editable) {
      this.setState({
        editableRowKey: accountId
      })
    }
  }

  _setAmount = (event) => {
    this.setState({
      editableRowKey: null
    });
    const amount = Number.parseFloat(event.target.value);
    if (!isNaN(amount)) {
      this.props.handleSetAmount({
        type: this.props.type,
        term: this.props.term,
        id: this.state.editableRowKey,
        amount: amount.toFixed(2).toString()
      });
    }
  }

  _getAmountField = (account) => {
    if (this.props.editable && this.state.editableRowKey === account.id) {
      return <td><input name="editAmount" id="editAmount" type="text" key={3} onBlur={this._setAmount} placeholder={account.amount} /></td>
    }
    return <td key={3} onClick={() => this._handleFocus(account.id)}>{this._formatNumber(account.amount)}</td>
  }

  _getBody() {
    const rows = this.props.accounts && this.props.accounts.map((account) => {
      return (
        <tr key={account.id}>
          <td key={0} className="account">{account.account}</td>
            {account.hasOwnProperty('monthlyPayment') ? 
            <td key={1}>{this._formatNumber(account.monthlyPayment)}</td> : null}
          <td key={2}>{account.interestRate}</td>
            {this._getAmountField(account)}
        </tr>
      )
    })

    return rows;
  }

  render() {
    return (
      <tbody className="accounts-table">
          {this._getBody()}
      </tbody>
    );
  }
}

export default AccountsTable;
