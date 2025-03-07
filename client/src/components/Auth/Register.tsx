import {  useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("")
    const [fullname, setFullname] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password === confirmPassword){
            const data = {
                username,
                password,
                role,
                fullname,
                email
            }
            const response = await axios.post('http://localhost:3000/api/v1/users/register',data)
            console.log('register completed',response.data)
        }else{
            console.log('not matched')
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Fullname</label>
                    <input
                        type="text"
                        name="username"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='usernmae'>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='roles'>Roles</label>
                    <select id="roles" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option>default</option>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACILITATOR">Facilitator</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='confirm password'>Confirm Password</label>
                    <input
                        type="password"
                        id="confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
