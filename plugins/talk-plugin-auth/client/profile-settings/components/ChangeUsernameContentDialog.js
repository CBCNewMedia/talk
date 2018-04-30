import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChangeUsernameContentDialog.css';
import InputField from './InputField';
import { Button } from 'plugin-api/beta/client/components/ui';
import { t } from 'plugin-api/beta/client/services';

class ChangeUsernameContentDialog extends React.Component {
  state = {
    showError: false,
  };

  showError = () => {
    this.setState({
      showError: true,
    });
  };

  confirmChanges = async () => {
    if (this.formHasError()) {
      this.showError();
    } else {
      await this.props.save();
      this.props.next();
    }
  };

  formHasError = () =>
    this.props.formData.confirmNewUsername !== this.props.formData.newUsername;

  render() {
    return (
      <div>
        <span className={styles.close} onClick={this.props.cancel}>
          ×
        </span>
        <h1 className={styles.title}>
          {t('talk-plugin-auth.change_username.confirm_username_change')}
        </h1>
        <div className={styles.content}>
          <p className={styles.description}>
            {t('talk-plugin-auth.change_username.description')}
          </p>
          <div className={styles.usernamesChange}>
            <span className={styles.item}>
              {t('talk-plugin-auth.change_username.old_username')}:{' '}
              {this.props.username}
            </span>
            <span className={styles.item}>
              {t('talk-plugin-auth.change_username.new_username')}:{' '}
              {this.props.formData.newUsername}
            </span>
          </div>
          <form>
            <InputField
              id="confirmNewUsername"
              label="Re-enter new username"
              name="confirmNewUsername"
              type="text"
              onChange={this.props.onChange}
              defaultValue=""
              hasError={this.formHasError() && this.state.showError}
              errorMsg={t(
                'talk-plugin-auth.change_username.username_does_not_match'
              )}
              showError={this.state.showError}
              columnDisplay
              showSuccess={false}
              validationType="username"
            >
              <span className={styles.bottomNote}>
                {t('talk-plugin-auth.change_username.bottom_note')}
              </span>
            </InputField>
          </form>
          <div className={styles.bottomActions}>
            <Button className={styles.cancel} onClick={this.props.cancel}>
              {t('talk-plugin-auth.change_username.cancel')}
            </Button>
            <Button
              className={styles.confirmChanges}
              onClick={this.confirmChanges}
            >
              {t('talk-plugin-auth.change_username.confirm_changes')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

ChangeUsernameContentDialog.propTypes = {
  save: PropTypes.func,
  next: PropTypes.func,
  cancel: PropTypes.func,
  onChange: PropTypes.func,
  formData: PropTypes.object,
  username: PropTypes.string,
};

export default ChangeUsernameContentDialog;
