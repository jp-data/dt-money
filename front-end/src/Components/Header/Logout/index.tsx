import { useNavigate } from "react-router-dom";

export function Logout() {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('token')
        navigate('/auth')
        window.location.reload()
    }

    return (
        <span onClick={logout}>Logout</span>
    )
}