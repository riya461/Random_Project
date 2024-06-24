
function Navbar() { 
    return (
    <nav className="flex w-full fixed p-5 justify-evenly bg-black">
        <h1 className="font-bold text-2xl font-sans">To Do List</h1>
        <div className="flex ">
            <button className="mx-3 hover:border border-5 px-3 py-1 hover:bg-white hover:text-black">Home</button>
            <button className="mx-3 hover:border border-5 px-3 py-1 hover:bg-white hover:text-black">About</button>
        </div>
    </nav>
)
}

export default Navbar;