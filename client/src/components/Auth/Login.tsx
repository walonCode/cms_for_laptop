import  { useState } from 'react';
import axios from 'axios';

const Login = ({setIsAuthenticated}:{SetIsAuthenticated:boolean}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

   

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = {
                email,
                password
            }
            const response = await axios.post('http://localhost:3000/api/v1/users/login', data ,{
                withCredentials:true,
            });
            console.log(response.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.error(error)
            alert('Error during login');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
