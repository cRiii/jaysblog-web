import { Avatar, Icon, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import router from 'umi/router';
import { ConnectProps } from '@/models/connect';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { messages } from '@/utils/GlobalTools';

export interface GlobalHeaderRightProps extends ConnectProps {
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
          callback: ({ code, msg }: { code: number; msg: string }) => {
            if (code !== 200) messages('error', `${msg}`, 3, 'thunderbolt');
            messages('success', `${msg}`, 3, 'check');
          },
        });
      }

      return;
    }
    router.push(`/account/${key}`);
  };

  render(): React.ReactNode {
    const { menu } = this.props;
    const userMessages = JSON.parse(sessionStorage.getItem('userMessages') || '');
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <Icon type="user" />
            <FormattedMessage id="menu.account.center" defaultMessage="account center" />
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <Icon type="setting" />
            <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    return !userMessages && !userMessages.nick_name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={userMessages.avatar} alt="avatar" />
          <span className={styles.name}>{userMessages.nick_name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span>神秘人</span>
      // <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    );
  }
}
export default AvatarDropdown;
