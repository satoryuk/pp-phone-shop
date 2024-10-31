import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <>
    <header>
        <nav>

        </nav>
    </header>
    <main>
        <Outlet></Outlet>
    </main>
    </>
  )
}

export default RootLayout
