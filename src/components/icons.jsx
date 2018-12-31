import React from 'react';
import classNames from "classnames";

export function IconNext(props) {
  return (
    <div
      className={classNames('icon-container', { disable: props.disabled })}
      onClick={props.onClick}>
      <svg className={classNames('icon', props.className)}
           xmlns="http://www.w3.org/2000/svg"
           viewBox="8 6 8 12">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </div>
  );
};

export function IconPrevious(props) {
  return (
    <div
      className={classNames('icon-container', { disable: props.disabled })}
      onClick={props.onClick}>
      <svg className={classNames('icon', props.className)}
           xmlns="http://www.w3.org/2000/svg"
           viewBox="8 6 8 12">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </div>
  );
}

export function IconClose(props) {
  return (
    <svg className={classNames('icon', props.className)}
         xmlns="http://www.w3.org/2000/svg"
         viewBox="63 63 386 386">
      <path
        d="M437.5 386.6L306.9 256l130.6-130.6c14.1-14.1 14.1-36.8 0-50.9-14.1-14.1-36.8-14.1-50.9 0L256 205.1 125.4 74.5c-14.1-14.1-36.8-14.1-50.9 0-14.1 14.1-14.1 36.8 0 50.9L205.1 256 74.5 386.6c-14.1 14.1-14.1 36.8 0 50.9 14.1 14.1 36.8 14.1 50.9 0L256 306.9l130.6 130.6c14.1 14.1 36.8 14.1 50.9 0 14-14.1 14-36.9 0-50.9z"/>
    </svg>
  );
}