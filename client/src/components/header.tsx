import NavBar from './navBar'

export default function Header(){
    return(
        <header className='app-header'>
            <div>
                <h1>Hours Log</h1>
            </div>
            <nav>
                <NavBar/>
            </nav>
        </header>
    )
}