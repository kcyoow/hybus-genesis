import 'react-tiny-fab/dist/styles.css'
import './fab.scss'

import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Action, Fab } from 'react-tiny-fab'
import styled from 'styled-components'
import tw from 'twin.macro'

import DarkImg from '/image/dark_mode_black_48dp.svg'
import Email from '/image/email_black_48dp.svg'
import Arrow from '/image/expand_less_white_48dp.svg'
import Info from '/image/infoblack.svg'
import LangImg from '/image/lang_black_48dp.svg'
import LightImg from '/image/light_mode_black_48dp.svg'
import Donate from '/image/local_cafe_black_48dp.svg'

import { useDarkmodeContext } from '../../context/ThemeContext'
import { useDarkMode } from '../useDarkMode'

const Icons = styled.div<{ theme: string }>`
  ${({ theme }) => {
    return theme === 'dark' ? tw`invert` : null
  }}
`
const FabBackground = styled.div<{ open: boolean}>`
${tw`select-none font-Ptd`}
  ${({open}) => {
    return open? tw`fixed inset-0 z-99` : null;
  }}
`

export const Fabs = (props: { openModal: () => void }) => {
  const { toggleTheme } = useDarkMode()
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useDarkmodeContext()
  const [metadata, setMetadata] = useState<Record<string, string>>({
    changeText: t('dark'),
    changeColor: '#ffffff',
    iconColor: 'black',
    dataTheme: 'white',
    imgIcon: DarkImg,
  }) // white theme is default

  const fabBackgroundRef = useRef<HTMLDivElement>(null);
  const handleClickFabBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === fabBackgroundRef.current) {
      handleClose()
    }
  };

  const handleOpen = (): Promise<React.FC> => {
    return new Promise(() => {
      if(isOpen){
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    })
  }
  const handleClose = (): Promise<React.FC> => {
    return new Promise(() => {
      setIsOpen(false);
    })
  }



  const handleEmailOnClick = (): Promise<React.FC> => {
    return new Promise(() => {
      window.location.href = 'mailto:admin@hybus.app'
    })
  }
  const handleDonateOnClick = (): Promise<React.FC> => {
    return new Promise(() => {
      window.open('https://www.buymeacoffee.com/hybus', '_blank')
    })
  }
  const handleDarkOnClick = (): Promise<React.FC> => {
    return new Promise(() => {
      toggleTheme()
    })
  }
  const handleLangOnClick = (): Promise<React.FC> => {
    return new Promise(() => {
      if (i18n.language === 'en') {
        i18n.changeLanguage('ko')
        window.localStorage.setItem('lang', 'ko')
      } else {
        i18n.changeLanguage('en')
        window.localStorage.setItem('lang', 'en')
      }
    })
  }

  React.useLayoutEffect(() => {
    if (theme === 'dark') {
      setMetadata({
        changeText: t('light'),
        changeColor: '#374151',
        iconColor: 'white',
        dataTheme: 'dark',
        imgIcon: LightImg,
      })
    } else {
      setMetadata({
        changeText: t('dark'),
        changeColor: '#ffffff',
        iconColor: 'black',
        dataTheme: 'white',
        imgIcon: DarkImg,
      })
    }
  }, [t, theme])

  return (
    <>
      <FabBackground open={isOpen} onClick={handleClickFabBackground} ref={fabBackgroundRef}>
      </FabBackground>
        <Fab
          icon={
            <img
              className="iconImg w-12 h-12 cursor-default mx-auto"
              src={Arrow}
              data-theme={metadata.dataTheme}
              alt="floating action button icon"
              draggable="false"
            />
          }
          mainButtonStyles={{ backgroundColor: '#7099C1', fontSize: '10px' }}
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            right: '1.5rem',
            margin: '0px',
            padding: '0px',
            zIndex: 5,
          }}
          alwaysShowTitle={true}
          onClick={handleOpen}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          className={`rtf ${isOpen ? 'open' : 'closed'}`}
        >
          <Action
            text={metadata.changeText}
            style={{
              backgroundColor: metadata.changeColor,
              color: metadata.iconColor,
            }}
            onClick={handleDarkOnClick}
          >
            <Icons theme={metadata.dataTheme}>
              <img
                className="cursor-default"
                src={metadata.imgIcon}
                style={{ padding: 8 }}
                alt="light and dark mode icon"
                draggable="false"
              />
            </Icons>
          </Action>
          <Action
            text={t('changeLang')}
            style={{
              backgroundColor: metadata.changeColor,
              color: metadata.iconColor,
            }}
            onClick={handleLangOnClick}
          >
            <Icons theme={metadata.dataTheme}>
              <img
                className="cursor-default"
                src={LangImg}
                style={{ padding: 8 }}
                alt="language icon"
                draggable="false"
              />
            </Icons>
          </Action>
          <Action
            text={t('changelog')}
            style={{
              backgroundColor: metadata.changeColor,
              color: metadata.iconColor,
            }}
            onClick={props.openModal}
          >
            <Icons theme={metadata.dataTheme}>
              <img
                className="cursor-default"
                src={Info}
                style={{ padding: 8 }}
                alt="changelog icon"
                draggable="false"
              />
            </Icons>
          </Action>
          <Action
            text={t('donate')}
            style={{
              backgroundColor: metadata.changeColor,
              color: metadata.iconColor,
            }}
            onClick={handleDonateOnClick}
          >
            <Icons theme={metadata.dataTheme}>
              <img
                className="cursor-default"
                src={Donate}
                style={{ padding: 8 }}
                alt="donate a cup of coffee icon"
                draggable="false"
              />
            </Icons>
          </Action>
          <Action
            text={t('ask')}
            style={{
              backgroundColor: metadata.changeColor,
              color: metadata.iconColor,
            }}
            onClick={handleEmailOnClick}
          >
            <Icons theme={metadata.dataTheme}>
              <img
                className="cursor-default"
                src={Email}
                style={{ padding: 8 }}
                alt="email icon"
                draggable="false"
              />
            </Icons>
          </Action>
        </Fab>
    </>
  )
}
