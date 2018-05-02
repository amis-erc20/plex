import styled from "styled-components";
import { Link } from "react-router";

export const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const Layout = styled.div`
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    -webkit-overflow-scrolling: touch;

    background-color: #f5f5f5;

    &.has-drawer {
        .Drawer {
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }

        .Header {
            display: none;
        }

        .Main {
            margin-left: 240px;
        }
    }
`;

export const Header = styled.div`
    height: 56px;
    padding: 0 16px 0 72px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 1px 5px 0 rgba(0, 0, 0, 0.12);
    z-index: 3;
`;

export const DrawerButton = styled.div`
    color: #002326;
    opacity: 0.5;
    margin: 4px;
    cursor: pointer;
    height: 48px;
    width: 48px;
    font-size: 22px;
    line-height: 48px;
`;

export const Drawer = styled.div`
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    width: 240px;
    height: 100%;
    max-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 1px 5px 0 rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    border-right: 1px solid #e0e0e0;
    background: #fafafa;
    color: #424242;
    overflow: visible;
    overflow-y: auto;
    z-index: 5;
    border: 0;

    // The drawer is not shown (hence transformed off-screen),
    // unless the screen width is sufficient.
    // We do some animation when the drawer is manually toggled.
    -webkit-transform: translateX(-250px);
    transform: translateX(-250px);
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    will-change: transform;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: transform;
    transition-property: transform, -web;

    &.is-visible {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
`;

export const Main = styled.div`
    -ms-flex: 0 1 auto;
    position: relative;
    display: inline-block;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    z-index: 1;
    -webkit-overflow-scrolling: touch;
`;

export const Footer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    text-align: right;
    height: 60px;
`;

export const FooterLink = styled(Link)`
    display: inline-block;
    margin: 0 10px;
    font-family: DIN-Bold;
    font-size: 13px;
    color: #002326;
    text-decoration: none;
    opacity: 0.5;

    &:hover {
        color: #002326;
        text-decoration: none;
    }
`;

export const LayoutObfuscator = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 4;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition-property: opacity;
    visibility: visible;
    // Disable click listeners.
    pointer-events: none;

    &.is-visible {
        // Allow click handlers for toggling.
        pointer-events: auto;
        opacity: 1;
    }
`;
