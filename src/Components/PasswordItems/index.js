import {Component} from 'react'
import './index.css'

class PasswordItem extends Component {
  onClickDeleteIcon = () => {
    const {passwordDetails, deletePasswordDetails} = this.props
    deletePasswordDetails(passwordDetails.id)
  }

  render() {
    const {passwordDetails, isPasswordDisplay} = this.props
    const {logoIcon, website, username, password} = passwordDetails

    return (
      <div className="user-password-items-main-container">
        <div className="user-password-items-container">
          <div className="user-main-details">
            <h1 className="logo-icon">{logoIcon}</h1>
            <div className="user-details">
              <p className="user-details-text">{website}</p>
              <p className="user-details-text">{username}</p>
              {isPasswordDisplay ? (
                <p className="user-details-text">{password}</p>
              ) : (
                <img
                  className="password-star"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                  alt="stars"
                />
              )}
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            data-testid="delete"
            onClick={this.onClickDeleteIcon}
          >
            <img
              className="delete-icon-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    )
  }
}

export default PasswordItem
