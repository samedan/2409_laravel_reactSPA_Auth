import { useState } from "react";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});

    async function handleRegister(e) {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            console.log(data);
        }

        // console.log(data);
    }

    return (
        <>
            <h1 className="title">Register an account</h1>
            <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                    {errors.name && <p className="error">{errors.name[0]}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                    {errors.password && (
                        <p className="error">{errors.password[0]}</p>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.password_confirmation}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password_confirmation: e.target.value,
                            })
                        }
                    />
                </div>
                <button className="primary-btn">Register</button>
            </form>
        </>
    );
}
