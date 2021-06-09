import React, { useEffect, useRef, useState } from "react";
import { FaTrophy, FaCrown, FaUsers, FaClipboardList } from "react-icons/fa";
import {
  AsideContainer,
  ButtonLogoffWrapper,
  LevelInfo,
  MenuWrapper,
  ProfileWrapper,
} from "./styles";

import AvatarNotFound from "../../assets/images/avatar.svg";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../Button";

const Aside = () => {
  const { pathname } = useLocation();

  const [topIndicator, setTopIndicator] = useState(0);
  const [leftIndicator, setLeftIndicator] = useState(0);

  const indicator = useRef(null);
  const navLinks = useRef([]);

  const getDimensions = () => {
    navLinks.current.forEach((item) => {
      if (item?.className === "navlink--active") {
        const top = item.offsetTop;
        const left = item.offsetLeft;
        setLeftIndicator(`${left}px`);
        setTopIndicator(`${top}px`);
      }
    });
  };

  useEffect(() => {
    getDimensions();
  }, [pathname]);

  window.onresize = () => {
    getDimensions();
  };

  return (
    <AsideContainer>
      <ProfileWrapper>
        <img src={AvatarNotFound} alt="Avatar não encontrado" />
        <h2>Nome de usuário</h2>
        <LevelInfo>
          <FaTrophy />
          <span>Level iniciante</span>
        </LevelInfo>
      </ProfileWrapper>
      <div>
        <ButtonLogoffWrapper>
          <Button whiteSchema>Sair</Button>
        </ButtonLogoffWrapper>
        <MenuWrapper topIndicator={topIndicator} leftIndicator={leftIndicator}>
          <NavLink
            to="/dashboard"
            ref={(el) => navLinks.current.push(el)}
            activeClassName="navlink--active"
          >
            <FaClipboardList />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/achievements"
            ref={(el) => navLinks.current.push(el)}
            activeClassName="navlink--active"
          >
            <FaCrown />
            <span>Conquistas</span>
          </NavLink>
          <NavLink
            to="/groups"
            ref={(el) => navLinks.current.push(el)}
            activeClassName="navlink--active"
          >
            <FaUsers />
            <span>Grupos</span>
          </NavLink>
          <span
            className="indicator"
            ref={(el) => (indicator.current = el)}
          ></span>
        </MenuWrapper>
      </div>
    </AsideContainer>
  );
};

export default Aside;