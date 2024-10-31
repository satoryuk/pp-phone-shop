import { Link } from "react-router-dom";

const DashBoardHeader = () => {
  return (
    <section className="flex justify-between">
        <div className="flex gap-16">
            <h1 className="green-txt text-4xl">Listing OrderView</h1>
            <select name="date" id="date" className="border-2 p-2 px-4 text-lg border-primary active:border-primary text-primary rounded-xl">
                <option value="Last 30day">Last 30day</option>
                <option value="Last 30day">Last 30day</option>
                <option value="Last 30day">Last 30day</option>
                <option value="Last 30day">Last 30day</option>
                <option value="Last 30day">Last 30day</option>
            </select>
        </div>
        <Link to='/Auth/login' className="red-btn mr-44">LogOut</Link>
    </section>
  )
}

export default DashBoardHeader;
