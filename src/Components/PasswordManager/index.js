import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItems'

class PasswordManager extends Component {
  state = {
    inputWebsite: '',
    inputUserName: '',
    inputPassword: '',
    searchInput: '',
    isPasswordDisplay: false,
    isWebsiteInputValueEmpty: true,
    isUserNameInputValueEmpty: true,
    isPasswordInputValueEmpty: true,
    userPasswordDetailsList: [],
  }

  onChangeWebsite = event => {
    this.setState({inputWebsite: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({inputUserName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  onClickAddButtonSubmit = event => {
    event.preventDefault()
    const {
      inputWebsite,
      inputPassword,
      inputUserName,
      isPasswordDisplay,
    } = this.state

    this.isInputEmpty()

    if (inputWebsite !== '' && inputUserName !== '' && inputPassword !== '') {
      const newPasswordDetailObject = {
        id: uuid(),
        logoIcon: inputWebsite.toUpperCase()[0],
        website: inputWebsite,
        username: inputUserName,
        password: inputPassword,
        isDisplayPassword: isPasswordDisplay,
      }

      this.setState(prevState => ({
        userPasswordDetailsList: [
          ...prevState.userPasswordDetailsList,
          newPasswordDetailObject,
        ],
        inputWebsite: '',
        inputUserName: '',
        inputPassword: '',
        searchInput: '',
      }))
    }
  }

  isInputEmpty = () => {
    const {inputWebsite, inputPassword, inputUserName} = this.state
    if (inputWebsite === '') {
      this.setState({
        isWebsiteInputValueEmpty: false,
      })
    } else {
      this.setState({
        isWebsiteInputValueEmpty: true,
      })
    }

    if (inputUserName === '') {
      this.setState({
        isUserNameInputValueEmpty: false,
      })
    } else {
      this.setState({
        isUserNameInputValueEmpty: true,
      })
    }

    if (inputPassword === '') {
      this.setState({
        isPasswordInputValueEmpty: false,
      })
    } else {
      this.setState({
        isPasswordInputValueEmpty: true,
      })
    }
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({
      isPasswordDisplay: !prevState.isPasswordDisplay,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deletePasswordDetails = id => {
    const {userPasswordDetailsList} = this.state
    const filterDetails = userPasswordDetailsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({
      userPasswordDetailsList: filterDetails,
    })
  }

  getPasswordDetailCount = () => {
    const {userPasswordDetailsList} = this.state
    return userPasswordDetailsList.length
  }

  getFilterPasswordList = () => {
    const {userPasswordDetailsList, searchInput} = this.state
    const getSearchResult = userPasswordDetailsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return getSearchResult
  }

  render() {
    const {
      inputWebsite,
      inputUserName,
      inputPassword,
      searchInput,
      isPasswordDisplay,
      isWebsiteInputValueEmpty,
      isUserNameInputValueEmpty,
      isPasswordInputValueEmpty,
    } = this.state

    const passwordDetailCount = this.getPasswordDetailCount()
    const searchResult = this.getFilterPasswordList()

    return (
      <div className="password-manager-app-container">
        <img
          className="password-manager-log-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div>
          <div className="password-manager-main-card-container">
            <form
              className="password-card-container"
              onSubmit={this.onClickAddButtonSubmit}
            >
              <h1 className="add-new-password-text">Add New Password</h1>
              <div className="input-item-main-container">
                <div className="input-container">
                  <img
                    className="icon-image"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="input"
                    onChange={this.onChangeWebsite}
                    value={inputWebsite}
                  />
                </div>
                {isWebsiteInputValueEmpty ? (
                  ''
                ) : (
                  <p className="warning-msg">*Please Enter the Website name</p>
                )}
                <div className="input-container">
                  <img
                    className="icon-image"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="input"
                    onChange={this.onChangeUserName}
                    value={inputUserName}
                  />
                </div>
                {isUserNameInputValueEmpty ? (
                  ''
                ) : (
                  <p className="warning-msg">*Please Enter the Username</p>
                )}
                <div className="input-container">
                  <img
                    className="icon-image"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="input"
                    onChange={this.onChangePassword}
                    value={inputPassword}
                  />
                </div>
                {isPasswordInputValueEmpty ? (
                  ''
                ) : (
                  <p className="warning-msg">*Please Enter the Password</p>
                )}
              </div>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <div>
              <img
                className="password-manager-illustration-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
              />
            </div>
          </div>

          <div className="your-password-main-card-container">
            <div className="nav-container">
              <div className="user-password-count">
                <h1 className="your-password-heading">Your Passwords</h1>
                <p className="password-count">{passwordDetailCount}</p>
              </div>
              <div className="search-containers">
                <div className="search-container">
                  <img
                    className="search-icon-image"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                  />
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    onChange={this.onChangeSearchInput}
                    value={searchInput}
                  />
                </div>
              </div>
            </div>
            <div className="show-password">
              <input
                type="checkbox"
                id="CheckBox"
                onClick={this.onClickCheckBox}
              />
              <label htmlFor="CheckBox" className="check-box-label">
                Show Passwords
              </label>
            </div>

            {searchResult.length === 0 ? (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-illustration-image"
                />
                <p className="no-password-text">No Passwords</p>
              </div>
            ) : (
              <ul className="display-password-list-container">
                {searchResult.map(eachDetails => (
                  <PasswordItem
                    key={eachDetails.id}
                    passwordDetails={eachDetails}
                    deletePasswordDetails={this.deletePasswordDetails}
                    isPasswordDisplay={isPasswordDisplay}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
