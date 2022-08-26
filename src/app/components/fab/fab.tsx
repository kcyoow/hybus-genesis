import 'react-tiny-fab/dist/styles.css'
import './fab.scss'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Action, Fab } from 'react-tiny-fab'

import Arrow from '/image/add_white_48dp.svg'
import DarkImg from '/image/dark_mode_black_48dp.svg'
import Email from '/image/email_black_48dp.svg'
import Info from '/image/infoblack.svg'
import LightImg from '/image/light_mode_black_48dp.svg'
import Support from '/image/local_cafe_black_48dp.svg'

import { useDarkMode } from '../useDarkMode'
export const Fabs = (props: {
  openModal: () => void
}) => {

  const [themeMode, toggleTheme] = useDarkMode()
  const { t } = useTranslation()

  let changeText = ''
  let changeColor = ''
  let iconColor = ''
  let dataTheme = ''
  let imgIcon = ''
  const handleEmailOnClick = (): Promise<React.FC> => {
    return new Promise(() => {
      window.location.href = 'mailto:admin@hybus.app'
    })
  }
  const handleDonateOnClick = (): Promise<React.FC> => {
    return new Promise(() => {
      window.location.href = 'https://www.buymeacoffee.com/hybus'
    })
  }
  const handleDarkOnClick = (): Promise<React.FC> => {
    return new Promise(() => {
      toggleTheme()
    })
  }
  if (useDarkMode()[0] === 'dark') {
    changeText = t('light')
    changeColor = '#374151'
    iconColor = 'white'
    dataTheme = 'dark'
    imgIcon = LightImg
  } else {
    changeText = t('dark')
    changeColor = '#ffffff'
    iconColor = 'black'
    dataTheme = 'white'
    imgIcon = DarkImg
  }
  return (
    <>
      <div className="font-Ptd">
        <Fab
          icon={
            <img
              className="iconImg w-12 h-12"
              src={Arrow}
              data-theme={dataTheme}
              alt="floating action button icon"
            />
          }
          mainButtonStyles={{ backgroundColor: '#7099C1', fontSize: '10px' }}
          style={{
            bottom: '1.5rem',
            right: '1.5rem',
            margin: '0px',
            padding: '0px',
          }}
          alwaysShowTitle={true}
        >
          <Action
            text={changeText}
            style={{ backgroundColor: changeColor, color: iconColor }}
            onClick={handleDarkOnClick}
          >
            <div className="icons">
              <img
                src={imgIcon}
                style={{ padding: 8 }}
                data-theme={dataTheme}
                alt="light and dark mode icon"
              />
            </div>
          </Action>
          <Action
            text={t('changelog')}
            style={{ backgroundColor: changeColor, color: iconColor }}
            onClick={props.openModal}
          >
            <div className="icons">
              <img
                src={Info}
                style={{ padding: 8 }}
                data-theme={dataTheme}
                alt="changelog icon"
              />
            </div>
          </Action>
          <Action
            text={t('donate')}
            style={{ backgroundColor: changeColor, color: iconColor }}
            onClick={handleDonateOnClick}
          >
            <div className="icons">
              <img
                src={Support}
                style={{ padding: 8 }}
                data-theme={dataTheme}
                alt="donate a cup of coffee icon"
              />
            </div>
          </Action>
          <Action
            text={t('ask')}
            style={{ backgroundColor: changeColor, color: iconColor }}
            onClick={handleEmailOnClick}
          >
            <div className="icons">
              <img
                src={Email}
                style={{ padding: 8 }}
                data-theme={dataTheme}
                alt="email icon"
              />
            </div>
          </Action>
        </Fab>
      </div>
    </>
  )
}
