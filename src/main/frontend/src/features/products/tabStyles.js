import styled from 'styled-components';

import { styled as styledTabTab } from 'react-tabtab';

let { TabListStyle, ActionButtonStyle, TabStyle, PanelStyle } = styledTabTab;


TabListStyle = styled(TabListStyle)`
  background-color: #fff;
  box-shadow: 0 0 10px 1px rgba(188,188,188,0.3);
  border: 0;
`;

TabStyle = styled(TabStyle)`
  color: #232162;
  transition: color .28s ease;
  border: 0;
  ${props => props.active && !props.vertical ?
    `
      border-bottom: 2px solid #232162;
    `
  : null}
  &:hover {
    background-color: #F8F8FF;
    color: #232162;
    border-bottom: 2px solid #232162;
  }
`;

ActionButtonStyle = styled(ActionButtonStyle)`
  background-color: transparent;
  border-radius: 0;
  border: none;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  &:hover {
    background-color: #eee;
  }
`;

PanelStyle = styled(PanelStyle)`
  border-left: 1px solid rgba(0,0,0,0.12);
  border-right: 1px solid rgba(0,0,0,0.12);
  border-bottom: 1px solid rgba(0,0,0,0.12);
  padding: 30px 30px;
  transition: box-shadow .25s, -webkit-box-shadow .25s;
  border-radius: 2px;
`;


export default {
  TabList: TabListStyle,
  ActionButton: ActionButtonStyle,
  Tab: TabStyle,
  Panel: PanelStyle
}
