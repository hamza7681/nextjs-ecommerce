import { useState } from "react";
import baseUrl from "../Helpers/baseUrl";

const Create = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mediaUrl = await imageUpload();
    const res = await fetch(`${baseUrl}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        mediaUrl: mediaUrl,
        description,
      }),
    });
    const data = await res.json();
    if (data.error) {
      M.toast({ html: data.error, classes: "red" });
    } else {
      M.toast({ html: "Product Saved", classes: "green" });
    }
  };

  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "nextjs");
    data.append("cloud_name", "hamza7681");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/hamza7681/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const newRes = await res.json();
    return newRes.url;
  };

  return (
    <>
      <form className="container" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <div className="file-field input-field">
          <div className="btn #1565c0 blue darken-3">
            <span>File</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMedia(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <img
          className="responsive-img"
          src={media ? URL.createObjectURL(media) : ""}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="materialize-textarea"
        ></textarea>
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          type="submit"
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </>
  );
};

export default Create;
