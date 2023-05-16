import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

function MainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
