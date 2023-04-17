import React from 'react'
import SideNav, {NavItem, NavIcon, NavText} from "@trendmicro/react-sidenav";
import './Sidebar.css';
import {useNavigate} from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (<SideNav
    onSelect={(selected)=> {
      console.log(selected);
      navigate('/' + selected)
    }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey='homepage'>
          <NavIcon><i className='fa fa-fw fa-home' style={{fontSize:"1.5em"}}></i></NavIcon>
          <NavText>Home</NavText>
        </NavItem>

        <NavItem eventKey='myprofile'>
          <NavIcon><i className='fa fa-fw fa-user' style={{fontSize:"1.5em"}}></i></NavIcon>
          <NavText>Profile</NavText>
        </NavItem>

        <NavItem eventKey='chatroom'>
          <NavIcon><i className='fa fa-fw fa-comment' style={{fontSize:"1.5em"}}></i></NavIcon>
          <NavText>Chatroom</NavText>
        </NavItem>

        <NavItem eventKey='home'>
          <NavIcon><i className='fa fa-fw fa-thumbs-up' style={{fontSize:"1.5em"}}></i></NavIcon>
          <NavText>Create Projects</NavText>

        </NavItem>

      </SideNav.Nav>
    </SideNav>);
}

export default Sidebar;