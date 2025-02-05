import { useState } from "react";

function loginForm() {

    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });

    const input = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                //WE CAN PUT A MODAL HERE SAYING THIS:
                console.log('Login success');
            }
        } catch (error) {
            //WE CAN PUT A MODAL HERE SAYING THIS:
            console.error('Login failed');
        }
    };

    return (
        <form onSubmit={submit}>
            <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={input}
                placeHolder="Username"
            />
            <input
                type="passord"
                name="password"
                value={formData.password}
                onChange={input}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default loginForm;

