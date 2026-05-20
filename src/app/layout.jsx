import './globals.css'

export const metadata = {
  title: 'Leonardo Vitório - Full Stack Developer',
  description: 'Portfolio pessoal de Leonardo Vitório da Silva, desenvolvedor full stack baseado em Teresina, PI.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
