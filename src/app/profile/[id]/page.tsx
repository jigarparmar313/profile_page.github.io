
export default function UserProfile({params}:any) {

    return (
        <div className="center py-2">
            <h1>Profile</h1>
            <hr />
            <h3 className="">Profile Id :- <span className=" p-2 mx-2 rounded bg-warning text-danger">{params.id}</span></h3>
            {/* <h3 className="">Profile name :- <span className=" p-2 mx-2 rounded bg-warning text-danger">{params.username}</span></h3> */}

            </div>
    )
}