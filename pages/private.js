// this page will render an Email and logout button if the user logs in.

import { useUser } from "../auth/useUser";
import { withAuth } from "../auth/withAuth";

const Private = () => {
    const { user, logout } = useUser();
    return (
        <div>
            <h1>Private Page</h1>
            {user?.email &&
                <div>
                    <div>Email: {user.email}</div>
                    <button onClick={() => logout()}>Logout</button>
                </div>
            }
        </div>
    )
}

export default withAuth(Private);