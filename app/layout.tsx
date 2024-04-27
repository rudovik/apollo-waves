import "/sass/main.scss"
import { monoton, oswald } from "./fonts"
import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"
import { ApolloWrapper } from "lib/ApolloWrapper"
import { getHostAndCookie } from "lib/getHostAndCookie"
import PageContainer from "components/Layout/PageContainer"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { host, cookie } = getHostAndCookie()
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </head>

      <body className={`${monoton.variable} ${oswald.variable}`}>
        <ApolloWrapper host={host} cookie={cookie}>
          <Header />
          <PageContainer>{children}</PageContainer>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  )
}
