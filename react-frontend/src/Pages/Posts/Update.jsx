import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
    const { token, user } = useContext(AppContext);

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    const [errors, setErrors] = useState({});

    async function handleUpdate(e) {
        e.preventDefault();

        const res = await fetch(`/api/posts/${id}`, {
            method: "put",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data);

        if (data.errors) {
            setErrors(data.errors);
        } else {
            navigate("/");
        }
    }

    async function getPost() {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        // console.log(data);

        if (res.ok) {
            if (data.post.user_id !== user.id) {
                // try to edit someone else's post
                console.log("Not your post!");

                navigate("/");
            }
            setFormData({
                title: data.post.title,
                body: data.post.body,
            });
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <>
            <h1 className="title">Update your Post</h1>
            <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                    {errors.title && <p className="error">{errors.title[0]}</p>}
                </div>
                <div>
                    <textarea
                        rows="6"
                        placeholder="Post Content"
                        value={formData.body}
                        onChange={(e) =>
                            setFormData({ ...formData, body: e.target.value })
                        }
                    ></textarea>
                    {errors.body && <p className="error">{errors.body[0]}</p>}
                </div>
                <button className="primary-btn">Update Post</button>
            </form>
        </>
    );
}
