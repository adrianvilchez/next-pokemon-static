import Head from "next/head"
import { FC, ReactNode } from "react"
import { Navbar } from "../ui"

type PropsWithChildren = {
    children: ReactNode,
    title: string
}

const origin = ( typeof window === 'undefined' ? '' : window.location.origin );

export const Layout: FC<PropsWithChildren> = ({ children, title }) => {

    

  return (
    <>
        <Head>
            <title>{ title || 'Pokemon App' }</title>
            <meta name='author' content='Adrián Vílchez' />
            <meta name='description' content={`Información sobre el pokemon ${ title }`} />
            <meta name='keywords' content={`${ title }, pokemon, pokedex`} />

            <meta property="og:title" content={`Información sobre ${ title }`} />
            <meta property="og:description" content={`Est a es la información sobre ${ title }`} />
            <meta property="og:image" content={`${ origin }/img/banner.png`} />
        </Head>

        <Navbar />

        <main style={{
            padding: '0px 20px'
        }}>

            { children }

        </main>
    </>
  )
}
