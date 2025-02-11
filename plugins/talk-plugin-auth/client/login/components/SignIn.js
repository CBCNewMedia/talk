import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Spinner,
  Alert,
} from 'plugin-api/beta/client/components/ui';
import styles from './SignIn.css';
import { t } from 'plugin-api/beta/client/services';
import cn from 'classnames';
import { Recaptcha } from 'plugin-api/beta/client/components';
import External from './External';

class SignIn extends React.Component {
  recaptcha = null;

  handleForgotPasswordLink = e => {
    e.preventDefault();
    this.props.onForgotPasswordLink();
  };
  handleSignUpLink = e => {
    e.preventDefault();
    this.props.onSignUpLink();
  };
  handleEmailChange = e => this.props.onEmailChange(e.target.value);
  handlePasswordChange = e => this.props.onPasswordChange(e.target.value);

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit();

    // Reset recaptcha because each response can only
    // be used once.
    if (this.recaptcha) {
      this.recaptcha.reset();
    }
  };

  handleRecaptchaRef = ref => {
    this.recaptcha = ref;
  };

  render() {
    const {
      email,
      password,
      errorMessage,
      requireRecaptcha,
      loading,
    } = this.props;
    return (
      <div className="coral-sign-in">
        <div className={cn(styles.header, 'header')}>
          <h1>{t('talk-plugin-auth.login.sign_in_to_join')}</h1>
        </div>
        {errorMessage && <Alert>{errorMessage}</Alert>}
        <div>
          <External slot="authExternalSignIn" />
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  loading: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onForgotPasswordLink: PropTypes.func.isRequired,
  onSignUpLink: PropTypes.func.isRequired,
  onRecaptchaVerify: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  requireRecaptcha: PropTypes.bool.isRequired,
};

export default SignIn;
